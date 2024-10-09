var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Util/keyCodes.ts" />
// <reference path="../../Common/Controls/templateControl.ts" />
// <reference path="../../Common/Util/formattingHelpers.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/SnapshotSummary.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/plugin.redirect.d.ts" />
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var SnapshotTileViewModel = (function (_super) {
            __extends(SnapshotTileViewModel, _super);
            function SnapshotTileViewModel(summary, snapshotSummaryCollection) {
                _super.call(this);
                this._summary = summary;
                this._snapshotSummaryCollection = snapshotSummaryCollection;
            }
            Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
                get: function () { return this._summary; },
                set: function (v) {
                    this._summary = v;
                    this.raisePropertyChanged("summaryData");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
                get: function () {
                    var date = new Date(this._summary.snapshot.timestamp);
                    return "(" + date.toLocaleTimeString() + ")";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSize", {
                get: function () {
                    return this.summaryData.nativeTotalSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDisplayString", {
                get: function () {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSize);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCount", {
                get: function () {
                    return this.summaryData.nativeTotalCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDisplayString", {
                get: function () {
                    return Microsoft.Plugin.Resources.getString("NativeCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCount, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.nativeTotalSize - previousSnapshot.nativeTotalSize;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiffDisplayString", {
                get: function () {
                    if (this.nativeSizeDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSizeDiff, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.nativeTotalCount - previousSnapshot.nativeTotalCount;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiffDisplayString", {
                get: function () {
                    if (this.nativeCountDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCountDiff, true, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSize", {
                get: function () {
                    return this.summaryData.managedTotalSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDisplayString", {
                get: function () {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSize);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCount", {
                get: function () {
                    return this.summaryData.managedTotalCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDisplayString", {
                get: function () {
                    return Microsoft.Plugin.Resources.getString("ManagedCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCount, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.managedTotalSize - previousSnapshot.managedTotalSize;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiffDisplayString", {
                get: function () {
                    if (this.managedSizeDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSizeDiff, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.managedTotalCount - previousSnapshot.managedTotalCount;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiffDisplayString", {
                get: function () {
                    if (this.managedCountDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCountDiff, true, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            SnapshotTileViewModel.prototype.getComparableSnapshots = function () {
                var result = [];
                for (var i = 0; i < this._snapshotSummaryCollection.length; i++) {
                    var summary = this._snapshotSummaryCollection.getItem(i);
                    if (summary.id !== this._summary.id) {
                        result.push(summary);
                    }
                }
                return result;
            };
            Object.defineProperty(SnapshotTileViewModel.prototype, "isFirstSnapshot", {
                get: function () {
                    return this.getPreviousSnapshot() === null;
                },
                enumerable: true,
                configurable: true
            });
            // Note we assume id === array index
            SnapshotTileViewModel.prototype.getPreviousSnapshot = function () {
                var previousId = this._summary.id - 1;
                if (previousId >= 0 && previousId < this._snapshotSummaryCollection.length) {
                    return this._snapshotSummaryCollection.getItem(previousId);
                }
                return null;
            };
            return SnapshotTileViewModel;
        }(MemoryProfiler.Common.Controls.ObservableViewModel));
        Summary.SnapshotTileViewModel = SnapshotTileViewModel;
        var SnapshotTileView = (function (_super) {
            __extends(SnapshotTileView, _super);
            function SnapshotTileView(controller, model) {
                _super.call(this, "SnapshotTileTemplate");
                this._controller = controller;
                this._model = model;
                this._controller.model.registerPropertyChanged(this);
                this._model.registerPropertyChanged(this);
                this._tileContextMenuItems = [];
                this._snapshotTile = this.findElement("snapshotTile");
                this._tileHeader = this.findElement("snapshotTileHeader");
                this.findElement("snapshotTileTitle").innerText = Microsoft.Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id + 1);
                this._screenshotHolder = this.findElement("snapshotTileImage");
                this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
                if (this._model.summaryData.snapshot.screenshotFile) {
                    this._screenshotHolder.src = this._model.summaryData.snapshot.screenshotFile;
                    this._screenshotNotAvailableMessage.style.display = "none";
                }
                this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
                this._screenshotNotAvailableMessage.innerText = Microsoft.Plugin.Resources.getString("ScreenshotNotAvailable");
                this._snapshotLoadingProgress = this.findElement("loadingSnapshotProgress");
                this.populateContextMenu();
                this.updateUI();
            }
            SnapshotTileView.prototype.updateUI = function () {
                this.populateWarningsSection();
                this.populateSummaryLinks();
                this.updateSnapshotDisplayType();
                this.updateLoadingProgress();
            };
            SnapshotTileView.prototype.populateWarningsSection = function () {
                this.findElement("snapshotTileWarnings").style.visibility = "hidden";
            };
            SnapshotTileView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "snapshotDisplayType":
                        this.updateSnapshotDisplayType();
                        break;
                    case "summaryData":
                        this.updateUI();
                        break;
                }
            };
            SnapshotTileView.prototype.updateLoadingProgress = function () {
                if (this._model.summaryData.isProcessingCompleted) {
                    this._screenshotHolder.style.visibility = "";
                    this._screenshotNotAvailableMessage.style.visibility = "";
                    this._snapshotLoadingProgress.style.visibility = "hidden";
                    this.updateSnapshotDisplayType();
                }
                else {
                    this._managedSummaryDiv.style.visibility = "hidden";
                    this._nativeSummaryDiv.style.visibility = "hidden";
                    this._screenshotHolder.style.visibility = "hidden";
                    this._screenshotNotAvailableMessage.style.visibility = "hidden";
                    this._snapshotLoadingProgress.style.visibility = "";
                }
            };
            SnapshotTileView.prototype.updateSnapshotDisplayType = function () {
                if (this._controller.model.snapshotDisplayType === Summary.SnapshotDisplayType.managed) {
                    this._managedSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
                    this._nativeSummaryDiv.style.visibility = "hidden";
                }
                else if (this._controller.model.snapshotDisplayType === Summary.SnapshotDisplayType.native) {
                    this._managedSummaryDiv.style.visibility = "hidden";
                    this._nativeSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
                }
            };
            SnapshotTileView.prototype.onCollectionChanged = function (eventArgs) {
                if (eventArgs.action === MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Add) {
                    var newSummary = eventArgs.newItems[0];
                    if (this._model.summaryData.id !== newSummary.id) {
                        var contextMenuItem = {
                            callback: this.onDiffToSnapshot.bind(this, newSummary.id),
                            disabled: this.shouldDisableCompareMenu.bind(this),
                            label: Microsoft.Plugin.Resources.getString("SnapshotNumber", newSummary.id + 1),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                        };
                        this._tileContextMenuItems.push(contextMenuItem);
                    }
                    this.createContextMenu();
                }
            };
            SnapshotTileView.prototype.createContextMenu = function () {
                if (this._tileContextMenu) {
                    this._tileContextMenu.detach(this._snapshotTile);
                }
                if (this._tileContextMenuItems.length > 0) {
                    var compareToMenuItem = {
                        callback: function () { },
                        label: Microsoft.Plugin.Resources.getString("CompareTo"),
                        disabled: this.shouldDisableCompareMenu.bind(this),
                        submenu: this._tileContextMenuItems,
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                    };
                    this._tileContextMenu = Microsoft.Plugin.ContextMenu.create([compareToMenuItem]);
                    this._tileContextMenu.attach(this._snapshotTile);
                }
            };
            SnapshotTileView.prototype.shouldDisableCompareMenu = function () {
                return this._controller.model.restoringSnapshots;
            };
            SnapshotTileView.prototype.populateContextMenu = function () {
                var comparableSnapshots = this._model.getComparableSnapshots();
                for (var i = 0; i < comparableSnapshots.length; i++) {
                    var comparable = comparableSnapshots[i];
                    var contextMenuItem = {
                        callback: this.onDiffToSnapshot.bind(this, comparable.id),
                        disabled: this.shouldDisableCompareMenu.bind(this),
                        label: Microsoft.Plugin.Resources.getString("SnapshotNumber", comparable.id + 1),
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                    };
                    this._tileContextMenuItems.push(contextMenuItem);
                }
                this.createContextMenu();
            };
            SnapshotTileView.prototype.populateSummaryLinks = function () {
                // Managed data
                this._managedSummaryDiv = this.findElement("managedSummaryData");
                var managedCountLink = this.findElement("managedCountLink");
                var managedSizeLink = this.findElement("managedSizeLink");
                var managedCountDiffLink = this.findElement("managedCountDiffLink");
                var managedCountDiffIndicatorIcon = this.findElement("managedCountDiffIndicatorIcon");
                var managedSizeDiffLink = this.findElement("managedSizeDiffLink");
                var managedSizeDiffIndicatorIcon = this.findElement("managedSizeDiffIndicatorIcon");
                managedCountLink.innerText = this._model.managedCountDisplayString;
                managedSizeLink.innerText = this._model.managedSizeDisplayString;
                managedSizeLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("ManagedSizeLinkTooltip"));
                managedCountLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("ManagedCountLinkTooltip"));
                managedSizeLink.onclick = this.onManagedSizeClick.bind(this);
                managedCountLink.onclick = this.onManagedCountClick.bind(this);
                if (!this._model.isFirstSnapshot) {
                    managedSizeDiffLink.onclick = this.onManagedSizeDiffClick.bind(this);
                    managedCountDiffLink.onclick = this.onManagedCountDiffClick.bind(this);
                }
                this.populateDiffLinks(managedSizeDiffLink, managedSizeDiffIndicatorIcon, this._model.managedSizeDiff, this._model.managedSizeDiffDisplayString, Microsoft.Plugin.Resources.getString("ManagedSizeDiffLinkTooltip"));
                this.populateDiffLinks(managedCountDiffLink, managedCountDiffIndicatorIcon, this._model.managedCountDiff, this._model.managedCountDiffDisplayString, Microsoft.Plugin.Resources.getString("ManagedCountDiffLinkTooltip"));
                // Native data
                this._nativeSummaryDiv = this.findElement("nativeSummaryData");
                var nativeCountLink = this.findElement("nativeCountLink");
                var nativeSizeLink = this.findElement("nativeSizeLink");
                var nativeCountDiffLink = this.findElement("nativeCountDiffLink");
                var nativeCountDiffIndicatorIcon = this.findElement("nativeCountDiffIndicatorIcon");
                var nativeSizeDiffLink = this.findElement("nativeSizeDiffLink");
                var nativeSizeDiffIndicatorIcon = this.findElement("nativeSizeDiffIndicatorIcon");
                nativeCountLink.innerText = this._model.nativeCountDisplayString;
                nativeSizeLink.innerText = this._model.nativeSizeDisplayString;
                nativeCountLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("NativeCountLinkTooltip"));
                nativeSizeLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("NativeSizeLinkTooltip"));
                nativeSizeLink.onclick = this.onNativeSizeClick.bind(this);
                nativeCountLink.onclick = this.onNativeCountClick.bind(this);
                if (!this._model.isFirstSnapshot) {
                    nativeSizeDiffLink.onclick = this.onNativeSizeDiffClick.bind(this);
                    nativeCountDiffLink.onclick = this.onNativeCountDiffClick.bind(this);
                }
                this.populateDiffLinks(nativeSizeDiffLink, nativeSizeDiffIndicatorIcon, this._model.nativeSizeDiff, this._model.nativeSizeDiffDisplayString, Microsoft.Plugin.Resources.getString("NativeSizeDiffLinkTooltip"));
                this.populateDiffLinks(nativeCountDiffLink, nativeCountDiffIndicatorIcon, this._model.nativeCountDiff, this._model.nativeCountDiffDisplayString, Microsoft.Plugin.Resources.getString("NativeCountDiffLinkTooltip"));
                var links = this.findElementsByClassName("BPT-FileLink");
                for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                    var linkElement = links[linkIndex];
                    linkElement.onkeydown = this.onLinkElementKeyDown.bind(linkElement);
                }
            };
            SnapshotTileView.prototype.onLinkElementKeyDown = function (e) {
                if ((e.keyCode === MemoryProfiler.Common.KeyCodes.ENTER || e.keyCode === MemoryProfiler.Common.KeyCodes.SPACE) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.srcElement.click();
                }
            };
            SnapshotTileView.prototype.populateDiffLinks = function (element, iconElement, delta, deltaDisplayString, deltaTooltip) {
                if (!this._model.isFirstSnapshot) {
                    element.innerText = deltaDisplayString;
                    element.setAttribute("data-plugin-vs-tooltip", deltaTooltip);
                    if (delta > 0) {
                        iconElement.classList.add("increaseIcon");
                    }
                    else if (delta < 0) {
                        iconElement.classList.add("decreaseIcon");
                    }
                }
                else {
                    element.classList.remove("BPT-FileLink");
                    element.classList.add("baselineText");
                    element.innerText = Microsoft.Plugin.Resources.getString("Baseline");
                    element.tabIndex = -1;
                }
            };
            SnapshotTileView.prototype.onManagedSizeClick = function (e) {
                this._controller.openManagedSizeDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedCountClick = function (e) {
                this._controller.openManagedCountDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedSizeDiffClick = function (e) {
                this._controller.openManagedSizeDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedCountDiffClick = function (e, target) {
                this._controller.openManagedCountDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeSizeClick = function (e) {
                this._controller.openNativeSizeDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeCountClick = function (e) {
                this._controller.openNativeCountDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeSizeDiffClick = function (e) {
                this._controller.openNativeSizeDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeCountDiffClick = function (e, target) {
                this._controller.openNativeCountDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onDiffToSnapshot = function (id) {
                if (this._controller.model.snapshotDisplayType == Summary.SnapshotDisplayType.managed) {
                    this._controller.openManagedSnapshotDiffDetails(this._model.summaryData.id, id);
                }
                else {
                    this._controller.openNativeSnapshotDiffDetails(this._model.summaryData.id, id);
                }
            };
            return SnapshotTileView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Summary.SnapshotTileView = SnapshotTileView;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../common/controls/componentModel.ts" />
// <reference path="../../common/controls/templateControl.ts" />
// <reference path="../../common/util/errorFormatter.ts" />
// <reference path="../../common/Profiler/MemoryProfilerViewHost.ts" />
// <reference path="../../common/Profiler/Snapshot.ts" />
// <reference path="../../common/Profiler/SnapshotSummary.ts" />
// <reference path="../../common/Profiler/SnapshotEngine.ts" />
// <reference path="../../common/Profiler/SummaryEngine.ts" />
// <reference path="../../common/Profiler/SummaryAgent.ts" />
// <reference path="../../common/Profiler/ClrSnapshotAgent.ts" />
// <reference path="../../common/Profiler/ScreenshotSnapshotAgent.ts" />
// <reference path="../../common/Profiler/NativeSummaryAgent.ts" />
// <reference path="../../common/Profiler/ManagedSummaryAgent.ts" />
// <reference path="../../common/Profiler/FeedbackConstants.ts" />
//--------
/// <reference path="snapshotTileView.ts" />
/// <reference path="snapshotHeapTypeToggle.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var Common = MemoryProfiler.Common;
        var SummaryViewController = (function () {
            function SummaryViewController(sessionInfo) {
                this._pendingSnapshots = [];
                this._summaryAgents = [];
                Common.MemoryProfilerViewHost.startCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart, Common.CodeMarkerValues.perfMP_ViewLoadEnd);
                this.model = new SummaryViewModel();
                this.view = new SummaryView(this, this.model);
                // DiagHub uses the documentSessionId as the subdomain for ScriptedControls it creates. Since our tool creates details view
                // on its own it needs to know the documentSessionId of the active session so that Daytona would not create a new ScriptedBox
                // Process to run the new control on.
                this._loadDataWarehousePromise = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse();
                this._loadDataWarehousePromise.then(function (dataWareHouse) {
                    Common.MemoryProfilerViewHost.session.setScriptedContextId(dataWareHouse.getConfiguration().sessionId);
                });
                if (sessionInfo.snapshots.length === 0) {
                    this.model.warningMessage = Microsoft.Plugin.Resources.getString("NoSnapshotsTakenWarning");
                    ;
                    Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart);
                    return;
                }
                this.loadExistingSnapshots(sessionInfo);
                // Determine what heaps we're supporting.  If supporting managed + native, we need a toggle-bar.
                // Until we hook up User Settings, we only know if target is managed(+native), or just native
                // Once we have User Settings, we'll have a 3rd option: managed-only
                if (sessionInfo.targetRuntime === Common.Extensions.TargetRuntime.mixed) {
                    this.view.initializeToggleBar();
                }
                else if (sessionInfo.targetRuntime === Common.Extensions.TargetRuntime.native) {
                    // We default to MANAGED unless we're only showing native.
                    this.model.snapshotDisplayType = Summary.SnapshotDisplayType.native;
                }
            }
            SummaryViewController.prototype.loadExistingSnapshots = function (sessioninfo) {
                var _this = this;
                var snapshots = sessioninfo.snapshots;
                var snapshotAgents = [];
                Common.MemoryProfilerViewHost.session.logBeginLoadSnapshots();
                snapshotAgents.push(new Common.ScreenshotSnapshotAgent());
                if (sessioninfo.targetRuntime !== Common.Extensions.TargetRuntime.native) {
                    snapshotAgents.push(new Common.ClrSnapshotAgent());
                    this._summaryAgents.push(new Common.ManagedSummaryAgent());
                }
                if (sessioninfo.targetRuntime !== Common.Extensions.TargetRuntime.managed) {
                    this._summaryAgents.push(new Common.NativeSummaryAgent(this._loadDataWarehousePromise));
                }
                this.model.restoringSnapshots = true;
                this._pendingSnapshots = [];
                for (var i = 0; i < snapshots.length; i++) {
                    var restoreEngine = new Common.SnapshotRestoreEngine(i, snapshotAgents, snapshots[i]);
                    restoreEngine.restore(function (snapshot) {
                        _this._pendingSnapshots.push(snapshot);
                        _this.model.snapshotSummaryCollection.add(new Common.SnapshotSummary(snapshot));
                    });
                }
                // OK, restoration complete.  That should have been the quick & easy part.
                // Initialize each summary agent in parallel
                Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (sessionStartTime) {
                    var promises = [];
                    _this._summaryAgents.forEach(function (agent) {
                        promises.push(agent.initializeAnalyzerData(sessionStartTime, _this._pendingSnapshots));
                    });
                    return Microsoft.Plugin.Promise.join(promises);
                }).done(function () {
                    // Now, we kick off analysis by reversing the queue and popping of the first snapshot to tackle
                    _this._pendingSnapshots.reverse();
                    _this.processNextSnapshotSummary();
                });
            };
            SummaryViewController.prototype.openManagedSizeDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenManagedHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "ManagedHeap", "RetainedSize");
            };
            SummaryViewController.prototype.openManagedCountDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenManagedHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "ManagedHeap", "Count");
            };
            SummaryViewController.prototype.openManagedSizeDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "RetainedSizeDiff");
            };
            SummaryViewController.prototype.openManagedCountDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "CountDiff");
            };
            SummaryViewController.prototype.openManagedSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapView, Common.FeedbackCommandInvokeMethodNames.Menu, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "ManagedHeap", "RetainedSizeDiff");
            };
            SummaryViewController.prototype.openNativeSizeDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenNativeHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingSize");
            };
            SummaryViewController.prototype.openNativeCountDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenNativeHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingCount");
            };
            SummaryViewController.prototype.openNativeSizeDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingSizeDiff");
            };
            SummaryViewController.prototype.openNativeCountDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingCountDiff");
            };
            SummaryViewController.prototype.openNativeSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapView, Common.FeedbackCommandInvokeMethodNames.Menu, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "NativeHeap", "OutstandingSizeDiff");
            };
            SummaryViewController.prototype.viewSnapshot = function (snapshotId, target, sortProperty) {
                Common.MemoryProfilerViewHost.session.openSnapshotDetails(snapshotId, target, sortProperty);
            };
            SummaryViewController.prototype.compareSnapshots = function (lastSnapshotId, firstSnapshotId, target, sortProperty) {
                Common.MemoryProfilerViewHost.session.openSnapshotDiff(firstSnapshotId, lastSnapshotId, target, sortProperty);
            };
            SummaryViewController.prototype.reset = function () {
                this.model.snapshotSummaryCollection.clear();
                Common.MemoryProfilerViewHost.onIdle();
            };
            SummaryViewController.prototype.processNextSnapshotSummary = function () {
                if (this._pendingSnapshots.length == 0) {
                    this.summaryProcessCleanup();
                }
                else {
                    var snapshot = this._pendingSnapshots.pop();
                    this._summaryEngine = new Common.SummaryEngine(snapshot, this._summaryAgents);
                    this._summaryEngine.processSummary().done(this.onSummaryProcessComplete.bind(this), this.onSummaryProcessError.bind(this), this.onSummaryProcessProgress.bind(this));
                }
            };
            SummaryViewController.prototype.cancelSummaryProcessing = function () {
                if (this._summaryEngine) {
                    this._summaryEngine.cancel();
                    this.summaryProcessCleanup();
                }
            };
            SummaryViewController.prototype.onSummaryProcessComplete = function (summary) {
                for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                    if (this.model.snapshotSummaryCollection.getItem(i).id === summary.id) {
                        this.model.snapshotSummaryCollection.replace(i, summary);
                        break;
                    }
                }
                this.processNextSnapshotSummary();
            };
            SummaryViewController.prototype.onSummaryProcessError = function (error) {
                /// need to report the error!
                this.summaryProcessCleanup();
            };
            SummaryViewController.prototype.onSummaryProcessProgress = function (progress) {
                // UI during analysis would be nice :)
            };
            SummaryViewController.prototype.summaryProcessCleanup = function () {
                this._summaryEngine = null;
                this._summaryAgents = null;
                this._pendingSnapshots = [];
                this.model.restoringSnapshots = false;
                // If we had snapshots to restore, we're now done loading the view
                //
                // !! NOTE: The order of code markers is important for automation. !!
                // We need to make sure ViewLoad fires after RestoringSnapshots
                // (fired by setting restoringSnapshots above).
                //
                Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart);
                Common.MemoryProfilerViewHost.session.logEndLoadSnapshots();
            };
            return SummaryViewController;
        }());
        Summary.SummaryViewController = SummaryViewController;
        var SummaryViewModel = (function (_super) {
            __extends(SummaryViewModel, _super);
            function SummaryViewModel() {
                _super.call(this);
                this._warningMessage = "";
                this._restoringSnapshots = false;
                this._snapshotDisplayType = Summary.SnapshotDisplayType.managed;
                this._snapshotSummaryCollection = new Common.Controls.ObservableCollection();
                // Note: In the future, we may have per-view default settings. For now, log the defaults as coming from the corresponding views.
                this.LogSelectSnapshotViewCommand(this.snapshotDisplayType, Common.FeedbackCommandInvokeMethodNames.Default, Common.FeedbackCommandSourceNames.SummaryView);
            }
            Object.defineProperty(SummaryViewModel.prototype, "snapshotSummaryCollection", {
                get: function () { return this._snapshotSummaryCollection; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryViewModel.prototype, "warningMessage", {
                get: function () { return this._warningMessage; },
                set: function (v) {
                    if (this._warningMessage !== v) {
                        this._warningMessage = v;
                        this.raisePropertyChanged("warningMessage");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryViewModel.prototype, "snapshotDisplayType", {
                get: function () { return this._snapshotDisplayType; },
                set: function (v) {
                    if (this._snapshotDisplayType !== v) {
                        this._snapshotDisplayType = v;
                        this.LogSelectSnapshotViewCommand(v, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                        this.raisePropertyChanged("snapshotDisplayType");
                    }
                },
                enumerable: true,
                configurable: true
            });
            SummaryViewModel.prototype.LogSelectSnapshotViewCommand = function (v, invokeMethodName, commandSourceName) {
                var feedbackCommandName;
                if (v === Summary.SnapshotDisplayType.managed) {
                    feedbackCommandName = Common.FeedbackCommandNames.SelectManagedHeapSnapshotView;
                }
                else {
                    feedbackCommandName = Common.FeedbackCommandNames.SelectNativeHeapSnapshotView;
                }
                Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
            };
            Object.defineProperty(SummaryViewModel.prototype, "restoringSnapshots", {
                get: function () {
                    return this._restoringSnapshots;
                },
                set: function (v) {
                    if (this._restoringSnapshots !== v) {
                        this._restoringSnapshots = v;
                        this.raisePropertyChanged("restoringSnapshots");
                        if (this._restoringSnapshots) {
                            Common.MemoryProfilerViewHost.startCodeMarker(Common.CodeMarkerValues.perfMP_SnapshotRestoreStart, Common.CodeMarkerValues.perfMP_SnapshotRestoreEnd);
                        }
                        else {
                            Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_SnapshotRestoreStart);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            return SummaryViewModel;
        }(Common.Controls.ObservableViewModel));
        Summary.SummaryViewModel = SummaryViewModel;
        var SummaryView = (function (_super) {
            __extends(SummaryView, _super);
            function SummaryView(controller, model) {
                _super.call(this, "SummaryViewTemplate");
                this._controller = controller;
                this._model = model;
                this._snapshotTileViewModelCollection = [];
                this._model.registerPropertyChanged(this);
                this._model.snapshotSummaryCollection.registerCollectionChanged(this);
                this._tilesContainer = this.findElement("tilesContainer");
                this._warningSection = this.findElement("warningSection");
            }
            Object.defineProperty(SummaryView.prototype, "snapshotTileViewModelCollection", {
                get: function () {
                    return this._snapshotTileViewModelCollection;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryView.prototype, "tilesContainer", {
                get: function () {
                    return this._tilesContainer;
                },
                enumerable: true,
                configurable: true
            });
            SummaryView.prototype.initializeToggleBar = function () {
                this._snapshotToggleBar = this.findElement("toggleTabSection");
                var toggle = new Summary.SnapshotHeapTypeToggle(this._model);
                this._snapshotToggleBar.appendChild(toggle.rootElement);
            };
            SummaryView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "warningMessage":
                        this.showWarningMessage(this._model.warningMessage);
                        break;
                }
            };
            SummaryView.prototype.onCollectionChanged = function (eventArgs) {
                switch (eventArgs.action) {
                    case Common.Controls.NotifyCollectionChangedAction.Add:
                        this.createTile(eventArgs.newItems[0]);
                        break;
                    case Common.Controls.NotifyCollectionChangedAction.Reset:
                        this.removeSnapshotTiles();
                        break;
                    case Common.Controls.NotifyCollectionChangedAction.Replace:
                        this.updateTile(eventArgs.newItems[0]);
                        break;
                }
            };
            SummaryView.prototype.updateTile = function (snapshotSummary) {
                for (var i = 0; i < this._snapshotTileViewModelCollection.length; i++) {
                    if (this._snapshotTileViewModelCollection[i].summaryData.id === snapshotSummary.id) {
                        this._snapshotTileViewModelCollection[i].summaryData = snapshotSummary;
                        break;
                    }
                }
            };
            SummaryView.prototype.createTile = function (snapshotSummary) {
                // Create the model and the view
                var model = new Summary.SnapshotTileViewModel(snapshotSummary, this._model.snapshotSummaryCollection);
                var newTile = new Summary.SnapshotTileView(this._controller, model);
                this._model.snapshotSummaryCollection.registerCollectionChanged(newTile);
                this._snapshotTileViewModelCollection.push(model);
                this._tilesContainer.appendChild(newTile.rootElement);
                newTile.rootElement.focus();
            };
            SummaryView.prototype.removeSnapshotTiles = function () {
                while (this._tilesContainer.hasChildNodes()) {
                    this._tilesContainer.removeChild(this._tilesContainer.firstChild);
                }
                this._snapshotTileViewModelCollection = [];
            };
            SummaryView.prototype.toggleProgress = function (show) {
                if (this._snapshotProgress && this._snapshotError) {
                    if (show) {
                        this._snapshotLabel.style.display = "none";
                        this._snapshotIcon.style.display = "none";
                        this._snapshotProgress.style.display = "block";
                        this._snapshotError.style.display = "none";
                    }
                    else {
                        this._snapshotLabel.style.display = "";
                        this._snapshotIcon.style.display = "";
                        this._snapshotProgress.style.display = "none";
                    }
                }
            };
            SummaryView.prototype.showSnapshotError = function (error) {
                if (this._snapshotErrorMsg && this._snapshotError) {
                    if (error) {
                        // Show the message
                        this._snapshotErrorMsg.innerText = Common.ErrorFormatter.format(error);
                        this._snapshotError.style.display = "block";
                    }
                    else {
                        // Hide the message
                        this._snapshotErrorMsg.innerText = "";
                        this._snapshotError.style.display = "none";
                    }
                }
            };
            SummaryView.prototype.showWarningMessage = function (warning) {
                if (!this._warningSection) {
                    return;
                }
                if (warning) {
                    this._warningSection.innerHTML = warning;
                    this._warningSection.style.display = "-ms-grid";
                }
                else {
                    this._warningSection.innerHTML = "";
                    this._warningSection.style.display = "none";
                }
            };
            return SummaryView;
        }(Common.Controls.TemplateControl));
        Summary.SummaryView = SummaryView;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
// 
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Controls/templateControl.ts" />
//--------
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        (function (SnapshotDisplayType) {
            SnapshotDisplayType[SnapshotDisplayType["managed"] = 0] = "managed";
            SnapshotDisplayType[SnapshotDisplayType["native"] = 1] = "native";
        })(Summary.SnapshotDisplayType || (Summary.SnapshotDisplayType = {}));
        var SnapshotDisplayType = Summary.SnapshotDisplayType;
        var SnapshotHeapTypeToggle = (function (_super) {
            __extends(SnapshotHeapTypeToggle, _super);
            function SnapshotHeapTypeToggle(viewModel) {
                _super.call(this, "SnapshotHeapTypeToggleTemplate");
                this._summaryViewModel = viewModel;
                this._summaryViewModel.registerPropertyChanged(this);
                this._managedHeapButton = this.findElement("snapshotToggleTabManagedButton");
                this._nativeHeapButton = this.findElement("snapshotToggleTabdNativeButton");
                this.findElement("snapshotToggleTabLabel").innerText = Microsoft.Plugin.Resources.getString("SnapshotToggleTabLabel");
                ;
                this._managedHeapButton.innerHTML = Microsoft.Plugin.Resources.getString("SnapshotToggleTabManagedButton");
                this._nativeHeapButton.innerText = Microsoft.Plugin.Resources.getString("SnapshotToggleTabNativeButton");
                this._managedHeapButton.onclick = this.setManagedHeapToggleButtonSelected.bind(this);
                this._nativeHeapButton.onclick = this.setNativeHeapToggleButtonSelected.bind(this);
                var toggleButtons = this.findElementsByClassName("toggleTabButtonContainer");
                for (var buttomIndex = 0; buttomIndex < toggleButtons.length; buttomIndex++) {
                    var buttonElement = toggleButtons[buttomIndex];
                    buttonElement.onkeydown = this.onButtonElementKeyDown.bind(buttonElement);
                }
                this.updateUI();
            }
            SnapshotHeapTypeToggle.prototype.onButtonElementKeyDown = function (e) {
                if ((e.keyCode === MemoryProfiler.Common.KeyCodes.ENTER || e.keyCode === MemoryProfiler.Common.KeyCodes.SPACE) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.srcElement.click();
                }
            };
            SnapshotHeapTypeToggle.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "snapshotDisplayType":
                        this.updateUI();
                        break;
                }
            };
            SnapshotHeapTypeToggle.prototype.updateUI = function () {
                var isManagedSelected = this._summaryViewModel.snapshotDisplayType === SnapshotDisplayType.managed;
                if (isManagedSelected) {
                    this._managedHeapButton.classList.remove("toggleTabButtonContainer");
                    this._managedHeapButton.classList.add("toggleTabButtonContainerSelected");
                    this._managedHeapButton.classList.add("toggleTabSelectedButtonOutline");
                    this._nativeHeapButton.classList.remove("toggleTabSelectedButtonOutline");
                    this._nativeHeapButton.classList.remove("toggleTabButtonContainerSelected");
                    this._nativeHeapButton.classList.add("toggleTabButtonContainer");
                }
                else if (this._summaryViewModel.snapshotDisplayType === SnapshotDisplayType.native) {
                    this._nativeHeapButton.classList.remove("toggleTabButtonContainer");
                    this._nativeHeapButton.classList.add("toggleTabButtonContainerSelected");
                    this._nativeHeapButton.classList.add("toggleTabSelectedButtonOutline");
                    this._managedHeapButton.classList.remove("toggleTabSelectedButtonOutline");
                    this._managedHeapButton.classList.remove("toggleTabButtonContainerSelected");
                    this._managedHeapButton.classList.add("toggleTabButtonContainer");
                }
                this._nativeHeapButton.setAttribute("aria-checked", isManagedSelected ? "false" : "true");
                this._managedHeapButton.setAttribute("aria-checked", isManagedSelected ? "true" : "false");
            };
            SnapshotHeapTypeToggle.prototype.setManagedHeapToggleButtonSelected = function () {
                this._summaryViewModel.snapshotDisplayType = SnapshotDisplayType.managed;
            };
            SnapshotHeapTypeToggle.prototype.setNativeHeapToggleButtonSelected = function () {
                this._summaryViewModel.snapshotDisplayType = SnapshotDisplayType.native;
            };
            return SnapshotHeapTypeToggle;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Summary.SnapshotHeapTypeToggle = SnapshotHeapTypeToggle;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Extensions/Session.ts" />
// <reference path="../../Common/controls/control.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/MemoryProfilerViewHost.ts" />
//--------
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var SummaryViewHost = (function (_super) {
            __extends(SummaryViewHost, _super);
            function SummaryViewHost() {
                _super.call(this);
            }
            SummaryViewHost.prototype.initializeView = function (sessionInfo) {
                this.summaryViewController = new Summary.SummaryViewController(sessionInfo);
                document.getElementById('mainContainer').appendChild(this.summaryViewController.view.rootElement);
            };
            return SummaryViewHost;
        }(MemoryProfiler.Common.MemoryProfilerViewHostBase));
        Summary.SummaryViewHost = SummaryViewHost;
        Summary.SummaryViewHostInstance = new SummaryViewHost();
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
MemoryProfiler.Summary.SummaryViewHostInstance.loadView();
//# sourceMappingURL=SummaryViewMerged.js.map
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 4oKNG1RgiPRZBQrOZokB7hz1+YBGHpWduUz+bSNXinig
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA061PHrBhG/rKwAA
// SIG // AAADTjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOVoX
// SIG // DTI0MDMxNDE4NDMyOVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 3QiojSOiARVrryVJn+lnTiamZiMGLORuwCQ+VG3C+rbA
// SIG // vhATw269+qRRqNW7FKed50chWJ53KDIPBStHfIy5cNJY
// SIG // HsQw6+4InH9szgRVqn7/50i8MyRTT+VtNwxf9daGddq0
// SIG // hahpZvjuOnEY0wxQaTEQmWRnXWZUQY4r28tHiNVYEw9U
// SIG // 7wHXwWEHvNn4ZlkJGEf5VpgCvr1v9fmzu4x2sV0zQsSy
// SIG // AVtOxfDwY1HMBcccn23tphweIdS+FNDn2vh1/2kREO0q
// SIG // mGc+fbFzNskjn72MiI56kjvNDRgWs+Q78yBvPCdPgTYT
// SIG // rto5eg33Ko2ELNR/zzEkCCuhO5Vw10qV8wIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFJzHO2Z/7pCgbAYlpMHTX7De
// SIG // aXcAMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDA1MTYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQA9tb/a
// SIG // R6C3QUjZRQI5pJseF8TmQD7FccV2w8kL9fpBg3vV6YAZ
// SIG // 09ZV58eyQ6RTCgcAMiMHSJ5r4SvaRgWt9U8ni96e0drN
// SIG // C/EgATz0SRwBJODR6QV8R45uEyo3swG0qqm4LMtdGOyg
// SIG // KcvvVKymtpBprLgErJPeT1Zub3puzpk7ONr5tASVFPiT
// SIG // 0C4PGP7HY907Uny2GGQGicEwCIIu3Yc5+YWrS6Ow4c/u
// SIG // E/jKxXfui1GtlN86/e0MMw7YcfkT/f0WZ7q+Ip80kLBu
// SIG // QwlSDKQNZdjVhANygHGtLSNpeoUDWLGii9ZHn3Xxwqz8
// SIG // RK8vKJyY8hhr/WCqC7+gDjuzoSRJm0Jc/8ZLGBtjfyUj
// SIG // ifkKmKRkxLmBWFVmop+x3uo4G+NSW6Thig3RP2/ldqv4
// SIG // F1IBXtoHcE6Qg7L4fEjEaKtfwTV3K+4kwFN/FYK/N4lb
// SIG // T2JhYWTlTNFC6f5Ck1aIqyKT9igsU+DnpDnLbfIK2J4S
// SIG // dekDI5jL+aOd4YzRVzsYoJEFmM1DvusOdINBQHhWvObo
// SIG // AggepVxJNtRRQdRXSB6Y0kH/iz/1tjlfx34Qt7kz4Cm0
// SIG // bV6PN02WBLnaKMmfwFbtPLIm2dzJBjiTkSxETcCpthu6
// SIG // KnTr+EI/GdCaxoDM4+OjRSgMZC0qROaB0GD9R7T8dZT3
// SIG // w+4jUmybD+i4lB1x9TCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCB9NOViordl/L4qzx5yaJ+AAGhJ3DCazrXN
// SIG // x/ZuI6k06jBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAEjMxOL6
// SIG // dlGgnEPo75i8nDf2U18XGxFemKZq5DgoquVha9pwxjeg
// SIG // O5LbYo7j1jld2idvZEeEVV3d66sZ1gI7uzKZjvSX+68M
// SIG // XN6kafsOges+oXW7K4yCxU6prhPoHHDrPPqHzHrfOuLt
// SIG // slrtDIR2FK2G6N5G1uOY2esOrnwgMC5TcX1N8rd6kKNv
// SIG // /VNKNerVG3UjUblDaFVxrRjggPki70B/5rE9OuWl2K6T
// SIG // TWAkYgrv50NH1+ZkEQbv7S2nOdI0UsFe/xJW40v+i6RW
// SIG // 0QlOGTPw4DsaDn4aqtMRgLerX0uBBtnLP1QWfNGOx4vI
// SIG // fyIr1mlS6jLzvKh2h0cFzoCoi82hgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgcjMwxnwfkWnSg1h449P/
// SIG // oc/miBRyPKAXkdR78ZLo7j4CBmTU/Br2lBgTMjAyMzA4
// SIG // MzExNzI1NTQuNDk4WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjk2MDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHY/EszpR3YhRUA
// SIG // AQAAAdgwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjQwWhcN
// SIG // MjQwMjAxMTkxMjQwWjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // Ojk2MDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAzXjrKdH14AM+xlBd
// SIG // Dfv9BB3EBa4usJYk25kDZhZvA4tAnkPJ+G3drXebW7c0
// SIG // 7BJO3WNv55lmPZKhL2r23WEWzXPhLL/DX7+jDCJh/bQq
// SIG // +SsbNueDENI5qUbnK5t7h1uNtQn72tITUBCjdTUtK2nd
// SIG // VP2Tpnvlf0HknViqHwk4cX/37E3keNVm6lDQCTf5pd7G
// SIG // zh/Gi4V8kxxu7Fbf1lEi6U9Hy5TV2BkV82rydalDnj88
// SIG // o/OoYiss0CS04yq+xqUxhckoiHDFv58iujSu0Y38taHy
// SIG // 3Ub77RyHSb6Zj0s3twh/z2BVNtU6oSIWdfgEu0ZQ6NfD
// SIG // Egxjx6UwlsKO5YLWNaWOkbzyILhd623bb4aMo5+Zj27O
// SIG // aYIxjvN6HQTT+yJSgI+AWx1F3h4rdw2toOwOI4nCqyzI
// SIG // 6OrBnnrSaHiqKI+YjU12w8CyjPR5VHV2Us+tn7QmVbiv
// SIG // RQYJADvTETdqagZ6bQRn5ZZvttRS5OhN71VzBhweXjoB
// SIG // XwMvOF5SInsnEAKyA7BJvdihyBThjoGZVsXuvZXl7zB4
// SIG // 2CZaaNlVTLS8Fy3d7Y0v9e96LhjEWoiyJy5uKCIKg7Y1
// SIG // CKr8GEFId0TesMHRe+Zzpq6a/MEcNZ/wSlkOZoUMWjAa
// SIG // qr5G7rtbC3kjD79jzGSHXVz24jrwMWnaj5AXDD1AZq8k
// SIG // mKC08cMCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBT2049M
// SIG // fD2QS2J9DGQSOpxoeaiJVjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // rpwOmkj+PKCdVQ/kjBdf+0hYkxg+s8iwtybvR7S46mGK
// SIG // tRSVlMddCOV6lNGpXF01BVKFCFD0r33l/3V9DIKH1Bvn
// SIG // Dl3aJGhx0paOj2SA151ApaZEYsfcQjd+8hQaXMBi8xGZ
// SIG // QyiW9oA6vxQRgvLJ05QUhDgY1dHhPCAlVJDicyALbRMW
// SIG // nkFieUnq1K+t56ul+z5kL5NTixZdxSaFuPucyqq4mPzy
// SIG // hrLDmgOWYwWRMlPqO/j94nC/8GdBt8ppU/hGuIfX96uW
// SIG // lXRlQXbIWGv0noRpp1LxjAPI+QrduIp8fm1TrhfxP9i4
// SIG // yKfphGq8uZjk6wDVSi8ptpFt3kMRfyPXI/O8Z3YmB+eV
// SIG // 361jJPW7EU6MTqUW/RKWwgeXEsijb8UPA9NKndk53VRC
// SIG // RaYMgR0CUv1xCuaaHiWeaoJghQI+FVDwf3T1x3U5tUFy
// SIG // SN3Duw0cj1GQGDMENyoT5TNoT9jnwSSK/1bA7Id7Myy9
// SIG // mSbnq47IYcWBlW6DLnfWjaEY5c9THJ+IhKLWuLWptuBc
// SIG // Q8h66hZuhFELv6Q2BA6rrr0BRm+YJSHJOKyqgZ0Za0aI
// SIG // kY9KnYTt56KLVYP9Uj9M0ywtUa8Y7kxFXtzyqxE27b3D
// SIG // g6Bofddl67X+MGzMKa2vI2LM8696X9PdOc8y/G/J/JLj
// SIG // AQoQWHxXbPdeik43OExjVPUwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo5NjAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUASKfvsVCfn/OV
// SIG // a5283ZETEqQZry+ggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOib
// SIG // KTMwIhgPMjAyMzA4MzExNDU4NTlaGA8yMDIzMDkwMTE0
// SIG // NTg1OVowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Jsp
// SIG // MwIBADAHAgEAAgIbjTAHAgEAAgISeTAKAgUA6Jx6swIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQBKNl5x6uxO40xYIQE13EgHTz5p6yyI
// SIG // 8KTWnoMxfw2y8gA2ltxL65GZjC6juNjzMGMYvpD5vzX9
// SIG // y0X5J40ILZOm18Sk3GcuXXASs2fc7qFZMBgJPja+4JYM
// SIG // S2LNhvlD1/OhTWk55ytei2JcKzLiSl+b1KfQ3gipGFB7
// SIG // 0aqQLTMf7tDHZ8VJi6SOUs4TZMr1XAvszqCnsREa9GbP
// SIG // VmWvmD7JSRZnZMZrPEMmD474+0PmYq/5iS/+4KoZbZAc
// SIG // UIDMp+9zTKA+2xdWFnhWVk/TXRl2gdET6r4UpNTVefe5
// SIG // Ngyyha7JHdh9Wb5z+kJlZGyTkfDRbS7O5i+xi1Kx4WzK
// SIG // gnw3MYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHY/EszpR3YhRUAAQAAAdgw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgRb2O
// SIG // /fZ7laXiNh4nHzhfTbQVzeBxwKExhbBiUo5tRsYwgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCA64yF//AmT
// SIG // d0UwATDbebu9zIt6N35r6to/EopPtrO+VDCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 2PxLM6Ud2IUVAAEAAAHYMCIEIOMbgocy8K8oyFPZKzw1
// SIG // Si/F2zJbfO5FAKiEafdMBeDRMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAFelBgwo5AzBFmuMN/xrjJvLi8nwUJR2PmrTpzFG
// SIG // 8Xp53Cbd3HUi7JEoOLogG+4LUfz4CybmNJizpN3diAQP
// SIG // ssO/zt3jtA8vl+3n/VEb+JePJe5NmJIDQiow1k1DYzSx
// SIG // JvboqNMIDBsxrUaQeXU5baqeM4jtoBJN9ktHEE9wB9J8
// SIG // 1hFS03BoKv06IdShB+tyhB4T+aKMVnkYFAx/bcf/VkAq
// SIG // I1NkRbNCo4P60Sxmp4jSvqmFSm1Iepg0AC7svLnzi8Yn
// SIG // 2JLsnqla16X0cJUJ+HhzJJyOkxGCaqGIYMc06hi0T40s
// SIG // 04lOurrrDCXYYFvqnsWfZyQ0aikvjsBYlVtG3M2VPK8P
// SIG // sVoEFYjc5fQa1THNLUKMcY8eKwGZZFPubVV6UroWcRjY
// SIG // m4n/CRf1IaIzLJjSfqqA/SAY710KO0YXJg/IUx4Pete/
// SIG // zsZDBVoefRq0Pmu+yBdkLe83uKRXEW+PJG46EMIDGbHB
// SIG // PHJ3knQ+pn2M//r0jHWv83vJ0g4KRkxjA1FemRrEpcF4
// SIG // 6O+j2aVgRfk9yeaih608BfFaqabgo0BPhvIG+Uh1Xoff
// SIG // wha+zrOwL0s7WYzNX08JHeZ/Jlyq8ZSfvFjjZb3lAn3A
// SIG // mUpKApXR0mGxbVUcyc8KXokW5nvak7ZM47vxViNQERdJ
// SIG // y5rYxRtDcBVBRGMJjDM08py9WhLM
// SIG // End signature block
