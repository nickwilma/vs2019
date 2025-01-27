var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            Microsoft.Plugin.addEventListener("pluginready", function () {
                try {
                    var apex = Microsoft.Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.Test.Apex.VisualStudio.JavaScriptInjection.ApexExtensionMarshaler", {}, true);
                    if (apex !== null) {
                        apex._call("getApexJavaScript").done(function (result) {
                            if (result) {
                                console.log("got apex javascript files");
                                var scriptObj = document.createElement("script");
                                scriptObj.setAttribute("type", "text/javascript");
                                scriptObj.setAttribute("src", result);
                                var head = document.getElementsByTagName("head");
                                if (!head) {
                                    console.log("Unable to add apex script to document");
                                }
                                else {
                                    head[0].appendChild(scriptObj);
                                    console.log("Added ApexJSExtension '" + result + "' to document");
                                }
                            }
                            else {
                                console.log("no file was returned by getApexJavaScript, cannot inject TestExtension.ts for ApexJS framework");
                            }
                        }, function (error) {
                            console.log("Error when calling getApexJavaScript function:" + String(error));
                        });
                    }
                    else {
                        console.log("Unable to connect to port marshaler 'Microsoft.Test.Apex.VisualStudio.JavaScriptInjection.ApexExtensionMarshaler'");
                    }
                }
                catch (e) {
                    console.log(e.toString());
                }
            });
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            var HorizontalSplitter = (function () {
                function HorizontalSplitter(splitter, ratio, updateCallback) {
                    this.SplitRatioMin = 0.1;
                    this.SplitRatioMax = 0.9;
                    this._updateCallback = updateCallback;
                    this._splitter = splitter;
                    this._splitRatio = ratio;
                    this._isActive = false;
                    this._snappedContent = null;
                    this._splitterHeight = splitter.getBoundingClientRect().height;
                    this._container = splitter.parentElement;
                    this._top = this._container.children[0];
                    this._bottom = this._container.children[2];
                    this._splitter.style.cursor = "ns-resize";
                    this._events = new Array();
                    this._events["mousedown"] = this.onMouseDown.bind(this);
                    this._events["mouseup"] = this.onMouseUp.bind(this);
                    this._events["mousemove"] = this.onMouseMove.bind(this);
                    this._splitter.onmousedown = this._events["mousedown"];
                    window.addEventListener("mouseup", this._events["mouseup"]);
                    window.addEventListener("mousemove", this._events["mousemove"]);
                    this._events["resize"] = this.update.bind(this);
                    window.addEventListener('resize', this._events["resize"]);
                    this._container.addEventListener('resize', this._events["resize"]);
                    this.updateLayout();
                }
                HorizontalSplitter.prototype.update = function () {
                    if (this._snappedContent) {
                        this._snappedContentHeight = this._snappedContent.clientHeight;
                        this.snapToContent();
                    }
                    else {
                        this.updateLayout();
                        this._updateCallback();
                    }
                };
                HorizontalSplitter.prototype.updateLayout = function (mouseY) {
                    var parent = this._container.parentElement;
                    var parentRect = parent.getBoundingClientRect();
                    var containerRect = this._container.getBoundingClientRect();
                    var containerHeight = (parentRect.height - containerRect.top) + "px";
                    if (this._container.style.height !== containerHeight) {
                        this._container.style.height = containerHeight;
                    }
                    containerRect = this._container.getBoundingClientRect();
                    var topHeight = 0;
                    var bottomHeight = 0;
                    var ratio = 0;
                    var splitterPosition = mouseY - containerRect.top;
                    if (splitterPosition) {
                        topHeight = splitterPosition - this._splitterHeight / 2;
                        bottomHeight = containerRect.height - this._splitterHeight / 2 - splitterPosition;
                        ratio = (topHeight + this._splitterHeight / 2) / containerRect.height;
                    }
                    else {
                        ratio = this._splitRatio;
                        topHeight = Math.floor(ratio * containerRect.height - this._splitterHeight / 2);
                        bottomHeight = Math.floor((1 - ratio) * containerRect.height - this._splitterHeight / 2);
                    }
                    if ((ratio >= this.SplitRatioMin && ratio <= this.SplitRatioMax) || this._snappedContent) {
                        this._splitRatio = ratio;
                        this._top.style.top = "0px";
                        this._top.style.height = topHeight.toString() + "px";
                        this._bottom.style.top = (topHeight + this._splitterHeight).toString() + "px";
                        this._bottom.style.height = bottomHeight.toString() + "px";
                        this._splitter.style.top = topHeight.toString() + "px";
                    }
                };
                HorizontalSplitter.prototype.snapToContent = function (elem, snapToTop) {
                    if (elem) {
                        if (!this._snappedContent) {
                            this._unsnappedHeight = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getPosition(this._splitter, true)["y"];
                        }
                        this._snappedContent = elem;
                        this._snappedContentHeight = this._snappedContent.clientHeight;
                    }
                    else if (!this._snappedContent) {
                        return;
                    }
                    var position = snapToTop ?
                        this._snappedContentHeight + (this._splitterHeight / 2) :
                        document.body.clientHeight - (this._snappedContentHeight + (this._splitterHeight / 2));
                    this.updateLayout(position);
                    this._updateCallback();
                };
                HorizontalSplitter.prototype.unsnapFromContent = function () {
                    if (this._snappedContent) {
                        this._snappedContent = null;
                        this.updateLayout(this._unsnappedHeight);
                        this._updateCallback();
                    }
                };
                HorizontalSplitter.prototype.dispose = function () {
                    this._splitter.onmousedown = null;
                    window.removeEventListener("mouseup", this._events["mouseup"]);
                    window.removeEventListener("mousemove", this._events["mousemove"]);
                    window.removeEventListener("resize", this._events["resize"]);
                    this._container.removeEventListener("resize", this._events["resize"]);
                    this._events = null;
                };
                HorizontalSplitter.prototype.onMouseDown = function (e) {
                    if (!this._snappedContent) {
                        this._isActive = true;
                    }
                };
                HorizontalSplitter.prototype.onMouseUp = function (e) {
                    if (!this._snappedContent && this._isActive) {
                        this._isActive = false;
                        this._updateCallback();
                    }
                };
                HorizontalSplitter.prototype.onMouseMove = function (e) {
                    if (!this._snappedContent && this._isActive) {
                        var containerRect = this._container.getBoundingClientRect();
                        this.updateLayout(e.pageY);
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                };
                return HorizontalSplitter;
            }());
            HeapViewer.HorizontalSplitter = HorizontalSplitter;
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            var MMADynamicGridViewer = (function (_super) {
                __extends(MMADynamicGridViewer, _super);
                function MMADynamicGridViewer(dataArray, root, options) {
                    options.gridRole = "grid";
                    _super.call(this, dataArray, root, options);
                    this._dataTipShown = false;
                    this._dataTipActivationCookie = 0;
                }
                MMADynamicGridViewer.prototype._trySorting = function (sortOrder, sortColumns) {
                    this.options().sortOrders = sortOrder;
                };
                MMADynamicGridViewer.prototype.getDatatipCell = function (e, element) { return null; };
                MMADynamicGridViewer.prototype.createElementWithClass = function (tagName, className) {
                    var _this = this;
                    var element = _super.prototype.createElementWithClass.call(this, tagName, className);
                    if (className === "grid-cell" || className === "grid-cell-ref") {
                        element.addEventListener("mouseover", function (e) { return _this.onColumnMouseOver(e, element); });
                        element.addEventListener("mouseout", function (e) { return _this.onColumnMouseOut(e, element); });
                        element.addEventListener("mousedown", function (e) {
                            _this.tryToCloseDataTip(true);
                        });
                    }
                    return element;
                };
                MMADynamicGridViewer.prototype.onColumnMouseOver = function (e, element) {
                    var _this = this;
                    this.tryToCloseDataTip(true);
                    if (this._treeIconMouseOver)
                        return;
                    var valueColumnElement = this.getDatatipCell(e, element);
                    if (!valueColumnElement) {
                        return;
                    }
                    valueColumnElement.removeAttribute("data-plugin-vs-tooltip");
                    this._dataTipActivationCookie = window.setTimeout(function () {
                        if (_this._dataTipActivationCookie) {
                            _this.activateValueDataTip(e, valueColumnElement);
                        }
                    }, 300);
                };
                MMADynamicGridViewer.prototype.onColumnMouseOut = function (e, element) {
                    if (this._dataTipActivationCookie) {
                        window.clearTimeout(this._dataTipActivationCookie);
                        this._dataTipActivationCookie = 0;
                    }
                    if (this._dataTipShown) {
                        var toElement = e.toElement;
                        var forceClose = !!toElement && (toElement.classList.contains("grid-row") ||
                            toElement.classList.contains("grid-cell") ||
                            toElement.classList.contains("grid-cell-ref"));
                        this.tryToCloseDataTip(forceClose);
                    }
                };
                MMADynamicGridViewer.prototype.activateValueDataTip = function (e, valueColumn) {
                    var _this = this;
                    var row = valueColumn.parentElement;
                    if (!row) {
                        return;
                    }
                    var rowInfo = this.getRowInfoFromEvent(e, "." + row.classList.item(0));
                    if (!rowInfo) {
                        return;
                    }
                    var dataIndex = (rowInfo.dataIndex);
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        var columnRect = valueColumn.getBoundingClientRect();
                        var x = Math.round(e.clientX);
                        var y = Math.round(e.clientY);
                        var left = Math.round(columnRect.left);
                        var right = Math.round(columnRect.right);
                        var top = Math.round(columnRect.top);
                        var bottom = Math.round(columnRect.bottom);
                        var isMousePointerInsideTheColumn = x >= left && x <= right && y >= top && y <= bottom;
                        var horizontalOffset = Math.min(20, Math.abs(x - right));
                        if (isMousePointerInsideTheColumn) {
                            var dataTipInfo = {
                                "tag": tag,
                                "x": x + horizontalOffset,
                                "y": top,
                                "left": left,
                                "top": top,
                                "right": right,
                                "bottom": bottom
                            };
                            _this._dataTipShown = true;
                            _this.adaptor()._call("ShowDataTip", dataTipInfo);
                        }
                    });
                };
                MMADynamicGridViewer.prototype.tryToCloseDataTip = function (closeForcefully) {
                    var _this = this;
                    if (closeForcefully) {
                        window.clearTimeout(this._dataTipActivationCookie);
                    }
                    try {
                        this.adaptor()._call("CloseDataTip", closeForcefully).done(function (dataTipHasBeenClosed) {
                            if (dataTipHasBeenClosed) {
                                _this._dataTipShown = false;
                            }
                        });
                    }
                    catch (err) { }
                };
                MMADynamicGridViewer.prototype.onTreeIconMouseOver = function (e) {
                    this._treeIconMouseOver = true;
                    this.tryToCloseDataTip(true);
                };
                MMADynamicGridViewer.prototype.onTreeIconMouseOut = function (e) {
                    this._treeIconMouseOver = false;
                };
                MMADynamicGridViewer.prototype._getAriaLabelForRow = function (rowInfo) {
                    var gridCells = rowInfo.row.getElementsByClassName("grid-cell");
                    for (var i = 0; i < gridCells.length; i++) {
                        var gridCell = gridCells[i];
                        if (gridCell.innerText.trim() === "") {
                            gridCell.setAttribute("aria-label", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GridCellEmpty"));
                        }
                    }
                    return this.getColumnText(rowInfo.dataIndex, this.getColumns()[0], 0);
                };
                MMADynamicGridViewer.prototype._onBlur = function (e) {
                    this.tryToCloseDataTip(false);
                    _super.prototype._onBlur.call(this, e);
                };
                MMADynamicGridViewer.prototype.addWatch = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        _this.adaptor()._call("AddWatch", tag);
                    });
                };
                MMADynamicGridViewer.prototype.quickWatch = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        _this.tryToCloseDataTip(true);
                        var tag = value["Tag"];
                        _this.adaptor()._call("QuickWatch", tag);
                    });
                };
                MMADynamicGridViewer.prototype.navigateToParentItem = function (e) {
                    var selectedRowIndex = this.getSelectedRowIndex();
                    this._clearSelection();
                    if (!this.tryToggle(false, e.shiftKey)) {
                        var curTreePath = this.findPathByRow(selectedRowIndex);
                        if (curTreePath.length() > 1) {
                            var parTreePath = curTreePath.chop();
                            var parentRow = this.findRowIndexByTreePath(parTreePath);
                            this._addSelection(parentRow);
                        }
                        else {
                            this._addSelection(selectedRowIndex);
                        }
                    }
                    else {
                        this._addSelection(selectedRowIndex);
                        this.layout();
                    }
                    this.getSelectedRowIntoView();
                };
                return MMADynamicGridViewer;
            }(Common.Controls.DynamicGrid.DynamicGridViewer));
            HeapViewer.MMADynamicGridViewer = MMADynamicGridViewer;
            var ProxyArrayWithAsyncPayload = (function (_super) {
                __extends(ProxyArrayWithAsyncPayload, _super);
                function ProxyArrayWithAsyncPayload(adaptor, gate, cacheSize) {
                    var _this = this;
                    _super.call(this, adaptor, gate, cacheSize);
                    this.adaptor().addEventListener(gate + "AsyncComplete", function (reply) { return _this.onAsyncData(reply.Result); });
                }
                ProxyArrayWithAsyncPayload.prototype.flushCache = function () {
                    this._mergedResultsStorage = {};
                    this._asyncResultsStorage = {};
                    this._asyncResultsNotReceived = {};
                    _super.prototype.flushCache.call(this);
                };
                ProxyArrayWithAsyncPayload.prototype.registerAsyncResultCallback = function (callback) {
                    this._asyncResultCallback = callback;
                };
                ProxyArrayWithAsyncPayload.prototype.get = function (index, func) {
                    var _this = this;
                    _super.prototype.get.call(this, index, function (value, needUpdate) {
                        if (_this._mergedResultsStorage[index]) {
                            func(_this._mergedResultsStorage[index], false);
                        }
                        else {
                            if (value && value["Async"]) {
                                if (_this._asyncResultsStorage[index]) {
                                    value = _this._mergedResultsStorage[index] = _this.mergeObjects(value, _this._asyncResultsStorage[index]);
                                    delete _this._asyncResultsStorage[index];
                                }
                                else {
                                    _this._asyncResultsNotReceived[index] = value;
                                }
                            }
                            func(value, needUpdate);
                        }
                    });
                };
                ProxyArrayWithAsyncPayload.prototype.onAsyncData = function (asyncResults) {
                    var _this = this;
                    asyncResults.forEach(function (asyncResult) {
                        var index = asyncResult["AsyncIndex"];
                        var value = _this._asyncResultsNotReceived[index];
                        if (!value) {
                            _this._asyncResultsStorage[index] = asyncResult;
                        }
                        else {
                            _this._mergedResultsStorage[index] = _this.mergeObjects(value, asyncResult);
                            delete _this._asyncResultsNotReceived[index];
                            if (_this._asyncResultCallback) {
                                _this._asyncResultCallback(index, value);
                            }
                        }
                    });
                };
                ProxyArrayWithAsyncPayload.prototype.mergeObjects = function (to, from) {
                    for (var property in to) {
                        if (to.hasOwnProperty(property) && from.hasOwnProperty(property)) {
                            to[property] = from[property];
                        }
                    }
                    return to;
                };
                return ProxyArrayWithAsyncPayload;
            }(Common.Controls.DynamicGrid.ProxyArray));
            HeapViewer.ProxyArrayWithAsyncPayload = ProxyArrayWithAsyncPayload;
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            var MemoryAnalyzerGridViewer = (function (_super) {
                __extends(MemoryAnalyzerGridViewer, _super);
                function MemoryAnalyzerGridViewer(name, root, viewChangedCallback, dataArray, gridContextMenu, columns, refGraphCallback, setFilterPlaceholderCallback, setFilterAndSortOrderHandler) {
                    var options = new Common.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null);
                    options.gridName = name;
                    options.overflowColumn = true;
                    options.focusable = true;
                    _super.call(this, dataArray, root, options);
                    this._dirtyFlag = false;
                    this._refGraphShowCallback = refGraphCallback;
                    this._setFilterPlaceholderCallback = setFilterPlaceholderCallback;
                    this._setFilterAndSortOrderHandler = setFilterAndSortOrderHandler;
                    this._refGraphNoDataElement = document.getElementById("managedHeapViewerRefGraphNoData");
                    this.showRefGraphNoData(true);
                    this._filterDomElement = document.getElementById("filterInput");
                    this._filter = "";
                    this.setDefaultSortOrder();
                    this._viewChangedCallback = viewChangedCallback;
                    var gridContainer = document.getElementById("snapshotView");
                    gridContainer.setAttribute("aria-label", Microsoft.Plugin.Resources.getString("LiveMemorySnapshotGridName"));
                    if (root.hasChildNodes) {
                        root.children[0].setAttribute("tabindex", "-1");
                    }
                }
                MemoryAnalyzerGridViewer.prototype.scheduleUpdate = function () {
                    var _this = this;
                    _super.prototype.scheduleUpdate.call(this, function () {
                        _this._viewChangedCallback(_this._dataArray.size() <= 0);
                    });
                };
                MemoryAnalyzerGridViewer.prototype.setDirty = function (dirty) {
                    this._dirtyFlag = dirty;
                };
                MemoryAnalyzerGridViewer.prototype.isDirty = function () {
                    return this._dirtyFlag;
                };
                MemoryAnalyzerGridViewer.prototype.resetView = function () {
                    this.refresh();
                    this._currentSelectedIndex = -1;
                    HeapViewer.MemoryAnalyzerViewer.instance.resetCurrentSelectedIndex();
                    this.showRefGraph(false);
                    this._clearSelection();
                    this.setDirty(false);
                };
                MemoryAnalyzerGridViewer.prototype.setFilterAsync = function (filterString) {
                    var _this = this;
                    if (filterString !== this._filter) {
                        this._filter = filterString;
                        this.adaptor().
                            _call(this._setFilterAndSortOrderHandler, this._filter, this._sortOrderIndex, this._sortOrderOrder).
                            done(function (refresh) {
                            if (refresh) {
                                _this.resetView();
                            }
                        });
                    }
                    if (this.rootElement.style.display !== "none" && this._filterDomElement.value !== this._filter) {
                        this._filterDomElement.value = this._filter;
                        if (!this._filter || this._filter.length === 0) {
                            this._filterDomElement.value = "";
                            this._setFilterPlaceholderCallback();
                        }
                        else {
                            this._filterDomElement.placeholder = "";
                        }
                    }
                };
                MemoryAnalyzerGridViewer.prototype.resetFilter = function () {
                    this.setFilterAsync(this._filter);
                };
                MemoryAnalyzerGridViewer.prototype.clearFilter = function () {
                    this.setFilterAsync("");
                };
                MemoryAnalyzerGridViewer.prototype.clearCurrentSelection = function () {
                    this._currentSelectedIndex = -1;
                };
                MemoryAnalyzerGridViewer.prototype.hasFilter = function () {
                    if (this._filter) {
                        return true;
                    }
                    return false;
                };
                MemoryAnalyzerGridViewer.prototype.onCtrlC = function () {
                    var dataIndex = this.getSelectedDataIndex();
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        HeapViewer.MemoryAnalyzerViewer.dataForClipboard = rowText;
                        HeapViewer.MemoryAnalyzerViewer.copySelectedRowToClipboard(null, null, null);
                    }
                };
                MemoryAnalyzerGridViewer.prototype.initializeContextMenu = function (dataIndex) {
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        HeapViewer.MemoryAnalyzerViewer.dataForClipboard = rowText;
                        return true;
                    }
                    return false;
                };
                MemoryAnalyzerGridViewer.prototype._trySorting = function (sortOrder, sortColumns) {
                    var _this = this;
                    this._sortOrderIndex = sortOrder[0].index;
                    this._sortOrderOrder = sortOrder[0].order;
                    this.adaptor()._call(this._setFilterAndSortOrderHandler, this._filter, this._sortOrderIndex, this._sortOrderOrder).done(function () {
                        _this.getCanvas().scrollTop = 0;
                        _this.fireCustomEvent(_this.getCanvas(), "scroll");
                        _this.refresh();
                        _this._currentSelectedIndex = -1;
                        HeapViewer.MemoryAnalyzerViewer.instance.resetCurrentSelectedIndex();
                        _this._refGraphShowCallback(false);
                        _this._clearSelection();
                        _this._refGraphNoDataElement.style.display = "block";
                    });
                    _super.prototype._trySorting.call(this, sortOrder, sortColumns);
                };
                MemoryAnalyzerGridViewer.prototype.translateColumn = function (row, index) {
                    var retval = _super.prototype.translateColumn.call(this, row, index);
                    if (index === "Value") {
                        return retval;
                    }
                    if (!row) {
                        if (index === "TagName")
                            retval = Microsoft.Plugin.Resources.getString("LoadRowDataText");
                    }
                    else {
                        if (index === "Count" || index === "StackViewCount") {
                            if (row.Count === -1)
                                retval = "";
                            else {
                                if (!retval)
                                    retval = "0";
                                retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, true, false);
                            }
                        }
                        else if (index === "TotalSize" || index === "RetainedSize" || index === "StackViewTotalSize" || index === "AllocationListSize") {
                            if (row.Count === -1) {
                                retval = "";
                            }
                            else {
                                if (!retval)
                                    retval = "0";
                                retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, true, false);
                            }
                        }
                        else if (index === "TagName") {
                            retval = MemoryAnalyzer.FormattingHelpers.getNativeDigitLocaleString(retval);
                        }
                        else if (index === "ObjAge") {
                            if (!retval)
                                retval = "";
                            retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, false, false);
                        }
                        else {
                            if (row.Count === 0 && row.TotalSize !== 0 || row.Count === -1)
                                retval = "";
                            else {
                                if (!retval)
                                    retval = "0";
                                if (parseInt(retval))
                                    retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, true, true);
                            }
                        }
                    }
                    return retval;
                };
                MemoryAnalyzerGridViewer.prototype.translateExternalPathColumn = function (treePath, index) {
                    return index === "TagName" ?
                        Microsoft.Plugin.Resources.getString("GridLastRow").replace("{0}", this.MaxRows.toString()) : "";
                };
                MemoryAnalyzerGridViewer.prototype.onSelectRow = function (rowIndex) {
                    if (this._currentSelectedIndex === this.getSelectedRowIndex())
                        return;
                    this.activateRow(rowIndex);
                };
                MemoryAnalyzerGridViewer.prototype.activateRow = function (rowIndex) {
                    this._currentSelectedIndex = this.getSelectedRowIndex();
                };
                MemoryAnalyzerGridViewer.prototype.reactivateCurrentRow = function () {
                    var selectedIndex = this.getSelectedRowIndex();
                    if (selectedIndex >= 0) {
                        this.activateRow(selectedIndex);
                    }
                };
                MemoryAnalyzerGridViewer.prototype.showRefGraph = function (show) {
                    this.showRefGraphNoData(!show);
                    this._refGraphShowCallback(show);
                };
                MemoryAnalyzerGridViewer.prototype.showRefGraphNoData = function (show) {
                    this._refGraphNoDataElement.style.display = show ? "block" : "none";
                };
                MemoryAnalyzerGridViewer.prototype.setDefaultSortOrder = function () {
                    this.onSort([new Common.Controls.Grid.SortOrderInfo(this.options().columns[this.options().columns.length - 1].index, "desc")], []);
                };
                return MemoryAnalyzerGridViewer;
            }(HeapViewer.MMADynamicGridViewer));
            HeapViewer.MemoryAnalyzerGridViewer = MemoryAnalyzerGridViewer;
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        (function (CodeTokenCategory) {
            CodeTokenCategory[CodeTokenCategory["Type"] = 0] = "Type";
            CodeTokenCategory[CodeTokenCategory["Field"] = 1] = "Field";
        })(ManagedMemoryAnalyzer.CodeTokenCategory || (ManagedMemoryAnalyzer.CodeTokenCategory = {}));
        var CodeTokenCategory = ManagedMemoryAnalyzer.CodeTokenCategory;
        (function (ContextMenuType) {
            ContextMenuType[ContextMenuType["First"] = 0] = "First";
            ContextMenuType[ContextMenuType["Types"] = 0] = "Types";
            ContextMenuType[ContextMenuType["Objects"] = 1] = "Objects";
            ContextMenuType[ContextMenuType["BackwardRefGraph"] = 2] = "BackwardRefGraph";
            ContextMenuType[ContextMenuType["ForwardRefGraph"] = 3] = "ForwardRefGraph";
            ContextMenuType[ContextMenuType["BackwardTypesRefGraph"] = 4] = "BackwardTypesRefGraph";
            ContextMenuType[ContextMenuType["ForwardTypesRefGraph"] = 5] = "ForwardTypesRefGraph";
            ContextMenuType[ContextMenuType["AllocationCallStack"] = 6] = "AllocationCallStack";
            ContextMenuType[ContextMenuType["AggregatedCallStacks"] = 7] = "AggregatedCallStacks";
            ContextMenuType[ContextMenuType["AllocationList"] = 8] = "AllocationList";
            ContextMenuType[ContextMenuType["Last"] = 8] = "Last";
        })(ManagedMemoryAnalyzer.ContextMenuType || (ManagedMemoryAnalyzer.ContextMenuType = {}));
        var ContextMenuType = ManagedMemoryAnalyzer.ContextMenuType;
        (function (ContextMenuItem) {
            ContextMenuItem[ContextMenuItem["Copy"] = 0] = "Copy";
            ContextMenuItem[ContextMenuItem["Separator1"] = 1] = "Separator1";
            ContextMenuItem[ContextMenuItem["AddWatch"] = 2] = "AddWatch";
            ContextMenuItem[ContextMenuItem["QuickWatch"] = 3] = "QuickWatch";
            ContextMenuItem[ContextMenuItem["ViewInstances"] = 4] = "ViewInstances";
            ContextMenuItem[ContextMenuItem["Separator2"] = 5] = "Separator2";
            ContextMenuItem[ContextMenuItem["GoToDefinition"] = 6] = "GoToDefinition";
            ContextMenuItem[ContextMenuItem["FindAllReferences"] = 7] = "FindAllReferences";
            ContextMenuItem[ContextMenuItem["GotoSource"] = 8] = "GotoSource";
        })(ManagedMemoryAnalyzer.ContextMenuItem || (ManagedMemoryAnalyzer.ContextMenuItem = {}));
        var ContextMenuItem = ManagedMemoryAnalyzer.ContextMenuItem;
        (function (DebuggerMode) {
            DebuggerMode[DebuggerMode["Attached"] = 0] = "Attached";
            DebuggerMode[DebuggerMode["Running"] = 1] = "Running";
            DebuggerMode[DebuggerMode["Broken"] = 2] = "Broken";
            DebuggerMode[DebuggerMode["Detached"] = 3] = "Detached";
        })(ManagedMemoryAnalyzer.DebuggerMode || (ManagedMemoryAnalyzer.DebuggerMode = {}));
        var DebuggerMode = ManagedMemoryAnalyzer.DebuggerMode;
        (function (DiffResult) {
            DiffResult[DiffResult["SUCCESS"] = 0] = "SUCCESS";
            DiffResult[DiffResult["FAILURE"] = 1] = "FAILURE";
        })(ManagedMemoryAnalyzer.DiffResult || (ManagedMemoryAnalyzer.DiffResult = {}));
        var DiffResult = ManagedMemoryAnalyzer.DiffResult;
        (function (FeatureState) {
            FeatureState[FeatureState["NotAvailable"] = 0] = "NotAvailable";
            FeatureState[FeatureState["Disabled"] = 1] = "Disabled";
            FeatureState[FeatureState["Enabled"] = 2] = "Enabled";
        })(ManagedMemoryAnalyzer.FeatureState || (ManagedMemoryAnalyzer.FeatureState = {}));
        var FeatureState = ManagedMemoryAnalyzer.FeatureState;
        (function (Key_Presses) {
            Key_Presses[Key_Presses["ENTER"] = 13] = "ENTER";
            Key_Presses[Key_Presses["SPACE"] = 32] = "SPACE";
            Key_Presses[Key_Presses["DOWNARROW"] = 40] = "DOWNARROW";
        })(ManagedMemoryAnalyzer.Key_Presses || (ManagedMemoryAnalyzer.Key_Presses = {}));
        var Key_Presses = ManagedMemoryAnalyzer.Key_Presses;
        (function (Mouse_Buttons) {
            Mouse_Buttons[Mouse_Buttons["LEFT_BUTTON"] = 1] = "LEFT_BUTTON";
            Mouse_Buttons[Mouse_Buttons["MIDDLE_BUTTON"] = 2] = "MIDDLE_BUTTON";
            Mouse_Buttons[Mouse_Buttons["RIGHT_BUTTON"] = 3] = "RIGHT_BUTTON";
        })(ManagedMemoryAnalyzer.Mouse_Buttons || (ManagedMemoryAnalyzer.Mouse_Buttons = {}));
        var Mouse_Buttons = ManagedMemoryAnalyzer.Mouse_Buttons;
        (function (SnapshotType) {
            SnapshotType[SnapshotType["GC_DUMP"] = 1] = "GC_DUMP";
            SnapshotType[SnapshotType["LIVE_MANAGED"] = 2] = "LIVE_MANAGED";
            SnapshotType[SnapshotType["LIVE_NATIVE"] = 3] = "LIVE_NATIVE";
            SnapshotType[SnapshotType["X86_DUMP"] = 4] = "X86_DUMP";
            SnapshotType[SnapshotType["X64_DUMP"] = 5] = "X64_DUMP";
            SnapshotType[SnapshotType["ARM_DUMP"] = 6] = "ARM_DUMP";
        })(ManagedMemoryAnalyzer.SnapshotType || (ManagedMemoryAnalyzer.SnapshotType = {}));
        var SnapshotType = ManagedMemoryAnalyzer.SnapshotType;
        (function (HeapViewBroadcastEventType) {
            HeapViewBroadcastEventType[HeapViewBroadcastEventType["ANALYSIS_COMPLETE_SUCCESS"] = 0] = "ANALYSIS_COMPLETE_SUCCESS";
            HeapViewBroadcastEventType[HeapViewBroadcastEventType["VIEW_FILTER_CHANGED"] = 1] = "VIEW_FILTER_CHANGED";
            HeapViewBroadcastEventType[HeapViewBroadcastEventType["ANALYSIS_ERROR"] = 2] = "ANALYSIS_ERROR";
        })(ManagedMemoryAnalyzer.HeapViewBroadcastEventType || (ManagedMemoryAnalyzer.HeapViewBroadcastEventType = {}));
        var HeapViewBroadcastEventType = ManagedMemoryAnalyzer.HeapViewBroadcastEventType;
        (function (RefGraphDirection) {
            RefGraphDirection[RefGraphDirection["Forward"] = 0] = "Forward";
            RefGraphDirection[RefGraphDirection["Backward"] = 1] = "Backward";
        })(ManagedMemoryAnalyzer.RefGraphDirection || (ManagedMemoryAnalyzer.RefGraphDirection = {}));
        var RefGraphDirection = ManagedMemoryAnalyzer.RefGraphDirection;
        (function (ViewType) {
            ViewType[ViewType["TypesView"] = 0] = "TypesView";
            ViewType[ViewType["ObjectsView"] = 1] = "ObjectsView";
            ViewType[ViewType["AggregatedStacksView"] = 2] = "AggregatedStacksView";
        })(ManagedMemoryAnalyzer.ViewType || (ManagedMemoryAnalyzer.ViewType = {}));
        var ViewType = ManagedMemoryAnalyzer.ViewType;
        (function (KeyContextConversionRequestType) {
            KeyContextConversionRequestType[KeyContextConversionRequestType["AggregateStackByCaller"] = 0] = "AggregateStackByCaller";
            KeyContextConversionRequestType[KeyContextConversionRequestType["AllocationListByCaller"] = 1] = "AllocationListByCaller";
        })(ManagedMemoryAnalyzer.KeyContextConversionRequestType || (ManagedMemoryAnalyzer.KeyContextConversionRequestType = {}));
        var KeyContextConversionRequestType = ManagedMemoryAnalyzer.KeyContextConversionRequestType;
        var DebuggerModeChangedEventArgs = (function () {
            function DebuggerModeChangedEventArgs() {
            }
            return DebuggerModeChangedEventArgs;
        }());
        ManagedMemoryAnalyzer.DebuggerModeChangedEventArgs = DebuggerModeChangedEventArgs;
        var MemoryAnalysisHelpers = (function () {
            function MemoryAnalysisHelpers() {
            }
            MemoryAnalysisHelpers.getChildById = function (id, root) {
                if (root.getAttribute("data-id") === id)
                    return root;
                if (!root.children)
                    return null;
                for (var i = 0; i < root.children.length; i++) {
                    var element = MemoryAnalysisHelpers.getChildById(id, root.children[i]);
                    if (element)
                        return element;
                }
                return null;
            };
            MemoryAnalysisHelpers.getPosition = function (element, fromCenter) {
                if (fromCenter === void 0) { fromCenter = true; }
                var position = new Array();
                var rect = element.getBoundingClientRect();
                position["x"] = rect.left;
                position["y"] = rect.top;
                if (fromCenter) {
                    position["x"] += element.offsetWidth / 2;
                    position["y"] += element.offsetHeight / 2;
                }
                return position;
            };
            MemoryAnalysisHelpers.formatResource = function (resourceString) {
                var values = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    values[_i - 1] = arguments[_i];
                }
                var formatted = Microsoft.Plugin.Resources.getString(resourceString);
                values.forEach(function (value, i) {
                    formatted = formatted.replace("{" + i + "}", value);
                });
                return formatted;
            };
            MemoryAnalysisHelpers.getFormattedDigitLocaleString = function (source) {
                return MemoryAnalyzer.FormattingHelpers.getNativeDigitLocaleString(source);
            };
            MemoryAnalysisHelpers.getNumberString = function (value, decimalDigits) {
                return MemoryAnalysisHelpers.getDecimalLocaleString(value, false, decimalDigits);
            };
            MemoryAnalysisHelpers.getSignedNumberString = function (value, decimalDigits) {
                return MemoryAnalysisHelpers.getDecimalLocaleString(value, true, decimalDigits);
            };
            MemoryAnalysisHelpers.getDecimalLocaleString = function (value, forceSign, decimalDigits) {
                return (decimalDigits !== undefined && decimalDigits >= 0) ?
                    MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(value.toFixed(decimalDigits), true, forceSign) :
                    MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(value, true, forceSign);
            };
            return MemoryAnalysisHelpers;
        }());
        ManagedMemoryAnalyzer.MemoryAnalysisHelpers = MemoryAnalysisHelpers;
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            var MemoryAnalyzerObjectsGridViewer = (function (_super) {
                __extends(MemoryAnalyzerObjectsGridViewer, _super);
                function MemoryAnalyzerObjectsGridViewer(root, viewChangedCallback, setFilterPlaceholderCallback, dataArray, gridContextMenu, columns, refGraphCallback, stackCallback, maxObjectsCount) {
                    var _this = this;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].hidden =
                            gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].hidden = function () { return false; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].disabled = function () { return !HeapViewer.MemoryAnalyzerViewer.instance.IsDebuggingNativeMemory(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].disabled = function () { return !HeapViewer.MemoryAnalyzerViewer.instance.IsDebuggingNativeMemory(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].callback = function () { return _this.goToSource(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].disabled = function () { return !_this._isObjectInspectionAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].disabled = function () { return !_this._isObjectInspectionAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].callback = function () { return _this.addWatch(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].callback = function () { return _this.quickWatch(); };
                    _super.call(this, "", root, viewChangedCallback, dataArray, gridContextMenu, columns, refGraphCallback, setFilterPlaceholderCallback, "ObjectSummariesSetFilterAndSortOrder");
                    this._stackCallback = stackCallback;
                    this._dataArray = dataArray;
                    if (maxObjectsCount !== 0) {
                        this.MaxRows = maxObjectsCount;
                    }
                    this._dataArray.registerAsyncResultCallback(function (index, value) { return _this.updateValueColumnAsync(index, value); });
                    this.adaptor().addEventListener("objectsFilteringProgress", function (reply) { return _this.onObjectsFilteringProgress(reply.Progress, reply.DataUpdated); });
                    this.adaptor()._call("IsObjectInspectionAvailable").done(function (result) {
                        _this._isObjectInspectionAvailable = result;
                    });
                    this.getCanvas().addEventListener("dblclick", this.onDoubleClick.bind(this));
                }
                MemoryAnalyzerObjectsGridViewer.prototype.onDoubleClick = function (e) {
                    this.goToSource();
                };
                MemoryAnalyzerObjectsGridViewer.prototype.goToSource = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        _this.adaptor()._call("GotoSourceFromInstance", tag);
                    });
                };
                MemoryAnalyzerObjectsGridViewer.prototype.setCurrentTypeAsync = function (type) {
                    var _this = this;
                    this._dataArray.flushCache();
                    this.clearCurrentSelection();
                    this.adaptor()._call("ObjectsInspectionSetType", type).done(function (count) {
                        _this._dataArray.init(function () {
                            _this.activateWithDynamicData(count);
                            _this.setDefaultSortOrder();
                            _this.scheduleUpdate();
                        });
                    });
                };
                MemoryAnalyzerObjectsGridViewer.prototype.activateRow = function (rowIndex) {
                    var _this = this;
                    _super.prototype.activateRow.call(this, rowIndex);
                    var path = this.findPathByRow(rowIndex);
                    if (path.length() != 1)
                        throw Error("invalid path");
                    if (rowIndex >= this.MaxRows - 1) {
                        this.showRefGraph(false);
                    }
                    else {
                        this._dataArray.get(path.path, function (value, needUpdate) {
                            var objectTag = value["Tag"];
                            _this.adaptor()._call("OnSelectObject", objectTag).done(function (isOk) {
                                if (isOk) {
                                    _this.showRefGraph(true);
                                    _this._stackCallback(true, objectTag);
                                }
                            });
                        });
                    }
                };
                MemoryAnalyzerObjectsGridViewer.prototype.translateExternalPathColumn = function (treePath, index) {
                    return index === "TagName" ?
                        Microsoft.Plugin.Resources.getString("GridTrimLimit").replace("{0}", this.MaxRows.toString()) : "";
                };
                MemoryAnalyzerObjectsGridViewer.prototype.updateValueColumnAsync = function (path, value) {
                    var valuepath = value.path;
                    var rowInfo;
                    if (!valuepath) {
                        rowInfo = this.getRowInfo(path);
                    }
                    else {
                        rowInfo = this.getRowInfo(valuepath.at(0));
                    }
                    if (!rowInfo) {
                        return;
                    }
                    var valueColumn = rowInfo.row.children[1];
                    valueColumn.innerText = value["Value"];
                };
                MemoryAnalyzerObjectsGridViewer.prototype.setFilterAsync = function (filterString) {
                    var _this = this;
                    this.setSearchProgressBarState(false, 0);
                    this.adaptor()._call("CancelObjectsFiltering").done(function () {
                        _this._dataArray.flushCache();
                        _this.clearCurrentSelection();
                        _super.prototype.setFilterAsync.call(_this, filterString);
                        if (filterString && filterString.length > 0) {
                            _this.setSearchProgressBarState(true, 0);
                        }
                    });
                };
                MemoryAnalyzerObjectsGridViewer.prototype.onObjectsFilteringProgress = function (progress, dataUpdated) {
                    if (dataUpdated) {
                        this._dataArray.flushCache();
                        this.clearCurrentSelection();
                        this.refresh();
                        this.showRefGraph(false);
                    }
                    this.setSearchProgressBarState(progress < 100, progress);
                };
                MemoryAnalyzerObjectsGridViewer.prototype.setSearchProgressBarState = function (show, progress) {
                    var filteringProgressBar = document.querySelector("#filterInputProgressBar");
                    filteringProgressBar.style.visibility = show ? "visible" : "hidden";
                    filteringProgressBar.value = progress;
                };
                MemoryAnalyzerObjectsGridViewer.prototype._trySorting = function (sortOrder, sortColumns) {
                    var _this = this;
                    this.adaptor()._call("CancelAsyncObjectsEvaluation").done(function () {
                        _this._dataArray.flushCache();
                        _this.clearCurrentSelection();
                        _super.prototype._trySorting.call(_this, sortOrder, sortColumns);
                    });
                };
                MemoryAnalyzerObjectsGridViewer.prototype.getDatatipCell = function (e, element) {
                    if (!this._isObjectInspectionAvailable) {
                        return null;
                    }
                    var rowElement = element.parentNode;
                    if (!rowElement || rowElement.children.length < 1)
                        throw Error("incorrect grid control row");
                    var valueColumnElement = rowElement.children[1];
                    if (valueColumnElement !== element)
                        return null;
                    return valueColumnElement;
                };
                MemoryAnalyzerObjectsGridViewer.prototype._onKeyDown = function (e) {
                    if (this._isObjectInspectionAvailable && !this.isDirty()) {
                        if (e.shiftKey && e.altKey && e.keyCode === Common.KeyCodes.F9) {
                            this.addWatch();
                            return true;
                        }
                        else if (e.keyCode === Common.KeyCodes.ENTER || (e.shiftKey && e.keyCode === Common.KeyCodes.F9)) {
                            this.quickWatch();
                            return true;
                        }
                    }
                    return _super.prototype._onKeyDown.call(this, e);
                };
                return MemoryAnalyzerObjectsGridViewer;
            }(HeapViewer.MemoryAnalyzerGridViewer));
            HeapViewer.MemoryAnalyzerObjectsGridViewer = MemoryAnalyzerObjectsGridViewer;
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var HeapViewer;
        (function (HeapViewer) {
            var MemoryAnalyzerViewer = (function () {
                function MemoryAnalyzerViewer(adaptor) {
                    var _this = this;
                    this.TAG_COLUMN_WIDTH = 500;
                    this.NUMERIC_COLUMN_WIDTH = 150;
                    this.INDICATOR_COLUMN_WIDTH = 50;
                    this.STACKFRAME_COLUMN_WIDTH = 1000;
                    this.LANG_COLUMN_WIDTH = 100;
                    this._refsViewerCache = [null, null];
                    this._typeRefsViewerCache = [null, null];
                    this._columnInfoSortLabels = new Common.Controls.Grid.ColumnInfoSortLabels(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SortedAscending"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SortedDescending"));
                    Microsoft.Plugin.Tooltip.defaultTooltipContentToHTML = false;
                    Microsoft.Plugin.VS.Keyboard.setZoomState(false);
                    this._adaptor = adaptor;
                    window.addEventListener("focus", function (e) {
                        _this._adaptor._call("OnWindowActivated");
                    });
                    window.addEventListener("click", function (e) {
                        _this._adaptor._call("OnWindowActivated");
                    });
                    document.addEventListener("keydown", function (e) {
                        var target = e.target;
                        if (e.keyCode === Common.KeyCodes.F1) {
                            _this._adaptor._call("ShowHelp");
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                        else if (e.keyCode === Common.KeyCodes.BACKSPACE) {
                            if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView && (!target || target.tagName !== "input")) {
                                _this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null);
                            }
                        }
                        else if (e.keyCode === Common.KeyCodes.ENTER) {
                            if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView && target && target.id === "goBackButton") {
                                _this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null);
                            }
                        }
                        return true;
                    });
                    document.getElementById("viewSettingsDiv").setAttribute("aria-label", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewSettingsMenuCaption"));
                    document.getElementById("goBackButton").setAttribute("aria-label", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GoBackLinkCaption"));
                    document.getElementById("filterInput").setAttribute("aria-label", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesFilterName"));
                    this._adaptor._call("IsDebuggingNativeMemory").done(function (result) {
                        _this._debugNativeMemory = result;
                        var selectHeapDropDown = document.getElementById("heapSelectDropDownDiv");
                        var selectHeapDropDownCombo = document.querySelector("#heapSelectDropDown");
                        selectHeapDropDown.style.display = "none";
                        selectHeapDropDownCombo.disabled = true;
                        _this._containsCustomNativeHeap = false;
                        if (result == true) {
                            var refGraphNoData = document.querySelector("#managedHeapViewerRefGraphNoData");
                            var stackHeader = document.getElementById("stackHeader");
                            var nativeStackViewerContainer = document.getElementById("nativeStackViewerContainer");
                            var nativeAllocationListContainer = document.getElementById("nativeAllocationListContainer");
                            refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GotoInstancesView");
                            stackHeader.style.display = "none";
                            nativeStackViewerContainer.style.display = "none";
                            nativeAllocationListContainer.style.display = "none";
                            _this._adaptor._call("GetNativeAllocatorHeaps").done(function (result) {
                                if (result.length > 1) {
                                    _this._containsCustomNativeHeap = true;
                                    selectHeapDropDown.style.display = "inline-block";
                                    selectHeapDropDownCombo.disabled = false;
                                    var selectHeapDropDownCaption = document.querySelector("#heapSelectCaption");
                                    selectHeapDropDownCaption.innerHTML = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NativeHeapSelectComboBoxLabel"));
                                    _this._adaptor._call("GetCurrentNativeAllocatorHeap").done(function (curHeapAllocatorInfo) {
                                        selectHeapDropDownCombo.options.length = 0;
                                        _this._currentNativeHeapIndex = 0;
                                        for (var j = 0; j < result.length; j++) {
                                            var isSelected = false;
                                            if (result[j].heapHandle == curHeapAllocatorInfo.heapHandle) {
                                                isSelected = true;
                                                _this._currentNativeHeapIndex = j;
                                            }
                                            selectHeapDropDownCombo.add(new Option(result[j].heapName, result[j].heapHandle.toString(), isSelected, isSelected));
                                        }
                                    });
                                    selectHeapDropDownCombo.onchange = function (e) {
                                        if (selectHeapDropDownCombo.selectedIndex === _this._currentNativeHeapIndex) {
                                            return;
                                        }
                                        _this._typesViewer.setDirty(true);
                                        _this._objectsViewer.setDirty(true);
                                        var selectedValue = selectHeapDropDownCombo.textContent.toString();
                                        var heapHandle = Number(selectHeapDropDownCombo.value);
                                        _this._adaptor._call("SetCurrentNativeAllocatorHeap", selectHeapDropDownCombo.selectedIndex, heapHandle, selectedValue).done(function (ret) {
                                            if (ret) {
                                                _this._currentNativeHeapIndex = selectHeapDropDownCombo.selectedIndex;
                                                _this._typesViewer.resetView();
                                                _this._objectsViewer.resetView();
                                                _this.refreshDropDownAsync();
                                            }
                                        });
                                    };
                                }
                            });
                        }
                    });
                    this._adaptor._call("GetViewSettingsState").done(function (result) {
                        _this._viewSettingsState = result;
                    });
                    this._adaptor.addEventListener("ideBFNavigate", function (navigateTo) {
                        _this.setViewType(navigateTo.Type, navigateTo.Title);
                    });
                    this._adaptor.addEventListener("DebuggerModeChanged", function () {
                        _this._adaptor._call("IsObjectInspectionAvailable").done(function (isObjectInspectionAvailable) {
                            if (_this._isObjectInspectionAvailable !== isObjectInspectionAvailable) {
                                _this._isObjectInspectionAvailable = isObjectInspectionAvailable;
                                _this.initializeInstanceColumns(isObjectInspectionAvailable);
                                _this.updateNotificationBar();
                                if (_this._objectsViewer) {
                                    _this._adaptor._call("GetDefaultViewSettings").done(function (options) {
                                        _this.initializeObjectViewer(options.snapshotType, options.numberOfObjectsPerType);
                                    });
                                    _this.updateSearchVisibility();
                                }
                            }
                        });
                    });
                    this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null);
                    document.getElementById("snapshotViewContainer").focus();
                    this._refGraphDirection = ManagedMemoryAnalyzer.RefGraphDirection.Backward;
                    this._adaptor._call("ChangeGraphDirection", this._refGraphDirection);
                    this.updateRefGraphDirectionUIElements(false);
                    this._canJustMyCode = false;
                    this._canCollapseSmallObjects = false;
                    this._canHideUndeterminedTypes = false;
                    this._justMyCode = false;
                    this._collapseSmallObjects = false;
                    this._hideUndeterminedTypes = false;
                    this._isAggregatedCallStackExpandRoot = true;
                    this._setFilterPlaceholderCallback = this.showFilterPlaceholder.bind(this);
                    this.diffCompleteEventAsync = this.diffCompleteEventAsync.bind(this);
                    this.pathToKeyContextConversionRequestEventAsync = this.pathToKeyContextConversionRequestEventAsync.bind(this);
                    document.getElementById("typesObjectsEmptyMessage").innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesObjectsEmptyMessage");
                    document.getElementById("allocationStackEmptyMessage").innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationStackEmptyMessage");
                    document.getElementById("allocationStackEmptyMessageDiv").style.display = "none";
                    this._adaptor.addEventListener("diffComplete", this.diffCompleteEventAsync);
                    this._adaptor.addEventListener("pathToKeyContextConversionRequest", this.pathToKeyContextConversionRequestEventAsync);
                    this._adaptor.addEventListener("heapViewBroadcastEvent", function (eventArgs) {
                        switch (eventArgs.Type) {
                            case ManagedMemoryAnalyzer.HeapViewBroadcastEventType.VIEW_FILTER_CHANGED:
                                _this._adaptor._call("GetDefaultViewSettings").done(function (options) {
                                    var myViewHasBeenUpdated = (_this._justMyCode === options.justMyCode || options.justMyCode === undefined) &&
                                        (_this._collapseSmallObjects === options.collapseSmallObjects || options.collapseSmallObjects === undefined) &&
                                        (_this._hideUndeterminedTypes === options.hideUndeterminedTypes || options.hideUndeterminedTypes === undefined);
                                    if (!myViewHasBeenUpdated) {
                                        _this._justMyCode = _this.getOption(_this._justMyCode, options.justMyCode);
                                        _this._collapseSmallObjects = _this.getOption(_this._collapseSmallObjects, options.collapseSmallObjects);
                                        _this._hideUndeterminedTypes = _this.getOption(_this._hideUndeterminedTypes, options.hideUndeterminedTypes);
                                        _this.applyViewFilter();
                                    }
                                });
                                break;
                        }
                    });
                    this._adaptor._call("DiffSnapshotId").done(function (id) {
                        var isInDiff = false;
                        if (id) {
                            _this._activeDropDownName = id;
                            isInDiff = true;
                        }
                        _this._adaptor._call("IsObjectInspectionAvailable").done(function (isObjectInspectionAvailable) {
                            _this._isObjectInspectionAvailable = isObjectInspectionAvailable;
                            var windowWidth = document.body.clientWidth;
                            if (!windowWidth || windowWidth < 425) {
                                windowWidth = 425;
                            }
                            var tagColumnWidth = MemoryAnalyzerViewer.TAG_COLUMN_RATIO * windowWidth;
                            _this.TAG_COLUMN_WIDTH = tagColumnWidth < MemoryAnalyzerViewer.MAX_TAG_COLUMN_WIDTH ? tagColumnWidth : MemoryAnalyzerViewer.MAX_TAG_COLUMN_WIDTH;
                            var numericColumnWidth = MemoryAnalyzerViewer.NUMERIC_COLUMN_RATIO * windowWidth;
                            _this.NUMERIC_COLUMN_WIDTH = numericColumnWidth < MemoryAnalyzerViewer.MAX_NUMERIC_COLUMN_WIDTH ? numericColumnWidth : MemoryAnalyzerViewer.MAX_NUMERIC_COLUMN_WIDTH;
                            _this.initializeTypeColumns(isInDiff);
                            _this.initializeReferenceGraphColumns(isInDiff);
                            _this.initializeInstanceColumns(isObjectInspectionAvailable);
                            _this.initializeCallstackColumns();
                            _this.initializeAggCallstackColumns(isInDiff, _this.TAG_COLUMN_WIDTH, _this.NUMERIC_COLUMN_WIDTH, _this.TAG_COLUMN_WIDTH);
                            _this.initializeAllocationListColumns(_this.TAG_COLUMN_WIDTH, _this.NUMERIC_COLUMN_WIDTH, _this.TAG_COLUMN_WIDTH);
                            _this.initializeContextMenus();
                            _this.initializeUIElementsAsync();
                            _this.refreshUIAsync();
                        });
                    });
                }
                MemoryAnalyzerViewer.copySelectedRowToClipboard = function (menuId, menuItem, targetId) {
                    if (MemoryAnalyzerViewer.dataForClipboard)
                        window.clipboardData.setData('Text', MemoryAnalyzerViewer.dataForClipboard);
                };
                MemoryAnalyzerViewer.prototype.IsDebuggingNativeMemory = function () {
                    return this._debugNativeMemory;
                };
                MemoryAnalyzerViewer.AttachAriaDescriptionToFirstColumnHeader = function (gridViewer) {
                    var columnHeaders = gridViewer.getElement().getElementsByClassName("grid-header-column");
                    if (columnHeaders.length > 0) {
                        columnHeaders[0].setAttribute("aria-describedby", "typesObjectsEmptyMessage");
                    }
                };
                MemoryAnalyzerViewer.prototype.ContainsCustomNativeHeap = function () {
                    return this._containsCustomNativeHeap;
                };
                MemoryAnalyzerViewer.prototype.diffCompleteEventAsync = function (eventArgs) {
                    if (eventArgs.Type === ManagedMemoryAnalyzer.DiffResult.SUCCESS) {
                        this._adaptor.removeEventListener("diffCompleteEvent", this.diffCompleteEventAsync);
                        window.location.reload();
                    }
                    else {
                        this._diffDropDown.disabled = false;
                    }
                };
                MemoryAnalyzerViewer.prototype.pathToKeyContextConversionRequestEventAsync = function (eventArgs) {
                    if (this._aggregatedCallStacksViewer !== null) {
                        this._aggregatedCallStacksViewer.ConversionToKeyContextRequest(eventArgs.RequestedPath, eventArgs.ConversionRequestType);
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeViewSettingsMenu = function () {
                    var _this = this;
                    var menuItems = new Array();
                    menuItems.push({
                        id: "menuJustMyCode",
                        callback: function () { _this.toggleJustMyCodeAsync(); },
                        label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewSettingsJustMyCodeMenuItem"),
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.checkbox,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () { return !_this._canJustMyCode; },
                        disabled: function () { return !_this._canJustMyCode; },
                        checked: function () { return _this._justMyCode; },
                        cssClass: null,
                        submenu: null
                    });
                    menuItems.push({
                        id: "menuCollapseSmallObjects",
                        callback: function () { _this.toggleCollapseSmallObjectsAsync(); },
                        label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewSettingsCollapseSmallObjectsMenuItem"),
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.checkbox,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () { return !_this._canCollapseSmallObjects; },
                        disabled: function () { return !_this._canCollapseSmallObjects; },
                        checked: function () { return _this._collapseSmallObjects; },
                        cssClass: null,
                        submenu: null
                    });
                    menuItems.push({
                        id: "menuHideUndeterminedTypes",
                        callback: function () { _this.toggleHideUndeterminedTypesAsync(); },
                        label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewSettingsHideUnresolvedAllocationsMenuItem"),
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.checkbox,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () { return !_this._canHideUndeterminedTypes; },
                        disabled: function () { return !_this._canHideUndeterminedTypes; },
                        checked: function () { return _this._hideUndeterminedTypes; },
                        cssClass: null,
                        submenu: null
                    });
                    this._viewSettingsMenu = Microsoft.Plugin.ContextMenu.create(menuItems);
                };
                MemoryAnalyzerViewer.prototype.toggleJustMyCodeAsync = function () {
                    if (this._viewSettingsState["JustMyCode"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        this._justMyCode = !this._justMyCode;
                        this.applyViewFilter();
                    }
                };
                MemoryAnalyzerViewer.prototype.toggleCollapseSmallObjectsAsync = function () {
                    if (this._viewSettingsState["CollapseSmallObjects"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        this._collapseSmallObjects = !this._collapseSmallObjects;
                        this.applyViewFilter();
                    }
                };
                MemoryAnalyzerViewer.prototype.toggleHideUndeterminedTypesAsync = function () {
                    if (this._viewSettingsState["HideUndeterminedTypes"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        this._hideUndeterminedTypes = !this._hideUndeterminedTypes;
                        this.applyViewFilter();
                    }
                };
                MemoryAnalyzerViewer.prototype.applyViewFilter = function () {
                    var _this = this;
                    this._typesViewer.setDirty(true);
                    this._objectsViewer.setDirty(true);
                    var justMyCode, collapseSmallObjects, hideUndeterminedTypes;
                    if (this._viewSettingsState["JustMyCode"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        justMyCode = this._justMyCode;
                    }
                    if (this._viewSettingsState["CollapseSmallObjects"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        collapseSmallObjects = this._collapseSmallObjects;
                    }
                    if (this._viewSettingsState["HideUndeterminedTypes"] === ManagedMemoryAnalyzer.FeatureState.Enabled) {
                        hideUndeterminedTypes = this._hideUndeterminedTypes;
                    }
                    this._adaptor._call("ApplyViewFilter", justMyCode, collapseSmallObjects, hideUndeterminedTypes).done(function () {
                        _this.updateViewFilter();
                        _this._typesViewer.resetView();
                        _this._objectsViewer.resetView();
                    });
                };
                MemoryAnalyzerViewer.prototype.updateViewFilter = function () {
                    var viewSettingsDiv = document.getElementById("viewSettingsDiv");
                    if (this._justMyCode || this._collapseSmallObjects || this._hideUndeterminedTypes) {
                        viewSettingsDiv.classList.add("ViewSettingsEnabled");
                        var activeSettings = new Array();
                        if (this._justMyCode) {
                            activeSettings.push(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NotificationBarJMCEnabled"));
                        }
                        if (this._collapseSmallObjects) {
                            activeSettings.push(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NotificationBarCollapseSmallObjectsEnabled"));
                        }
                        if (this._hideUndeterminedTypes) {
                            activeSettings.push(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NotificationBarHideUnresolvedAllocationsEnabled"));
                        }
                        var tooltipText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NotificationBarMessage", activeSettings.join(", "));
                        document.getElementById("viewSettingsHelpText").innerHTML = tooltipText;
                        viewSettingsDiv.onmouseover = (function () { return Microsoft.Plugin.Tooltip.show(tooltipText); });
                        viewSettingsDiv.onmouseleave = (function () { return Microsoft.Plugin.Tooltip.dismiss(); });
                    }
                    else {
                        viewSettingsDiv.classList.remove("ViewSettingsEnabled");
                        viewSettingsDiv.onmouseover = null;
                    }
                };
                MemoryAnalyzerViewer.prototype.updateNotificationBar = function () {
                    if (!this._notificationBar) {
                        return;
                    }
                    if (this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView && !this._isObjectInspectionAvailable) {
                        this._notificationBar.style.display = "";
                        this._notificationBarMessage.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NotificationBarStaleMessage");
                    }
                    else if (this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView && this._heapStatusMessage) {
                        this._notificationBar.style.display = "";
                        this._notificationBarMessage.innerText = this._heapStatusMessage;
                    }
                    else {
                        this._notificationBar.style.display = "none";
                    }
                    if (this._splitter) {
                        this._splitter.update();
                    }
                };
                MemoryAnalyzerViewer.prototype.updateSearchVisibility = function () {
                    this._filterDomElement.style.display = ((this._viewType == ManagedMemoryAnalyzer.ViewType.ObjectsView) &&
                        (!this._isObjectInspectionAvailable || this._heapStatusMessage !== undefined)) ? "none" : "";
                };
                MemoryAnalyzerViewer.prototype.initializeContextMenus = function () {
                    this.initializeViewSettingsMenu();
                    this._gridContextMenuOptions = new Array();
                    for (var menu = 0; menu <= ManagedMemoryAnalyzer.ContextMenuType.Last; menu++) {
                        var menuItems = new Array();
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.Copy] = {
                            id: "menuItem0" + menu,
                            callback: MemoryAnalyzerViewer.copySelectedRowToClipboard,
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuCopy"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: "vs-image-menu-copy-enabled",
                            iconDisabled: "vs-image-menu-copy-disabled",
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyCtrlC"),
                            hidden: function () { return false; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.Separator1] = {
                            id: "menuItem1" + menu,
                            callback: function () { },
                            label: null,
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.separator,
                            iconEnabled: null,
                            iconDisabled: null,
                            accessKey: null,
                            hidden: function () { return true; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch] = {
                            id: "menuItem2" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuAddWatch"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: "vs-mma-watch",
                            iconDisabled: "vs-mma-watch",
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyShiftAltF9"),
                            hidden: function () { return true; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances] = {
                            id: "menuItem3" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuViewInstances"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: "vs-mma-inspect",
                            iconDisabled: "vs-mma-inspect",
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyEnter"),
                            hidden: function () { return true; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch] = {
                            id: "menuItem4" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuQuickWatch"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: "vs-mma-watch",
                            iconDisabled: "vs-mma-watch",
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyShiftF9"),
                            hidden: function () { return true; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.Separator2] = {
                            id: "menuItem5" + menu,
                            callback: function () { },
                            label: null,
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.separator,
                            iconEnabled: null,
                            iconDisabled: null,
                            accessKey: null,
                            hidden: function () { return false; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition] = {
                            id: "menuItem6" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuGoToDefinition"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: null,
                            iconDisabled: null,
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyF12"),
                            hidden: function () { return false; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences] = {
                            id: "menuItem7" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuFindAllReferences"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: null,
                            iconDisabled: null,
                            accessKey: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AccessKeyShiftF12"),
                            hidden: function () { return false; },
                            disabled: function () { return false; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        menuItems[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource] = {
                            id: "menuItem8" + menu,
                            callback: function () { },
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuGotoSource"),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command,
                            iconEnabled: null,
                            iconDisabled: null,
                            accessKey: null,
                            hidden: function () { return true; },
                            disabled: function () { return true; },
                            checked: function () { return false; },
                            cssClass: null,
                            submenu: null
                        };
                        this._gridContextMenuOptions[menu] = menuItems;
                    }
                };
                MemoryAnalyzerViewer.prototype.updateGeneralCaption = function (bAddCustomHeapName) {
                    var _this = this;
                    this._adaptor._call("ProcessName").done(function (pname) {
                        var headerLabel;
                        if (pname) {
                            var splitPosition = pname.indexOf(':');
                            pname = splitPosition > 0 ? pname.substr(0, splitPosition - 1) : pname;
                            if (!_this._debugNativeMemory) {
                                headerLabel = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ManagedMemoryLabelWithProcessName", pname);
                            }
                            else {
                                headerLabel = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NativeMemoryLabelWithProcessName", pname);
                            }
                        }
                        else {
                            if (!_this._debugNativeMemory) {
                                headerLabel = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ManagedMemoryLabel");
                            }
                            else {
                                headerLabel = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NativeMemoryLabel");
                            }
                        }
                        headerLabel = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(headerLabel);
                        if (bAddCustomHeapName) {
                            _this._adaptor._call("GetCurrentNativeAllocatorHeap").done(function (curHeapAllocatorInfo) {
                                var customHeapNameDisplay = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CustomHeapNameDisplay", curHeapAllocatorInfo.heapName);
                                headerLabel = headerLabel + " - " + customHeapNameDisplay;
                                this.setHeaderFunction(headerLabel);
                            });
                        }
                        else {
                            _this.setHeaderFunction(headerLabel);
                        }
                    });
                };
                MemoryAnalyzerViewer.prototype.setHeaderFunction = function (label) {
                    var viewGeneralCaption = document.getElementById("viewGeneralCaptionDiv");
                    var viewGeneralCaptionContainerDiv = document.getElementById("viewGeneralCaptionDiv");
                    viewGeneralCaption.innerHTML = MemoryAnalyzer.FormattingHelpers.forceHtmlRendering(label);
                    document.getElementById("snapshotViewContainer").setAttribute("aria-label", label);
                    if (viewGeneralCaptionContainerDiv.scrollWidth > viewGeneralCaptionContainerDiv.offsetWidth) {
                        viewGeneralCaption.title = label;
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeUIElementsAsync = function () {
                    var _this = this;
                    this._adaptor._call("GetSnapshotId").done(function (result) {
                        _this._snapshotId = result;
                        _this._filterDomElement = document.getElementById("filterInput");
                        var searchFilterDiv = document.getElementById("searchFilterDiv");
                        searchFilterDiv.onmouseover = function () {
                            var content;
                            if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                                content = _this._isObjectInspectionAvailable ?
                                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ObjectsFilterTooltipEnabled") :
                                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ObjectsFilterTooltipDisabled");
                            }
                            else if (_this._viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                                content = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggregatedStackViewSearchToolTip");
                            }
                            else {
                                content = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesFilterTooltip");
                            }
                            var config = {
                                content: content,
                                delay: MemoryAnalyzerViewer.TooltipDelay,
                                duration: MemoryAnalyzerViewer.TooltipDuration,
                            };
                            Microsoft.Plugin.Tooltip.show(config);
                        };
                        searchFilterDiv.onmouseleave = (function () { return Microsoft.Plugin.Tooltip.dismiss(); });
                        _this.showFilterPlaceholder();
                        document.getElementById("diffDropDownCaption").innerHTML = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CompareToCaption"));
                        _this.updateGeneralCaption(false);
                        _this._filterDomElement.onkeypress = function (e) {
                            if (_this._filterDomElement.value) {
                                _this._filterDomElement.placeholder = "";
                            }
                            if (e.keyCode === Common.KeyCodes.ENTER) {
                                var view = _this.getActiveView();
                                view.setFilterAsync(_this._filterDomElement.value);
                                view.focus(0);
                            }
                            else if (e.keyCode === Common.KeyCodes.ESCAPE) {
                                _this._filterDomElement.value = "";
                                _this.getActiveView().setFilterAsync("");
                                _this.showFilterPlaceholder();
                            }
                        };
                        document.getElementById("typesObjectsEmptyMessage").onkeypress = function (e) {
                            if (e.keyCode === Common.KeyCodes.ESCAPE) {
                                if (_this._filterDomElement.value !== "") {
                                    _this._filterDomElement.value = "";
                                    _this.showFilterPlaceholder();
                                    var viewer = _this.getActiveView();
                                    viewer.setFilterAsync("");
                                    _this._filterDomElement.focus();
                                }
                                else if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                                    _this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null);
                                }
                            }
                        };
                        _this._filterDomElement.oninput = function (e) {
                            if (_this._filterDomElement.value === "" && _this._filterDomElement.placeholder === "") {
                                _this.getActiveView().setFilterAsync(_this._filterDomElement.value);
                                _this.showFilterPlaceholder();
                            }
                        };
                        _this._viewSettingsDiv = document.getElementById("viewSettingsDiv");
                        var viewSettingsClick = function () {
                            _this._viewSettingsMenuClicked = true;
                            setTimeout(function () {
                                _this.showViewSettingsContextMenu();
                            }, 0);
                        };
                        _this._viewSettingsDiv.onmousedown = function () { _this._viewSettingsDiv.onmouseup = viewSettingsClick; };
                        _this._viewSettingsDiv.onmouseleave = function () { _this._viewSettingsDiv.onmouseup = null; };
                        _this._viewSettingsDiv.addEventListener("keyup", function (e) {
                            if ((e.keyCode === Common.KeyCodes.ENTER) ||
                                (e.keyCode === Common.KeyCodes.F10 && e.shiftKey) ||
                                (e.keyCode === Common.KeyCodes.MENU)) {
                                _this.showViewSettingsContextMenu();
                                return false;
                            }
                            return true;
                        });
                        _this._notificationBar = document.getElementById("notificationBar");
                        _this._notificationBarMessage = document.getElementById("notificationBarMessage");
                        _this._diffDropDown = document.getElementById("diffDropDown");
                        _this._nativeHeapAggregationType = NativeHeapAllocationsStackAggregationType.Bottom;
                        _this._aggregationToggle = _this.createAggregationDirectionToggle();
                        _this._diffDropDown.onchange = function (e) {
                            if (_this._diffDropDown.selectedIndex > 0) {
                                if (_this._diffDropDown.value === "Browse") {
                                    _this._adaptor._call("Browse").done(function (result) {
                                        if (result && result !== _this._activeDropDownName) {
                                            _this.diffAgainstAsync(result);
                                        }
                                        else {
                                            _this.refreshDropDownAsync();
                                        }
                                    });
                                }
                                else {
                                    _this.diffAgainstAsync(_this._diffDropDown.value);
                                }
                            }
                            else if (_this._diffDropDown.selectedIndex === 0) {
                                _this._activeDropDownName = "";
                                _this._adaptor._call("CompareWithNone").done(function () {
                                    window.location.reload();
                                });
                            }
                        };
                        _this._diffDropDown.onmouseenter = function (e) {
                            _this._diffDropDownHasMouseFocus = true;
                            _this.refreshDropDownAsync();
                        };
                        _this._diffDropDown.onmouseleave = function (e) {
                            _this._diffDropDownHasMouseFocus = false;
                        };
                        _this._diffDropDown.onfocusin = function (e) {
                            if (!_this._diffDropDownHasMouseFocus) {
                                _this.refreshDropDownAsync();
                            }
                        };
                        _this.refreshDropDownAsync();
                    });
                };
                Object.defineProperty(MemoryAnalyzerViewer.prototype, "nativeHeapAllocationsAggregationType", {
                    get: function () { return this._nativeHeapAggregationType; },
                    set: function (v) {
                        if (this._nativeHeapAggregationType !== v) {
                            this._nativeHeapAggregationType = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                MemoryAnalyzerViewer.prototype.createAggregationDirectionToggle = function () {
                    var _this = this;
                    return new AggregationDirectionToggle(function () {
                        return _this.nativeHeapAllocationsAggregationType;
                    }, function (v) {
                        _this.nativeHeapAllocationsAggregationType = v;
                        if (_this._aggregationToggle !== null) {
                            _this._aggregationToggle.onPropertyChanged("nativeHeapAllocationsAggregationType");
                            _this.setViewType(ManagedMemoryAnalyzer.ViewType.AggregatedStacksView, "Stacks View");
                        }
                    }, "nativeHeapAllocationsAggregationType");
                };
                MemoryAnalyzerViewer.prototype.showViewSettingsContextMenu = function () {
                    var rect = this._viewSettingsDiv.getBoundingClientRect();
                    if (this._viewSettingsMenu) {
                        this._viewSettingsMenu.show(rect.left, rect.bottom);
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeTypeColumns = function (isInDiff) {
                    var name = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Type"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeTooltip"), this.TAG_COLUMN_WIDTH, true, this._columnInfoSortLabels);
                    var count = new Common.Controls.Grid.ColumnInfo("Count", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Count"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CountTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var size = new Common.Controls.Grid.ColumnInfo("TotalSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    if (isInDiff) {
                        var countDiff = new Common.Controls.Grid.ColumnInfo("CountDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CountDiff"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CountDiffTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        var sizeDiff = new Common.Controls.Grid.ColumnInfo("TotalSizeDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSizeDiff"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSizeDiffTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    }
                    if (this._debugNativeMemory) {
                        if (isInDiff) {
                            var newAllocations = new Common.Controls.Grid.ColumnInfo("NewAllocationCount", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NewAllocationCount"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NewAllocationCountToolTip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                            this._typeColumns = [name, countDiff, sizeDiff, newAllocations, count, size];
                            this._countColumnIndex = 4;
                        }
                        else {
                            this._typeColumns = [name, count, size];
                            this._countColumnIndex = 1;
                        }
                    }
                    else {
                        var retained = new Common.Controls.Grid.ColumnInfo("RetainedSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        if (isInDiff) {
                            var retainedDiff = new Common.Controls.Grid.ColumnInfo("RetainedSizeDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeDiff"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeDiffTooltip"), this.NUMERIC_COLUMN_WIDTH + 11, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                            this._typeColumns = [name, countDiff, sizeDiff, retainedDiff, count, size, retained];
                            this._countColumnIndex = 4;
                        }
                        else {
                            this._typeColumns = [name, count, size, retained];
                            this._countColumnIndex = 1;
                        }
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeReferenceGraphColumns = function (isInDiff) {
                    var _this = this;
                    var objectBackwardName = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Instance"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceTooltip"), this.TAG_COLUMN_WIDTH, false, null);
                    objectBackwardName.fixed = true;
                    var objectForwardName = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Instance"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceTooltip"), this.TAG_COLUMN_WIDTH, false, null);
                    objectForwardName.getHeaderCellContents = function () { return _this.drawForwardReferenceGraphHeaderCell("Instance"); };
                    var objectForwardSize = new Common.Controls.Grid.ColumnInfo("TotalSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var objectForwardRetainedSize = new Common.Controls.Grid.ColumnInfo("RetainedSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceRetainedSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var typeBackwardName = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Type"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeTooltip"), this.TAG_COLUMN_WIDTH, false, null);
                    var typeBackwardCount = new Common.Controls.Grid.ColumnInfo("RetainedCount", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountColumn"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountColumnTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var typeForwardName = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Type"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeTooltip"), this.TAG_COLUMN_WIDTH, false, null);
                    typeForwardName.getHeaderCellContents = function () { return _this.drawForwardReferenceGraphHeaderCell("Type"); };
                    var typeForwardCount = new Common.Controls.Grid.ColumnInfo("RefCount", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountColumn"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountColumnTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var typeForwardSize = new Common.Controls.Grid.ColumnInfo("TotalSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var typeForwardRetainedSize = new Common.Controls.Grid.ColumnInfo("RetainedSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    if (isInDiff) {
                        var typeBackwardCountDiff = new Common.Controls.Grid.ColumnInfo("RetainedCountDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountDiffColumn"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountDiffColumnTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        var typeForwardCountDiff = new Common.Controls.Grid.ColumnInfo("RefCountDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountDiffColumn"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypeRefGraphRetainedCountDiffColumnTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        var typeForwardSizeDiff = new Common.Controls.Grid.ColumnInfo("TotalSizeDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSizeDiff"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TotalSizeDiffTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        var typeForwardRetainedSizeDiff = new Common.Controls.Grid.ColumnInfo("RetainedSizeDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeDiff"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSizeDiffTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        this._typeBackwardRefGraphColumns = [typeBackwardName, typeBackwardCountDiff, typeBackwardCount];
                        this._typeForwardRefGraphColumns = [typeForwardName, typeForwardCountDiff, typeForwardSizeDiff, typeForwardRetainedSizeDiff, typeForwardCount, typeForwardSize, typeForwardRetainedSize];
                        this._objectBackwardRefGraphColumns = [objectBackwardName];
                        this._objectForwardRefGraphColumns = [objectForwardName, objectForwardSize, objectForwardRetainedSize];
                    }
                    else {
                        this._typeBackwardRefGraphColumns = [typeBackwardName, typeBackwardCount];
                        this._typeForwardRefGraphColumns = [typeForwardName, typeForwardCount, typeForwardSize, typeForwardRetainedSize];
                        this._objectBackwardRefGraphColumns = [objectBackwardName];
                        this._objectForwardRefGraphColumns = [objectForwardName, objectForwardSize, objectForwardRetainedSize];
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeInstanceColumns = function (showValueColumn) {
                    var name = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Instance"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels);
                    var size = new Common.Controls.Grid.ColumnInfo("TotalSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var retainedSize = new Common.Controls.Grid.ColumnInfo("RetainedSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("RetainedSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceRetainedSizeTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    if (showValueColumn) {
                        var value = new Common.Controls.Grid.ColumnInfo("Value", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Value"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ValueTooltip"), this.TAG_COLUMN_WIDTH, false, null);
                        this._instanceColumns = [name, value, size, retainedSize];
                    }
                    else {
                        this._instanceColumns = [name, size, retainedSize];
                    }
                    if (this._debugNativeMemory) {
                        var retainedSizeColIndex = this._instanceColumns.length - 1;
                        this._instanceColumns.splice(retainedSizeColIndex, 1, new Common.Controls.Grid.ColumnInfo("ObjAge", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceAgeInMilliSeconds"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstanceAgeInMilliSecondsTooltip"), this.NUMERIC_COLUMN_WIDTH, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc"));
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeCallstackColumns = function () {
                    var indicator = new Common.Controls.Grid.ColumnInfo("SpecialIndication", "", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SpecialIndication"), this.INDICATOR_COLUMN_WIDTH, false, null);
                    var name = new Common.Controls.Grid.ColumnInfo("TagName", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationCallStackName"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackFrames"), this.STACKFRAME_COLUMN_WIDTH, false, null);
                    var language = new Common.Controls.Grid.ColumnInfo("Language", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationCallStackLanguage"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("FrameLanguage"), this.LANG_COLUMN_WIDTH, false, null);
                    this._callStackColumns = [indicator, name, language];
                };
                MemoryAnalyzerViewer.prototype.initializeAggCallstackColumns = function (isInDiff, identifierWidth, dataWidth, moduleWidth) {
                    var identifier = new Common.Controls.Grid.ColumnInfo("Identifier", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Identifier"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("IdentifierTooltip"), identifierWidth, true, this._columnInfoSortLabels);
                    var count = new Common.Controls.Grid.ColumnInfo("StackViewCount", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewCount"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewCountTooltip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var size = new Common.Controls.Grid.ColumnInfo("StackViewTotalSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewTotalSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewSizeTooltip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var moduleName = new Common.Controls.Grid.ColumnInfo("Module", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("Module"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ModuleTooltip"), moduleWidth, true, this._columnInfoSortLabels);
                    if (isInDiff) {
                        var countDiff = new Common.Controls.Grid.ColumnInfo("StackViewCountDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewDiffCount"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewDiffCountTooltip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        var sizeDiff = new Common.Controls.Grid.ColumnInfo("StackViewTotalSizeDiff", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewDiffSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StackViewDiffSizeTooltip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                        this._aggregatedCallStacksColumns = [identifier, countDiff, sizeDiff, count, size, moduleName];
                    }
                    else {
                        this._aggregatedCallStacksColumns = [identifier, count, size, moduleName];
                    }
                };
                MemoryAnalyzerViewer.prototype.initializeAllocationListColumns = function (identifierWidth, dataWidth, moduleWidth) {
                    var identifier = new Common.Controls.Grid.ColumnInfo("AllocationListIdentifier", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListIdentifier"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("IdentifierTooltip"), identifierWidth, true, this._columnInfoSortLabels);
                    var instance = new Common.Controls.Grid.ColumnInfo("AllocationListInstance", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListInstance"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListInstanceTooltip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var type = new Common.Controls.Grid.ColumnInfo("AllocationListType", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListType"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListTypeTooltip"), moduleWidth, true, this._columnInfoSortLabels);
                    var size = new Common.Controls.Grid.ColumnInfo("AllocationListSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListSize"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListSizeToolTip"), dataWidth, true, this._columnInfoSortLabels, null, function () { return "rightAlignedColumn"; }, null, "desc");
                    var moduleName = new Common.Controls.Grid.ColumnInfo("AllocationListModule", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListModule"), ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationListModuleTooltip"), moduleWidth, true, this._columnInfoSortLabels);
                    this._allocationListColumns = [identifier, instance, type, size, moduleName];
                };
                MemoryAnalyzerViewer.prototype.drawForwardReferenceGraphHeaderCell = function (columnTitleResourceName) {
                    var cellElement = document.createElement("div");
                    cellElement.classList.add("title");
                    cellElement.classList.add("indented-title");
                    cellElement.classList.add("icon-grid");
                    if (this._justMyCode || this._collapseSmallObjects) {
                        var icon = document.createElement('div');
                        icon.innerHTML = document.getElementById("IconTemplate").innerHTML;
                        ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("icon", icon).classList.add("NotificationIcon");
                        icon.children[0].classList.add("icon-information");
                        icon.children[0].style.msGridColumn = "2";
                        icon.children[0].title = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ReferencesViewNoViewMessage");
                        cellElement.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(columnTitleResourceName) + icon.innerHTML;
                    }
                    else {
                        cellElement.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(columnTitleResourceName);
                    }
                    return cellElement;
                };
                MemoryAnalyzerViewer.prototype.diffAgainstAsync = function (diffName, hideWarning) {
                    var _this = this;
                    if (hideWarning === void 0) { hideWarning = false; }
                    this._diffDropDown.disabled = true;
                    this._adaptor._call("SetViewModeBeforeDiff", this._viewType);
                    this._adaptor._call("StartManagedMemoryAnalysisAndDiff", diffName).done(function (result) {
                        if (!result) {
                            _this._diffDropDown.disabled = false;
                        }
                        else {
                            document.getElementById("diffProgress").style.display = "inline-block";
                            _this._diffDropDown.disabled = true;
                        }
                    });
                };
                MemoryAnalyzerViewer.prototype.refreshUIAsync = function () {
                    var _this = this;
                    if (this._typesViewer)
                        this._typesViewer = null;
                    if (this._splitter)
                        this._splitter.dispose();
                    var div = document.querySelector("#managedHeapTypesViewerContainer");
                    while (div.firstChild) {
                        div.removeChild(div.firstChild);
                    }
                    if (this._typesDataSource) {
                        this._typesDataSource.flushCache();
                        this._typesDataSource = null;
                    }
                    if (this._objectsDataSource) {
                        this._objectsDataSource.flushCache();
                        this._objectsDataSource = null;
                    }
                    if (this._callStackDataSource) {
                        this._callStackDataSource.flushCache();
                        this._callStackDataSource = null;
                    }
                    if (this._aggregatedCallStacksDataSource) {
                        this._aggregatedCallStacksDataSource.flushCache();
                        this._aggregatedCallStacksDataSource = null;
                    }
                    if (this._allocationListDataSource) {
                        this._allocationListDataSource.flushCache();
                        this._allocationListDataSource = null;
                    }
                    this._typesDataSource = new Common.Controls.DynamicGrid.ProxyArray(this._adaptor, "TypeSummaries", MemoryAnalyzerViewer.ProxyArrayCacheSize);
                    this._objectsDataSource = new HeapViewer.ProxyArrayWithAsyncPayload(this._adaptor, "ObjectSummaries", MemoryAnalyzerViewer.ProxyArrayCacheSize);
                    if (this._debugNativeMemory) {
                        var RETAINEDSIZE_COLUMN_INDEX = 3;
                        var NUMERIC_COLUMN_WIDTH = 150;
                        this._callStackDataSource = new Common.Controls.DynamicGrid.ProxyArray(this._adaptor, "StackSummaries", MemoryAnalyzerViewer.ProxyArrayCacheSize);
                        this._aggregatedCallStacksDataSource = new HeapViewer.ProxyArrayWithAsyncPayload(this._adaptor, "AggStackSummaries", MemoryAnalyzerViewer.ProxyArrayCacheSize);
                        this._allocationListDataSource = new HeapViewer.ProxyArrayWithAsyncPayload(this._adaptor, "AllocationListSummaries", MemoryAnalyzerViewer.ProxyArrayCacheSize);
                    }
                    this._adaptor._call("GetDefaultViewSettings").done(function (options) {
                        _this._snapshotType = options.snapshotType;
                        _this.setRefGraphDirectionAsync(_this._refGraphDirection, function () {
                            _this._typesDataSource.init(function () {
                                _this.initializeTypeViewer(options.snapshotType, options.sortColumn);
                                _this.initializeObjectViewer(options.snapshotType, options.numberOfObjectsPerType);
                                _this._canJustMyCode = _this._viewSettingsState["JustMyCode"] === ManagedMemoryAnalyzer.FeatureState.Enabled;
                                if (_this._canJustMyCode) {
                                    _this._justMyCode = options.justMyCode;
                                }
                                _this._canCollapseSmallObjects = _this._viewSettingsState["CollapseSmallObjects"] === ManagedMemoryAnalyzer.FeatureState.Enabled;
                                if (_this._canCollapseSmallObjects) {
                                    _this._collapseSmallObjects = options.collapseSmallObjects;
                                }
                                _this._canHideUndeterminedTypes = _this._viewSettingsState["HideUndeterminedTypes"] === ManagedMemoryAnalyzer.FeatureState.Enabled;
                                if (_this._canHideUndeterminedTypes) {
                                    _this._hideUndeterminedTypes = options.hideUndeterminedTypes;
                                }
                                _this.updateViewFilter();
                                _this.updateNotificationBar();
                                _this._splitter = new HeapViewer.HorizontalSplitter(document.getElementById("splitter"), 0.6, function () {
                                    if (_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                                        _this._typesViewer.scheduleUpdate();
                                        _this._typeRefsViewer.scheduleUpdate();
                                    }
                                    else if (_this._viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                                        _this._aggregatedCallStacksViewer.scheduleUpdate();
                                        if (_this._allocationListViewer) {
                                            _this._allocationListViewer.scheduleUpdate();
                                        }
                                    }
                                    else {
                                        _this._objectsViewer.scheduleUpdate();
                                        _this._refsViewer.scheduleUpdate();
                                        if (_this._callStackViewer && _this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                                            _this._callStackViewer.scheduleUpdate();
                                        }
                                    }
                                });
                                if (_this._snapshotType === ManagedMemoryAnalyzer.SnapshotType.LIVE_NATIVE || _this._debugNativeMemory) {
                                    _this._splitter.snapToContent(document.getElementById("managedHeapViewerRefGraphNoData"));
                                }
                                if (options.initialViewMode === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                                    _this.setViewType(ManagedMemoryAnalyzer.ViewType.AggregatedStacksView, null);
                                }
                            });
                        });
                    });
                    this.showSamplingIconAsync().done(function () {
                        return _this.showHeapStatusMessageAsync();
                    });
                };
                MemoryAnalyzerViewer.prototype.initializeTypeViewer = function (snapshotType, sortColumn) {
                    var _this = this;
                    if (this._typesViewer) {
                        while (this._typesViewer.rootElement.hasChildNodes()) {
                            this._typesViewer.rootElement.removeChild(this._typesViewer.rootElement.firstChild);
                        }
                    }
                    this._typesViewer = new MemoryAnalyzerTypesGridViewer(document.querySelector("#managedHeapTypesViewerContainer"), function (visible) {
                        if (_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                            if (visible === true) {
                                var messageDiv = document.getElementById("typesObjectsEmptyMessageDiv");
                                var messageElement = document.getElementById("typesObjectsEmptyMessage");
                                messageElement.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesObjectsEmptyMessage");
                                if (messageDiv.style.display !== "") {
                                    messageDiv.style.display = "";
                                    messageElement.focus();
                                }
                                MemoryAnalyzerViewer.AttachAriaDescriptionToFirstColumnHeader(MemoryAnalyzerViewer.instance._typesViewer);
                            }
                            else {
                                document.getElementById("typesObjectsEmptyMessageDiv").style.display = "none";
                            }
                        }
                    }, this._typesDataSource, this._gridContextMenuOptions[ManagedMemoryAnalyzer.ContextMenuType.Types], this._typeColumns, sortColumn, function (showTypeRefGraph) {
                        if (_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                            if (showTypeRefGraph) {
                                _this._typeRefsViewer.refreshSortingOrder(function () {
                                    _this._typeRefsViewer.refresh();
                                    _this._typeRefsViewer.expandRoot();
                                });
                            }
                            _this.updateRefGraphDirectionUIElements(showTypeRefGraph);
                            _this._typeRefsViewer.showGraph(showTypeRefGraph);
                        }
                    }, function (disableRefGraph) {
                        if (disableRefGraph) {
                            var refGraphHeader = document.getElementById("refGraphHeader");
                            var refGraphNoData = document.querySelector("#managedHeapViewerRefGraphNoData");
                            var managedHeapViewerForwardRefGraphContainer = document.querySelector("#managedHeapViewerForwardRefGraphContainer");
                            var managedHeapViewerBackwardRefGraphContainer = document.querySelector("#managedHeapViewerBackwardRefGraphContainer");
                            var managedHeapViewerForwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerForwardTypeRefGraphContainer");
                            var managedHeapViewerBackwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerBackwardTypeRefGraphContainer");
                            refGraphHeader.style.display = "none";
                            refGraphNoData.style.display = "none";
                            if (managedHeapViewerForwardRefGraphContainer) {
                                managedHeapViewerForwardRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerBackwardRefGraphContainer) {
                                managedHeapViewerBackwardRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerForwardTypeRefGraphContainer) {
                                managedHeapViewerForwardTypeRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerBackwardTypeRefGraphContainer) {
                                managedHeapViewerBackwardTypeRefGraphContainer.style.display = "none";
                            }
                        }
                    }, function (path, rowData, typeName) {
                        _this._objectsViewer.setCurrentTypeAsync(rowData.Tag);
                        _this.setViewType(ManagedMemoryAnalyzer.ViewType.ObjectsView, typeName);
                    }, this._setFilterPlaceholderCallback, snapshotType);
                };
                MemoryAnalyzerViewer.prototype.initializeObjectViewer = function (snapshotType, maxObjectsCount) {
                    var _this = this;
                    if (this._objectsViewer) {
                        while (this._objectsViewer.rootElement.hasChildNodes()) {
                            this._objectsViewer.rootElement.removeChild(this._objectsViewer.rootElement.firstChild);
                        }
                    }
                    this._objectsViewer = new HeapViewer.MemoryAnalyzerObjectsGridViewer(document.getElementById("managedHeapObjectsViewerContainer"), function (visible) {
                        if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                            if (visible === true) {
                                var messageDiv = document.getElementById("typesObjectsEmptyMessageDiv");
                                var messageElement = document.getElementById("typesObjectsEmptyMessage");
                                messageElement.innerText = _this._debugNativeMemory ?
                                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NativeTypesObjectsEmptyMessage") :
                                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesObjectsEmptyMessage");
                                if (messageDiv.style.display !== "") {
                                    messageDiv.style.display = "";
                                    messageElement.focus();
                                }
                                MemoryAnalyzerViewer.AttachAriaDescriptionToFirstColumnHeader(MemoryAnalyzerViewer.instance._objectsViewer);
                            }
                            else {
                                document.getElementById("typesObjectsEmptyMessageDiv").style.display = "none";
                                if (_this._debugNativeMemory && _this._objectsViewer) {
                                    if (_this._objectsViewer.getSelectedRowIndex() == -1) {
                                        _this._objectsViewer.setSelectedRowIndex(0);
                                    }
                                    _this._objectsViewer.activateRow(_this._objectsViewer.getSelectedRowIndex());
                                }
                            }
                        }
                    }, this._setFilterPlaceholderCallback, this._objectsDataSource, this._gridContextMenuOptions[ManagedMemoryAnalyzer.ContextMenuType.Objects], this._instanceColumns, function (showRefGraph) {
                        if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                            if (showRefGraph) {
                                _this._refsViewer.refresh();
                                _this._refsViewer.expandRoot();
                            }
                            _this.updateRefGraphDirectionUIElements(showRefGraph);
                            _this._refsViewer.showGraph(showRefGraph);
                        }
                    }, function (showStackFrames, objectTag) {
                        var refGraphHeader = document.getElementById("refGraphHeader");
                        var refGraphNoData = document.querySelector("#managedHeapViewerRefGraphNoData");
                        var managedHeapViewerForwardRefGraphContainer = document.querySelector("#managedHeapViewerForwardRefGraphContainer");
                        var managedHeapViewerBackwardRefGraphContainer = document.querySelector("#managedHeapViewerBackwardRefGraphContainer");
                        var managedHeapViewerForwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerForwardTypeRefGraphContainer");
                        var managedHeapViewerBackwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerBackwardTypeRefGraphContainer");
                        var nativeAllocationListContainer = document.getElementById("nativeAllocationListContainer");
                        var stackHeader = document.getElementById("stackHeader");
                        var stackHeaderContent = document.getElementById("StackHeaderContent");
                        var nativeStackViewerContainer = document.getElementById("nativeStackViewerContainer");
                        if (!_this._debugNativeMemory) {
                            stackHeader.style.display = "none";
                            nativeStackViewerContainer.style.display = "none";
                        }
                        else {
                            if (!showStackFrames) {
                                stackHeader.style.display = "none";
                                nativeStackViewerContainer.style.display = "none";
                                refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("DisplayStackView");
                            }
                            else {
                                refGraphNoData.innerHTML = "";
                                refGraphNoData.style.display = "none";
                                refGraphHeader.style.display = "none";
                                if (managedHeapViewerForwardRefGraphContainer) {
                                    managedHeapViewerForwardRefGraphContainer.style.display = "none";
                                }
                                if (managedHeapViewerBackwardRefGraphContainer) {
                                    managedHeapViewerBackwardRefGraphContainer.style.display = "none";
                                }
                                if (managedHeapViewerForwardTypeRefGraphContainer) {
                                    managedHeapViewerForwardTypeRefGraphContainer.style.display = "none";
                                }
                                if (managedHeapViewerBackwardTypeRefGraphContainer) {
                                    managedHeapViewerBackwardTypeRefGraphContainer.style.display = "none";
                                }
                                if (nativeAllocationListContainer) {
                                    nativeAllocationListContainer.style.display = "none";
                                }
                                stackHeader.style.display = "block";
                                stackHeaderContent.title = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationCallStack");
                                stackHeaderContent.text = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationCallStack");
                                stackHeaderContent.className = "enabled";
                                nativeStackViewerContainer.style.display = "";
                                if (!_this._callStackViewer) {
                                    _this._callStackViewer = new MemoryAnalyzerCallStackGridViewer(document.querySelector("#nativeStackViewerContainer"), function (showEmptyMessage) {
                                        if (showEmptyMessage) {
                                            stackHeader.style.display = "none";
                                            nativeStackViewerContainer.style.display = "none";
                                            document.getElementById("allocationStackEmptyMessageDiv").style.display = "block";
                                        }
                                        else {
                                            document.getElementById("allocationStackEmptyMessageDiv").style.display = "none";
                                        }
                                    }, _this._setFilterPlaceholderCallback, _this._callStackDataSource, _this._gridContextMenuOptions[ManagedMemoryAnalyzer.ContextMenuType.AllocationCallStack], _this._callStackColumns, snapshotType);
                                }
                                else {
                                    _this._callStackViewer.resetView();
                                }
                            }
                        }
                    }, maxObjectsCount);
                };
                MemoryAnalyzerViewer.prototype.InitializeAggregatedCallStacksViewer = function () {
                    var _this = this;
                    if (this._debugNativeMemory) {
                        if (!this._aggregatedCallStacksViewer) {
                            this._aggregatedCallStacksViewer = new MemoryAnalyzerAggregatedCallStackGridViewer(document.getElementById("aggregatedCallStacksViewerContainer"), function (visible) {
                                if (_this._viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                                    document.querySelector("#typesObjectsEmptyMessageDiv").style.display = (visible === true) ? "block" : "none";
                                    if (visible !== true) {
                                        MemoryAnalyzerViewer.AttachAriaDescriptionToFirstColumnHeader(MemoryAnalyzerViewer.instance._aggregatedCallStacksViewer);
                                    }
                                }
                                if (_this._isAggregatedCallStackExpandRoot) {
                                    _this._aggregatedCallStacksViewer.expandRoot();
                                    _this._isAggregatedCallStackExpandRoot = false;
                                }
                            }, this._setFilterPlaceholderCallback, this._aggregatedCallStacksDataSource, this._gridContextMenuOptions[ManagedMemoryAnalyzer.ContextMenuType.AggregatedCallStacks], this._aggregatedCallStacksColumns, this._aggregationToggle, function (showStackFrames) { _this.InitializeAllocationListViewer(showStackFrames); });
                        }
                        else {
                            this._aggregatedCallStacksViewer.setAggregateStackType();
                        }
                    }
                    else {
                        this._aggregatedCallStacksViewer = null;
                    }
                };
                MemoryAnalyzerViewer.prototype.InitializeAllocationListViewer = function (showAllocationList) {
                    var refGraphHeader = document.getElementById("refGraphHeader");
                    var refGraphNoData = document.querySelector("#managedHeapViewerRefGraphNoData");
                    var managedHeapViewerForwardRefGraphContainer = document.querySelector("#managedHeapViewerForwardRefGraphContainer");
                    var managedHeapViewerBackwardRefGraphContainer = document.querySelector("#managedHeapViewerBackwardRefGraphContainer");
                    var managedHeapViewerForwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerForwardTypeRefGraphContainer");
                    var managedHeapViewerBackwardTypeRefGraphContainer = document.querySelector("#managedHeapViewerBackwardTypeRefGraphContainer");
                    var stackHeader = document.getElementById("stackHeader");
                    var stackHeaderContent = document.getElementById("StackHeaderContent");
                    var nativeStackViewerContainer = document.getElementById("nativeStackViewerContainer");
                    var nativeAllocationListContainer = document.getElementById("nativeAllocationListContainer");
                    if (!this._debugNativeMemory) {
                        stackHeader.style.display = "none";
                        nativeAllocationListContainer.style.display = "none";
                    }
                    else {
                        if (!showAllocationList) {
                            stackHeader.style.display = "none";
                            nativeAllocationListContainer.style.display = "none";
                            refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SelectIdentifierForAllocationList");
                        }
                        else {
                            refGraphNoData.innerHTML = "";
                            refGraphNoData.style.display = "none";
                            refGraphHeader.style.display = "none";
                            if (managedHeapViewerForwardRefGraphContainer) {
                                managedHeapViewerForwardRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerBackwardRefGraphContainer) {
                                managedHeapViewerBackwardRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerForwardTypeRefGraphContainer) {
                                managedHeapViewerForwardTypeRefGraphContainer.style.display = "none";
                            }
                            if (managedHeapViewerBackwardTypeRefGraphContainer) {
                                managedHeapViewerBackwardTypeRefGraphContainer.style.display = "none";
                            }
                            if (nativeStackViewerContainer) {
                                nativeStackViewerContainer.style.display = "none";
                            }
                            stackHeader.style.display = "block";
                            stackHeaderContent.title = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationList");
                            stackHeaderContent.text = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationList");
                            stackHeaderContent.className = "enabled";
                            nativeAllocationListContainer.style.display = "";
                            if (!this._allocationListViewer) {
                                this._allocationListViewer = new MemoryAnalyzerAllocationListGridViewer(document.querySelector("#nativeAllocationListContainer"), function (visible) {
                                    document.getElementById("allocationStackEmptyMessageDiv").style.display = (visible === true) ? "block" : "none";
                                }, this._setFilterPlaceholderCallback, this._allocationListDataSource, this._gridContextMenuOptions[ManagedMemoryAnalyzer.ContextMenuType.AllocationCallStack], this._allocationListColumns);
                            }
                            else {
                                this._allocationListViewer.resetView();
                            }
                        }
                    }
                };
                MemoryAnalyzerViewer.prototype.refreshDropDownAsync = function () {
                    var _this = this;
                    if (!this._diffDropDown || this._diffDropDown.disabled) {
                        return;
                    }
                    this._adaptor._call("OtherActiveMemoryAnalysisInstanceNames").done(function (result) {
                        _this._diffDropDownTitleElement = new Option(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SelectDefault"), "0");
                        _this._diffDropDown.options.length = 0;
                        _this._diffDropDown.add(_this._diffDropDownTitleElement);
                        var index = 0;
                        for (var key in result) {
                            if (result.hasOwnProperty(key)) {
                                var optionText = (MemoryAnalyzer.FormattingHelpers.getNativeDigitLocaleString(MemoryAnalyzer.FormattingHelpers.trimLongString(result[key])));
                                _this._diffDropDown.add(new Option(optionText, key));
                                if (_this._activeDropDownName === key)
                                    index = _this._diffDropDown.options.length - 1;
                            }
                        }
                        if (!_this._debugNativeMemory && _this._snapshotType !== undefined && _this._snapshotType !== ManagedMemoryAnalyzer.SnapshotType.LIVE_MANAGED && _this._snapshotType !== ManagedMemoryAnalyzer.SnapshotType.LIVE_NATIVE) {
                            _this._diffDropDown.add(new Option(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SelectBrowse"), "Browse"));
                        }
                        if (_this._activeDropDownName) {
                            _this._diffDropDownTitleElement.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SelectDefaultNone");
                            if (_this._diffDropDown.classList.contains("SelectIsDefault"))
                                _this._diffDropDown.classList.remove("SelectIsDefault");
                        }
                        else {
                            if (!_this._diffDropDown.classList.contains("SelectIsDefault"))
                                _this._diffDropDown.classList.add("SelectIsDefault");
                        }
                        _this._diffDropDown.selectedIndex = index;
                    });
                };
                MemoryAnalyzerViewer.prototype.showSamplingIconAsync = function () {
                    var _this = this;
                    return this._adaptor._call("IsSamplingEnabled").then(function (result) {
                        if (result) {
                            var icon = document.createElement('div');
                            icon.innerHTML = document.getElementById("IconTemplate").innerHTML;
                            ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("icon", icon).classList.add("NotificationIcon");
                            ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("container", icon).classList.add("SamplingIcon");
                            if (!_this._countColumnIndex || _this._typeColumns[_this._countColumnIndex].index !== "Count") {
                                throw Error("incorrect column");
                            }
                            var countColumn = _this._typeColumns[_this._countColumnIndex];
                            countColumn.hasHTMLContent = true;
                            countColumn.text += icon.innerHTML;
                            countColumn.tooltip = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SamplingEnabledTooltip");
                            countColumn = _this.getTypeRefGraphColumns()[1];
                            if (countColumn.index !== "RetainedCount" && countColumn.index !== "RefCount" && countColumn.index !== "RetainedCountDiff" && countColumn.index !== "RefCountDiff") {
                                throw Error("incorrect column");
                            }
                            countColumn.hasHTMLContent = true;
                            countColumn.text += icon.innerHTML;
                            countColumn.tooltip = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SamplingEnabledTooltip");
                        }
                    });
                };
                MemoryAnalyzerViewer.prototype.showHeapStatusMessageAsync = function () {
                    var _this = this;
                    return this._adaptor._call("GetHeapStatusMessage").then(function (result) {
                        if (result) {
                            _this._heapStatusMessage = result;
                            _this.updateSearchVisibility();
                            _this.updateNotificationBar();
                        }
                    });
                };
                MemoryAnalyzerViewer.prototype.setViewType = function (inspectionType, title) {
                    var viewerDomElement = [];
                    viewerDomElement[ManagedMemoryAnalyzer.ViewType.TypesView] = document.getElementById("managedHeapTypesViewerContainer");
                    viewerDomElement[ManagedMemoryAnalyzer.ViewType.ObjectsView] = document.getElementById("managedHeapObjectsViewerContainer");
                    viewerDomElement[ManagedMemoryAnalyzer.ViewType.AggregatedStacksView] = document.querySelector("#aggregatedCallStacksViewerContainer");
                    var viewSettings = document.getElementById("viewSettingsDiv");
                    var diffDropDown = document.getElementById("diffDropDownDiv");
                    var refGraphNoData = document.getElementById("managedHeapViewerRefGraphNoData");
                    var stackHeader = document.getElementById("stackHeader");
                    var nativeStackViewerContainer = document.getElementById("nativeStackViewerContainer");
                    var nativeAllocationListContainer = document.getElementById("nativeAllocationListContainer");
                    var generalCaption = document.getElementById("viewGeneralCaptionDiv");
                    var aggregateTypeToggleButtons = document.getElementById("toggleButtonDiv");
                    var allocationStackEmptyMessage = document.getElementById("allocationStackEmptyMessageDiv");
                    refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(inspectionType === ManagedMemoryAnalyzer.ViewType.TypesView ? "TypeRefGraphNoData" : "ObjectRefGraphNoData");
                    stackHeader.style.display = "none";
                    nativeStackViewerContainer.style.display = "none";
                    nativeAllocationListContainer.style.display = "none";
                    aggregateTypeToggleButtons.style.display = "none";
                    allocationStackEmptyMessage.style.display = "none";
                    if (this._debugNativeMemory) {
                        if (inspectionType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                            refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GotoInstancesView");
                        }
                        else if (inspectionType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                            refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("DisplayStackView");
                        }
                        else {
                            refGraphNoData.innerHTML = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SelectIdentifierToShowAllocations", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewModeTypesView"));
                        }
                        if (inspectionType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                            this._splitter.snapToContent(refGraphNoData);
                        }
                        else {
                            this._splitter.unsnapFromContent();
                        }
                    }
                    this.refreshCustomNativeHeaps(inspectionType, title);
                    if (inspectionType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.TypesView].style.display = "";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.ObjectsView].style.display = "none";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.AggregatedStacksView].style.display = "none";
                        diffDropDown.style.display = viewSettings.style.display = "";
                        generalCaption.style.display = "";
                        this.refreshAggregatedStacksView(inspectionType, title);
                        if (this._objectsViewer) {
                            this._objectsViewer.tryToCloseDataTip(true);
                            this._objectsViewer.showRefGraph(false);
                            this._objectsViewer.resetView();
                            this._objectsViewer.clearFilter();
                        }
                        if (this._aggregatedCallStacksViewer) {
                            this._aggregatedCallStacksViewer.tryToCloseDataTip(true);
                            this._aggregatedCallStacksViewer.showRefGraph(false);
                            this._aggregatedCallStacksViewer.clearFilter();
                            this._isAggregatedCallStackExpandRoot = true;
                        }
                        if (this._typesViewer) {
                            this._typesViewer.showRefGraph(false);
                            this._typesViewer.resetFilter();
                            this._typesViewer.clearCurrentSelection();
                            this._typesViewer.scheduleUpdate();
                        }
                    }
                    else if (inspectionType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.TypesView].style.display = "none";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.ObjectsView].style.display = "";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.AggregatedStacksView].style.display = "none";
                        diffDropDown.style.display = viewSettings.style.display = "none";
                        generalCaption.style.display = "none";
                        this.refreshAggregatedStacksView(inspectionType, title);
                        if (this._typesViewer) {
                            this._typesViewer.showRefGraph(false);
                        }
                        if (this._objectsViewer) {
                            this._objectsViewer.showRefGraph(false);
                            this._objectsViewer.resetFilter();
                            this._objectsViewer.scheduleUpdate();
                            this._objectsViewer.getElement().setAttribute("aria-label", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstancesOfHeader", title));
                        }
                        if (this._aggregatedCallStacksViewer) {
                            this._aggregatedCallStacksViewer.tryToCloseDataTip(true);
                            this._aggregatedCallStacksViewer.showRefGraph(false);
                            this._aggregatedCallStacksViewer.clearFilter();
                            this._isAggregatedCallStackExpandRoot = true;
                        }
                    }
                    else {
                        this.InitializeAggregatedCallStacksViewer();
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.TypesView].style.display = "none";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.ObjectsView].style.display = "none";
                        viewerDomElement[ManagedMemoryAnalyzer.ViewType.AggregatedStacksView].style.display = "";
                        generalCaption.style.display = "";
                        diffDropDown.style.display = viewSettings.style.display = "";
                        this.refreshAggregatedStacksView(inspectionType, title);
                        if (this._typesViewer) {
                            this._typesViewer.showRefGraph(false);
                        }
                        if (this._objectsViewer) {
                            this._objectsViewer.tryToCloseDataTip(true);
                            this._objectsViewer.showRefGraph(false);
                            this._objectsViewer.resetView();
                            this._objectsViewer.clearFilter();
                        }
                        if (this._aggregatedCallStacksViewer) {
                            this._aggregatedCallStacksViewer.resetView();
                            this._aggregatedCallStacksViewer.showRefGraph(false);
                            this._aggregatedCallStacksViewer.clearFilter();
                            this._aggregatedCallStacksViewer.clearCurrentSelection();
                            this._aggregatedCallStacksViewer.scheduleUpdate();
                        }
                    }
                    this._viewType = inspectionType;
                    if (this._filterDomElement) {
                        this.showFilterPlaceholder();
                        this.updateSearchVisibility();
                    }
                    this.updateBackButton(title);
                    this.updateNotificationBar();
                };
                MemoryAnalyzerViewer.prototype.showFilterPlaceholder = function () {
                    var placeHolderString;
                    if (this._viewType == ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                        placeHolderString = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstancesFilter"));
                    }
                    else if (this._viewType == ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                        placeHolderString = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggregatedStackViewSearchCaption"));
                    }
                    else {
                        placeHolderString = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesFilter"));
                    }
                    this._filterDomElement.placeholder = placeHolderString;
                };
                MemoryAnalyzerViewer.prototype.refreshAggregatedStacksView = function (viewType, title) {
                    var _this = this;
                    var viewModeDropDown = document.getElementById("viewModeDropDownDiv");
                    var viewDropDownCaption = document.querySelector("#viewModeCaption");
                    var viewDropDown = document.querySelector("#viewModeDropDown");
                    if (viewType === ManagedMemoryAnalyzer.ViewType.TypesView || viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                        this._adaptor._call("GetAggregatedStackUIState").done(function (result) {
                            if (result === 0) {
                                viewDropDown.disabled = viewDropDown.hidden = true;
                                viewModeDropDown.style.display = viewDropDownCaption.style.display = "none";
                                return;
                            }
                            else {
                                viewModeDropDown.style.display = viewDropDownCaption.style.display = "";
                                viewDropDown.disabled = viewDropDown.hidden = false;
                                viewDropDownCaption.innerHTML = MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewMode"));
                                if (viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                                    var aggregateTypeToggleButtons = document.getElementById("toggleButtonDiv");
                                    aggregateTypeToggleButtons.style.display = "";
                                }
                                viewDropDown.options.length = 0;
                                if (viewType == ManagedMemoryAnalyzer.ViewType.TypesView) {
                                    viewDropDown.add(new Option(MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewModeTypesView")), "TypesView", true, true));
                                    viewDropDown.add(new Option(MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewModeStackView")), "StacksView", false, false));
                                }
                                else {
                                    viewDropDown.add(new Option(MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewModeTypesView")), "TypesView", false, false));
                                    viewDropDown.add(new Option(MemoryAnalyzer.FormattingHelpers.forceNonBreakingSpaces(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewModeStackView")), "StacksView", true, true));
                                }
                                viewDropDown.onchange = function (e) {
                                    if (viewDropDown.selectedIndex !== 0) {
                                        _this.setViewType(ManagedMemoryAnalyzer.ViewType.AggregatedStacksView, "Stack View");
                                    }
                                    else if (viewDropDown.selectedIndex === 0) {
                                        _this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null);
                                    }
                                };
                            }
                        });
                    }
                    else {
                        viewDropDown.disabled = viewDropDown.hidden = true;
                        viewModeDropDown.style.display = viewDropDownCaption.style.display = "none";
                    }
                };
                MemoryAnalyzerViewer.prototype.refreshCustomNativeHeaps = function (viewType, title) {
                    var selectHeapDropDown = document.getElementById("heapSelectDropDownDiv");
                    var selectHeapDropDownCombo = document.querySelector("#heapSelectDropDown");
                    if (viewType === ManagedMemoryAnalyzer.ViewType.TypesView && this.IsDebuggingNativeMemory() && this.ContainsCustomNativeHeap()) {
                        selectHeapDropDown.style.display = "inline-block";
                        selectHeapDropDownCombo.disabled = false;
                    }
                    else {
                        selectHeapDropDown.style.display = "none";
                        selectHeapDropDownCombo.disabled = true;
                    }
                    if (viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView && this.IsDebuggingNativeMemory() && this.ContainsCustomNativeHeap()) {
                        this.updateGeneralCaption(true);
                    }
                    else if (this.IsDebuggingNativeMemory() && this.ContainsCustomNativeHeap()) {
                        this.updateGeneralCaption(false);
                    }
                    else {
                    }
                };
                MemoryAnalyzerViewer.prototype.updateBackButton = function (title) {
                    var _this = this;
                    document.getElementById("goBackDiv").style.display = (this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) ? "" : "none";
                    if (this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                        var goBackButton = document.getElementById("goBackButton");
                        goBackButton.onmousedown = function () { goBackButton.onmouseup = function () { _this.setViewType(ManagedMemoryAnalyzer.ViewType.TypesView, null); }; };
                        goBackButton.onmouseleave = function () { goBackButton.onmouseup = null; };
                        var goBackTypeCaption = document.getElementById("goBackCaption");
                        var instancesOfText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("InstancesOfHeader", title);
                        if (this.ContainsCustomNativeHeap()) {
                            this._adaptor._call("GetCurrentNativeAllocatorHeap").done(function (curHeapAllocatorInfo) {
                                var customHeapNameDisplay = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CustomHeapNameDisplay", curHeapAllocatorInfo.heapName);
                                instancesOfText = instancesOfText + " - " + customHeapNameDisplay;
                                goBackTypeCaption.innerHTML = MemoryAnalyzer.FormattingHelpers.forceHtmlRendering(instancesOfText);
                            });
                        }
                        goBackTypeCaption.innerHTML = MemoryAnalyzer.FormattingHelpers.forceHtmlRendering(instancesOfText);
                    }
                    this._adaptor._call("RegisterIDENavigationPoint", this._viewType, this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ? ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("BackButtonType") : title);
                };
                MemoryAnalyzerViewer.prototype.setRefGraphDirectionAsync = function (direction, done) {
                    var _this = this;
                    this._refGraphDirection = direction;
                    var isForward = direction === ManagedMemoryAnalyzer.RefGraphDirection.Forward;
                    this._adaptor._call("ChangeGraphDirection", this._refGraphDirection).done(function () {
                        var refGraphDom = document.querySelector(direction === ManagedMemoryAnalyzer.RefGraphDirection.Forward ?
                            "#managedHeapViewerForwardRefGraphContainer" : "#managedHeapViewerBackwardRefGraphContainer");
                        var typeRefGraphDom = document.querySelector(direction === ManagedMemoryAnalyzer.RefGraphDirection.Forward ?
                            "#managedHeapViewerForwardTypeRefGraphContainer" : "#managedHeapViewerBackwardTypeRefGraphContainer");
                        var oppositeRefGraphDom = document.querySelector(direction === ManagedMemoryAnalyzer.RefGraphDirection.Backward ?
                            "#managedHeapViewerForwardRefGraphContainer" : "#managedHeapViewerBackwardRefGraphContainer");
                        var oppositeTypeRefGraphDom = document.querySelector(direction === ManagedMemoryAnalyzer.RefGraphDirection.Backward ?
                            "#managedHeapViewerForwardTypeRefGraphContainer" : "#managedHeapViewerBackwardTypeRefGraphContainer");
                        if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                            refGraphDom.style.display = "block";
                        }
                        else if (_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                            typeRefGraphDom.style.display = "block";
                        }
                        oppositeRefGraphDom.style.display = oppositeTypeRefGraphDom.style.display = "none";
                        var div = document.querySelector("#managedHeapViewerRefGraphNoData");
                        div.style.display = "none";
                        var refGraphIsAlreadyInCache = false;
                        if (_this._refsViewerCache[_this._refGraphDirection]) {
                            _this._refsViewer = _this._refsViewerCache[_this._refGraphDirection];
                            refGraphIsAlreadyInCache = true;
                        }
                        else {
                            var refGraphDataArray = new Common.Controls.DynamicGrid.ProxyArray(_this._adaptor, _this.getObjectRefGraphDataSource(), MemoryAnalyzerViewer.ProxyArrayCacheSize);
                            refGraphDataArray.init(function () {
                                var contextMenu = _this._gridContextMenuOptions[isForward ? ManagedMemoryAnalyzer.ContextMenuType.ForwardRefGraph : ManagedMemoryAnalyzer.ContextMenuType.BackwardRefGraph];
                                _this._refsViewerCache[_this._refGraphDirection] = _this._refsViewer = new MemoryAnalyzerRefGraphViewer(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(isForward ? "ReferencedGraphObjects" : "ReferencingGraph"), refGraphDom, refGraphDataArray, contextMenu, _this.getObjectRefGraphColumns(), _this._refGraphDirection);
                                if (_this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                                    _this.updateRefGraphDirectionUIElements(false);
                                    _this._refsViewer.showGraph(true);
                                    _this._refsViewer.focus(10);
                                    if (_this._objectsViewer) {
                                        _this._objectsViewer.reactivateCurrentRow();
                                    }
                                }
                            });
                        }
                        if (_this._typeRefsViewerCache[_this._refGraphDirection]) {
                            _this._typeRefsViewer = _this._typeRefsViewerCache[_this._refGraphDirection];
                            refGraphIsAlreadyInCache = true;
                        }
                        else {
                            var typeRefGraphDataArray = new Common.Controls.DynamicGrid.ProxyArray(_this._adaptor, _this.getTypeRefGraphDataSource(), MemoryAnalyzerViewer.ProxyArrayCacheSize);
                            typeRefGraphDataArray.init(function () {
                                var contextMenu = _this._gridContextMenuOptions[direction === ManagedMemoryAnalyzer.RefGraphDirection.Forward ?
                                    ManagedMemoryAnalyzer.ContextMenuType.ForwardTypesRefGraph :
                                    ManagedMemoryAnalyzer.ContextMenuType.BackwardTypesRefGraph];
                                _this._typeRefsViewerCache[_this._refGraphDirection] = _this._typeRefsViewer = new MemoryAnalyzerTypeRefGraphViewer(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(isForward ? "ReferencedGraphTypes" : "ReferencingGraph"), typeRefGraphDom, typeRefGraphDataArray, contextMenu, _this.getTypeRefGraphColumns(), _this._refGraphDirection);
                                if (_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView) {
                                    _this.updateRefGraphDirectionUIElements(false);
                                    _this._typeRefsViewer.showGraph(true);
                                    _this._typeRefsViewer.focus(10);
                                    if (_this._typesViewer) {
                                        _this._typesViewer.reactivateCurrentRow();
                                    }
                                }
                            });
                        }
                        var viewer = _this.getActiveView();
                        var refsViewer = _this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ? _this._typeRefsViewer :
                            _this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView ? _this._refsViewer : null;
                        if (refsViewer && refGraphIsAlreadyInCache) {
                            _this.updateRefGraphDirectionUIElements(true);
                            refsViewer.refreshSortingOrder(function () {
                                if (_this._currentSelectedIndexBeforeSwitchingGraphDirection === viewer.getSelectedRowIndex()) {
                                    refsViewer.scheduleUpdate(function () { refsViewer.focus(10); });
                                }
                                else {
                                    viewer.reactivateCurrentRow();
                                    refsViewer.focus(10);
                                }
                                _this._currentSelectedIndexBeforeSwitchingGraphDirection = viewer.getSelectedRowIndex();
                            });
                        }
                        else if (viewer) {
                            _this._currentSelectedIndexBeforeSwitchingGraphDirection = viewer.getSelectedRowIndex();
                        }
                        if (done) {
                            done();
                        }
                    });
                    return this._refGraphDirection;
                };
                MemoryAnalyzerViewer.prototype.resetCurrentSelectedIndex = function () {
                    this._currentSelectedIndexBeforeSwitchingGraphDirection = -1;
                    this.updateRefGraphDirectionUIElements(false);
                };
                MemoryAnalyzerViewer.prototype.getOption = function (option, value) {
                    return value !== undefined ? value : option;
                };
                MemoryAnalyzerViewer.prototype.updateRefGraphDirectionUIElements = function (showTabs) {
                    var _this = this;
                    var refGraphHeader = document.getElementById("refGraphHeader");
                    var referencingGraph = document.getElementById("referencingGraph");
                    var referencedGraph = document.getElementById("referencedGraph");
                    if (!showTabs) {
                        refGraphHeader.style.display = "none";
                    }
                    else {
                        var referencingGraphTooltip = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ?
                            "ReferencingGraphTypesTooltip" :
                            "ReferencingGraphObjectsTooltip");
                        var referencedGraphTooltip = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ?
                            "ReferencedGraphTypesTooltip" :
                            "ReferencedGraphObjectsTooltip");
                        refGraphHeader.style.display = "block";
                        referencingGraph.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ReferencingGraph");
                        referencingGraph.addEventListener("mouseover", function (e) {
                            var config = {
                                content: referencingGraphTooltip,
                                delay: MemoryAnalyzerViewer.TooltipDelay,
                                duration: MemoryAnalyzerViewer.TooltipDuration,
                            };
                            Microsoft.Plugin.Tooltip.show(config);
                        });
                        referencedGraph.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ?
                            "ReferencedGraphTypes" :
                            "ReferencedGraphObjects");
                        referencedGraph.addEventListener("mouseover", function (e) {
                            var config = {
                                content: referencedGraphTooltip,
                                delay: MemoryAnalyzerViewer.TooltipDelay,
                                duration: MemoryAnalyzerViewer.TooltipDuration,
                            };
                            Microsoft.Plugin.Tooltip.show(config);
                        });
                        var onactivated = function (direction) {
                            _this._adaptor._call(_this._viewType === ManagedMemoryAnalyzer.ViewType.TypesView ?
                                "OnSelectTypeRefGraph" :
                                "OnSelectObjectRefGraph", direction);
                            _this.setRefGraphDirectionAsync(direction);
                        };
                        if (this._refGraphDirection === ManagedMemoryAnalyzer.RefGraphDirection.Backward) {
                            referencingGraph.className = "disabled";
                            referencedGraph.className = "enabled";
                            referencingGraph.onclick = undefined;
                            referencedGraph.onclick = function (e) { onactivated(ManagedMemoryAnalyzer.RefGraphDirection.Forward); };
                            referencingGraph.onkeydown = undefined;
                            referencedGraph.onkeydown = function (e) {
                                if (e.keyCode === Common.KeyCodes.ENTER) {
                                    onactivated(ManagedMemoryAnalyzer.RefGraphDirection.Forward);
                                }
                            };
                        }
                        else {
                            referencingGraph.className = "enabled";
                            referencedGraph.className = "disabled";
                            referencedGraph.onclick = undefined;
                            referencingGraph.onclick = function (e) { onactivated(ManagedMemoryAnalyzer.RefGraphDirection.Backward); };
                            referencedGraph.onkeydown = undefined;
                            referencingGraph.onkeydown = function (e) {
                                if (e.keyCode === Common.KeyCodes.ENTER) {
                                    onactivated(ManagedMemoryAnalyzer.RefGraphDirection.Backward);
                                }
                            };
                        }
                    }
                };
                MemoryAnalyzerViewer.prototype.getTypeRefGraphColumns = function () {
                    return this._refGraphDirection == ManagedMemoryAnalyzer.RefGraphDirection.Forward ?
                        this._typeForwardRefGraphColumns :
                        this._typeBackwardRefGraphColumns;
                };
                MemoryAnalyzerViewer.prototype.getTypeRefGraphDataSource = function () {
                    return this._refGraphDirection == ManagedMemoryAnalyzer.RefGraphDirection.Forward ? "TypeForwardRefGraph" : "TypeRefGraph";
                };
                MemoryAnalyzerViewer.prototype.getObjectRefGraphColumns = function () {
                    return this._refGraphDirection == ManagedMemoryAnalyzer.RefGraphDirection.Forward ?
                        this._objectForwardRefGraphColumns :
                        this._objectBackwardRefGraphColumns;
                };
                MemoryAnalyzerViewer.prototype.getObjectRefGraphDataSource = function () {
                    return this._refGraphDirection == ManagedMemoryAnalyzer.RefGraphDirection.Forward ? "ForwardRefGraph" : "RefGraph";
                };
                MemoryAnalyzerViewer.prototype.getActiveView = function () {
                    if (this._viewType === ManagedMemoryAnalyzer.ViewType.ObjectsView) {
                        return this._objectsViewer;
                    }
                    else if (this._viewType === ManagedMemoryAnalyzer.ViewType.AggregatedStacksView) {
                        return this._aggregatedCallStacksViewer;
                    }
                    else {
                        return this._typesViewer;
                    }
                };
                MemoryAnalyzerViewer.ProxyArrayCacheSize = 1000;
                MemoryAnalyzerViewer.TooltipDelay = 500;
                MemoryAnalyzerViewer.TooltipDuration = 6000;
                MemoryAnalyzerViewer.MAX_TAG_COLUMN_WIDTH = 500;
                MemoryAnalyzerViewer.MAX_NUMERIC_COLUMN_WIDTH = 150;
                MemoryAnalyzerViewer.TAG_COLUMN_RATIO = 0.47;
                MemoryAnalyzerViewer.NUMERIC_COLUMN_RATIO = 0.24;
                return MemoryAnalyzerViewer;
            }());
            HeapViewer.MemoryAnalyzerViewer = MemoryAnalyzerViewer;
            var MemoryAnalyzerTypesGridViewer = (function (_super) {
                __extends(MemoryAnalyzerTypesGridViewer, _super);
                function MemoryAnalyzerTypesGridViewer(root, viewChangedCallback, dataArray, gridContextMenu, columns, sortColumn, refGraphCallback, nativeDisableRefGraph, switchToObjectsView, setFilterPlaceholderCallback, snapshotType) {
                    var _this = this;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden = gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].hidden = function () { return !_this.allowObjectsView(); };
                    if (snapshotType !== ManagedMemoryAnalyzer.SnapshotType.GC_DUMP) {
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].disabled = function () {
                            var disableMenuItem;
                            _this.checkIfBaselineOnlyTypeAsync(_this.getRowInfo(_this.getSelectedRowIndex()), function (isBaselineOnlyType) {
                                disableMenuItem = isBaselineOnlyType;
                            });
                            return disableMenuItem;
                        };
                    }
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].callback = function () {
                        var row = _this.getRowInfo(_this.getSelectedRowIndex());
                        if (row)
                            _this.switchToObjects(row);
                    };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].callback = function () { return _this.goToDefinition(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].callback = function () { return _this.findAllReferences(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return _this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return _this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].disabled =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].disabled = function () { return _this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.Disabled; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].disabled = function () { return _this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.Disabled; };
                    _super.call(this, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("TypesGraphName"), root, viewChangedCallback, dataArray, gridContextMenu, columns, refGraphCallback, setFilterPlaceholderCallback, "TypeSummariesSetFilterAndSortOrder");
                    this._snapshotType = snapshotType;
                    this._goToDefinitionState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this._findAllReferencesState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this._defaultSortColumn = columns[columns.length - 1].index;
                    if (sortColumn) {
                        var sortColumnTitle = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(sortColumn);
                        columns.forEach(function (column) {
                            if (column.text === sortColumnTitle) {
                                _this._defaultSortColumn = column.index;
                            }
                        });
                    }
                    this.setDefaultSortOrder();
                    this.getGotoDefinitionStateAsync();
                    this.getFindAllReferencesStateAsync();
                    this._switchToObjectsViewCallback = switchToObjectsView;
                    this._nativeDisableRefGraph = nativeDisableRefGraph;
                    if (this.allowObjectsView()) {
                        this.getCanvas().addEventListener("dblclick", this.onDoubleClick.bind(this));
                    }
                    this._nativeDisableRefGraph(MemoryAnalyzerViewer.instance.IsDebuggingNativeMemory());
                }
                MemoryAnalyzerTypesGridViewer.prototype.setDefaultSortOrder = function () {
                    this.onSort([new Common.Controls.Grid.SortOrderInfo(this._defaultSortColumn, "desc")], []);
                };
                MemoryAnalyzerTypesGridViewer.prototype.getGotoDefinitionStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetGoToDefinitionState").done(function (result) {
                        _this._goToDefinitionState = result;
                    });
                };
                MemoryAnalyzerTypesGridViewer.prototype.getFindAllReferencesStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetFindAllReferencesState").done(function (result) {
                        _this._findAllReferencesState = result;
                    });
                };
                MemoryAnalyzerTypesGridViewer.prototype.goToDefinition = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        _this.adaptor()._call("GoToDefinition", tag, ManagedMemoryAnalyzer.CodeTokenCategory.Type);
                    });
                };
                MemoryAnalyzerTypesGridViewer.prototype.findAllReferences = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        _this.adaptor()._call("FindAllReferences", tag, ManagedMemoryAnalyzer.CodeTokenCategory.Type);
                    });
                };
                MemoryAnalyzerTypesGridViewer.prototype.updateMouseOverRowStyle = function (row) {
                    this.pinObjectsViewIcon(row, "SnapshotGotoObjectsIconHover", false);
                };
                MemoryAnalyzerTypesGridViewer.prototype.updateMouseOutRowStyle = function (row) {
                    this.unpinObjectsViewIcon(row, "SnapshotGotoObjectsIconHover");
                };
                MemoryAnalyzerTypesGridViewer.prototype.updateSelectedRowStyle = function (row) {
                    this.pinObjectsViewIcon(row, "SnapshotGotoObjectsIconSelection", true);
                };
                MemoryAnalyzerTypesGridViewer.prototype.updateUnselectedRowStyle = function (row) {
                    this.unpinObjectsViewIcon(row, "SnapshotGotoObjectsIconSelection");
                };
                MemoryAnalyzerTypesGridViewer.prototype.pinObjectsViewIcon = function (row, cssClass, override) {
                    var _this = this;
                    if (!this.allowObjectsView())
                        return;
                    if (!row || row.row.children.length === 0)
                        throw Error("invalid row structure");
                    var column = (row.row.children[0]);
                    if (this.isUndeterminedNativeType(column.innerText)) {
                        column.addEventListener("mouseover", function (e) {
                            var config = {
                                content: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("UnresolvedAllocationsTooltip"),
                                delay: MemoryAnalyzerViewer.TooltipDelay,
                                duration: MemoryAnalyzerViewer.TooltipDuration,
                            };
                            Microsoft.Plugin.Tooltip.show(config);
                        });
                    }
                    if (column.children.length === 0 || override) {
                        var icon;
                        var overlay;
                        if (override && column.children[0] && column.children[1]) {
                            icon = column.children[0];
                            overlay = column.children[1];
                        }
                        else {
                            var template = document.getElementById("IconTemplate");
                            icon = document.createElement('span');
                            icon.innerHTML = template.innerHTML;
                            ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("icon", icon).classList.add("ViewInstancesIcon");
                            overlay = document.createElement('span');
                        }
                        var tooltipText;
                        icon.className = cssClass;
                        overlay.className = cssClass;
                        overlay.classList.add("SnapshotGotoObjectsIconOverlay");
                        this.checkIfBaselineOnlyTypeAsync(row, function (isBaselineOnlyType) {
                            if (isBaselineOnlyType) {
                                tooltipText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ObjectNotAvailable");
                                ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("icon", icon).classList.add("SnapshotGotoObjectsIconGrayOut");
                            }
                            else {
                                tooltipText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ViewInstancesTooltip", column.textContent);
                                overlay.addEventListener("mousedown", function (e) {
                                    if (_this.isDirty())
                                        return;
                                    Microsoft.Plugin.Tooltip.dismiss();
                                    Microsoft.Plugin.ContextMenu.dismissAll();
                                    if (!e.button) {
                                        _this.switchToObjects(row);
                                    }
                                    e.stopPropagation();
                                });
                            }
                            overlay.addEventListener("mouseover", function (e) {
                                Microsoft.Plugin.Tooltip.show(tooltipText);
                            });
                            column.appendChild(icon);
                            column.appendChild(overlay);
                        });
                    }
                };
                MemoryAnalyzerTypesGridViewer.prototype.unpinObjectsViewIcon = function (row, cssClass) {
                    if (!this.allowObjectsView() || !row || row.row.children.length == 0)
                        return;
                    var column = (row.row.children[0]);
                    while (column.children[0] && column.children[0].classList.contains(cssClass)) {
                        column.removeChild(column.children[0]);
                    }
                };
                MemoryAnalyzerTypesGridViewer.prototype._onKeyDown = function (e) {
                    if (e.keyCode === Common.KeyCodes.ENTER && this.allowObjectsView() && !this.isDirty()) {
                        var rowInfo = this.getRowInfo(this.getSelectedRowIndex());
                        if (rowInfo) {
                            Microsoft.Plugin.Tooltip.dismiss();
                            this.switchToObjects(rowInfo);
                            return true;
                        }
                    }
                    else if (e.shiftKey && e.keyCode === Common.KeyCodes.F12 && this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.Enabled && this.getSelectedRowIndex() >= 0) {
                        this.findAllReferences();
                        return true;
                    }
                    else if (e.keyCode === Common.KeyCodes.F12 && this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.Enabled && this.getSelectedRowIndex() >= 0) {
                        this.goToDefinition();
                        return true;
                    }
                    return _super.prototype._onKeyDown.call(this, e);
                };
                MemoryAnalyzerTypesGridViewer.prototype.switchToObjects = function (row) {
                    var _this = this;
                    this.checkIfBaselineOnlyTypeAsync(row, function (isBaselineOnlyType) {
                        if (!isBaselineOnlyType) {
                            var dataIndex = (row.dataIndex);
                            var typeName = row.row.children[0].innerText;
                            _this._dataArray.get(dataIndex.path, function (data) {
                                _this._switchToObjectsViewCallback(dataIndex, data, typeName);
                            });
                        }
                    });
                };
                MemoryAnalyzerTypesGridViewer.prototype.activateRow = function (rowIndex) {
                    var _this = this;
                    _super.prototype.activateRow.call(this, rowIndex);
                    if (!MemoryAnalyzerViewer.instance.IsDebuggingNativeMemory()) {
                        if (rowIndex >= this.MaxRows - 1) {
                            this.showRefGraph(false);
                        }
                        else {
                            var path = this.findPathByRow(rowIndex);
                            if (path.length() != 1)
                                throw Error("invalid path");
                            this._dataArray.tryGet(path.path, function (value, needUpdate) {
                                _this.adaptor()._call("OnSelectType", value["Tag"]).done(function (showRefGraph) {
                                    _this.showRefGraph(showRefGraph);
                                });
                            }, function () {
                                setTimeout(function () {
                                    _this.showRefGraph(false);
                                    _this.activateRow(rowIndex);
                                }, 200);
                            });
                        }
                    }
                };
                MemoryAnalyzerTypesGridViewer.prototype.allowObjectsView = function () {
                    return this._snapshotType !== ManagedMemoryAnalyzer.SnapshotType.GC_DUMP;
                };
                MemoryAnalyzerTypesGridViewer.prototype.isUndeterminedNativeType = function (typeName) {
                    if (MemoryAnalyzerViewer.instance.IsDebuggingNativeMemory()) {
                        return typeName === ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("UnresolvedAllocationsString");
                    }
                    return false;
                };
                MemoryAnalyzerTypesGridViewer.prototype.checkIfBaselineOnlyTypeAsync = function (rowInfo, callback) {
                    if (rowInfo && callback) {
                        var dataIndexTreePath = (rowInfo.dataIndex);
                        this._dataArray.get(dataIndexTreePath.path, function (data) {
                            if (data["Count"]) {
                                callback(false);
                            }
                            else {
                                callback(true);
                            }
                        });
                    }
                };
                MemoryAnalyzerTypesGridViewer.prototype.onDoubleClick = function (e) {
                    var rowInfo = this.getRowInfoFromEvent(e, "." + this.options().rowClass);
                    if (rowInfo) {
                        this.switchToObjects(rowInfo);
                    }
                };
                return MemoryAnalyzerTypesGridViewer;
            }(HeapViewer.MemoryAnalyzerGridViewer));
            var MemoryAnalyzerCallStackGridViewer = (function (_super) {
                __extends(MemoryAnalyzerCallStackGridViewer, _super);
                function MemoryAnalyzerCallStackGridViewer(root, viewChangedCallback, setFilterPlaceholderCallback, dataArray, gridContextMenu, columns, snapshotType) {
                    var _this = this;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden = function () { return _this._goToSourceState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].callback = function () { return _this.goToSource(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return _this._goToSourceState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].disabled = function () { return _this._goToSourceState === ManagedMemoryAnalyzer.FeatureState.Disabled; };
                    _super.call(this, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("StacksGraphName"), root, viewChangedCallback, dataArray, gridContextMenu, columns, function (showTypeRefGraph) { }, setFilterPlaceholderCallback, "StackSummariesSetFilterAndSortOrder");
                    this._snapshotType = snapshotType;
                    this._goToSourceState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this.getGotoSourceStateAsync();
                    this.getCanvas().addEventListener("dblclick", this.onDoubleClick.bind(this));
                }
                MemoryAnalyzerCallStackGridViewer.prototype.getGotoSourceStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetGoToSourceState").done(function (result) {
                        _this._goToSourceState = result;
                    });
                };
                MemoryAnalyzerCallStackGridViewer.prototype.onDoubleClick = function (e) {
                    this.goToSource();
                };
                MemoryAnalyzerCallStackGridViewer.prototype._getAriaLabelForRow = function (rowInfo) {
                    return this.getColumnText(rowInfo.dataIndex, this.getColumns()[1], 1);
                };
                MemoryAnalyzerCallStackGridViewer.prototype.goToSource = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["TagName"];
                        _this.adaptor()._call("GotoSource", tag);
                    });
                };
                return MemoryAnalyzerCallStackGridViewer;
            }(HeapViewer.MemoryAnalyzerGridViewer));
            var MemoryAnalyzerAggregatedCallStackGridViewer = (function (_super) {
                __extends(MemoryAnalyzerAggregatedCallStackGridViewer, _super);
                function MemoryAnalyzerAggregatedCallStackGridViewer(root, viewChangedCallback, setFilterPlaceholderCallback, dataArray, gridContextMenu, columns, stackTypeAggregateDirectionToggle, allocationListCallback) {
                    var _this = this;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].callback = function () { return _this.goToSource(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].disabled = function () { return true; };
                    _super.call(this, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggStacksGraphName"), root, viewChangedCallback, dataArray, gridContextMenu, columns, function (showTypeRefGraph) { }, setFilterPlaceholderCallback, "AggStackSummariesSetFilterAndSortOrder");
                    this._goToSourceState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this._allocationListCallback = allocationListCallback;
                    this._searchString = "";
                    this._stackTypeAggregateToggle = stackTypeAggregateDirectionToggle;
                    this._unExpandedPath = [];
                    this._matchedPath = [];
                    this._dataArray = dataArray;
                    this._dataArray.registerAsyncResultCallback(function (index, value) { return _this.updateRowValueAsync(index, value); });
                    this._defaultSortColumn = columns[1].index;
                    this.setDefaultSortOrder();
                    this.adaptor()._call("SetAggregateStackType", this._stackTypeAggregateToggle.GetCurrentStackTypeAggregationToggle());
                    this.getGotoSourceStateAsync();
                    this.getCanvas().addEventListener("dblclick", this.onDoubleClick.bind(this));
                }
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.setAggregateStackType = function () {
                    this.adaptor()._call("SetAggregateStackType", this._stackTypeAggregateToggle.GetCurrentStackTypeAggregationToggle());
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.ConversionToKeyContextRequest = function (requestedpath, ConversionRequestType) {
                    var keyContext = [];
                    if (requestedpath[0] == 0) {
                        keyContext.push(1);
                    }
                    for (var i = 1; i < requestedpath.length; i++) {
                        var selectPath = requestedpath.slice(0, i);
                        var treePath = new Common.Controls.DynamicGrid.TreePath(selectPath);
                        this._dataArray.get(treePath.path, function (row, needUpdate) {
                            keyContext.push(row.ChildKeyList[requestedpath[i]]);
                        });
                    }
                    if (ConversionRequestType == ManagedMemoryAnalyzer.KeyContextConversionRequestType.AggregateStackByCaller) {
                        this.adaptor()._call("AggStackSummariesByCaller", requestedpath, keyContext);
                    }
                    else {
                        this.adaptor()._call("AllocationListSummariesByCaller", requestedpath, keyContext);
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.getGotoSourceStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetGoToSourceState").done(function (result) {
                        _this._goToSourceState = result;
                    });
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.setDefaultSortOrder = function () {
                    this.onSort([new Common.Controls.Grid.SortOrderInfo(this._defaultSortColumn, "desc")], []);
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.updateColumnAsync = function (row, value, index, columnName) {
                    var columnElt = row.children[index];
                    columnElt.innerText = value[columnName];
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.updateRowValueAsync = function (path, value) {
                    var valuepath = value.path;
                    this.ExpandIfAnyPendingRequest(path, value);
                    var rowInfo;
                    if (!valuepath) {
                        rowInfo = this.getRowInfo(path);
                    }
                    else {
                        rowInfo = this.getRowInfo(valuepath.at(0));
                    }
                    if (!rowInfo) {
                        var treePath = new Common.Controls.DynamicGrid.TreePath(path.slice(0, path.length - 1));
                        this.collapseNode(treePath);
                        this.expandNode(treePath);
                        rowInfo = this.getRowInfo(path);
                        if (!rowInfo) {
                            return;
                        }
                    }
                    rowInfo.row.SubItemsCount = value["SubItemsCount"];
                    rowInfo.row.Key = value["Key"];
                    rowInfo.row.ChildKeyList = value["ChildKeyList"];
                    if (rowInfo.row.children.length === 4) {
                        this.updateColumnAsync(rowInfo.row, value, 0, "Identifier");
                        this.updateColumnAsync(rowInfo.row, value, 1, "StackViewCount");
                        this.updateColumnAsync(rowInfo.row, value, 2, "StackViewTotalSize");
                        this.updateColumnAsync(rowInfo.row, value, 3, "Module");
                    }
                    else {
                        this.updateColumnAsync(rowInfo.row, value, 0, "Identifier");
                        this.updateColumnAsync(rowInfo.row, value, 1, "StackViewCountDiff");
                        this.updateColumnAsync(rowInfo.row, value, 2, "StackViewTotalSizeDiff");
                        this.updateColumnAsync(rowInfo.row, value, 3, "StackViewCount");
                        this.updateColumnAsync(rowInfo.row, value, 4, "StackViewTotalSize");
                        this.updateColumnAsync(rowInfo.row, value, 5, "Module");
                    }
                    if (path.length == 1 && path[0] == 0) {
                        this.markRowDirty([0]);
                        this.scheduleUpdate();
                        this.expandRoot();
                        return;
                    }
                    this.markRowDirty(path);
                    this.scheduleUpdate();
                    if (!this.isPathSame(this._unExpandedPath, path)) {
                        return;
                    }
                    var treePath = new Common.Controls.DynamicGrid.TreePath(path.slice(0, path.length - 1));
                    this.collapseNode(treePath);
                    this.expandNode(treePath);
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.isPathSame = function (first, second) {
                    if (first.length == second.length) {
                        for (var j = 0; j < first.length; j++) {
                            if (first[j] !== second[j]) {
                                return false;
                            }
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.isPathContains = function (path1, path2) {
                    var first = path1;
                    var second = path2;
                    if (path1.length > path2.length) {
                        first = path2;
                        second = path1;
                    }
                    for (var j = 0; j < first.length; j++) {
                        if (first[j] !== second[j]) {
                            return false;
                        }
                    }
                    return true;
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.ExpandIfAnyPendingRequest = function (path, row) {
                    if (this._stackTypeAggregateToggle.GetCurrentStackTypeAggregationToggle() === NativeHeapAllocationsStackAggregationType.Bottom) {
                        return;
                    }
                    if (this._matchedPath === undefined || this._matchedPath.length === 0) {
                        return;
                    }
                    if (!this.isPathContains(path, this._matchedPath)) {
                        return;
                    }
                    var localTreePath = new Common.Controls.DynamicGrid.TreePath(path);
                    var matchedTreePath = new Common.Controls.DynamicGrid.TreePath(this._matchedPath);
                    if (!this.isPathSame(path, this._matchedPath)) {
                        var expandedPaths = this.getExpandedPaths();
                        if (expandedPaths.expansionStatus(localTreePath) === -1) {
                            expandedPaths.expand(localTreePath, row.SubItemsCount);
                            this.updateCounts(row.SubItemsCount);
                            this.markRowDirty(localTreePath.path);
                        }
                        localTreePath.path.push(this._matchedPath[localTreePath.length()]);
                        this.goToSearchResult(matchedTreePath, localTreePath);
                    }
                    else {
                        this.moveToRow(matchedTreePath);
                        this.scheduleUpdate();
                        this.setSearchProgressBarState(true, 0);
                        this._matchedPath = [];
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.onDoubleClick = function (e) {
                    this.goToSource();
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.goToSource = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["TagName"];
                        _this.adaptor()._call("GotoSource", tag);
                    });
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.expandRoot = function () {
                    this.expandNode(new Common.Controls.DynamicGrid.TreePath([0]));
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.expandNode = function (treePath) {
                    var _this = this;
                    this._dataArray.get(treePath.path, function (row, needUpdate) {
                        _this.getExpandedPaths().expand(treePath, row.SubItemsCount);
                        _this.updateCounts(row.SubItemsCount);
                        _this.markRowDirty(treePath.path);
                        if (row.SubItemsCount === 1) {
                            var childPath = new Common.Controls.DynamicGrid.TreePath([]);
                            for (var j = 0; j < treePath.path.length; j++) {
                                childPath.path.push(treePath.path[j]);
                            }
                            childPath.path.push(0);
                            _this.expandNode(childPath);
                        }
                        else {
                            if (row.SubItemsCount === 0) {
                                _this._unExpandedPath = treePath.path;
                            }
                            if (needUpdate) {
                                _this.scheduleUpdate();
                            }
                        }
                    });
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.activateRow = function (rowIndex) {
                    var _this = this;
                    _super.prototype.activateRow.call(this, rowIndex);
                    var path = this.findPathByRow(rowIndex);
                    if (rowIndex >= this.MaxRows - 1) {
                        this.showRefGraph(false);
                    }
                    else {
                        this._dataArray.get(path.path, function (value, needUpdate) {
                            var allocationListCount = 0;
                            if (value !== undefined) {
                                allocationListCount = value["StackViewCount"];
                            }
                            _this.adaptor()._call("OnSelectStackFrame", path.path, allocationListCount).done(function (isOk) {
                                if (isOk) {
                                    _this.showRefGraph(false);
                                    _this._allocationListCallback(true);
                                }
                            });
                        });
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.setFilterAsync = function (filterString) {
                    var _this = this;
                    if (filterString !== this._searchString) {
                        this._searchString = filterString;
                        _super.prototype.setFilterAsync.call(this, filterString);
                    }
                    if (this._searchString !== "" && this._searchString !== undefined) {
                        this.setSearchProgressBarState(false, 0);
                        this.clearCurrentSelection();
                        this.adaptor()._call("FindNextAggregatedCallStack", this._searchString).done(function (results) {
                            if (results && results.length > 0) {
                                var correctedArray = [];
                                for (var i = 0; i < results.length; i++) {
                                    correctedArray.push(+results[i]);
                                }
                                if (_this._stackTypeAggregateToggle.GetCurrentStackTypeAggregationToggle() === NativeHeapAllocationsStackAggregationType.Top) {
                                    _this._matchedPath = correctedArray;
                                }
                                _this.goToSearchResult(new Common.Controls.DynamicGrid.TreePath(correctedArray));
                            }
                            else {
                                alert(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SearchResultNotFound"));
                            }
                        });
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.setSearchProgressBarState = function (show, progress) {
                    var filteringProgressBar = document.querySelector("#filterInputProgressBar");
                    filteringProgressBar.style.visibility = show ? "visible" : "hidden";
                    filteringProgressBar.value = progress;
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.moveToRow = function (path) {
                    if (this.getExpandedPaths()) {
                        path.externalPath = true;
                        var index = this.findRowIndexByTreePath(path);
                        this.setSelectedRowIndex(index);
                        this.getSelectedRowIntoViewCenter();
                        this.getElement().focus();
                    }
                };
                MemoryAnalyzerAggregatedCallStackGridViewer.prototype.goToSearchResult = function (treePath, localTreePath) {
                    var _this = this;
                    if (!localTreePath) {
                        var localTreePath = new Common.Controls.DynamicGrid.TreePath([]);
                        localTreePath.path.push(treePath.path[0]);
                    }
                    this._dataArray.get(localTreePath.path, function (row, needUpdate) {
                        if (row.SubItemsCount === 0 && row.Async === true && row.Key === 0 && row.StackViewCount === 0) {
                            return;
                        }
                        if (localTreePath.length() === treePath.length()) {
                            _this.moveToRow(treePath);
                            _this.scheduleUpdate();
                            _this.setSearchProgressBarState(true, 0);
                            _this._matchedPath = [];
                            return;
                        }
                        var expandedPaths = _this.getExpandedPaths();
                        if (expandedPaths.expansionStatus(localTreePath) === -1) {
                            expandedPaths.expand(localTreePath, row.SubItemsCount);
                            _this.updateCounts(row.SubItemsCount);
                            _this.markRowDirty(localTreePath.path);
                        }
                        localTreePath.path.push(treePath.path[localTreePath.length()]);
                        _this.goToSearchResult(treePath, localTreePath);
                    });
                };
                return MemoryAnalyzerAggregatedCallStackGridViewer;
            }(HeapViewer.MemoryAnalyzerGridViewer));
            var MemoryAnalyzerAllocationListGridViewer = (function (_super) {
                __extends(MemoryAnalyzerAllocationListGridViewer, _super);
                function MemoryAnalyzerAllocationListGridViewer(root, viewChangedCallback, setFilterPlaceholderCallback, dataArray, gridContextMenu, columns) {
                    var _this = this;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden = function () { return false; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].disabled = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.ViewInstances].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].callback = function () { return _this.goToSource(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return false; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].disabled = function () { return false; };
                    _super.call(this, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AllocationsGraphName"), root, viewChangedCallback, dataArray, gridContextMenu, columns, function (showTypeRefGraph) { }, setFilterPlaceholderCallback, "AllocationListSummariesSetFilterAndSortOrder");
                    this._goToSourceState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this._dataArray = dataArray;
                    this._dataArray.registerAsyncResultCallback(function (index, value) { return _this.updateAllocationRowValueAsync(index, value); });
                    this.getGotoSourceStateAsync();
                    this.getCanvas().addEventListener("dblclick", this.onDoubleClick.bind(this));
                }
                MemoryAnalyzerAllocationListGridViewer.prototype.getGotoSourceStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetGoToSourceState").done(function (result) {
                        _this._goToSourceState = result;
                    });
                };
                MemoryAnalyzerAllocationListGridViewer.prototype.onDoubleClick = function (e) {
                    this.goToSource();
                };
                MemoryAnalyzerAllocationListGridViewer.prototype.goToSource = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var functionName = value["AllocationListIdentifier"];
                        var moduleName = value["AllocationListModule"];
                        var indexFromTop = 0;
                        var stackId = 0;
                        if (dataIndex.path.length == 2) {
                            indexFromTop = dataIndex.path[1];
                            var parentDataIndex = new Common.Controls.DynamicGrid.TreePath(dataIndex.path.slice(0, 1));
                            _this._dataArray.get(parentDataIndex.path, function (parentValue) {
                                stackId = parentValue["StackIdentifier"];
                                _this.adaptor()._call("GotoSourceFromAllocationList", functionName, moduleName, stackId, indexFromTop);
                            });
                        }
                        else {
                            indexFromTop = 0;
                            stackId = value["StackIdentifier"];
                            _this.adaptor()._call("GotoSourceFromAllocationList", functionName, moduleName, stackId, indexFromTop);
                        }
                    });
                };
                MemoryAnalyzerAllocationListGridViewer.prototype.expandNode = function (treePath) {
                    var _this = this;
                    this.getValue(treePath, function (value) {
                        var stackId = value["StackIdentifier"];
                        _this.adaptor()._call("SetStackIdentifier", treePath.path[0], stackId);
                        _this._dataArray.get(treePath.path, function (row, needUpdate) {
                            _this.getExpandedPaths().expand(treePath, row.SubItemsCount);
                            _this.updateCounts(row.SubItemsCount);
                            _this.markRowDirty(treePath.path);
                            if (needUpdate) {
                                _this.scheduleUpdate();
                            }
                        });
                    });
                };
                MemoryAnalyzerAllocationListGridViewer.prototype.updateColumnAsync = function (row, value, index, columnName) {
                    var columnElt = row.children[index];
                    columnElt.innerText = value[columnName];
                };
                MemoryAnalyzerAllocationListGridViewer.prototype.updateAllocationRowValueAsync = function (path, value) {
                    var valuepath = value.path;
                    var rowInfo;
                    if (!valuepath) {
                        rowInfo = this.getRowInfo(path);
                    }
                    else {
                        rowInfo = this.getRowInfo(valuepath.at(0));
                    }
                    if (!rowInfo) {
                        return;
                    }
                    rowInfo.row.SubItemsCount = value["SubItemsCount"];
                    if (rowInfo.row.children.length === 5) {
                        this.updateColumnAsync(rowInfo.row, value, 0, "AllocationListIdentifier");
                        this.updateColumnAsync(rowInfo.row, value, 1, "AllocationListInstance");
                        this.updateColumnAsync(rowInfo.row, value, 2, "AllocationListType");
                        this.updateColumnAsync(rowInfo.row, value, 3, "AllocationListSize");
                        this.updateColumnAsync(rowInfo.row, value, 4, "AllocationListModule");
                    }
                    else {
                        this.updateColumnAsync(rowInfo.row, value, 0, "AllocationListIdentifier");
                        this.updateColumnAsync(rowInfo.row, value, 1, "AllocationListInstance");
                        this.updateColumnAsync(rowInfo.row, value, 2, "AllocationListValue");
                        this.updateColumnAsync(rowInfo.row, value, 3, "AllocationListType");
                        this.updateColumnAsync(rowInfo.row, value, 4, "AllocationListSize");
                        this.updateColumnAsync(rowInfo.row, value, 5, "AllocationListModule");
                    }
                    this.markRowDirty([0]);
                    this.scheduleUpdate();
                };
                return MemoryAnalyzerAllocationListGridViewer;
            }(HeapViewer.MemoryAnalyzerGridViewer));
            var MemoryAnalyzerTypeRefGraphViewer = (function (_super) {
                __extends(MemoryAnalyzerTypeRefGraphViewer, _super);
                function MemoryAnalyzerTypeRefGraphViewer(name, root, dataArray, gridContextMenu, columns, direction) {
                    var _this = this;
                    var options = new Common.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null);
                    options.gridName = name;
                    options.overflowColumn = true;
                    options.header = true;
                    options.focusable = true;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].callback = function () { return _this.goToDefinition(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].callback = function () { return _this.findAllReferences(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return _this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return _this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.NotAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].disabled =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].disabled = function () { return _this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.Disabled; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].disabled = function () { return _this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.Disabled; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return true; };
                    _super.call(this, dataArray, root, options);
                    this._goToDefinitionState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this._findAllReferencesState = ManagedMemoryAnalyzer.FeatureState.NotAvailable;
                    this.getGotoDefinitionStateAsync();
                    this.getFindAllReferencesStateAsync();
                    this._graphDomElement = root;
                    this._graphDirection = direction;
                    this.showGraph(false);
                    this.onSort([new Common.Controls.Grid.SortOrderInfo(columns[columns.length - 1].index, "desc")], []);
                }
                MemoryAnalyzerTypeRefGraphViewer.prototype.getGotoDefinitionStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetGoToDefinitionState").done(function (result) {
                        _this._goToDefinitionState = result;
                    });
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.getFindAllReferencesStateAsync = function () {
                    var _this = this;
                    this.adaptor()._call("GetFindAllReferencesState").done(function (result) {
                        _this._findAllReferencesState = result;
                    });
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.goToDefinition = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        var category = value["Category"];
                        _this.adaptor()._call("GoToDefinition", tag, category);
                    });
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.findAllReferences = function () {
                    var _this = this;
                    var dataIndex = this.getSelectedDataIndex();
                    this._dataArray.get(dataIndex.path, function (value) {
                        var tag = value["Tag"];
                        var category = value["Category"];
                        _this.adaptor()._call("FindAllReferences", tag, category);
                    });
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype._onKeyDown = function (e) {
                    if (e.shiftKey && e.keyCode === Common.KeyCodes.F12 && this._findAllReferencesState === ManagedMemoryAnalyzer.FeatureState.Enabled && this.getSelectedRowIndex() >= 0) {
                        this.findAllReferences();
                        return true;
                    }
                    else if (e.keyCode === Common.KeyCodes.F12 && this._goToDefinitionState === ManagedMemoryAnalyzer.FeatureState.Enabled && this.getSelectedRowIndex() >= 0) {
                        this.goToDefinition();
                        return true;
                    }
                    else if (e.keyCode === Common.KeyCodes.ARROW_LEFT) {
                        this.navigateToParentItem(e);
                        return true;
                    }
                    return _super.prototype._onKeyDown.call(this, e);
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.translateColumn = function (row, index) {
                    var retval;
                    if (!row) {
                        if (index === "TagName")
                            retval = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("LoadRowDataText");
                    }
                    else {
                        retval = row && row[index] !== undefined ? row[index] : "";
                        if ((index === "RetainedCount" || index === "RefCount" || index === "RetainedSize" || index === "Count" || index === "TotalSize")
                            && retval !== "") {
                            retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, true, false);
                        }
                        if (index.search("Diff") !== -1) {
                            if (row["RetainedCount"] !== undefined || row["RefCount"] !== undefined) {
                                retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(retval, true, true);
                            }
                            else
                                retval = "";
                        }
                    }
                    return retval;
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.translateExternalPathColumn = function (treePath, index) {
                    return index === "TagName" ?
                        ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GridLastRow", (this.getFirstLevelCount() - treePath.path[0]).toString()) :
                        "";
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.showGraph = function (show) {
                    this._graphDomElement.style.display = show ? "block" : "none";
                    if (show) {
                        this.initializeDataSource();
                        this.scheduleUpdate();
                    }
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.expandRoot = function () {
                    this.expandNode(new Common.Controls.DynamicGrid.TreePath([0]));
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.onCtrlC = function () {
                    var dataIndex = this.getSelectedDataIndex();
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        MemoryAnalyzerViewer.dataForClipboard = rowText;
                        MemoryAnalyzerViewer.copySelectedRowToClipboard(null, null, null);
                    }
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.initializeContextMenu = function (dataIndex) {
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        MemoryAnalyzerViewer.dataForClipboard = rowText;
                        return true;
                    }
                    return false;
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype._trySorting = function (sortOrder, sortColumns) {
                    var _this = this;
                    this._sortOrderIndex = sortOrder[0].index;
                    this._sortOrderOrder = sortOrder[0].order;
                    this.refreshSortingOrder(function () {
                        _this.refresh();
                        _this.expandRoot();
                    });
                    _super.prototype._trySorting.call(this, sortOrder, sortColumns);
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.refreshSortingOrder = function (next) {
                    if (next === void 0) { next = function () { }; }
                    this.adaptor()._call("TypeRefGraphSetSortOrder", this._sortOrderIndex, this._sortOrderOrder).done(function () {
                        next();
                    });
                };
                MemoryAnalyzerTypeRefGraphViewer.prototype.onSelectRow = function (rowIndex) {
                    this.adaptor()._call("OnSelectTypeRefGraph", this._graphDirection);
                };
                return MemoryAnalyzerTypeRefGraphViewer;
            }(HeapViewer.MMADynamicGridViewer));
            var MemoryAnalyzerRefGraphViewer = (function (_super) {
                __extends(MemoryAnalyzerRefGraphViewer, _super);
                function MemoryAnalyzerRefGraphViewer(name, root, dataArray, gridContextMenu, columns, direction) {
                    var _this = this;
                    if (direction === ManagedMemoryAnalyzer.RefGraphDirection.Backward) {
                        columns[0].getCellContents = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                            return _this._drawRefCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
                        };
                    }
                    var options = new Common.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null);
                    options.gridName = name;
                    options.overflowColumn = true;
                    options.focusable = true;
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator1].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].hidden =
                            gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].hidden = function () { return false; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].disabled =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].disabled = function () { return !_this._isObjectInspectionAvailable; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.Separator2].hidden =
                        gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GoToDefinition].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.FindAllReferences].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.GotoSource].hidden = function () { return true; };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.AddWatch].callback = function () { return _this.addWatch(); };
                    gridContextMenu[ManagedMemoryAnalyzer.ContextMenuItem.QuickWatch].callback = function () { return _this.quickWatch(); };
                    _super.call(this, dataArray, root, options);
                    this._graphDirection = direction;
                    this._graphDomElement = root;
                    this.showGraph(false);
                    this._graphDomElement.addEventListener("onkeydown", this._onKeyDown);
                    this.adaptor().addEventListener("DebuggerModeChanged", function (reply) { return _this.onDebuggerModeChanged(reply.NewMode, reply.OldMode); });
                    this.adaptor()._call("IsObjectInspectionAvailable").done(function (result) {
                        _this._isObjectInspectionAvailable = result;
                    });
                }
                MemoryAnalyzerRefGraphViewer.prototype.translateColumn = function (row, index) {
                    var retval;
                    if (!row) {
                        if (index === "TagName")
                            retval = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("LoadRowDataText");
                    }
                    else if (this._graphDirection === ManagedMemoryAnalyzer.RefGraphDirection.Forward) {
                        if (index === "TagName") {
                            retval = MemoryAnalyzer.FormattingHelpers.getNativeDigitLocaleString(row["TypeName"] + "    " + row["TagName"]);
                        }
                        else if (index === "HotPathState") {
                            retval = row['HotPathState'];
                        }
                        else {
                            retval = MemoryAnalyzer.FormattingHelpers.getDecimalLocaleString(_super.prototype.translateColumn.call(this, row, index), true, false);
                        }
                    }
                    else {
                        retval = MemoryAnalyzer.FormattingHelpers.getNativeDigitLocaleString(row["TypeName"] + "    " + row["TagName"]);
                    }
                    return retval;
                };
                MemoryAnalyzerRefGraphViewer.prototype.translateExternalPathColumn = function (treePath, index) {
                    return index === "TagName" ?
                        ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("GridLastRow", (this.getFirstLevelCount() - treePath.path[0]).toString()) :
                        "";
                };
                MemoryAnalyzerRefGraphViewer.prototype.showGraph = function (show) {
                    this._graphDomElement.style.display = show ? "block" : "none";
                    this.tryToCloseDataTip(true);
                    if (show) {
                        this.initializeDataSource();
                        this.scheduleUpdate();
                    }
                };
                MemoryAnalyzerRefGraphViewer.prototype.expandRoot = function () {
                    var treePath = new Common.Controls.DynamicGrid.TreePath([0]);
                    if (this._graphDirection === ManagedMemoryAnalyzer.RefGraphDirection.Forward) {
                        this.expandNode(treePath);
                    }
                    else {
                        this.expandPathToRoot(treePath, this._dataArray.dataSourceGeneration());
                    }
                };
                MemoryAnalyzerRefGraphViewer.prototype.expandPathToRoot = function (treePath, dataSourceGeneration, callback) {
                    var _this = this;
                    this.getValue(treePath, function (value, needUpdate) {
                        if (dataSourceGeneration !== _this._dataArray.dataSourceGeneration()) {
                            return;
                        }
                        if (value.IsOnPathToRoot === true) {
                            _this.expandNode(treePath);
                            var subItemsCount = value["SubItemsCount"];
                            _this.expandPathToRootHelper(treePath, 0, subItemsCount, dataSourceGeneration, callback);
                        }
                        else if (callback) {
                            callback();
                        }
                    });
                };
                MemoryAnalyzerRefGraphViewer.prototype.onDebuggerModeChanged = function (newMode, oldMode) {
                    var _this = this;
                    this.adaptor()._call("IsObjectInspectionAvailable").done(function (result) {
                        _this._isObjectInspectionAvailable = result;
                    });
                };
                MemoryAnalyzerRefGraphViewer.prototype.expandPathToRootHelper = function (treePath, i, subItemsCount, dataSourceGeneration, callback) {
                    var _this = this;
                    if (dataSourceGeneration !== this._dataArray.dataSourceGeneration()) {
                        return;
                    }
                    if (i < subItemsCount) {
                        var childTreePath = new Common.Controls.DynamicGrid.TreePath(treePath.path);
                        childTreePath.concat(new Common.Controls.DynamicGrid.TreePath([i]));
                        this.expandPathToRoot(childTreePath, dataSourceGeneration, function () {
                            if (dataSourceGeneration !== _this._dataArray.dataSourceGeneration()) {
                                return;
                            }
                            _this.expandPathToRootHelper(treePath, i + 1, dataSourceGeneration, subItemsCount);
                        });
                    }
                    else if (callback)
                        callback();
                };
                MemoryAnalyzerRefGraphViewer.prototype._drawRefCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                    var _this = this;
                    column.width = this.canvasClientWidth() - 4;
                    var cellElement = this.createElementWithClass("div", "grid-cell-ref");
                    cellElement.style.width = (column.width) + "px";
                    var value = this.getColumnText(dataIndex, column, columnOrder);
                    Common.Controls.Grid.GridControl._setTooltip(cellElement, column.hasHTMLContent ? "" : value, 65);
                    if (value) {
                        cellElement.innerText = value;
                    }
                    else {
                        cellElement.innerHTML = "&nbsp;";
                    }
                    if (columnOrder === indentIndex && level > 0) {
                        var indent = ((level * 16) - 13);
                        column.indentOffset = indent;
                        if (expandedState !== 0) {
                            var treeSign = this.createElementWithClass("div", "icon grid-tree-icon");
                            treeSign.style.left = indent + "px";
                            cellElement.appendChild(treeSign);
                            if (expandedState > 0) {
                                treeSign.classList.add("icon-tree-expanded");
                            }
                            else {
                                treeSign.classList.add("icon-tree-collapsed");
                            }
                            treeSign.addEventListener("mouseover", function (e) { _this.onTreeIconMouseOver(e); });
                            treeSign.addEventListener("mouseout", function (e) { _this.onTreeIconMouseOut(e); });
                        }
                        cellElement.style.textIndent = (level * 16) + "px";
                    }
                    return cellElement;
                };
                MemoryAnalyzerRefGraphViewer.prototype.onCtrlC = function () {
                    var dataIndex = this.getSelectedDataIndex();
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        MemoryAnalyzerViewer.dataForClipboard = rowText;
                        MemoryAnalyzerViewer.copySelectedRowToClipboard(null, null, null);
                    }
                };
                MemoryAnalyzerRefGraphViewer.prototype.initializeContextMenu = function (dataIndex) {
                    var rowText = this.getRowTextString(dataIndex);
                    if (rowText) {
                        MemoryAnalyzerViewer.dataForClipboard = rowText;
                        return true;
                    }
                    return false;
                };
                MemoryAnalyzerRefGraphViewer.prototype._onContainerResize = function (e) {
                    if (this._graphDirection === ManagedMemoryAnalyzer.RefGraphDirection.Backward) {
                        this.options().columns[0].width = this.canvasClientWidth() - 4;
                    }
                    _super.prototype._onContainerResize.call(this, e);
                };
                MemoryAnalyzerRefGraphViewer.prototype._updateViewport = function (includeNonDirtyRows) {
                    _super.prototype._updateViewport.call(this, includeNonDirtyRows);
                    if (this._graphDirection === ManagedMemoryAnalyzer.RefGraphDirection.Backward) {
                        this.widenRows(this.canvasClientWidth());
                    }
                };
                MemoryAnalyzerRefGraphViewer.prototype._trySorting = function (sortOrder, sortColumns) {
                    var _this = this;
                    this._sortOrderIndex = sortOrder[0].index;
                    this._sortOrderOrder = sortOrder[0].order;
                    this.refreshSortingOrder(function () {
                        _this.refresh();
                        _this.expandRoot();
                    });
                    _super.prototype._trySorting.call(this, sortOrder, sortColumns);
                };
                MemoryAnalyzerRefGraphViewer.prototype.refreshSortingOrder = function (next) {
                    if (next === void 0) { next = function () { }; }
                    this.adaptor()._call("ForwardRefGraphSetSortOrder", this._sortOrderIndex, this._sortOrderOrder).done(function () {
                        next();
                    });
                };
                MemoryAnalyzerRefGraphViewer.prototype.getDatatipCell = function (e, element) {
                    if (!this._isObjectInspectionAvailable) {
                        return null;
                    }
                    var rowElement = element.parentNode;
                    if (!rowElement || rowElement.children.length < 1)
                        throw Error("incorrect grid control row");
                    var valueColumnElement = rowElement.children[0];
                    if (valueColumnElement !== element)
                        return null;
                    return valueColumnElement;
                };
                MemoryAnalyzerRefGraphViewer.prototype.onSelectRow = function (rowIndex) {
                    this.adaptor()._call("OnSelectObjectRefGraph", this._graphDirection);
                };
                MemoryAnalyzerRefGraphViewer.prototype._onKeyDown = function (e) {
                    if (e.keyCode === Common.KeyCodes.ARROW_LEFT) {
                        this.navigateToParentItem(e);
                        return true;
                    }
                    if (this._isObjectInspectionAvailable) {
                        if (e.shiftKey && e.altKey && e.keyCode === Common.KeyCodes.F9) {
                            this.addWatch();
                            return true;
                        }
                        else if (e.keyCode === Common.KeyCodes.ENTER || (e.shiftKey && e.keyCode === Common.KeyCodes.F9)) {
                            this.quickWatch();
                            return true;
                        }
                    }
                    return _super.prototype._onKeyDown.call(this, e);
                };
                return MemoryAnalyzerRefGraphViewer;
            }(HeapViewer.MMADynamicGridViewer));
            (function (NativeHeapAllocationsStackAggregationType) {
                NativeHeapAllocationsStackAggregationType[NativeHeapAllocationsStackAggregationType["Top"] = 0] = "Top";
                NativeHeapAllocationsStackAggregationType[NativeHeapAllocationsStackAggregationType["Bottom"] = 1] = "Bottom";
            })(HeapViewer.NativeHeapAllocationsStackAggregationType || (HeapViewer.NativeHeapAllocationsStackAggregationType = {}));
            var NativeHeapAllocationsStackAggregationType = HeapViewer.NativeHeapAllocationsStackAggregationType;
            var AggregationDirectionToggle = (function () {
                function AggregationDirectionToggle(viewModelPropertyGetter, viewModelPropertySetter, viewModelPropertyName) {
                    this._viewModelPropertyGetter = viewModelPropertyGetter;
                    this._viewModelPropertySetter = viewModelPropertySetter;
                    this._viewModelPropertyName = viewModelPropertyName;
                    this._aggregateTopButton = document.getElementById("aggregationToggleTabTopButton");
                    this._aggregateBottomButton = document.getElementById("aggregationToggleTabBottomButton");
                    document.getElementById("aggregationToggleTabLabel").innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggregationToggleTabLabel");
                    this._aggregateTopButton.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggregationToggleTop");
                    var callerAriaLabelText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CallersToggleButtonTooltip");
                    this._aggregateTopButton.setAttribute("data-plugin-vs-tooltip", callerAriaLabelText);
                    this._aggregateTopButton.setAttribute("aria-label", callerAriaLabelText);
                    this._aggregateBottomButton.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AggregationToggleBottom");
                    var calleeAriaLabelText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CalleesToggleButtonTooltip");
                    this._aggregateBottomButton.setAttribute("data-plugin-vs-tooltip", calleeAriaLabelText);
                    this._aggregateBottomButton.setAttribute("aria-label", calleeAriaLabelText);
                    this._aggregateBottomButton.onclick = this.setAggregateBottomToggleButtonSelected.bind(this);
                    this._aggregateTopButton.onclick = this.setAggregateTopToggleButtonSelected.bind(this);
                    var toggleButtons = this.findElementsByClassName("toggleTabButtonContainer");
                    for (var buttonIndex = 0; buttonIndex < toggleButtons.length; buttonIndex++) {
                        var buttonElement = toggleButtons[buttonIndex];
                        buttonElement.onkeydown = this.onButtonElementKeyDown.bind(buttonElement);
                    }
                    this.updateUI();
                }
                AggregationDirectionToggle.prototype.GetCurrentStackTypeAggregationToggle = function () {
                    return this._viewModelPropertyGetter();
                };
                AggregationDirectionToggle.prototype.forAllSelfAndDescendants = function (root, func) {
                    var brokeAtElement = null;
                    if (!func(root)) {
                        brokeAtElement = root;
                    }
                    else {
                        if (root.children) {
                            var children = root.children;
                            var childrenLength = children.length;
                            for (var i = 0; i < childrenLength; i++) {
                                brokeAtElement = this.forAllSelfAndDescendants(children[i], func);
                                if (brokeAtElement) {
                                    break;
                                }
                            }
                        }
                    }
                    return brokeAtElement;
                };
                AggregationDirectionToggle.prototype.findElementsByClassName = function (className) {
                    var elements = [];
                    var toggleButtons = document.getElementById("toggleButtonDiv");
                    this.forAllSelfAndDescendants(toggleButtons, function (elem) {
                        if (elem.classList && elem.classList.contains(className)) {
                            elements.push(elem);
                        }
                        return true;
                    });
                    return elements;
                };
                AggregationDirectionToggle.prototype.onButtonElementKeyDown = function (e) {
                    if ((e.keyCode === Common.KeyCodes.ENTER || e.keyCode === Common.KeyCodes.SPACE) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                        e.srcElement.click();
                    }
                };
                AggregationDirectionToggle.prototype.onPropertyChanged = function (propertyName) {
                    switch (propertyName) {
                        case this._viewModelPropertyName:
                            this.updateUI();
                            break;
                    }
                };
                AggregationDirectionToggle.prototype.updateUI = function () {
                    var isTopSelected = this._viewModelPropertyGetter() === NativeHeapAllocationsStackAggregationType.Top;
                    if (isTopSelected) {
                        this._aggregateTopButton.classList.add("toggleTabSelectedButtonOutline");
                        this._aggregateBottomButton.classList.remove("toggleTabSelectedButtonOutline");
                    }
                    else if (this._viewModelPropertyGetter() === NativeHeapAllocationsStackAggregationType.Bottom) {
                        this._aggregateBottomButton.classList.add("toggleTabSelectedButtonOutline");
                        this._aggregateTopButton.classList.remove("toggleTabSelectedButtonOutline");
                    }
                    this._aggregateTopButton.setAttribute("aria-checked", isTopSelected ? "true" : "false");
                    this._aggregateBottomButton.setAttribute("aria-checked", isTopSelected ? "false" : "true");
                };
                AggregationDirectionToggle.prototype.setAggregateTopToggleButtonSelected = function () {
                    this._viewModelPropertySetter(NativeHeapAllocationsStackAggregationType.Top);
                };
                AggregationDirectionToggle.prototype.setAggregateBottomToggleButtonSelected = function () {
                    this._viewModelPropertySetter(NativeHeapAllocationsStackAggregationType.Bottom);
                };
                return AggregationDirectionToggle;
            }());
            HeapViewer.AggregationDirectionToggle = AggregationDirectionToggle;
            function determineHighContrastThemeCompatibilityProblem(adaptor) {
                var noProblem = Microsoft.Plugin.Promise.as(false);
                if (!document.body.classList.contains("IE9")) {
                    return noProblem;
                }
                var TestColor = 'rgb(31, 41, 59)';
                var testDiv = document.createElement('div');
                testDiv.style.color = TestColor;
                document.body.appendChild(testDiv);
                var color = testDiv.currentStyle.color;
                document.body.removeChild(testDiv);
                if (color !== TestColor) {
                    return adaptor._call("ShouldBypassIEChecks").then(function (result) {
                        return !result;
                    });
                }
                return noProblem;
            }
            function showHighContrastUnsupportedMessage() {
                var splash = document.createElement("div");
                splash.className = "SplashScreen";
                var message = document.createElement("div");
                message.innerHTML =
                    "<a href='http://go.microsoft.com/fwlink/p/?LinkId=331160' target='_blank'>" +
                        ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("HighContrastUnsupportedBrowserMessage") +
                        "</a>";
                splash.appendChild(message);
                document.body.appendChild(splash);
            }
            Microsoft.Plugin.addEventListener("pluginready", function () {
                var adaptor = Microsoft.Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.Debugger.MemoryAnalyzerViewModelMarshaler", {}, true);
                determineHighContrastThemeCompatibilityProblem(adaptor).done(function (wrongIEVersion) {
                    if (wrongIEVersion) {
                        showHighContrastUnsupportedMessage();
                    }
                    else {
                        MemoryAnalyzerViewer.instance = new MemoryAnalyzerViewer(adaptor);
                    }
                });
            });
        })(HeapViewer = ManagedMemoryAnalyzer.HeapViewer || (ManagedMemoryAnalyzer.HeapViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));

// SIG // Begin signature block
// SIG // MIIoOAYJKoZIhvcNAQcCoIIoKTCCKCUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // dRlcME68NZcoSVLKg7UUH6jjmWG33qWsfv0d1gBikQSg
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAAA01OkaYaKLB4jwAA
// SIG // AAADTTANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOFoX
// SIG // DTI0MDMxNDE4NDMyOFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 1Cj3ChlWunG6BkFNNzjW1CspeFqR+kNl6PXD90YV0zmu
// SIG // gukx5bXdkX545VEBvjMKMvd4hphihDBf48jtl3YsDD+N
// SIG // u4/dAvzzGP3eb2N9bMfrnbW4n+xgie4ydby83Y9vM1eK
// SIG // 9BRhushL/rVDXpUyLBZpkm9BVIibVOK+bHwk4b4PHSPx
// SIG // fR4esTGaFbYvpG1ZWvoZRvG3+LNNFU8OLgGYYxkxQmBU
// SIG // crSid/5rXoNqp8LxwzoFe0EnVeXVnXdPsc3LhtKoHd6A
// SIG // ggIx/GZo5qMJB1HuHVJm3GX17IFpTn3OgxuyUvg3iWpN
// SIG // Q72m2pmKh4NQFHmdPrJKZMKysF0xcAUZbQIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFCHdiJoNkqdOVOlyNOI5Ytiq
// SIG // IS/vMFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDA1MTcwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQAjBE/Frsy6w8Hsbk1GXvb9sa1vFhlD
// SIG // 0UFZsidW/wcymAWeWlOEL4eS82XvYzhMQ2FJSm/2O95a
// SIG // iCH1HBDv+lt2/u7dT/ZvTNcT62b+XH50goLqKDw6uK0H
// SIG // v4gnTQ8B0+l2FusnrcUyTDqOLVA20ktGIma+zGm9sJI4
// SIG // DRWtI0RYXkvXWk0taCf8+WzZRop8atr/Gs0j/xnB/7fH
// SIG // k6x0H3Gsd1mzxC6BhyG68q0lGjgqYbJwjVKlDeRWxDJW
// SIG // reTLmPeKxjCZ6tSBHekvJ4CugvBPUlqRhDtzQ2tDZQFY
// SIG // qK6RnyNDWCG3cp8jgfOOmlgIzX4E4SHHc3VhbwJf+pLV
// SIG // lyxE5/Lv5WEMlhprpd8s/sNOqbiDw/aeCj4lgZAnrCgx
// SIG // 71y609wWy2fHSqkjlfA7cyxQH3PagLDYhvBKGrYZbiQb
// SIG // G8hW6Xm2nSpRKxYnQF/ChLrJPIbR6okpDccnWpi/7Sn8
// SIG // d1f7wwKEBOfcrL+K96RPs3cnzGoq75BTTcO3D59ZBxnM
// SIG // MPXRUmNkMAMYTM5qDNBvjPmLwZwbucI38TazEYpUW8TO
// SIG // go/YShYdGE8G2ujO857Rx6V93fp2m4xZv05zEUTjoCFy
// SIG // c2G8yimjtoNZFnshtkLbyEdeO85a20A+F9dAG60YPQqc
// SIG // Fu8WMcsHs4/ojQHPkJhc0feHcyZBD1EgiT7ExTCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghoLMIIaBwIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADTU6RphoosHiPAAAAAANNMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCBm/IyKWWGTZDG+
// SIG // Mb/f8Jfu17FkNtv39gBA+daIFrwZbjBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBADkoTmEqkvQLhnZyw7zVkXqmkJjvv2Ly
// SIG // raDPohKybD07A7AYZqbUV5AgN4++t8sXNQtIrw2GKebl
// SIG // wew9SuGEZMDggc/sSTasR/NXDE4i1opG2+PSCoZq9NNJ
// SIG // +iDfpD2Gow9IoPmRzOkUnZ6apgPOeXGDjHveMWL4URGV
// SIG // sWxTSypgs36Asl6AzzWIzJRsRrlSBjyK9P4iE3nNJAgo
// SIG // nYkSb5VY+JDlph1cjbvd9JSSGdg9TXrILgwQvgWxw+qr
// SIG // DlxeeOly/PSmA960jyMmxg4Rqpag/mY5OkEKDADhjyTw
// SIG // k5+8TKIlLiolHzQO2n85vD/wRjzZ2ufXZvwAPegYNZD0
// SIG // XlahgheVMIIXkQYKKwYBBAGCNwMDATGCF4Ewghd9Bgkq
// SIG // hkiG9w0BBwKgghduMIIXagIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // Y0VCEdXx328is1UWArEr0Zomhbz+nyhYUGnbw72pZQEC
// SIG // BmTUywy1SRgTMjAyMzA4MzExODU4MzMuMzU1WjAEgAIB
// SIG // 9KCB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMG
// SIG // A1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9u
// SIG // czEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOkRDMDAt
// SIG // MDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBTZXJ2aWNloIIR6zCCByAwggUIoAMCAQIC
// SIG // EzMAAAHSISQxSli/LREAAQAAAdIwDQYJKoZIhvcNAQEL
// SIG // BQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcN
// SIG // MjMwNTI1MTkxMjIxWhcNMjQwMjAxMTkxMjIxWjCByzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9z
// SIG // b2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMe
// SIG // blNoaWVsZCBUU1MgRVNOOkRDMDAtMDVFMC1EOTQ3MSUw
// SIG // IwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2
// SIG // aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
// SIG // AgEA3GCIQtECP0j2k+fp2EgbEnYQTztklzONFcsoPBat
// SIG // Uz6zDQ88QocVlA+32ysGBkrDjYLY41XneR0oeYpe+YzW
// SIG // nG+k62cLl/kNvvn9v/AgsrvE2NK8RCJw904+dm1s+UEV
// SIG // lUHo33QgP5+mc4p4XGWe/lXpVoE32Au6w64V90wV/PXp
// SIG // al5iEjlSFnl4kSvIfYR+kl4I4UBhkG39m0jO7hpCsyf6
// SIG // Wdi75U86vpjlvYj9o3GBAOG6T3rq6YJS1VEpxhkC5o0K
// SIG // e0nctcBOdlozynS5wReiW5kkRDPw4/We6JMUTVI2EnYM
// SIG // r2dS1kopYVf8HoGF1UOj/TCo0ZxPAiOSjB5quxLB4SAS
// SIG // tAffXRUMnS9b3bgu3lhI88+eWfw8h+h5dkjzn+SmeJR3
// SIG // +jFMLYGn/jHmcZFtIsYf7y9Zl/FbCUx2vAB/tJf/XZ1s
// SIG // xTBRSRRu4PeZxyejJmD635qHijkaMhEEbErrNqgq6TI4
// SIG // Pz92fViQLRRqF2DA9fTa8xuFBT6VW5dzdV7xuP7pXaNf
// SIG // mpwaQ2IcUFO5NYHx5+kMXVFNE7KyfyQry330vPW+FV5S
// SIG // GsZ1RekGYfie8S1DRrRJo+ncD86Any+86g2Sb5rL2DZN
// SIG // ZXG8lcTCIAxT6ANn2T1xxe3cWoTNmRuwALd72RIjLQuh
// SIG // P3Ii0XCMM5SawYhxHpyD78VteasCAwEAAaOCAUkwggFF
// SIG // MB0GA1UdDgQWBBQgtp+3J0d06D/5GxGdlyRRZmdZJDAf
// SIG // BgNVHSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBf
// SIG // BgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jv
// SIG // c29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBU
// SIG // aW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYI
// SIG // KwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01p
// SIG // Y3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEw
// SIG // KDEpLmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQM
// SIG // MAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAsOYqtBMtC5QHc9j3KnIUcFuX
// SIG // fn4rTSEgr6g9BOlvwMok5PkzN1oWE2sUNqT+jq+Kjlfg
// SIG // 7u/y/pNfIGK9aYbIcVTFZ1zXHY3nDLU1lDlQMGyaHlh2
// SIG // gIJJzSDM1yt/s4LhuU1XCxIfwlTMtSeyjxPENAs+ejYF
// SIG // s3fbqxvrIUgypCnYTmD1xfe9DK9RghRaXtaF4xMumkvh
// SIG // 3mr6dsJsuuZm7tAHFDjxJ/oWKoo4C10j6r7hZjjqOVJ0
// SIG // leug7+RXZKiu6uQ0XqMfUTxGXB1GvtgVCj46fnUNw+HP
// SIG // SB/O9uyozA/Dl2aJg/QPDK/33A5+RSO5X2XPIIWHO7KW
// SIG // Ckzv9GfWEUWpoVVscayLATeS61oftfLKFyfvhHko80mH
// SIG // YBlmD4NeoS/+wMnceCs/1gU1JmxoolVHBPyNGkFNlP9D
// SIG // c1IiBSFvNEr8Xg1p+iPoclYP7HRUgCz+SU+8AHvM077K
// SIG // yNoTKRFS3UrRQDKmpxWKrcGVORaALKD2e4dRJVpii2ZF
// SIG // 5PHj7gC87TWNcrHjtE8HbniBnCMCLa5QWINV6T89fqTI
// SIG // RjFW5Xuih7p2iqOSv5XTjNJkEE+FY4OmW80SFUaA3AK0
// SIG // Of/9PO+YzlLybWMnOx5dOI3Jr4xCFwtx45FGL4BxFi9E
// SIG // Bf+H+7ywHIWhGfN/f9xmDnah+VVZ2a1CAUAeg02lCCww
// SIG // ggdxMIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAV
// SIG // MA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0
// SIG // aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAx
// SIG // ODIyMjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAg8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7V
// SIG // gtP97pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/H
// SIG // ZveVU3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKD
// SIG // RLemjkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gm
// SIG // U3w5YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36M
// SIG // EBydUv626GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+y
// SIG // OSxRnOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoF
// SIG // VZhtaDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJi
// SIG // ss254o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGa
// SIG // RnXNxF803RKJ1v2lIH1+/NmeRd+2ci/bfV+Autuqfjbs
// SIG // Nkz2K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afo
// SIG // mXw/TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9
// SIG // ahhaYQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZk
// SIG // i1ugpoMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y
// SIG // 1BzFa/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV
// SIG // 2xo3xwgVGD94q0W29R6HXtqPnhZyacaue7e3PmriLq0C
// SIG // AwEAAaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEw
// SIG // IwYJKwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/
// SIG // LwTuMB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnp
// SIG // cjBcBgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8G
// SIG // CCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYD
// SIG // VR0lBAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9
// SIG // lJBb186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoG
// SIG // CCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcN
// SIG // AQELBQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pc
// SIG // FLY+TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHk
// SIG // wo/7bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AF
// SIG // vonoaeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4
// SIG // U3UkV7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2
// SIG // EhIRXT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8Atq
// SIG // gcKBGUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mj
// SIG // dAy87JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZM
// SIG // cm8Qq3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQE
// SIG // cb9k+SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2f
// SIG // pCjcZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBM
// SIG // drVXVAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L
// SIG // +DvktxW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJ
// SIG // C4822rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU
// SIG // 5nR0W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/
// SIG // 2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDTjCC
// SIG // AjYCAQEwgfmhgdGkgc4wgcsxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9w
// SIG // ZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // TjpEQzAwLTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsO
// SIG // AwIaAxUAiabSwmbBNOjbZh0MweRdU66BUgaggYMwgYCk
// SIG // fjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDANBgkq
// SIG // hkiG9w0BAQsFAAIFAOia9mgwIhgPMjAyMzA4MzExMTIy
// SIG // MTZaGA8yMDIzMDkwMTExMjIxNlowdTA7BgorBgEEAYRZ
// SIG // CgQBMS0wKzAKAgUA6Jr2aAIBADAHAgEAAgJk8jAIAgEA
// SIG // AgMBQqEwCgIFAOicR+gCAQAwNgYKKwYBBAGEWQoEAjEo
// SIG // MCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAwehIKEKMAgC
// SIG // AQACAwGGoDANBgkqhkiG9w0BAQsFAAOCAQEAe4qg+M14
// SIG // tQcQDyV4mv7wq4lc03VGiD0rqkAuNU5C3X2NfnSEi3o6
// SIG // yE6Slc0ACzXBbqeARvbVgcjULtb8yrMH58qACmM+jYj6
// SIG // 12WWinH4whcXT8JKZJaiKPIDXKlkykdp3AdGtFCpTqlt
// SIG // awFCr33S8drq2YCInrLKAz5pECm2YYjG3i2fiQzWtnng
// SIG // zTqUUK7x3AOCFq4ePFCXvu/sJsR9sLxhJKfvqeTWOh5W
// SIG // HbXf6XVze1DYUne4eO8u4kldSDdx+tQnAItWROVoPmt6
// SIG // 4keIKYPpqyr9nHbDNhmaJ9qjxLK6LzUuLQGmDZnp5Q7H
// SIG // +1kq9biRH2MDP8XoSLilHKy2azGCBA0wggQJAgEBMIGT
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 0iEkMUpYvy0RAAEAAAHSMA0GCWCGSAFlAwQCAQUAoIIB
// SIG // SjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJ
// SIG // KoZIhvcNAQkEMSIEIJhTYBjyeirJ0UcDfsXXtWlhRAB/
// SIG // VHizHjR9Mxlq8EwvMIH6BgsqhkiG9w0BCRACLzGB6jCB
// SIG // 5zCB5DCBvQQgx4Agk9/fSL1ls4TFTnnsbBY1osfRnmzr
// SIG // kkWBrYN5pE4wgZgwgYCkfjB8MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBQQ0EgMjAxMAITMwAAAdIhJDFKWL8tEQABAAAB0jAi
// SIG // BCDPRb0jSjYUFFXcN5a+vt/yo5Y5tVrvtJc5Z828rjUP
// SIG // /TANBgkqhkiG9w0BAQsFAASCAgB99ClWOlm6pXfDzCnO
// SIG // eTOhM1UtNk7zj/X4Io1VtQlEYD18FKVQr6XdHeruqSgA
// SIG // 9Mq8Ii9yCplzITKwGQuEzr05ZsJg2K7uw58Vjh4qKt3U
// SIG // s1x2zyqzXpa5Zh1ipepZk/PmmJ57T4U2ep0Kx13ebUm1
// SIG // pGWKSNKyuEKF6AmRm2IZjTmVWK1gyliYBOidU8hHx58z
// SIG // 7tVs2NWgPVymQ0ygfNGAg7JWNJnnpOs0L2SoWHwwzMr9
// SIG // 9ZQ9f+271Zu8z/IfC3oHjxg5cESCgaM4Ycvcs+RlzVab
// SIG // IJUPjIGYCeUnt9z4e7Z5BwTBgXzLwqbRlQI2CK+rhwhO
// SIG // xPlFlqPnKsCi1cu/AOSKq0EbHkvvZI1XitS8q5jayDge
// SIG // gC+obRznM/dPO1pxdiu/TjtVclIWRTbonLbk4eqhlheo
// SIG // Q8LWVr5FpkgFdPTfkPrpm2zFyxcJySguadgKsqtvl1rZ
// SIG // EUb1xQWopih38v/zdzohfQsClIhVfodGmDJplMGbdvN6
// SIG // xJGAoFezPAtDVNcDNg+FDDbgsKz8qNwUsFyfa9Wz8Ez3
// SIG // tZx0YgXyMEwUDIPyIgz1TNKv2SvPqfAWO3OOoGHAVuFv
// SIG // pREw7JF+ibTLsN6BWjHE3P78b2ufFWTqtNt3jrSKRb3V
// SIG // wykyhtdvggnnYfQht0Fbmp2Abo8eld5jK9wKz+XQeXEo
// SIG // 6bufkA==
// SIG // End signature block
