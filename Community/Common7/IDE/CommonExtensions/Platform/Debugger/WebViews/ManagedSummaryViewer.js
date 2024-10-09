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
        var SummaryViewer;
        (function (SummaryViewer) {
            var ContextMenu = Microsoft.Plugin.ContextMenu;
            var SnapshotTileView = (function () {
                function SnapshotTileView(model, baseline, viewer, snapshots) {
                    var _this = this;
                    this._model = model;
                    this._baseline = baseline;
                    this._others = snapshots;
                    this._viewer = viewer;
                    this._infoViews = new Array();
                    var template = document.getElementById("SnapshotTileTemplate");
                    this.element = document.createElement("div");
                    this.element.innerHTML = template.innerHTML;
                    this._info = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotInfoDiv", this.element);
                    this._moreOptions = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotTileMoreOptions", this.element);
                    this._progress = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotTileProgress", this.element);
                    if (model.Heaps.length > 1) {
                        ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotTile", this.element).classList.add("mixedMode");
                        this._progress.classList.add("mixedMode");
                    }
                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotTileTitle", this.element).innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getFormattedDigitLocaleString(this._model.Name);
                    ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotTakenDate", this.element).innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewTimestamp", this._model.Time);
                    this.generateSummaryInfo();
                    this.element.onmousedown = this.onContextMenu.bind(this);
                    this._moreOptions.onmousedown = this.onMoreOptions.bind(this);
                    this._moreOptions.onkeydown = function (e) { return _this.onContextKeyboard(e, false); };
                    this._moreOptions.onkeyup = function (e) { return _this.onContextKeyboard(e, true); };
                }
                SnapshotTileView.prototype.generateSummaryInfo = function () {
                    var _this = this;
                    var useNames = this._model.Heaps.length > 1;
                    this._model.Heaps.forEach(function (heap, i) {
                        var baselineHeap = (_this._baseline !== null) ? _this._baseline.Heaps[i] : null;
                        var name = useNames ? ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewType" + SnapshotTileView.SnapshotTypeNames[heap.Type]) : null;
                        var infoView = new HeapDataSummaryView(name, _this, heap, baselineHeap);
                        _this._infoViews.push(infoView);
                        _this._info.appendChild(infoView.element);
                    });
                };
                SnapshotTileView.prototype.onContextDiff = function (id) {
                    this.showDiffViewAsync(this._model.Heaps[0].Id, id);
                };
                SnapshotTileView.prototype.onContextDelete = function () {
                    this._viewer.destroySnapshotAsync(this._model);
                };
                SnapshotTileView.prototype.onContextMenu = function (event) {
                    if (event.which === ManagedMemoryAnalyzer.Mouse_Buttons.RIGHT_BUTTON) {
                        event.preventDefault();
                        this.showContextMenu(event.clientX, event.clientY);
                    }
                };
                SnapshotTileView.prototype.onContextKeyboard = function (event, launchMenu) {
                    if (event.which === ManagedMemoryAnalyzer.Key_Presses.ENTER || event.which === ManagedMemoryAnalyzer.Key_Presses.SPACE || event.which === ManagedMemoryAnalyzer.Key_Presses.DOWNARROW) {
                        event.preventDefault();
                        if (launchMenu) {
                            var position = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getPosition(this._moreOptions);
                            this.showContextMenu(position["x"], position["y"]);
                        }
                        else {
                            event.stopImmediatePropagation();
                        }
                    }
                };
                SnapshotTileView.prototype.onMoreOptions = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var position = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getPosition(this._moreOptions);
                    this.showContextMenu(position["x"], position["y"]);
                };
                SnapshotTileView.prototype.isViewOf = function (snapshot) {
                    if (this._model.Name !== snapshot.Name)
                        return false;
                    if (this._infoViews.length !== snapshot.Heaps.length)
                        return false;
                    for (var i = 0; i < this._infoViews.length; i++) {
                        if (!this._infoViews[i].isViewOf(snapshot.Heaps[i]))
                            return false;
                    }
                    return true;
                };
                SnapshotTileView.prototype.showHeapViewAsync = function (id, sortColumn) {
                    this.updateTileState(true);
                    this._viewer.viewHeapAsync(id, sortColumn);
                };
                SnapshotTileView.prototype.showDiffViewAsync = function (id, baseline, sortColumn) {
                    this.updateTileState(true);
                    this._viewer.viewDiffAsync(id, baseline, sortColumn);
                };
                SnapshotTileView.prototype.updateTileState = function (showProgress) {
                    if (showProgress) {
                        this._info.classList.add("hidden");
                        this._progress.classList.remove("hidden");
                    }
                    else {
                        this._info.classList.remove("hidden");
                        this._progress.classList.add("hidden");
                    }
                };
                SnapshotTileView.prototype.showContextMenu = function (x, y) {
                    if (!this._contextMenu) {
                        var contextMenuItems = this.generateContextMenuItems();
                        this._contextMenu = ContextMenu.create(contextMenuItems);
                    }
                    this._contextMenu.show(x, y);
                    this._viewer.ignoreNextScroll();
                };
                SnapshotTileView.prototype.generateContextMenuItems = function () {
                    var _this = this;
                    var menuDiff, menuDelete;
                    var snapshotItems = new Array();
                    var shouldShowMoreItem = this._others.length > SnapshotTileView.ContextMaxSnapshots + 1;
                    var diffCount = 0;
                    var max = shouldShowMoreItem ? SnapshotTileView.ContextMaxSnapshots - 1 : SnapshotTileView.ContextMaxSnapshots;
                    this._others.forEach(function (snapshot) {
                        if (snapshot.Heaps[0].Id === _this._model.Heaps[0].Id || diffCount >= max)
                            return;
                        diffCount++;
                        snapshotItems.push({
                            callback: _this.onContextDiff.bind(_this, snapshot.Heaps[0].Id),
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getFormattedDigitLocaleString(snapshot.Name),
                            type: ContextMenu.MenuItemType.command,
                        });
                    });
                    snapshotItems.reverse();
                    if (shouldShowMoreItem) {
                        snapshotItems.push({
                            callback: this.showHeapViewAsync.bind(this, this._model.Heaps[0].Id),
                            label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("ContextMenuMore"),
                            type: ContextMenu.MenuItemType.command,
                        });
                    }
                    var hasDiffItems = this._others.length > 1;
                    menuDiff = {
                        callback: function () { },
                        label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("CompareSnapshotContext"),
                        type: ContextMenu.MenuItemType.command,
                        submenu: hasDiffItems ? snapshotItems : null,
                        disabled: function () { return !hasDiffItems; },
                    };
                    menuDelete = {
                        callback: this.onContextDelete.bind(this),
                        label: ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("DeleteSnapshotContext"),
                        type: ContextMenu.MenuItemType.command,
                        iconEnabled: "vs-mma-delete",
                        iconDisabled: "vs-mma-delete",
                    };
                    return [
                        menuDiff,
                        menuDelete,
                    ];
                };
                SnapshotTileView.ContextMaxSnapshots = 10;
                SnapshotTileView.SnapshotTypeNames = [
                    "",
                    "Dump",
                    "Managed",
                    "Native",
                    "Dump",
                    "Dump",
                    "DUMP",
                ];
                return SnapshotTileView;
            }());
            SummaryViewer.SnapshotTileView = SnapshotTileView;
            var HeapDataSummaryView = (function () {
                function HeapDataSummaryView(name, view, model, baselineModel) {
                    var _this = this;
                    this.BytesToKbRatio = 1024.0;
                    this.DecimalsIfSmall = 3;
                    this.DecimalsIfLarge = 0;
                    var template = document.getElementById("SnapshotSummaryTemplate");
                    this.element = document.createElement("div");
                    this.element.innerHTML = template.innerHTML;
                    this.model = model;
                    this._view = view;
                    if (name !== null) {
                        var type = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotSummaryType", this.element);
                        type.classList.remove("hidden");
                        type.innerText = name;
                    }
                    this._countDiffLink = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("countDiffLink", this.element);
                    this._countBaselineDiv = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("countBaselineDiv", this.element);
                    this._countDiffImage = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("countDiffImage", this.element);
                    this._sizeDiffImage = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("sizeDiffImage", this.element);
                    this._sizeDiffLink = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("sizeDiffLink", this.element);
                    this._sizeBaselineDiv = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("sizeBaselineDiv", this.element);
                    var summaryViewCount = model.Type === ManagedMemoryAnalyzer.SnapshotType.LIVE_MANAGED ? "ManagedSummaryCount" : "NativeSummaryCount";
                    var snapshotCountElement = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotCount", this.element);
                    var snapshotSizeElement = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getChildById("snapshotSize", this.element);
                    snapshotCountElement.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(summaryViewCount, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getNumberString(this.model.Count));
                    var sizeInKb = this.model.Size / this.BytesToKbRatio;
                    var decimalPlaces = sizeInKb > 1 ? this.DecimalsIfLarge : this.DecimalsIfSmall;
                    snapshotSizeElement.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getNumberString(sizeInKb, decimalPlaces));
                    snapshotCountElement.onclick = function (e) { _this._view.showHeapViewAsync(_this.model.Id, "Count"); };
                    snapshotSizeElement.onclick = function (e) { _this._view.showHeapViewAsync(_this.model.Id, "TotalSize"); };
                    this._countBaselineDiv.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewBaseline");
                    this._sizeBaselineDiv.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewBaseline");
                    this.updateBaseline(baselineModel);
                }
                HeapDataSummaryView.prototype.updateBaseline = function (newBaselineModel) {
                    var _this = this;
                    this.baselineModel = newBaselineModel;
                    if (this.baselineModel !== null) {
                        this._countBaselineDiv.classList.add("hidden");
                        this._countDiffLink.classList.remove("hidden");
                        this._sizeBaselineDiv.classList.add("hidden");
                        this._sizeDiffLink.classList.remove("hidden");
                        var count = this.model.Count - this.baselineModel.Count;
                        var summaryViewCount = newBaselineModel.Type === ManagedMemoryAnalyzer.SnapshotType.LIVE_MANAGED ? "ManagedSummaryCount" : "NativeSummaryCount";
                        this._countDiffLink.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource(summaryViewCount, ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getSignedNumberString(count));
                        if (count > 0) {
                            this._countDiffImage.classList.add("HeapIncreaseIcon");
                        }
                        else if (count < 0) {
                            this._countDiffImage.classList.add("HeapDecreaseIcon");
                        }
                        var size = this.model.Size - this.baselineModel.Size;
                        size = size / this.BytesToKbRatio;
                        var decimalPlaces = size > 1 ? this.DecimalsIfLarge : this.DecimalsIfSmall;
                        this._sizeDiffLink.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewSize", ManagedMemoryAnalyzer.MemoryAnalysisHelpers.getSignedNumberString(size, decimalPlaces));
                        if (size > 0) {
                            this._sizeDiffImage.classList.add("HeapIncreaseIcon");
                        }
                        else if (size < 0) {
                            this._sizeDiffImage.classList.add("HeapDecreaseIcon");
                        }
                        this._sizeDiffLink.disabled = this._countDiffLink.disabled = false;
                        this._sizeDiffLink.onclick = function (e) { _this._view.showDiffViewAsync(_this.model.Id, _this.baselineModel.Id, "TotalSizeDiff"); };
                        this._countDiffLink.onclick = function (e) { _this._view.showDiffViewAsync(_this.model.Id, _this.baselineModel.Id, "CountDiff"); };
                    }
                    else {
                        this._sizeBaselineDiv.classList.remove("hidden");
                        this._countBaselineDiv.classList.remove("hidden");
                        this._sizeDiffLink.classList.add("hidden");
                        this._countDiffLink.classList.add("hidden");
                        this._countDiffImage.classList.remove("HeapIncreaseIcon");
                        this._countDiffImage.classList.remove("HeapDecreaseIcon");
                        this._sizeDiffImage.classList.remove("HeapIncreaseIcon");
                        this._sizeDiffImage.classList.remove("HeapDecreaseIcon");
                    }
                };
                HeapDataSummaryView.prototype.isViewOf = function (snapshot) {
                    return this.model.Id === snapshot.Id &&
                        this.model.Type === snapshot.Type &&
                        this.model.Count === snapshot.Count &&
                        this.model.Size === snapshot.Size;
                };
                return HeapDataSummaryView;
            }());
        })(SummaryViewer = ManagedMemoryAnalyzer.SummaryViewer || (ManagedMemoryAnalyzer.SummaryViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var SummaryViewer;
        (function (SummaryViewer) {
            var ManagedSummaryViewer = (function () {
                function ManagedSummaryViewer() {
                    var _this = this;
                    this.NativeMemoryCollectionAgentGuid = "3151D25D-A614-4E39-AE44-29DD3741791F";
                    this._adaptor = Microsoft.Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.Debugger.LiveMemorySummaryViewModelMarshaler", {}, true);
                    Microsoft.Plugin.VS.Keyboard.setZoomState(false);
                    this._snapshotContainer = document.getElementById("snapshotContainer");
                    this._takeSnapshotTile = document.getElementById("takeSnapshotTile");
                    this._takeSnapshotButtonDiv = document.getElementById("takeSnapshotButtonDiv");
                    this._takeSnapshotButton = document.getElementById("takeSnapshotButton");
                    this._takeSnapshotCaption = document.getElementById("takeSnapshotCaption");
                    this._snapshotProgress = document.getElementById("takeSnapshotProgressDiv");
                    this._snapshotProgressCaption = document.getElementById("snapshotProgressCaption");
                    this._snapshotProgressCancel = document.getElementById("snapshotProgressCancelDiv");
                    this._viewDisabledMessageDiv = document.getElementById("viewDisabledMessageDiv");
                    this._enableSnapshotsDiv = document.getElementById("enableSnapshotsDiv");
                    this._enableSnapshotsCaption = document.getElementById("enableSnapshotsCaption");
                    this._enableSnapshotsCheckBox = document.getElementById("enableSnapshotsCheckBox");
                    document.getElementById("viewDisabledMessage").innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("AlertNativeCollectionUnavailable");
                    this._takeSnapshotCaption.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SummaryViewButton");
                    document.getElementById("snapshotProgressCancel").onclick = function (e) {
                        _this.cancelSnapshotAnalysisAsync();
                    };
                    document.getElementById("takeSnapshotButton").onclick = function (e) {
                        _this.TakeSnapshotAsync();
                    };
                    document.getElementById("snapshotProgressCancel").innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SnapshotProgressCancel");
                    this._adaptor.addEventListener("CanTakeSnapshotChangedEvent", function (eventArgs) {
                        _this.completeProgress(eventArgs.ResetView);
                        if (eventArgs.ResetView) {
                            _this.actionCompleted();
                        }
                    });
                    this._adaptor.addEventListener("SummaryViewUpdatedEvent", function (eventArgs) {
                        _this.updateSummaryViewAsync(eventArgs.ResetView, eventArgs.CanTakeSnapshot);
                    });
                    this._adaptor.addEventListener("SnapshotProgressUpdatedEvent", function (eventArgs) {
                        _this.updateProgressIndicator(eventArgs);
                    });
                    this._adaptor.addEventListener("ProgressCancelEnabledEvent", function (eventArgs) {
                        _this.enableProgressCancel();
                    });
                    this._adaptor.addEventListener("HeapViewReadyEvent", function (eventArgs) {
                        _this.updateAnalyzingTiles();
                        _this.actionCompleted();
                    });
                    this.resetState();
                    this._nativeMemoryToolEnabled = false;
                    this._adaptor._call("IsNativeLiveMemoryToolEnabled").then(function (result) {
                        _this._nativeMemoryToolEnabled = (result === true);
                        if (_this._nativeMemoryToolEnabled) {
                            _this._standardCollector = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
                            if (_this._standardCollector) {
                                _this._standardCollector.addMessageListener(new Microsoft.VisualStudio.DiagnosticsHub.Guid(_this.NativeMemoryCollectionAgentGuid), _this.onMessageReceivedFromAgent.bind(_this));
                            }
                        }
                    });
                    this._managedMemoryToolEnabled = false;
                    this._adaptor._call("IsManagedLiveMemoryToolEnabled").then(function (result) {
                        _this._managedMemoryToolEnabled = (result === true);
                    });
                    this._adaptor._call("IsNativeLiveMemoryToolSupported").then(function (result) {
                        _this._nativeMemoryToolSupported = (result === true);
                        if (_this._nativeMemoryToolSupported) {
                            _this._enableSnapshotsDiv.classList.remove("hidden");
                            _this._enableSnapshotsCaption.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("EnableSnapshotsCaption");
                            _this._enableSnapshotsCheckBox.checked = (_this._nativeMemoryToolEnabled === true);
                            _this._enableSnapshotsCheckBox.onchange = function (e) {
                                _this._adaptor._call("SetNativeMemoryCollectionState", _this._enableSnapshotsCheckBox.checked);
                            };
                        }
                        if (_this._nativeMemoryToolSupported && !_this._nativeMemoryToolEnabled) {
                            _this.showNativeErrorMessageAsync(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("NativeCollectorDisabled"), "snapshotsDisabledMessage");
                        }
                    });
                    this._ignoreScroll = false;
                    document.onscroll = function (e) {
                        if (_this._ignoreScroll) {
                            _this._ignoreScroll = false;
                            scrollTo(0, _this._scrollOffset);
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    };
                    this.updateTakeSnapshotTile(false);
                    this.updateSnapshotsAsync();
                }
                ManagedSummaryViewer.prototype.ignoreNextScroll = function () {
                    this._scrollOffset = document.documentElement.scrollTop - (document.documentElement.clientTop || 0);
                    this._ignoreScroll = true;
                };
                ManagedSummaryViewer.prototype.queueAction = function (action, dirtyIds) {
                    var _this = this;
                    if (dirtyIds) {
                        dirtyIds.forEach(function (id) { return _this._dirtyIds.push(id); });
                    }
                    if (!this._actionsInProgress) {
                        this._actionsInProgress = true;
                        action();
                    }
                    else {
                        this._queuedActions.push(action);
                    }
                };
                ManagedSummaryViewer.prototype.resetActionQueue = function () {
                    this._actionsInProgress = false;
                    this._dirtyIds = new Array();
                    this._queuedActions = new Array();
                };
                ManagedSummaryViewer.prototype.isClean = function () {
                    var ids = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        ids[_i - 0] = arguments[_i];
                    }
                    for (var i = 0; i < ids.length; i++) {
                        if (this._dirtyIds.some(function (dirty) { return ids[i] == dirty; })) {
                            return false;
                        }
                    }
                    return true;
                };
                ManagedSummaryViewer.prototype.resetState = function () {
                    this.resetActionQueue();
                    this._snapshotTiles = new Array();
                    this._snapshotProgressCancel.classList.add("hidden");
                    this._snapshotProgressCaption.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SnapshotProgressCaptionDefault");
                    var container = document.getElementById("snapshotContainer");
                    while (container.hasChildNodes()) {
                        container.removeChild(container.firstChild);
                    }
                    container.appendChild(this._takeSnapshotTile);
                    this.updateTakeSnapshotTile(false);
                    this.updateSummaryViewEnabledState(true);
                    this._takeSnapshotButton.disabled = false;
                };
                ManagedSummaryViewer.prototype.TakeSnapshotAsync = function () {
                    var _this = this;
                    if (this._nativeMemoryToolEnabled) {
                        var message = "{ \"commandName\": \"takeSnapshot\", \"snapshotId\": \"" + ManagedSummaryViewer._nextNativeSnapshotIdentifier + "\", \"agentMask\": \"65535\" }";
                        this.sendMessageToAgent(message);
                    }
                    else {
                        this.queueAction(function () {
                            _this._adaptor._call("TakeSnapshot", null).then(function (result) {
                                if (result) {
                                    _this.updateTakeSnapshotTile(true);
                                }
                            });
                        });
                    }
                };
                ManagedSummaryViewer.prototype.updateSummaryViewAsync = function (resetView, canTakeSnapshot) {
                    if (canTakeSnapshot === void 0) { canTakeSnapshot = true; }
                    if (resetView) {
                        this.resetState();
                    }
                    this._takeSnapshotButton.disabled = !canTakeSnapshot;
                    return this.updateSnapshotsAsync();
                };
                ManagedSummaryViewer.prototype.updateSummaryViewEnabledState = function (enable) {
                    if (enable) {
                        this._snapshotContainer.classList.remove("hidden");
                        this._viewDisabledMessageDiv.classList.add("hidden");
                    }
                    else {
                        this._snapshotContainer.classList.add("hidden");
                        this._viewDisabledMessageDiv.classList.remove("hidden");
                    }
                };
                ManagedSummaryViewer.prototype.updateAnalyzingTiles = function () {
                    this._snapshotTiles.forEach(function (t) { t.updateTileState(false); });
                };
                ManagedSummaryViewer.prototype.updateTakeSnapshotTile = function (snapshotInProgress) {
                    if (snapshotInProgress) {
                        this._takeSnapshotButtonDiv.classList.add("hidden");
                        this._snapshotProgress.classList.remove("hidden");
                    }
                    else {
                        this._takeSnapshotButtonDiv.classList.remove("hidden");
                        this._snapshotProgress.classList.add("hidden");
                        this._snapshotProgressCaption.innerText = ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("SnapshotProgressCaptionDefault");
                    }
                };
                ManagedSummaryViewer.prototype.updateProgressIndicator = function (eventArgs) {
                    this._snapshotProgressCaption.innerText = eventArgs.Caption;
                };
                ManagedSummaryViewer.prototype.enableProgressCancel = function () {
                    this._snapshotProgressCancel.classList.remove("hidden");
                };
                ManagedSummaryViewer.prototype.completeProgress = function (ready) {
                    if (ready) {
                        this.updateTakeSnapshotTile(false);
                    }
                    return this.updateSummaryViewAsync(false);
                };
                ManagedSummaryViewer.prototype.actionCompleted = function () {
                    if (this._queuedActions.length == 0) {
                        this.resetActionQueue();
                    }
                    else {
                        var action = this._queuedActions.shift();
                        action();
                    }
                };
                ManagedSummaryViewer.prototype.updateSnapshotsAsync = function () {
                    var _this = this;
                    return this._adaptor._call("GetCurrentProcessSnapshots").then(function (result) {
                        if (result != null) {
                            var container = document.getElementById("snapshotContainer");
                            container.removeChild(_this._takeSnapshotTile);
                            _this._snapshotTiles = _this.mergeNewSnapshots(container, _this._snapshotTiles, result);
                            container.appendChild(_this._takeSnapshotTile);
                        }
                        if (result.length > 0 && result[0].Heaps.length > 1) {
                            _this._takeSnapshotTile.classList.add("mixedMode");
                        }
                        else {
                            _this._takeSnapshotTile.classList.remove("mixedMode");
                        }
                    });
                };
                ManagedSummaryViewer.prototype.mergeNewSnapshots = function (elements, oldViews, newSnapshots) {
                    var same = oldViews.length === newSnapshots.length;
                    for (var i = 0; i < oldViews.length && same; i++) {
                        same = oldViews[i].isViewOf(newSnapshots[i]);
                    }
                    return same ? oldViews.slice(0, oldViews.length) : this.getNewViews(elements, newSnapshots);
                };
                ManagedSummaryViewer.prototype.getNewViews = function (elements, snapshots) {
                    while (elements.hasChildNodes()) {
                        elements.removeChild(elements.firstChild);
                    }
                    var views = new Array();
                    var menuSnapshots = snapshots.slice().reverse();
                    for (var i = 0; i < snapshots.length; i++) {
                        var view = new SummaryViewer.SnapshotTileView(snapshots[i], i == 0 ? null : snapshots[i - 1], this, menuSnapshots);
                        elements.appendChild(view.element);
                        views.push(view);
                    }
                    return views;
                };
                ManagedSummaryViewer.prototype.onMessageReceivedFromAgent = function (message) {
                    var _this = this;
                    if (message) {
                        var obj = JSON.parse(message);
                        if (obj.eventName) {
                            switch (obj.eventName) {
                                case "snapshotData":
                                    var snapshotData = obj;
                                    this.queueAction(function () {
                                        _this._adaptor._call("TakeSnapshot", snapshotData.data.data.FileName).then(function (result) {
                                            if (result) {
                                                ManagedSummaryViewer._nextNativeSnapshotIdentifier++;
                                                _this.updateTakeSnapshotTile(true);
                                            }
                                        });
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (obj.startupError) {
                            if (obj.errorMessage === "VSHUB_E_ETW_PROVIDER_OVERLOADED") {
                                this.showNativeErrorMessageAsync(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("MultipleHeapSessionStartupError"));
                            }
                            else {
                                this.showNativeErrorMessageAsync(ManagedMemoryAnalyzer.MemoryAnalysisHelpers.formatResource("UnableToStartNativeMemoryProfiling"));
                            }
                        }
                    }
                };
                ManagedSummaryViewer.prototype.showNativeErrorMessageAsync = function (message, cssClass) {
                    var divElement = document.getElementById("viewDisabledMessageDiv");
                    divElement.className = "";
                    if (cssClass) {
                        divElement.classList.add(cssClass);
                    }
                    else {
                        divElement.classList.add("viewDisabledMessage");
                    }
                    document.getElementById("viewDisabledMessage").innerHTML = message;
                    this.updateSummaryViewEnabledState(false);
                };
                ManagedSummaryViewer.prototype.sendMessageToAgent = function (message) {
                    this._standardCollector.sendStringToCollectionAgent(this.NativeMemoryCollectionAgentGuid, message);
                };
                ManagedSummaryViewer.prototype.viewHeapAsync = function (id, sortColumn) {
                    var _this = this;
                    this.queueAction(function () {
                        if (_this.isClean(id)) {
                            _this._adaptor._call("LaunchAnalyzer", id, sortColumn);
                        }
                    });
                };
                ManagedSummaryViewer.prototype.viewDiffAsync = function (id, baselineId, sortColumn) {
                    var _this = this;
                    this.queueAction(function () {
                        if (_this.isClean(id, baselineId)) {
                            _this._adaptor._call("LaunchAnalyzerAndDiff", id, baselineId, sortColumn);
                        }
                    });
                };
                ManagedSummaryViewer.prototype.destroySnapshotAsync = function (snapshot) {
                    var _this = this;
                    var ids = snapshot.Heaps.map(function (heap) { return heap.Id; });
                    this.queueAction(function () {
                        _this._adaptor._call("DestroySnapshot", ids).then(function (result) {
                            _this.updateSnapshotsAsync();
                            _this.actionCompleted();
                        });
                    }, ids);
                };
                ManagedSummaryViewer.prototype.cancelSnapshotAnalysisAsync = function () {
                    this._snapshotProgressCancel.classList.add("hidden");
                    this.resetActionQueue();
                    return this._adaptor._call("CancelSnapshotAnalysis");
                };
                ManagedSummaryViewer._nextNativeSnapshotIdentifier = 1;
                return ManagedSummaryViewer;
            }());
            SummaryViewer.ManagedSummaryViewer = ManagedSummaryViewer;
            Microsoft.Plugin.addEventListener("pluginready", function () {
                ManagedSummaryViewer.Instance = new ManagedSummaryViewer();
            });
        })(SummaryViewer = ManagedMemoryAnalyzer.SummaryViewer || (ManagedMemoryAnalyzer.SummaryViewer = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var Swimlanes;
        (function (Swimlanes) {
            "use strict";
            var DiagHub = Microsoft.VisualStudio.DiagnosticsHub;
            var GCDataSeries = (function () {
                function GCDataSeries(resources) {
                    var _this = this;
                    this._logger = DiagHub.getLogger();
                    this._gcEvents = [];
                    this._newDataEvent = new DiagHub.AggregatedEvent();
                    this._dataWarehouseRequestHandle = 1;
                    this._droppedRequest = false;
                    this._currentTimespan = new DiagHub.JsonTimespan(DiagHub.BigNumber.zero, DiagHub.BigNumber.zero);
                    this._samples = 250;
                    this._gcMarker = document.createElement("img");
                    this._gcMarker.src = Microsoft.Plugin.Theme.getValue("vs-mma-gc-glyph");
                    this._gcMarker.style.width = GCDataSeries._gcMarkerSize + "px";
                    this._gcMarker.style.height = GCDataSeries._gcMarkerSize + "px";
                    this._title = resources["GcLegendText"];
                    this._tooltip = resources["GcLegendTooltipText"];
                    DiagHub.DataWarehouse.loadDataWarehouse()
                        .then(function (dw) {
                        var countersContextData = {
                            customDomain: {
                                CounterId: GCDataSeries.counterId
                            }
                        };
                        return dw.getFilteredData(countersContextData, GCDataSeries.analyzerId);
                    }).then(function (responseData) {
                        _this._countersResult = responseData;
                    }).done(function () {
                        _this._dataWarehouseRequestHandle = null;
                        _this._droppedRequest = false;
                        _this.requestUpdate();
                    });
                }
                Object.defineProperty(GCDataSeries, "counterId", {
                    get: function () {
                        return "ManagedMemoryAnalyzer.Counters.GC";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries, "analyzerId", {
                    get: function () {
                        return "66EDDDF1-2277-40F3-983A-6FF57A433ECB";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "minValue", {
                    get: function () {
                        return Number.NaN;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "maxValue", {
                    get: function () {
                        return Number.NaN;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "marker", {
                    get: function () {
                        return this._gcMarker;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "title", {
                    get: function () {
                        return this._title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "tooltip", {
                    get: function () {
                        return this._tooltip;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GCDataSeries.prototype, "newDataEvent", {
                    get: function () {
                        return this._newDataEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                GCDataSeries.prototype.dispose = function () {
                    this._countersResult.dispose();
                    this._newDataEvent.dispose();
                };
                GCDataSeries.prototype.onViewportChanged = function (viewport) {
                    this._currentTimespan = viewport;
                    this.requestUpdate();
                };
                GCDataSeries.prototype.onDataUpdate = function (timestamp) {
                    if (this._currentTimespan.contains(timestamp)) {
                        this.requestUpdate();
                    }
                };
                GCDataSeries.prototype.draw = function (context, graphInformation) {
                    var _this = this;
                    if (this._gcEvents.length === 0) {
                        return;
                    }
                    this._gcEvents.forEach(function (point) {
                        var x = DiagHub.Utilities.convertToPixel(point.Timestamp, graphInformation.gridX, graphInformation.chartRect.width) - (GCDataSeries._gcMarkerSize / 2);
                        context.drawImage(_this._gcMarker, x, 0, GCDataSeries._gcMarkerSize, GCDataSeries._gcMarkerSize);
                    });
                };
                GCDataSeries.prototype.getPointAtTimestamp = function (timestamp, pointToFind) {
                    if (this._gcEvents.length === 0) {
                        return null;
                    }
                    var point = { Timestamp: timestamp, Value: 0 };
                    var pointCompare = function (left, right) {
                        return right.Timestamp.greater(left.Timestamp);
                    };
                    switch (pointToFind) {
                        case DiagHub.PointToFind.LessThanOrEqual:
                            var index = DiagHub.Utilities.findLessThan(this._gcEvents, point, pointCompare);
                            point = this._gcEvents[index];
                            break;
                        case DiagHub.PointToFind.GreaterThanOrEqual:
                            var index = DiagHub.Utilities.findGreaterThan(this._gcEvents, point, pointCompare);
                            point = this._gcEvents[index];
                            break;
                        case DiagHub.PointToFind.Nearest:
                        default:
                            var minIndex = DiagHub.Utilities.findLessThan(this._gcEvents, point, pointCompare);
                            var maxIndex = Math.min(minIndex + 1, this._gcEvents.length - 1);
                            var minDelta = DiagHub.BigNumber.subtract(timestamp, this._gcEvents[minIndex].Timestamp);
                            var maxDelta = DiagHub.BigNumber.subtract(this._gcEvents[maxIndex].Timestamp, timestamp);
                            index = minDelta.greater(maxDelta) ? maxIndex : minIndex;
                            point = this._gcEvents[index];
                            break;
                    }
                    return {
                        timestamp: point.Timestamp,
                        tooltip: point.ToolTip
                    };
                };
                GCDataSeries.prototype.requestUpdate = function () {
                    var _this = this;
                    if (this._dataWarehouseRequestHandle) {
                        this._droppedRequest = true;
                        return;
                    }
                    this._dataWarehouseRequestHandle = window.setTimeout(function () {
                        var requestData = {
                            type: "SamplePoints",
                            begin: _this._currentTimespan.begin.jsonValue,
                            end: _this._currentTimespan.end.jsonValue,
                            samples: Math.max(_this._samples, 2)
                        };
                        _this._countersResult.getResult(requestData)
                            .then(function (result) { return _this.cachePoints(result); })
                            .done(function () {
                            _this._dataWarehouseRequestHandle = null;
                            if (_this._droppedRequest) {
                                window.setTimeout(_this.requestUpdate.bind(_this), DiagHub.Constants.TimeoutImmediate);
                                _this._droppedRequest = false;
                            }
                        }, function (error) {
                            _this._logger.error("Error occurred while communicating with the DataWarehouse: " + JSON.stringify(error));
                        });
                    }, DiagHub.Constants.TimeoutImmediate);
                };
                GCDataSeries.prototype.cachePoints = function (result) {
                    if (result.p.length === 0) {
                        this._gcEvents = [];
                        return;
                    }
                    this._gcEvents = result.p.map(function (point) {
                        var customData = JSON.parse(point.d);
                        var duration = DiagHub.RulerUtilities.formatTime(new DiagHub.BigNumber(customData.duration.h, customData.duration.l));
                        var forcedTooltipString = customData.forced ? "GcTooltipForced" : "GcTooltipUnforced";
                        var tooltipSegments = [];
                        tooltipSegments.push(Microsoft.Plugin.Resources.getString("GcTooltipGenerationNumber", customData.generation));
                        tooltipSegments.push(Microsoft.Plugin.Resources.getString("GcTooltipDuration", duration));
                        tooltipSegments.push(Microsoft.Plugin.Resources.getString(forcedTooltipString));
                        return {
                            Timestamp: new DiagHub.BigNumber(point.t.h, point.t.l),
                            CustomData: point.d,
                            ToolTip: tooltipSegments.join('\n')
                        };
                    });
                    this._newDataEvent.invokeEvent(this);
                };
                GCDataSeries._gcMarkerSize = 10;
                return GCDataSeries;
            }());
            Swimlanes.GCDataSeries = GCDataSeries;
        })(Swimlanes = ManagedMemoryAnalyzer.Swimlanes || (ManagedMemoryAnalyzer.Swimlanes = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var Swimlanes;
        (function (Swimlanes) {
            "use strict";
            var DiagHub = Microsoft.VisualStudio.DiagnosticsHub;
            var SnapshotDataSeriesElement = (function () {
                function SnapshotDataSeriesElement(data, unitConverter) {
                    this._timestamp = new DiagHub.BigNumber(data.TimeInNs.h, data.TimeInNs.l);
                    var tooltipList = [data.Name];
                    data.Heaps.forEach(function (heap) {
                        if (heap.Type === ManagedMemoryAnalyzer.SnapshotType.LIVE_MANAGED) {
                            tooltipList.push(Microsoft.Plugin.Resources.getString("SnapshotTooltipManagedCount", heap.Count));
                            tooltipList.push(Microsoft.Plugin.Resources.getString("SnapshotTooltipManagedSize", unitConverter.formatNumber(heap.Size)));
                        }
                        else if (heap.Type === ManagedMemoryAnalyzer.SnapshotType.LIVE_NATIVE) {
                            tooltipList.push(Microsoft.Plugin.Resources.getString("SnapshotTooltipNativeCount", heap.Count));
                            tooltipList.push(Microsoft.Plugin.Resources.getString("SnapshotTooltipNativeSize", unitConverter.formatNumber(heap.Size)));
                        }
                    });
                    this._tooltip = tooltipList.join("\n");
                }
                Object.defineProperty(SnapshotDataSeriesElement.prototype, "timestamp", {
                    get: function () {
                        return this._timestamp;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeriesElement.prototype, "tooltip", {
                    get: function () {
                        return this._tooltip;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SnapshotDataSeriesElement;
            }());
            Swimlanes.SnapshotDataSeriesElement = SnapshotDataSeriesElement;
            var SnapshotDataSeries = (function () {
                function SnapshotDataSeries(unitConverter, resources) {
                    var _this = this;
                    this._snapshots = [];
                    this._newDataEvent = new DiagHub.AggregatedEvent();
                    this._unitConverter = unitConverter;
                    this._snapshotMarker = document.createElement("img");
                    this._snapshotMarker.setAttribute("aria-label", resources["SnapshotLegendText"]);
                    this._snapshotMarker.src = Microsoft.Plugin.Theme.getValue("vs-mma-snapshot-glyph");
                    this._snapshotMarker.style.width = SnapshotDataSeries._snapshotMarkerSize + "px";
                    this._snapshotMarker.style.height = SnapshotDataSeries._snapshotMarkerSize + "px";
                    this._title = resources["SnapshotLegendText"];
                    this._tooltip = resources["SnapshotLegendTooltipText"];
                    this._onNewSnapshotDataBoundFunction = this.onNewSnapshotData.bind(this);
                    this._summaryViewModelMarshaler = Microsoft.Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.Debugger.LiveMemorySummaryViewModelMarshaler", {}, false);
                    this._summaryViewModelMarshaler.addEventListener("SummaryViewUpdatedEvent", this._onNewSnapshotDataBoundFunction);
                    this._summaryViewModelMarshaler._call("GetCurrentProcessSnapshots")
                        .done(function (snapshots) { _this.onNewSnapshotData({ Snapshots: snapshots }); });
                }
                Object.defineProperty(SnapshotDataSeries.prototype, "minValue", {
                    get: function () {
                        return Number.NaN;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeries.prototype, "maxValue", {
                    get: function () {
                        return Number.NaN;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeries.prototype, "marker", {
                    get: function () {
                        return this._snapshotMarker;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeries.prototype, "title", {
                    get: function () {
                        return this._title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeries.prototype, "tooltip", {
                    get: function () {
                        return this._tooltip;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SnapshotDataSeries.prototype, "newDataEvent", {
                    get: function () {
                        return this._newDataEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                SnapshotDataSeries.prototype.dispose = function () {
                    this._summaryViewModelMarshaler.removeEventListener("SummaryViewUpdatedEvent", this._onNewSnapshotDataBoundFunction);
                    this._newDataEvent.dispose();
                };
                SnapshotDataSeries.prototype.onViewportChanged = function (viewport) {
                };
                SnapshotDataSeries.prototype.getPointAtTimestamp = function (timestamp, pointToFind) {
                    if (this._snapshots.length === 0) {
                        return null;
                    }
                    var point = { timestamp: timestamp };
                    var snapshotDataSeriesElementLessThan = function (left, right) {
                        return right.timestamp.greater(left.timestamp);
                    };
                    switch (pointToFind) {
                        case DiagHub.PointToFind.LessThanOrEqual:
                            var index = DiagHub.Utilities.findLessThan(this._snapshots, point, snapshotDataSeriesElementLessThan);
                            return this._snapshots[index];
                        case DiagHub.PointToFind.GreaterThanOrEqual:
                            var index = DiagHub.Utilities.findGreaterThan(this._snapshots, point, snapshotDataSeriesElementLessThan);
                            return this._snapshots[index];
                        case DiagHub.PointToFind.Nearest:
                        default:
                            var minIndex = DiagHub.Utilities.findLessThan(this._snapshots, point, snapshotDataSeriesElementLessThan);
                            var maxIndex = Math.min(minIndex + 1, this._snapshots.length - 1);
                            var minDelta = DiagHub.BigNumber.subtract(timestamp, this._snapshots[minIndex].timestamp);
                            var maxDelta = DiagHub.BigNumber.subtract(this._snapshots[maxIndex].timestamp, timestamp);
                            index = minDelta.greater(maxDelta) ? maxIndex : minIndex;
                            return this._snapshots[index];
                    }
                };
                SnapshotDataSeries.prototype.draw = function (context, graphInformation) {
                    var _this = this;
                    if (this._snapshots.length === 0) {
                        return;
                    }
                    var markerHalfWidth = (SnapshotDataSeries._snapshotMarkerSize / 2);
                    this._snapshots.forEach(function (snapshot) {
                        var x = DiagHub.Utilities.convertToPixel(snapshot.timestamp, graphInformation.gridX, graphInformation.chartRect.width) - markerHalfWidth;
                        if (x >= -markerHalfWidth && x < (graphInformation.chartRect.width + markerHalfWidth)) {
                            context.drawImage(_this._snapshotMarker, x, 0, SnapshotDataSeries._snapshotMarkerSize, SnapshotDataSeries._snapshotMarkerSize);
                        }
                    });
                };
                SnapshotDataSeries.prototype.onNewSnapshotData = function (eventArgs) {
                    var _this = this;
                    this._snapshots = eventArgs.Snapshots.map(function (snapshot) { return new SnapshotDataSeriesElement(snapshot, _this._unitConverter); });
                    this._newDataEvent.invokeEvent(this);
                };
                SnapshotDataSeries._snapshotMarkerSize = 10;
                return SnapshotDataSeries;
            }());
            Swimlanes.SnapshotDataSeries = SnapshotDataSeries;
        })(Swimlanes = ManagedMemoryAnalyzer.Swimlanes || (ManagedMemoryAnalyzer.Swimlanes = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));
var Debugger;
(function (Debugger) {
    var ManagedMemoryAnalyzer;
    (function (ManagedMemoryAnalyzer) {
        var Swimlanes;
        (function (Swimlanes) {
            "use strict";
            var DiagHub = Microsoft.VisualStudio.DiagnosticsHub;
            function ManagedMemorySwimlaneFactory(componentConfig, isVisible, selectionEnabled, graphBehaviour, currentTimespan, selectionTimespan) {
                var swimlaneConfig = new DiagHub.SwimlaneConfiguration(componentConfig, currentTimespan, graphBehaviour);
                swimlaneConfig.header.isBodyExpanded = isVisible;
                var unitConverter = new DiagHub.LocalizedUnitConverter(swimlaneConfig.graph.jsonConfig.Units, swimlaneConfig.graph.resources);
                var additionalSeries = [];
                if (componentConfig.JsonObject.ShowGcData) {
                    var gcSeries = new Swimlanes.GCDataSeries(swimlaneConfig.graph.resources);
                    additionalSeries.push(gcSeries);
                    swimlaneConfig.graph.legend.push({
                        legendText: gcSeries.title,
                        legendTooltip: gcSeries.tooltip,
                        marker: gcSeries.marker
                    });
                }
                var snapshotSeries = new Swimlanes.SnapshotDataSeries(unitConverter, swimlaneConfig.graph.resources);
                additionalSeries.push(snapshotSeries);
                swimlaneConfig.graph.legend.push({
                    legendText: snapshotSeries.title,
                    legendTooltip: snapshotSeries.tooltip,
                    marker: snapshotSeries.marker
                });
                var graph = new DiagHub.MultiSeriesGraph(swimlaneConfig.graph, additionalSeries);
                graph.container.setAttribute("aria-label", componentConfig.Title);
                var leftScale = new DiagHub.Scale(swimlaneConfig.graph.scale, DiagHub.ScaleType.Left, unitConverter);
                var rightScale = new DiagHub.Scale(swimlaneConfig.graph.scale, DiagHub.ScaleType.Right, unitConverter);
                graph.scaleChangedEvent.addEventListener(leftScale.onScaleChanged.bind(leftScale));
                graph.scaleChangedEvent.addEventListener(rightScale.onScaleChanged.bind(rightScale));
                var swimlane = new DiagHub.SwimlaneBase(swimlaneConfig.header, swimlaneConfig.graph.height, currentTimespan, selectionTimespan);
                graph.scaleChangedEvent.addEventListener(swimlane.onScaleChanged.bind(swimlane));
                swimlane.addTitleControl(new DiagHub.Legend(swimlaneConfig.graph.legend));
                swimlane.addMainRegionControl(new DiagHub.SelectionOverlay(graph, currentTimespan, selectionTimespan));
                swimlane.addMainRegionControl(new DiagHub.GridLineRenderer(currentTimespan));
                swimlane.addLeftRegionControl(leftScale);
                swimlane.addRightRegionControl(rightScale);
                return swimlane;
            }
            Swimlanes.ManagedMemorySwimlaneFactory = ManagedMemorySwimlaneFactory;
        })(Swimlanes = ManagedMemoryAnalyzer.Swimlanes || (ManagedMemoryAnalyzer.Swimlanes = {}));
    })(ManagedMemoryAnalyzer = Debugger.ManagedMemoryAnalyzer || (Debugger.ManagedMemoryAnalyzer = {}));
})(Debugger || (Debugger = {}));

// SIG // Begin signature block
// SIG // MIIoOgYJKoZIhvcNAQcCoIIoKzCCKCcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // p+X6b0vLfaUkd/Xlsih24uhvMeY0008AQiPqYLxFSC6g
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
// SIG // ghoNMIIaCQIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADTU6RphoosHiPAAAAAANNMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCCwDno6pOw8lOXK
// SIG // HJ5FsZMseZImnIHRfZEop30zczaAhjBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAIGK82/VrnCEGBJTKilDAosTPifIL4pd
// SIG // cuNzIHMk4xySenEgHAl4GbGs/lWD8G3RvL6wg8GoXGZS
// SIG // hvvhMN6V3SAP042PL7SV3+WkMc7PUPeaf3WZHmX7f3CZ
// SIG // A+naaGku05NjI5mWxU+EDGZ/ZcurZt2cCYFIBmRdTwxP
// SIG // 1l4emBBz6F9bNIARVj3hA53ozW+K+9e48vSf/3IoJby7
// SIG // 5ekFGadcmjtbAzyZQq3GipCgVXYKa+62mR90pYfV65hQ
// SIG // +sVkgr1j22xzWAy/EeohOXQ/52s8gPzV1vFkzNLyyES8
// SIG // ZeHD2qk4/JWLWIS5RxQ6SNZ1XxtKYXObWf9J7FuBRRyl
// SIG // 8pOhgheXMIIXkwYKKwYBBAGCNwMDATGCF4Mwghd/Bgkq
// SIG // hkiG9w0BBwKgghdwMIIXbAIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // /U7O/tEGmuuiFmoCrbk1WKDsm8SHa/7M7+M1NRiWs4YC
// SIG // BmTUylnAOhgTMjAyMzA4MzExODU4MzEuODQ1WjAEgAIB
// SIG // 9KCB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMG
// SIG // A1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9u
// SIG // czEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjdGMDAt
// SIG // MDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBTZXJ2aWNloIIR7TCCByAwggUIoAMCAQIC
// SIG // EzMAAAHVqQLPxafJ6VoAAQAAAdUwDQYJKoZIhvcNAQEL
// SIG // BQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcN
// SIG // MjMwNTI1MTkxMjMwWhcNMjQwMjAxMTkxMjMwWjCByzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9z
// SIG // b2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMe
// SIG // blNoaWVsZCBUU1MgRVNOOjdGMDAtMDVFMC1EOTQ3MSUw
// SIG // IwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2
// SIG // aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
// SIG // AgEAxX2pOezqYfb7sbZaAAYi3Onp0/sih+tfW/joRnZM
// SIG // oYDc5F/NClBiP4xKjlTFeEqrf1DxRYncdre79khE49rQ
// SIG // M7lSrQ36thwabvNL2dL8kA8nVbeDAy+LSUiqoGKHwsQy
// SIG // Aa1sySY4AaJSnTicdbrdk8jnPlDpu3vdrVTx6Y3YPjpn
// SIG // 99Uy1H/6KLsgDifyJ59oodwEj9EGJvgBUI4WAzQ7vLsz
// SIG // HcBxeUHcLLHDWvT1UhnnS3Qy6PYy+g6DxeDWKNOpb7xE
// SIG // LkifSJsGXwRi8v/IaRO0Q+HsLySpjNfrenkLhLE146xj
// SIG // Nlo5FtfEoFGfJ/laS9rpOgIQ5Amt+eSOd9adCZKqaKJ+
// SIG // 3R7i1HWUkDuNKplSEOqkAmp7yJk6pjYBP6zydK4K9ITD
// SIG // yP7kdU/4mi9JhKuG6mpPt7GvCPhQGDiPzwu1fsxHpPrH
// SIG // clrWl/p3Wxpb/0SW+ZkGhp/Dbp25H7xw9ULeQ9K5rTDn
// SIG // pGDKu0I2KhNxRD/8AGOEw7icbLY7Gth14tslAxIODCS+
// SIG // vyb7EF06DmfiMUeik+beXweRaWWAaVSzJmt6Zuc+lV75
// SIG // F62LN9zVyalVi8IrMGuzVBVfOxLNrKLvSHcN8gGZhyGF
// SIG // oDkPgyGNZ2N2huQzg4sDdaychG/pm1g2oK3VcXJ3K+lC
// SIG // ijuPXqDU1xFvrHFH+hsFxtChMpkCAwEAAaOCAUkwggFF
// SIG // MB0GA1UdDgQWBBSv0FyjTt+WwTDs90eYIl+wJWtjmjAf
// SIG // BgNVHSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBf
// SIG // BgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jv
// SIG // c29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBU
// SIG // aW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYI
// SIG // KwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01p
// SIG // Y3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEw
// SIG // KDEpLmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQM
// SIG // MAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZkXXar0Lso0acdBxsbzqn3xa
// SIG // 24BQINI/Nr9L+0fv/Gu9EtleLe8imCkrEBiOqb7dQPCR
// SIG // prmco5iF5sNtwJCOW2ZMb0oMLPK6wbScPb2pBHJHFhUG
// SIG // +yRum+tfMdLPUNwy9HUauOkGUZ5u1Ott+JXnL47LQKMN
// SIG // 9HT9E5yGnD1iqT3N0IAflg54JTdn3U9a7kOliFQXp5qY
// SIG // 6RvcqUQDSlMeTUXKXSQEFthahB00tzbW/tLQqiJDRyeW
// SIG // hbBenoUaL1madDGCM/W6SR4sdFa43S1TDqXu8L+trfdB
// SIG // N1KxNiplcKUOcLDA+mFLHKArEkUGawOQG8EzgmSaXhts
// SIG // 97w6P4brzyvE3kydi7bvyLV4MSJSDkKf7WxwIjfF6bcP
// SIG // yZiGYPXnUPxYg2iCMBuWB7H5tru08Dhcnejqi8NfGeY/
// SIG // yLwz85ZMFicZOkRyReXUuLN358i8NwxwXuQ2r+imAeJ/
// SIG // Mf3BJg/0eOP/IEuT37htbK4y3cshrcodCokQ0po8Pn2u
// SIG // 4tVT6HponQ1jWe5LDWnTGneGaA74JKjleAOmvjfByHPz
// SIG // +oNIq63sy1lIGyl0jfIh/UT/liRceXwRxOABca2wFENm
// SIG // Z+Yw5hwCN8GHEA55xGD+dQO+VhcD7Lwa3629fumtX7kx
// SIG // B9QGHTjjMvH1/MSqNBNGLPu28SLxT7FKUs3xYwaJZocw
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
// SIG // 2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDUDCC
// SIG // AjgCAQEwgfmhgdGkgc4wgcsxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9w
// SIG // ZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // Tjo3RjAwLTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsO
// SIG // AwIaAxUAThIvkv2VRXusNSHd9ZuioHtupTSggYMwgYCk
// SIG // fjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDANBgkq
// SIG // hkiG9w0BAQsFAAIFAOia9p0wIhgPMjAyMzA4MzExMTIz
// SIG // MDlaGA8yMDIzMDkwMTExMjMwOVowdzA9BgorBgEEAYRZ
// SIG // CgQBMS8wLTAKAgUA6Jr2nQIBADAKAgEAAgIbOAIB/zAH
// SIG // AgEAAgITLTAKAgUA6JxIHQIBADA2BgorBgEEAYRZCgQC
// SIG // MSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQow
// SIG // CAIBAAIDAYagMA0GCSqGSIb3DQEBCwUAA4IBAQAMzk3x
// SIG // hwvcn0SUG0m1+DvegxxhMwx6oJhPYPIGMc2e6vw7a4Np
// SIG // FA0cs3pSgXnluIcSXCVBg73Oub/3T2M9gvAI6L8eNCys
// SIG // BnEe00TzWLgYX3Jl/J2rsT0WhHuOTdDZTcg5EnonS/bu
// SIG // jMgbxQuVZOkOVrtcxo5KttldS93MkJHNK+rQ9ceRGjHL
// SIG // x2qMmvtLOHIUhAhqKmmmRkZVEpxiCZqI0+u06QczvxoW
// SIG // hwCIa64Onzs1+aQW1BUau2teDuacRc1MX2eOqMcF733H
// SIG // RwWEHL/8eknoMLuzENHAxDa0tSosKmDxnNDLqDPdqRqu
// SIG // 88M+/O61Y+9+oReKNUTdRaAHgUCKMYIEDTCCBAkCAQEw
// SIG // gZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAHVqQLPxafJ6VoAAQAAAdUwDQYJYIZIAWUDBAIBBQCg
// SIG // ggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAv
// SIG // BgkqhkiG9w0BCQQxIgQgvrTr0bPBmXze4mbjhccwva0t
// SIG // ySMSdPlaADFjSI2abKwwgfoGCyqGSIb3DQEJEAIvMYHq
// SIG // MIHnMIHkMIG9BCDZvyOGDNeuiTDOxCiHGL5XG69gh4yg
// SIG // tC1DpqWSGwbB/zCBmDCBgKR+MHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwAhMzAAAB1akCz8WnyelaAAEAAAHV
// SIG // MCIEIAx+QviGyhH/ila9LlrMn6uClu93sCGDIXacU76i
// SIG // CgFiMA0GCSqGSIb3DQEBCwUABIICAHQOxVVV1cl3h14u
// SIG // lxlE1WUmSjANg7Egg2Uavarpz8b8j5Z5EUPsOiWsxfj5
// SIG // fWLikFSeJFy5v7c9PC0S02zXEUU5+f8ekcOohONSOVk8
// SIG // GCqiMSoW/SuCsABaVl/KN6btQia3l20UX0SmbZziSocL
// SIG // C9SLCPvussfpf90snjPLYfHy95Jl95T3KDOxVXNftas1
// SIG // aBunxHgcWpHgJu774ecIwe8/9jlETdoMAJHfqaBB15mW
// SIG // zNhv97/mXHGnXfzsLCGcXEYkUTjJLz2sQWq6u6drhkwC
// SIG // EYlp4kLUtNHECV5i6AGrfpBgLsvoMLMxUCc5PIZChmXQ
// SIG // CafSe4c70FY+hHq3rJK4WnD4YrAAAEd1XdZxmTliE7FI
// SIG // UdQAbRoApBdg5S4jmNqowgm/qvG/uUR1EVdci9Pdi0pO
// SIG // ush2nSy3YxcTCfiSAIdDjDGDSWor60LlhmXdNrZ5Au1O
// SIG // wTtGZxxKLZGrk4vMc1u8rjhYeVJ3T3+MEqymIlNEDdgM
// SIG // u3YJS5tCfIBQVmU887I4AVNAH/IrdKo1l7dzNJjwRfu0
// SIG // Y4HjlNCRU+xfEetOzFTlsV07MhGG2E6eEoHsCbjU+1Q4
// SIG // KkhaKSbVDZKfTCVz8RC1hitC45Hj6fz41TTTrs+x/bli
// SIG // TUjufRjpWN9Ij05F/FM26El+srtIN+iW95NW9x+W78c/
// SIG // dRy9GtbA
// SIG // End signature block
