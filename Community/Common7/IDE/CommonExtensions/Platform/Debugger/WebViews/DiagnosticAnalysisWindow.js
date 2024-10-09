var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("IndeterminateCheckbox", ["require", "exports"], function (require, exports) {
    "use strict";
    var CheckedState = (function () {
        function CheckedState() {
        }
        CheckedState.Unchecked = false;
        CheckedState.Checked = true;
        CheckedState.Indeterminate = null;
        return CheckedState;
    }());
    exports.CheckedState = CheckedState;
    ko.bindingHandlers["checkedState"] = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            if (element.type !== "checkbox") {
                return;
            }
            element.indeterminate = false;
            var onCheckBoxClicked = function () {
                var modelValue = valueAccessor();
                modelValue(element.checked);
                return false;
            };
            var updateCheckboxView = function () {
                var modelValue = valueAccessor();
                var value = modelValue();
                if (value !== element.checked) {
                    element.checked = modelValue();
                }
                element.indeterminate = (value === CheckedState.Indeterminate);
            };
            ko.utils.registerEventHandler(element, "click", onCheckBoxClicked);
            ko.computed(updateCheckboxView, null, { disposeWhenNodeIsRemoved: element });
        }
    };
    ko.bindingHandlers["ariaCheckedState"] = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var ariaChecked = "false";
            if (value) {
                ariaChecked = "true";
            }
            else if (value === CheckedState.Indeterminate) {
                ariaChecked = "mixed";
            }
            element.setAttribute("aria-checked", ariaChecked);
        }
    };
});
define("Constants", ["require", "exports"], function (require, exports) {
    "use strict";
    var Constants = (function () {
        function Constants() {
        }
        Constants.EnterKeyCode = 13;
        Constants.SpaceKeyCode = 32;
        Constants.LeftClickCode = 1;
        Constants.RightClickCode = 3;
        Constants.CtrlKeyCode = 17;
        Constants.CKeyCode = 67;
        Constants.RoslynAnalyzerId = "2F9CD6E6-C93F-4020-ACFD-C85AE0C551B9";
        return Constants;
    }());
    exports.Constants = Constants;
});
define("AnalysisResults", ["require", "exports"], function (require, exports) {
    "use strict";
    var AnalysisDescriptor = (function () {
        function AnalysisDescriptor() {
        }
        return AnalysisDescriptor;
    }());
    exports.AnalysisDescriptor = AnalysisDescriptor;
    var AnalysisResult = (function () {
        function AnalysisResult(errorCode, summary, potentialFix, analyzerId, analyzerName, window, debugContext) {
            this.ErrorCode = errorCode;
            this.ErrorName = Microsoft.Plugin.Resources.getString("UnnamedError");
            this.DebugContext = debugContext;
            this.Summary = summary.replace(/\\"/g, '"');
            this.PotentialFix = potentialFix;
            this.AnalyzerId = analyzerId;
            this.AnalyzerName = analyzerName;
            this.DiagnosticAnalysisWindow = window;
            this.initializeName();
        }
        AnalysisResult.prototype.initializeName = function () {
            var errorInfo = AnalysisResult.errorCodeResources[this.ErrorCode];
            var resourceName = errorInfo[0];
            this.IsWarning = errorInfo[1];
            if (!resourceName) {
                resourceName = "UnnamedError";
                this.IsWarning = false;
            }
            this.ErrorName = Microsoft.Plugin.Resources.getString(resourceName);
        };
        AnalysisResult.errorCodeResources = {
            "AA0000": ["UnnamedError", false],
            "AA0001": ["SyncOverAsyncError", true],
            "AA0002": ["AsyncVoidError", true],
            "AA0003": ["FinalizerQueueErrorCode", true],
            "AA0004": ["SyncAsyncMainError", false],
            "AA0005": ["SyncAsyncStarvedError", false],
            "AA0006": ["SyncAsyncStressError", true],
            "AA0007": ["SyncAsyncThreadQueueError", true],
            "AA0008": ["ThreadPoolStarvedError", false],
            "AA0009": ["ThreadPoolStressedError", true],
            "AA0010": ["ThreadPoolQueueStressedError", true],
            "AA0011": ["FinalizableObjectsErrorCode", true],
            "AA0012": ["DeadlockedThreadsError", false]
        };
        return AnalysisResult;
    }());
    exports.AnalysisResult = AnalysisResult;
    function findAnalysisResultType(resultJson, DiagnosticAnalysisWindow) {
        var errorCode = resultJson.ErrorCode;
        var summary = resultJson.Description;
        var potentialFix = resultJson.PotentialFix;
        var analyzerId = resultJson.AnalyzerId;
        var analyzerName = resultJson.AnalyzerName;
        var debugContext = resultJson.DebugContext;
        return new AnalysisResult(errorCode, summary, potentialFix, analyzerId, analyzerName, DiagnosticAnalysisWindow, debugContext);
    }
    exports.findAnalysisResultType = findAnalysisResultType;
});
define("ResultListViewModel", ["require", "exports", "Shared/Interfaces", "Shared/DataGrid/DataGridViewModel", "Shared/DataGrid/DataGridHeaderViewModel", "Shared/SortFunctions"], function (require, exports, Interfaces_1, DataGridViewModel_1, DataGridHeaderViewModel_1, SortFunctions_1) {
    "use strict";
    var ResultListRow = (function () {
        function ResultListRow(analysisResult, id) {
            this._id = id;
            this._analysisResult = analysisResult;
            this._selected = ko.observable(false);
        }
        ResultListRow.prototype.invoke = function () {
        };
        Object.defineProperty(ResultListRow.prototype, "resultCode", {
            get: function () {
                return this._analysisResult.ErrorCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListRow.prototype, "resultName", {
            get: function () {
                return this._analysisResult.ErrorName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListRow.prototype, "iconStatusClassName", {
            get: function () {
                if (this._analysisResult.IsWarning) {
                    return "icon-warning";
                }
                return "icon-error";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListRow.prototype, "templateName", {
            get: function () {
                return "ResultListRowTemplate";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListRow.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListRow.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        return ResultListRow;
    }());
    exports.ResultListRow = ResultListRow;
    var ResultListDAO = (function () {
        function ResultListDAO() {
            this._rows = [];
        }
        ResultListDAO.prototype.getCount = function (resultId) {
            return Microsoft.Plugin.Promise.as(this._rows.length);
        };
        ResultListDAO.prototype.getRows = function (resultId, sortInfo) {
            return Microsoft.Plugin.Promise.as(this._rows);
        };
        ResultListDAO.prototype.search = function (query, isCaseSensitive, isRegex, startingRow, sortInfo) {
            return null;
        };
        ResultListDAO.prototype.sort = function (rows, sortInfo) {
            var sortFunc = SortFunctions_1.SortFunctions.stringSort(sortInfo.columnId, sortInfo.direction);
            rows.sort(sortFunc);
            return Microsoft.Plugin.Promise.as(rows);
        };
        ResultListDAO.prototype.setResults = function (results) {
            this._rows = results.map(function (result, i) { return new ResultListRow(result, i); });
        };
        return ResultListDAO;
    }());
    exports.ResultListDAO = ResultListDAO;
    var ResultListColumnSettingsProvider = (function () {
        function ResultListColumnSettingsProvider() {
        }
        ResultListColumnSettingsProvider.prototype.getColumnSettings = function () {
            return Microsoft.Plugin.Promise.as([
                { columnId: "resultCode", isHidden: false, width: 50 },
                { columnId: "resultName", isHidden: false, width: 650 }
            ]);
        };
        ResultListColumnSettingsProvider.prototype.onColumnChanged = function (column) {
        };
        return ResultListColumnSettingsProvider;
    }());
    exports.ResultListColumnSettingsProvider = ResultListColumnSettingsProvider;
    var ResultListViewModel = (function () {
        function ResultListViewModel() {
            var headerColumns = [
                { id: "resultCode", text: Microsoft.Plugin.Resources.getString("ResultHeaderCodeLabel"), hideable: false, sortable: Interfaces_1.SortDirection.Desc },
                { id: "resultName", text: Microsoft.Plugin.Resources.getString("ResultHeaderResultLabel"), hideable: false, sortable: null }
            ];
            var headerViewModel = new DataGridHeaderViewModel_1.DataGridHeaderViewModel(headerColumns, new ResultListColumnSettingsProvider(), "code");
            this._resultListAccess = new ResultListDAO();
            this._selectedResult = ko.observable(null);
            this._resultList = new DataGridViewModel_1.DataGridViewModel(this._resultListAccess, headerViewModel, "");
            this._resultList.selectedRows.subscribe(this.selectionChanged.bind(this));
        }
        Object.defineProperty(ResultListViewModel.prototype, "results", {
            set: function (value) {
                this._resultListAccess.setResults(value);
                this._resultList.onResultChanged(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListViewModel.prototype, "dataGrid", {
            get: function () {
                return this._resultList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultListViewModel.prototype, "selectedResult", {
            get: function () {
                return this._selectedResult;
            },
            enumerable: true,
            configurable: true
        });
        ResultListViewModel.prototype.selectionChanged = function (selection) {
            if (selection.length != 1) {
                return;
            }
            var row = this._resultList.rows()[selection[selection.length - 1]];
            this._selectedResult(row._analysisResult);
        };
        return ResultListViewModel;
    }());
    exports.ResultListViewModel = ResultListViewModel;
});
define("ResultsAreaViewModel", ["require", "exports", "ResultListViewModel"], function (require, exports, rlvm) {
    "use strict";
    var ResultsAreaViewModel = (function () {
        function ResultsAreaViewModel(adaptor) {
            this._isErrorVisible = ko.observable(false);
            this._errorString = ko.observable(null);
            this._isResultsVisible = ko.observable(false);
            this._rlvm = new rlvm.ResultListViewModel();
            this._isResultDetailsVisible = ko.observable(false);
            this._details = ko.observable(null);
            this._showStackLink = ko.observable(false);
            this._fix = ko.observable(null);
            this._showStackListener = [];
            this._rlvm.selectedResult.subscribe(this.onResultSelected.bind(this));
            this._adaptor = adaptor;
            this._isInitialized = false;
        }
        Object.defineProperty(ResultsAreaViewModel.prototype, "isErrorVisible", {
            get: function () { return this._isErrorVisible; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "errorString", {
            get: function () { return this._errorString; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "isResultsVisible", {
            get: function () { return this._isResultsVisible; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "resultListViewModel", {
            get: function () { return this._rlvm; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "isDetailsVisible", {
            get: function () { return this._isResultDetailsVisible; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "summary", {
            get: function () { return this._details; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "showStackLink", {
            get: function () { return this._showStackLink; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "stackLinkText", {
            get: function () { return Microsoft.Plugin.Resources.getString("showCallStackMessage"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "fix", {
            get: function () { return this._fix; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "resultHeader", {
            get: function () { return Microsoft.Plugin.Resources.getString("AnalysisResultsHeader"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "summaryHeader", {
            get: function () { return Microsoft.Plugin.Resources.getString("AnalysisSummaryHeader"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "fixHeader", {
            get: function () { return Microsoft.Plugin.Resources.getString("PotentialFixHeader"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "selectedResult", {
            get: function () { return this._rlvm.selectedResult(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResultsAreaViewModel.prototype, "results", {
            set: function (results) {
                if (!results || results.length <= 0) {
                    this.isResultsVisible(false);
                    return;
                }
                this.isErrorVisible(false);
                this.isResultsVisible(true);
                this._rlvm.results = results;
                if (!this._isInitialized) {
                    this._isInitialized = true;
                    this._rlvm.dataGrid.onAfterDomInsert([document.getElementById("resultList")], this._rlvm.dataGrid);
                }
                else {
                    var e = document.createEvent('Event');
                    e.initEvent("scroll", true, true);
                    document.getElementById("resultList").dispatchEvent(e);
                }
            },
            enumerable: true,
            configurable: true
        });
        ResultsAreaViewModel.prototype.stackLinkClicked = function () {
            if (this._rlvm.selectedResult) {
                var result_1 = this._rlvm.selectedResult();
                this._showStackListener.forEach(function (func) {
                    func(result_1);
                });
            }
        };
        ResultsAreaViewModel.prototype.subscribeStackLinkClicked = function (func) {
            this._showStackListener.push(func);
        };
        ResultsAreaViewModel.prototype.unsubscribeStackLinkClicked = function (func) {
            var index = -1;
            for (var i = 0; i < this._showStackListener.length; ++i) {
                if (this._showStackListener[i] === func) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                this._showStackListener.splice(index, 1);
            }
        };
        ResultsAreaViewModel.prototype.setError = function (error) {
            this.isResultsVisible(false);
            this.isDetailsVisible(false);
            if (error) {
                this.errorString(error);
                this.isErrorVisible(true);
            }
            else {
                this.isErrorVisible(false);
            }
        };
        ResultsAreaViewModel.prototype.onResultSelected = function (result) {
            this.summary(result.Summary);
            this.fix(result.PotentialFix);
            this.isDetailsVisible(true);
            this.showStackLink(result.DebugContext !== null);
            this._adaptor._call("OnSelectResultTelemetry", result.AnalyzerId, result.ErrorCode);
        };
        return ResultsAreaViewModel;
    }());
    exports.ResultsAreaViewModel = ResultsAreaViewModel;
});
define("AnalyzerRowViewModel", ["require", "exports", "IndeterminateCheckbox", "Constants"], function (require, exports, IndeterminateCheckBox_1, Constants_1) {
    "use strict";
    var AnalyzerRowViewModel = (function () {
        function AnalyzerRowViewModel(parentVM, rowId, name, expandable, uniqueId, showDecompilationWarning) {
            this._selected = ko.observable(false);
            this._expanded = ko.observable(false);
            this._children = ko.observableArray([]);
            this._arrowVisibility = ko.observable("visible");
            this._checkedState = ko.observable(IndeterminateCheckBox_1.CheckedState.Checked);
            this._rowId = rowId;
            this._name = name;
            this._showDecompilationWarning = showDecompilationWarning;
            this._expandable = expandable;
            this._uniqueId = uniqueId;
            this._parentVM = parentVM;
            if (!expandable) {
                this._arrowVisibility("hidden");
            }
        }
        Object.defineProperty(AnalyzerRowViewModel.prototype, "expandable", {
            get: function () { return this._expandable; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "checkedState", {
            get: function () { return this._checkedState; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "arrowVisibility", {
            get: function () { return this._arrowVisibility; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "uniqueId", {
            get: function () { return this._uniqueId; },
            enumerable: true,
            configurable: true
        });
        AnalyzerRowViewModel.prototype.onCheckboxClick = function (viewModel, event) {
            if (event.which !== Constants_1.Constants.LeftClickCode) {
                return true;
            }
            var checkbox = event.currentTarget;
            event.stopPropagation();
            this._parentVM.onClick(this._parentVM, event);
            if (this._showDecompilationWarning && checkbox.checked) {
                this._adaptor._call("ShowDecompilationWarningAsync").done(function (result) {
                    if (!result) {
                        checkbox.checked = false;
                    }
                });
            }
            return true;
        };
        Object.defineProperty(AnalyzerRowViewModel.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        AnalyzerRowViewModel.prototype.expand = function () {
            var _this = this;
            var dataLoadPromise = Microsoft.Plugin.Promise.as(null).then(function () {
                _this._expanded(!_this._expanded());
                var e = document.createEvent('Event');
                e.initEvent("resize", true, true);
                document.getElementById("analyzerList").dispatchEvent(e);
            });
            return dataLoadPromise;
        };
        AnalyzerRowViewModel.prototype.toggleCheckedState = function () {
            if (this.checkedState() === IndeterminateCheckBox_1.CheckedState.Unchecked) {
                this.checkedState(IndeterminateCheckBox_1.CheckedState.Checked);
            }
            else {
                this.checkedState(IndeterminateCheckBox_1.CheckedState.Unchecked);
            }
        };
        Object.defineProperty(AnalyzerRowViewModel.prototype, "depth", {
            get: function () {
                if (this.expandable) {
                    return 0;
                }
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "templateName", {
            get: function () {
                return "AnalyzerListRowTemplate";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "id", {
            get: function () {
                return this._rowId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerRowViewModel.prototype, "children", {
            get: function () {
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        AnalyzerRowViewModel.prototype.invoke = function () {
        };
        return AnalyzerRowViewModel;
    }());
    exports.AnalyzerRowViewModel = AnalyzerRowViewModel;
});
define("AnalyzerTreeGridDAO", ["require", "exports", "IndeterminateCheckbox", "Constants", "AnalyzerRowViewModel"], function (require, exports, IndeterminateCheckBox_2, Constants_2, arvm) {
    "use strict";
    var AnalyzerTreeGridDAO = (function () {
        function AnalyzerTreeGridDAO(analyzerListVM) {
            this._analyses = null;
            this._updating = false;
            this._analyzerListVM = analyzerListVM;
        }
        AnalyzerTreeGridDAO.prototype.updateTreeRows = function (analysisList) {
            this._analyses = analysisList;
        };
        Object.defineProperty(AnalyzerTreeGridDAO.prototype, "defaultSortColumnId", {
            get: function () {
                return "name";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerTreeGridDAO.prototype, "analyses", {
            get: function () {
                return this._analyses;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerTreeGridDAO.prototype, "analyzerListVM", {
            get: function () { return this._analyzerListVM; },
            enumerable: true,
            configurable: true
        });
        AnalyzerTreeGridDAO.prototype.getRoots = function (resultId, sortInfo) {
            var _this = this;
            var continuation = function (analysisList) {
                var rows = [];
                var analysisSet = {};
                var rowId = 0;
                var _loop_1 = function(analysis) {
                    if (!analysis.AnalyzerId) {
                        return "continue";
                    }
                    var id = analysis.AnalyzerId.toUpperCase();
                    if (!analysisSet[id]) {
                        analysisSet[id] = true;
                        var showDecompilationWarning = (id === Constants_2.Constants.RoslynAnalyzerId);
                        var vm_1 = new arvm.AnalyzerRowViewModel(_this._analyzerListVM.analyzerList, rowId++, analysis.AnalyzerName, true, id, showDecompilationWarning);
                        vm_1.checkedState.subscribe(function (newValue) { _this.updateCheckedState(newValue, vm_1, null); });
                        rows.push(vm_1);
                    }
                };
                for (var _i = 0, analysisList_1 = analysisList; _i < analysisList_1.length; _i++) {
                    var analysis = analysisList_1[_i];
                    var state_1 = _loop_1(analysis);
                    if (state_1 === "continue") continue;
                }
                return rows;
            };
            return Microsoft.Plugin.Promise.wrap(this._analyses).then(continuation);
        };
        AnalyzerTreeGridDAO.prototype.expand = function (row, sortInfo) {
            var _this = this;
            var vmr = row;
            return vmr.expand().then(function () { return _this.loadChildren(vmr); });
        };
        AnalyzerTreeGridDAO.prototype.search = function (query, isCaseSensitive, isRegex, startingRow, sortInfo) {
            throw new Error("Method not implemented.");
        };
        AnalyzerTreeGridDAO.prototype.sort = function (roots, sortInfo) {
            return Microsoft.Plugin.Promise.as(roots);
        };
        AnalyzerTreeGridDAO.prototype.loadChildren = function (vmr) {
            var _this = this;
            if (vmr.children().length == 0) {
                var rows = [];
                var rowId = 0;
                var _loop_2 = function(analysis) {
                    if (!analysis.AnalyzerId) {
                        return "continue";
                    }
                    var id = analysis.AnalyzerId.toUpperCase();
                    if (id === vmr.uniqueId) {
                        var showDecompilationWarning = (id === Constants_2.Constants.RoslynAnalyzerId);
                        var vm_2 = new arvm.AnalyzerRowViewModel(this_1._analyzerListVM.analyzerList, rowId++, analysis.AnalysisName, false, analysis.AnalysisId, showDecompilationWarning);
                        vm_2.checkedState.subscribe(function (newValue) { _this.updateCheckedState(newValue, vm_2, vmr); });
                        rows.push(vm_2);
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = this._analyses; _i < _a.length; _i++) {
                    var analysis = _a[_i];
                    var state_2 = _loop_2(analysis);
                    if (state_2 === "continue") continue;
                }
                vmr.children(rows);
            }
        };
        AnalyzerTreeGridDAO.prototype.updateCheckedState = function (newValue, viewModel, parentViewModel) {
            if (this._updating) {
                return;
            }
            this._updating = true;
            if (!parentViewModel) {
                this.loadChildren(viewModel);
                if (newValue !== IndeterminateCheckBox_2.CheckedState.Indeterminate) {
                    for (var _i = 0, _a = viewModel.children(); _i < _a.length; _i++) {
                        var child = _a[_i];
                        var childVm = child;
                        childVm.checkedState(newValue);
                    }
                }
            }
            else {
                var children = parentViewModel.children();
                if (children.length > 0) {
                    var child = children[0];
                    var state = child.checkedState();
                    for (var i = 1; i < children.length; ++i) {
                        child = children[i];
                        if (child.checkedState() !== state) {
                            state = IndeterminateCheckBox_2.CheckedState.Indeterminate;
                            break;
                        }
                    }
                    parentViewModel.checkedState(state);
                }
            }
            this._updating = false;
        };
        return AnalyzerTreeGridDAO;
    }());
    exports.AnalyzerTreeGridDAO = AnalyzerTreeGridDAO;
});
define("AnalyzerListColumnSettingsProvider", ["require", "exports"], function (require, exports) {
    "use strict";
    var AnalyzerListColumnSettingsProvider = (function () {
        function AnalyzerListColumnSettingsProvider() {
        }
        AnalyzerListColumnSettingsProvider.prototype.getColumnSettings = function () {
            return Microsoft.Plugin.Promise.as([
                { columnId: "name", isHidden: false, width: 250 }
            ]);
        };
        AnalyzerListColumnSettingsProvider.prototype.onColumnChanged = function (column) {
        };
        return AnalyzerListColumnSettingsProvider;
    }());
    exports.AnalyzerListColumnSettingsProvider = AnalyzerListColumnSettingsProvider;
});
define("AnalyzerListViewModel", ["require", "exports", "Shared/Grid/TreeGridViewModel", "AnalyzerTreeGridDAO", "AnalyzerListColumnSettingsProvider", "Shared/Grid/TreeGridHeaderViewModel", "Constants", "IndeterminateCheckbox"], function (require, exports, TreeGridViewModel_1, AnalyzerTreeGridDAO_1, AnalyzerListColumnSettingsProvider_1, TreeGridHeaderViewModel_1, Constants_3, IndeterminateCheckBox_3) {
    "use strict";
    var CheckBoxTreeGridViewModel = (function (_super) {
        __extends(CheckBoxTreeGridViewModel, _super);
        function CheckBoxTreeGridViewModel(dao, header, ariaLabel) {
            _super.call(this, dao, header, ariaLabel);
            this._atgDao = dao;
        }
        CheckBoxTreeGridViewModel.prototype.onKeyDown = function (viewModel, event) {
            if (event.keyCode == Constants_3.Constants.SpaceKeyCode) {
                var row = this.focusedRow();
                row.toggleCheckedState();
                return false;
            }
            return _super.prototype.onKeyDown.call(this, viewModel, event);
        };
        CheckBoxTreeGridViewModel.prototype.onClick = function (viewModel, event) {
            return _super.prototype.onClick.call(this, viewModel, event);
        };
        Object.defineProperty(CheckBoxTreeGridViewModel.prototype, "dataAccessObject", {
            get: function () { return this._atgDao; },
            enumerable: true,
            configurable: true
        });
        return CheckBoxTreeGridViewModel;
    }(TreeGridViewModel_1.TreeGridViewModel));
    exports.CheckBoxTreeGridViewModel = CheckBoxTreeGridViewModel;
    var AnalyzerListViewModel = (function () {
        function AnalyzerListViewModel() {
            var _this = this;
            this._processName = ko.observable("");
            this._canRunAnalysis = ko.observable(true);
            this._processHeader = ko.pureComputed(function () { return _this.processHeaderString(); });
            this._areAnalysesVisible = ko.observable(false);
            this.processId = null;
            this._analyzerListDAO = new AnalyzerTreeGridDAO_1.AnalyzerTreeGridDAO(this);
            this._header = new TreeGridHeaderViewModel_1.TreeGridHeaderViewModel([{ id: "name", text: Microsoft.Plugin.Resources.getString("AvailableAnalyses"), hideable: false }], new AnalyzerListColumnSettingsProvider_1.AnalyzerListColumnSettingsProvider(), this._analyzerListDAO.defaultSortColumnId);
            this._analyzerList = new CheckBoxTreeGridViewModel(this._analyzerListDAO, this._header, "");
        }
        Object.defineProperty(AnalyzerListViewModel.prototype, "analyzeButtonLabel", {
            get: function () { return Microsoft.Plugin.Resources.getString("AnalyzeButtonLabel"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerListViewModel.prototype, "canRunAnalysis", {
            get: function () { return this._canRunAnalysis; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerListViewModel.prototype, "processName", {
            get: function () { return this._processName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerListViewModel.prototype, "processHeader", {
            get: function () { return this._processHeader; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerListViewModel.prototype, "areAnalysesVisible", {
            get: function () { return this._areAnalysesVisible; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnalyzerListViewModel.prototype, "analyzerList", {
            get: function () { return this._analyzerList; },
            enumerable: true,
            configurable: true
        });
        AnalyzerListViewModel.prototype.getSelectedAnalyses = function () {
            var selected = {};
            this._analyzerListDAO.analyses.forEach(function (a) { selected[a.AnalysisId] = a; });
            for (var _i = 0, _a = this._analyzerList.roots(); _i < _a.length; _i++) {
                var root = _a[_i];
                for (var _b = 0, _c = root.children(); _b < _c.length; _b++) {
                    var child = _c[_b];
                    var vmr = child;
                    if (vmr.checkedState() === IndeterminateCheckBox_3.CheckedState.Unchecked) {
                        if (selected[vmr.uniqueId]) {
                            delete selected[vmr.uniqueId];
                        }
                    }
                }
            }
            return Object.keys(selected).map(function (k) { return selected[k]; });
        };
        AnalyzerListViewModel.prototype.onAfterRender = function (elements, viewModel) {
            var this_ = viewModel.dataAccessObject.analyzerListVM;
            if (this_.areAnalysesVisible()) {
                viewModel.onAfterDomInsert(elements, viewModel);
            }
            else {
                var subscribed_1 = this_.areAnalysesVisible.subscribe(function (visible) {
                    if (visible) {
                        viewModel.onAfterDomInsert(elements, viewModel);
                        subscribed_1.dispose();
                    }
                });
            }
        };
        AnalyzerListViewModel.prototype.updateTreeGrid = function (analysisList) {
            this._analyzerListDAO.updateTreeRows(analysisList);
            this._analyzerList.onResultChanged(0);
        };
        AnalyzerListViewModel.prototype.processHeaderString = function () {
            if (this.processName) {
                return Microsoft.Plugin.Resources.getString("DiagnosticAnalysisHeader", this.processName());
            }
            return Microsoft.Plugin.Resources.getString("NoProcessSelected");
        };
        return AnalyzerListViewModel;
    }());
    exports.AnalyzerListViewModel = AnalyzerListViewModel;
});
define("ViewModelCache", ["require", "exports"], function (require, exports) {
    "use strict";
    var CachedViewModel = (function () {
        function CachedViewModel() {
            this.analysisArea = null;
            this.resultsArea = null;
        }
        return CachedViewModel;
    }());
    exports.CachedViewModel = CachedViewModel;
    var ViewModelCache = (function () {
        function ViewModelCache() {
            this._cache = {};
        }
        ViewModelCache.prototype.cacheView = function (analysisArea, resultsArea) {
            if (resultsArea && analysisArea && analysisArea.processId) {
                this._cache[analysisArea.processId] = {
                    analysisArea: analysisArea,
                    resultsArea: resultsArea
                };
            }
        };
        ViewModelCache.prototype.getcache = function (processGuid) {
            if (processGuid) {
                return this._cache[processGuid];
            }
            return null;
        };
        return ViewModelCache;
    }());
    exports.ViewModelCache = ViewModelCache;
});
define("DiagnosticAnalysisWindow", ["require", "exports", "Constants", "AnalysisResults", "ResultsAreaViewModel", "AnalyzerListViewModel", "ViewModelCache", "Shared/CustomBindings/AriaExpanded"], function (require, exports, Constants_4, ar, rv, al, vmc) {
    "use strict";
    var AnalysesUpdatedEventArgs = (function () {
        function AnalysesUpdatedEventArgs() {
        }
        return AnalysesUpdatedEventArgs;
    }());
    var OverallViewModel = (function () {
        function OverallViewModel() {
            this.AnalyzerListViewModel = ko.observable(null);
            this.ResultsAreaViewModel = ko.observable(null);
        }
        return OverallViewModel;
    }());
    var DiagnosticAnalysisViewer = (function () {
        function DiagnosticAnalysisViewer(adaptor) {
            this._stackLinkClickedListener = null;
            this._adaptor = adaptor;
            this._stackLinkClickedListener = this.showStackLinkClicked.bind(this);
            this._isInitialized = false;
            this._cache = null;
            this._overallViewModel = new OverallViewModel();
            this._adaptor.addEventListener("AnalysesUpdated", this.onAnalysesUpdated.bind(this));
        }
        Object.defineProperty(DiagnosticAnalysisViewer.prototype, "adaptor", {
            get: function () { return this._adaptor; },
            enumerable: true,
            configurable: true
        });
        DiagnosticAnalysisViewer.prototype.removeHighlighting = function () {
            var highlightedSections = document.getElementsByClassName("highlightedText");
            for (var i = 0; i < highlightedSections.length; i++) {
                var section = highlightedSections[i];
                section.classList.remove("highlightedText");
            }
        };
        DiagnosticAnalysisViewer.prototype.analyzeButtonClicked = function () {
            var _this = this;
            this._overallViewModel.AnalyzerListViewModel().canRunAnalysis(false);
            var selected = this._overallViewModel.AnalyzerListViewModel().getSelectedAnalyses();
            if (selected.length === 0) {
                this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("NoAnalyzerSelectedError"));
                return;
            }
            var analysisCompleted = function (completedResults, exception) {
                var results = [];
                if (completedResults) {
                    for (var _i = 0, completedResults_1 = completedResults; _i < completedResults_1.length; _i++) {
                        var analysisResult = completedResults_1[_i];
                        var resultObject = ar.findAnalysisResultType(analysisResult, _this);
                        results.push(resultObject);
                    }
                }
                if (completedResults) {
                    if (results.length === 0) {
                        _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("NoAnalysisResultsAvailable"));
                    }
                    else {
                        _this._overallViewModel.ResultsAreaViewModel().results = results;
                    }
                }
                else {
                    _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("AnalysisCanceled"));
                }
                _this._overallViewModel.AnalyzerListViewModel().canRunAnalysis(true);
            };
            this._adaptor._call("RunAnalysesAsync", selected).done(analysisCompleted);
        };
        DiagnosticAnalysisViewer.prototype.applyBindings = function () {
            if (!this._isInitialized) {
                ko.applyBindings(this._overallViewModel);
                this._isInitialized = true;
            }
        };
        DiagnosticAnalysisViewer.prototype.clearView = function () {
            if (this._overallViewModel.ResultsAreaViewModel()) {
                this._overallViewModel.ResultsAreaViewModel().unsubscribeStackLinkClicked(this._stackLinkClickedListener);
            }
            if (this._overallViewModel.AnalyzerListViewModel()) {
            }
        };
        DiagnosticAnalysisViewer.prototype.createView = function () {
            this.clearView();
            this._overallViewModel.AnalyzerListViewModel(new al.AnalyzerListViewModel());
            this._overallViewModel.ResultsAreaViewModel(new rv.ResultsAreaViewModel(this._adaptor));
            this._overallViewModel.ResultsAreaViewModel().subscribeStackLinkClicked(this._stackLinkClickedListener);
        };
        DiagnosticAnalysisViewer.prototype.resetView = function (processGuid) {
            this.cacheView();
            var cachedView = this._cache.getcache(processGuid);
            if (cachedView) {
                this.clearView();
                this._overallViewModel.AnalyzerListViewModel(cachedView.analysisArea);
                this._overallViewModel.ResultsAreaViewModel(cachedView.resultsArea);
                this._overallViewModel.ResultsAreaViewModel().subscribeStackLinkClicked(this._stackLinkClickedListener);
                return true;
            }
            return false;
        };
        DiagnosticAnalysisViewer.prototype.cacheView = function () {
            if (!this._cache) {
                this._cache = new vmc.ViewModelCache();
            }
            this._cache.cacheView(this._overallViewModel.AnalyzerListViewModel(), this._overallViewModel.ResultsAreaViewModel());
        };
        DiagnosticAnalysisViewer.prototype.onAnalysesUpdated = function (args) {
            if (args.Reason === "DEBUGGERSTOPPED") {
                this._cache = null;
            }
            else if (this.resetView(args.ProcessGuid)) {
                return;
            }
            this.refreshAnalysisModel();
        };
        DiagnosticAnalysisViewer.prototype.refreshAnalysisModel = function () {
            var _this = this;
            var refreshAnalysisModelCompleted = function (result) {
                var status = result.Status;
                var canRunAnalysis = Boolean(result.CanRunAnalysis);
                if (_this._overallViewModel.AnalyzerListViewModel() && _this._overallViewModel.AnalyzerListViewModel().processId) {
                    return;
                }
                _this._overallViewModel.AnalyzerListViewModel().canRunAnalysis(canRunAnalysis);
                _this._overallViewModel.AnalyzerListViewModel().areAnalysesVisible(false);
                _this._overallViewModel.AnalyzerListViewModel().processName(result.ProcessName);
                if (status === "RUNNING") {
                    _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("NotInBreakModeError"));
                    return;
                }
                else if (!result.ProcessName || (status === "NOPROCESS")) {
                    _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("NoProcessError"));
                    return;
                }
                else if (!canRunAnalysis) {
                    _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("UnableToRunAnalysis"));
                    return;
                }
                _this._overallViewModel.ResultsAreaViewModel().setError(null);
                _this._overallViewModel.AnalyzerListViewModel().areAnalysesVisible(true);
                if (result.length === 0) {
                    _this._overallViewModel.ResultsAreaViewModel().setError(Microsoft.Plugin.Resources.getString("NoAnalyzerDetectedError"));
                    return;
                }
                _this._overallViewModel.AnalyzerListViewModel().processId = result.ProcessGuid;
                _this._overallViewModel.AnalyzerListViewModel().updateTreeGrid(result.Analyses);
                _this.applyBindings();
            };
            this.cacheView();
            this.createView();
            this._adaptor._call("RefreshAnalysisModelAsync").done(refreshAnalysisModelCompleted);
        };
        DiagnosticAnalysisViewer.prototype.showStackLinkClicked = function (result) {
            this._adaptor._call("ShowCallStack", result.DebugContext, result.AnalyzerId, result.ErrorCode);
        };
        DiagnosticAnalysisViewer.prototype.onKeydownTextBox = function (data, event) {
            if (event.ctrlKey && (event.keyCode === Constants_4.Constants.CKeyCode)) {
                var currentTarget = event.currentTarget;
                this.CopyText(currentTarget);
                return false;
            }
            return true;
        };
        DiagnosticAnalysisViewer.prototype.onContextMenuTextBox = function (data, event) {
            var _this = this;
            var targetDivSection = event.currentTarget;
            var xPos = event.clientX;
            var yPos = event.clientY;
            this.removeHighlighting();
            targetDivSection.classList.add("highlightedText");
            event.cancelBubble = true;
            window.event.returnValue = false;
            var config = [
                {
                    label: Microsoft.Plugin.Resources.getString("CopyLabel"),
                    iconEnabled: "vs-image-menu-copy-enabled",
                    callback: function () { return _this.CopyText(targetDivSection); },
                    disabled: function () { return false; },
                    type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                }];
            var contextMenu = Microsoft.Plugin.ContextMenu.create(config);
            contextMenu.addEventListener("dismiss", function () { return _this.removeHighlighting(); });
            contextMenu.show(xPos, yPos);
            return false;
        };
        DiagnosticAnalysisViewer.prototype.CopyText = function (textDiv) {
            var textarea = document.createElement("textarea");
            if (textDiv.childNodes.length === 0) {
                return;
            }
            textarea.textContent = textDiv.innerText;
            document.body.appendChild(textarea);
            var selection = document.getSelection();
            var range = document.createRange();
            range.selectNode(textarea);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();
            document.body.removeChild(textarea);
            textDiv.classList.remove("highlightedText");
        };
        return DiagnosticAnalysisViewer;
    }());
    exports.DiagnosticAnalysisViewer = DiagnosticAnalysisViewer;
});

// SIG // Begin signature block
// SIG // MIIoOgYJKoZIhvcNAQcCoIIoKzCCKCcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // oNvP/EKnNhnSv34Hc2K6C3uUdUkGdYC6KINQvLoDEBWg
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
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCBIElFn/i555g5N
// SIG // hj4aLX8mCplHW01kO9qyDPZ/Cj7jQzBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAD6t348yp20mqmh8C64CiqX3AYGTFyLe
// SIG // sWuiHliAcJNXO1pII9SF6ttdkPzF+33uo44lq+m8YkBT
// SIG // ZAQY8ENWMaFoOBFmC/fFCODY4lmJ2CIkzSNUAocOh6O9
// SIG // OgEEK1RbPh00JRn3mQt9dIjGKizSBM9VELdEOYmE3sIu
// SIG // nwBxs4BYCgKu0b88R5OjHD2604SRG2Fzi46Kcv9dYtWF
// SIG // ZE101kT6xbMMMkkyZhU6+PvBuiUQM7N07V0R7F2tjBlx
// SIG // F38pzLZtX5vlyaxm24OMy3YKxX0FteUhCOKGPTa4LfY1
// SIG // TeAeMC9S6LZWNHpt55TymU3hu337d/LsnE5ypzOEyf38
// SIG // DcihgheXMIIXkwYKKwYBBAGCNwMDATGCF4Mwghd/Bgkq
// SIG // hkiG9w0BBwKgghdwMIIXbAIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // 1WwjYmNPw9S1gw4CIKzRNAiGwPknJO2YQcve2X7QQg8C
// SIG // BmTUylnAPBgTMjAyMzA4MzExODU4MzIuMDI0WjAEgAIB
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
// SIG // BgkqhkiG9w0BCQQxIgQgFmQXnDG72bKwFK10sCPXSbjX
// SIG // 9aUaTwLmB9kg2rvcbq0wgfoGCyqGSIb3DQEJEAIvMYHq
// SIG // MIHnMIHkMIG9BCDZvyOGDNeuiTDOxCiHGL5XG69gh4yg
// SIG // tC1DpqWSGwbB/zCBmDCBgKR+MHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwAhMzAAAB1akCz8WnyelaAAEAAAHV
// SIG // MCIEIAx+QviGyhH/ila9LlrMn6uClu93sCGDIXacU76i
// SIG // CgFiMA0GCSqGSIb3DQEBCwUABIICAJM/+t/ARmagyDVd
// SIG // VqHPmZBE16cu8Nxdp1eKedfz+5IYM1ysXG5FCzDdlU9J
// SIG // G+16kTsO5w0Cma/HWttWbtq5UTnfWHK86zcjW9ryYb4w
// SIG // I2ylbtro8D9P+ZiBa8SqCPtwYuHvPC9ZzkZWtGn4gaMy
// SIG // Zqw784bBUW97NYQ+IZmALZnUNYuiho72Z8OrB2aZCxAt
// SIG // xf30e879fFjgQKRkw3Fwi56n2rbF0NGB9SzxVD+y7Nhk
// SIG // 68PbbJ+mP3zzOWFiYFhANpfV87BvlYTGjDaFVJmR/yS4
// SIG // +s1jPxcEkHOOODKSW9LciyjNwEzDflh2cY8sr89WVwE1
// SIG // MZw01VlxRT9Qa3fRuD1H4gNT5M3WTXN3QNLZ/nq7OQaV
// SIG // ZhFleMxsi8gLotO1ZyRzW2hTJAEo5hgGPs5SrbmsFAI2
// SIG // 1ix/EORUnyqtTUNrU/CIzo0M4cM7XbDveswvZJ9R0ZmX
// SIG // Ii7e6WoeQr4Safbj3uuoqH/5OdiqlRGSonK2MeRAYUzt
// SIG // CXWjfSrexCU5KF9rSm+GdDCf/AI+z0XTCCGm0R6nBJ8O
// SIG // HHBcn6S8lndoTVf/pveptcrEohMlDQerOP/mfjBJd12j
// SIG // 5ggFibjT6oySnhv2TB17cGci4goMPvudQCn1r6oojPmf
// SIG // hFNYgk2T1Cb7cDaKTTGZpa+iVzGI9np3Uhfg+nZbEzfV
// SIG // OYfWmj7k
// SIG // End signature block
