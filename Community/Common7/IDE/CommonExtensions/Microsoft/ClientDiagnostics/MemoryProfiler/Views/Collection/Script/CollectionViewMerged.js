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
// <reference path="../../Common/Controls/templateControl.ts" />
// <reference path="../../Common/Util/formattingHelpers.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/Snapshot.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/plugin.redirect.d.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var SnapshotTileViewModel = (function () {
            function SnapshotTileViewModel(summary) {
                this._summary = summary;
            }
            Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
                get: function () {
                    return this._summary;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
                get: function () {
                    var date = new Date(this._summary.timestamp);
                    return "(" + date.toLocaleTimeString() + ")";
                },
                enumerable: true,
                configurable: true
            });
            return SnapshotTileViewModel;
        }());
        Collection.SnapshotTileViewModel = SnapshotTileViewModel;
        var SnapshotTileView = (function (_super) {
            __extends(SnapshotTileView, _super);
            function SnapshotTileView(model) {
                _super.call(this, "SnapshotTileTemplate");
                this._model = model;
                this._snapshotTile = this.findElement("snapshotTile");
                this._tileHeader = this.findElement("snapshotTileHeader");
                this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
                this.findElement("snapshotTileTitle").innerText = Microsoft.Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id);
                if (this._model.summaryData.screenshotFile) {
                    var imgHolder = this.findElement("snapshotTileImage");
                    imgHolder.src = this._model.summaryData.screenshotFile;
                    this._screenshotNotAvailableMessage.style.display = "none";
                }
                this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
                this.findElement("stopToSeeSnapshotDetails").innerText = Microsoft.Plugin.Resources.getString("StopToSeeSnapshotMessage");
                this._screenshotNotAvailableMessage.innerText = Microsoft.Plugin.Resources.getString("ScreenshotNotAvailable");
            }
            return SnapshotTileView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Collection.SnapshotTileView = SnapshotTileView;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
// <reference path="../../../../../common/script/util/notifications.ts" />
// <reference path="../../common/controls/componentModel.ts" />
// <reference path="../../common/controls/templateControl.ts" />
// <reference path="../../common/util/EnumHelper.ts" />
// <reference path="../../common/Profiler/MemoryNotifications.ts" />
// <reference path="../../common/util/errorFormatter.ts" />
// <reference path="../../common/Profiler/MemoryProfilerViewHost.ts" />
// <reference path="../../common/Profiler/SnapshotEngine.ts" />
// <reference path="../../common/Profiler/ClrSnapshotAgent.ts" />
// <reference path="../../common/Profiler/ScreenshotSnapshotAgent.ts" />
// <reference path="../../common/Profiler/FeedbackConstants.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/Plugin.redirect.d.ts" />
/// <reference path="../../../../../common/script/Hub/DiagnosticsHub.redirect.d.ts" />
/// <reference path="CollectionAgentTask.ts" />
/// <reference path="snapshotTileView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CollectionViewController = (function () {
            function CollectionViewController(initializeView) {
                var _this = this;
                if (initializeView === void 0) { initializeView = true; }
                this._screenshotHeight = 150;
                this._screenshotKeepAspectRatio = true;
                this._screenshotWidth = 200;
                this._agentGuid = "2E8E6F4B-6107-4F46-8BEA-A920EA880452"; // This is the guid of MemoryProfilerCollectionAgent
                this._activeCollectionAgentTasks = [];
                this.model = new CollectionViewModel();
                if (initializeView) {
                    this.view = new CollectionView(this, this.model);
                }
                this._takeSnapshotTask = new Collection.TakeSnapshotTask(this);
                this._forceGcTask = new Collection.ForceGcCollectionAgentTask(this);
                MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().then(function (info) {
                    _this._agentGuid = info.agentGuid;
                    _this._standardCollector = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
                    if (_this._standardCollector) {
                        _this._standardCollector.addMessageListener(new Microsoft.VisualStudio.DiagnosticsHub.Guid(_this._agentGuid), _this.onMessageReceived.bind(_this));
                    }
                });
            }
            Object.defineProperty(CollectionViewController.prototype, "isCollectionAgentTaskActive", {
                get: function () {
                    return this._activeCollectionAgentTasks.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewController.prototype, "managedDataSeen", {
                get: function () {
                    return this._managedDataSeen;
                },
                set: function (v) {
                    this._managedDataSeen = v;
                },
                enumerable: true,
                configurable: true
            });
            CollectionViewController.prototype.takeSnapshot = function () {
                this._activeCollectionAgentTasks.push(this._takeSnapshotTask);
                return this._takeSnapshotTask.start();
            };
            CollectionViewController.prototype.forceGarbageCollection = function () {
                this._activeCollectionAgentTasks.push(this._forceGcTask);
                return this._forceGcTask.start();
            };
            CollectionViewController.prototype.setScreenshotSize = function (targetWidth, targetHeight, keepAspectRatio) {
                // Set the size of all future screenshots that are taken of the application
                this._screenshotWidth = targetWidth;
                this._screenshotHeight = targetHeight;
                this._screenshotKeepAspectRatio = keepAspectRatio;
            };
            CollectionViewController.prototype.reset = function () {
                CollectionViewController._nextIdentifier = 1;
                this.model.snapshotSummaryCollection.clear();
                MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
            };
            CollectionViewController.prototype.sendStringToCollectionAgent = function (request) {
                return this._standardCollector.sendStringToCollectionAgent(this._agentGuid, request);
            };
            CollectionViewController.prototype.downloadFile = function (targetFilePath, localFilePath) {
                var transportService = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
                return transportService.downloadFile(targetFilePath, localFilePath);
            };
            CollectionViewController.prototype.getSnapshotSummary = function (snapshotId) {
                var foundSnapshotSummary = null;
                for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                    var snapshotSummary = this.model.snapshotSummaryCollection.getItem(i);
                    if (snapshotSummary.id === snapshotId) {
                        foundSnapshotSummary = snapshotSummary;
                        break;
                    }
                }
                return foundSnapshotSummary;
            };
            CollectionViewController.prototype.onMessageReceived = function (message) {
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj) {
                        if (obj.eventName) {
                            switch (obj.eventName) {
                                case "notifyManagedPresent":
                                    this.managedDataSeen = true;
                                    MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().then(function (info) {
                                        if (info.targetRuntime === MemoryProfiler.Common.Extensions.TargetRuntime.managed || info.targetRuntime === MemoryProfiler.Common.Extensions.TargetRuntime.mixed) {
                                            Collection.CollectionViewHost.CommandChain.onTargetIsManaged();
                                        }
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (obj.cmd) {
                            switch (obj.cmd) {
                                case "log":
                                    MemoryProfiler.Common.MemoryProfilerViewHost.logMessage(obj.msg);
                                    break;
                                default:
                                    MemoryProfiler.Common.MemoryProfilerViewHost.logMessage("Unexpected Command from agent: " + message);
                                    break;
                            }
                            return; // Commands are not passed on to active tasks - eventName messages (and everything else) are.
                        }
                    }
                }
                for (var i = this._activeCollectionAgentTasks.length - 1; i >= 0; i--) {
                    if (this._activeCollectionAgentTasks[i].isCompleted(message)) {
                        this._activeCollectionAgentTasks.splice(i, 1);
                    }
                }
            };
            CollectionViewController.prototype.sendMessage = function (message) {
                this._standardCollector.sendStringToCollectionAgent(this._agentGuid, message).done(function (response) {
                    if (response && response.length > 0) {
                        var obj = JSON.parse(response);
                        if (!obj.succeeded) {
                            throw new Error(obj.errorMessage);
                        }
                    }
                });
            };
            CollectionViewController._snapshotChunkSize = 32768;
            CollectionViewController._nextIdentifier = 1;
            return CollectionViewController;
        }());
        Collection.CollectionViewController = CollectionViewController;
        var CollectionViewModel = (function (_super) {
            __extends(CollectionViewModel, _super);
            function CollectionViewModel() {
                _super.call(this);
                this._warningMessage = "";
                this._latestSnapshotError = null;
                this._isTakingSnapshot = false;
                this._isForcingGarbageCollection = false;
                this._snapshotSummaryCollection = new MemoryProfiler.Common.Controls.ObservableCollection();
            }
            Object.defineProperty(CollectionViewModel.prototype, "snapshotSummaryCollection", {
                get: function () { return this._snapshotSummaryCollection; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "warningMessage", {
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
            Object.defineProperty(CollectionViewModel.prototype, "latestSnapshotError", {
                get: function () { return this._latestSnapshotError; },
                set: function (v) {
                    if (this._latestSnapshotError !== v) {
                        this._latestSnapshotError = v;
                        this.raisePropertyChanged("latestSnapshotError");
                        // Create the WER
                        MemoryProfiler.Common.MemoryProfilerViewHost.reportError(v, "SnapshotCapturingFailure");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isTakingSnapshot", {
                get: function () { return this._isTakingSnapshot; },
                set: function (v) {
                    if (this._isTakingSnapshot !== v) {
                        this._isTakingSnapshot = v;
                        this.raisePropertyChanged("isTakingSnapshot");
                        this.raisePropertyChanged("isViewBusy");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isForcingGarbageCollection", {
                get: function () { return this._isForcingGarbageCollection; },
                set: function (v) {
                    if (this._isForcingGarbageCollection !== v) {
                        this._isForcingGarbageCollection = v;
                        this.raisePropertyChanged("isForcingGarbageCollection");
                        this.raisePropertyChanged("isViewBusy");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isViewBusy", {
                get: function () { return this._isForcingGarbageCollection || this._isTakingSnapshot; },
                enumerable: true,
                configurable: true
            });
            return CollectionViewModel;
        }(MemoryProfiler.Common.Controls.ObservableViewModel));
        Collection.CollectionViewModel = CollectionViewModel;
        var CollectionView = (function (_super) {
            __extends(CollectionView, _super);
            function CollectionView(controller, model) {
                _super.call(this, "CollectionViewTemplate");
                this._screenshotWidth = 280;
                this._screenshotHeight = 160;
                this._screenshotKeepAspectRatio = true;
                this._controller = controller;
                this._model = model;
                this.rootElement.classList.add("collectionViewRoot");
                this._model.registerPropertyChanged(this);
                this._model.snapshotSummaryCollection.registerCollectionChanged(this);
                this._snapshotTileViewModelCollection = [];
                this._tilesContainer = this.findElement("tilesContainer");
                this._warningSection = this.findElement("warningSection");
                this._onSnapshotClickHandler = this.onSnapshotClick.bind(this);
                this._takeSnapshotTile = this.findElement("takeSnapshotTile");
                this._snapshotError = this.findElement("snapshotError");
                this._snapshotErrorMsg = this.findElement("snapshotErrorMsg");
                this._snapshotProgress = this.findElement("takeSnapshotProgress");
                this._snapshotButton = this.findElement("takeSnapshotButton");
                this._snapshotLabel = this.findElement("takeSnapshotLabel");
                this._snapshotIcon = this.findElement("takeSnapshotIcon");
                this._snapshotLabel.innerText = Microsoft.Plugin.Resources.getString("TakeSnapshot");
                this._snapshotProgress.innerText = Microsoft.Plugin.Resources.getString("Loading");
                this.toggleProgress(this._model.isViewBusy);
                this.updateTakeSnapshotButton();
                this._snapshotButton.addEventListener("click", this._onSnapshotClickHandler);
                this._controller.setScreenshotSize(this._screenshotWidth, this._screenshotHeight, this._screenshotKeepAspectRatio);
                Microsoft.Plugin.Theme.processInjectedSvg(this.rootElement);
            }
            Object.defineProperty(CollectionView.prototype, "snapshotTileViewModelCollection", {
                get: function () {
                    return this._snapshotTileViewModelCollection;
                },
                enumerable: true,
                configurable: true
            });
            CollectionView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "warningMessage":
                        this.showWarningMessage(this._model.warningMessage);
                        break;
                    case "latestSnapshotError":
                        this.showSnapshotError(this._model.latestSnapshotError);
                        break;
                    case "isTakingSnapshot":
                        this.toggleProgress(this._model.isViewBusy);
                        this.updateTakeSnapshotButton();
                        break;
                    case "isForcingGarbageCollection":
                        this.updateTakeSnapshotButton();
                        break;
                }
            };
            CollectionView.prototype.onCollectionChanged = function (eventArgs) {
                switch (eventArgs.action) {
                    case MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Add:
                        this.createTile(eventArgs.newItems[0]);
                        break;
                    case MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Reset:
                        this.removeSnapshotTiles();
                        break;
                }
            };
            CollectionView.prototype.createTile = function (snapshotSummary) {
                // Create the model and the view
                var model = new Collection.SnapshotTileViewModel(snapshotSummary);
                var newTile = new Collection.SnapshotTileView(model);
                this._snapshotTileViewModelCollection.push(model);
                this._tilesContainer.insertBefore(newTile.rootElement, this._takeSnapshotTile);
                newTile.rootElement.focus();
            };
            CollectionView.prototype.removeSnapshotTiles = function () {
                while (this._tilesContainer.hasChildNodes()) {
                    this._tilesContainer.removeChild(this._tilesContainer.firstChild);
                }
                this._tilesContainer.appendChild(this._takeSnapshotTile);
                this._snapshotTileViewModelCollection = [];
            };
            CollectionView.prototype.toggleProgress = function (show) {
                if (this._snapshotProgress && this._snapshotError) {
                    if (show) {
                        this._snapshotLabel.style.display = "none";
                        this._snapshotIcon.style.display = "none";
                        this._snapshotProgress.style.display = "block";
                        this._snapshotError.style.display = "none";
                        this._snapshotButton.setAttribute("aria-label", Microsoft.Plugin.Resources.getString("Loading"));
                    }
                    else {
                        this._snapshotLabel.style.display = "";
                        this._snapshotIcon.style.display = "";
                        this._snapshotProgress.style.display = "none";
                        this._snapshotButton.setAttribute("aria-label", Microsoft.Plugin.Resources.getString("TakeSnapshot"));
                    }
                }
            };
            CollectionView.prototype.showSnapshotError = function (error) {
                if (this._snapshotErrorMsg && this._snapshotError) {
                    if (error) {
                        // Show the message
                        this._snapshotErrorMsg.innerText = MemoryProfiler.Common.ErrorFormatter.format(error);
                        this._snapshotError.style.display = "block";
                    }
                    else {
                        // Hide the message
                        this._snapshotErrorMsg.innerText = "";
                        this._snapshotError.style.display = "none";
                    }
                }
            };
            CollectionView.prototype.showWarningMessage = function (warning) {
                if (!this._warningSection) {
                    return;
                }
                if (warning) {
                    this._warningSection.innerHTML = warning;
                    this._warningSection.style.display = "inline";
                }
                else {
                    this._warningSection.innerHTML = "";
                    this._warningSection.style.display = "none";
                }
            };
            CollectionView.prototype.onSnapshotClick = function (e) {
                this._controller.takeSnapshot();
            };
            CollectionView.prototype.updateTakeSnapshotButton = function () {
                if (this._snapshotButton) {
                    if (!this._model.isViewBusy) {
                        this._snapshotButton.classList.remove("disabled");
                        this._snapshotButton.disabled = false;
                    }
                    else {
                        if (this._model.isForcingGarbageCollection)
                            this._snapshotButton.classList.add("disabled");
                        this._snapshotButton.disabled = true;
                    }
                }
            };
            return CollectionView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Collection.CollectionView = CollectionView;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
//--------
/// <reference path="CollectionView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var TakeSnapshotTask = (function () {
            function TakeSnapshotTask(controller) {
                this._snapshotAgents = [];
                this._controller = controller;
                this._snapshotAgents.push(new MemoryProfiler.Common.ClrSnapshotAgent());
                this._snapshotAgents.push(new MemoryProfiler.Common.ScreenshotSnapshotAgent());
                this._snapshotAgents.push(new MemoryProfiler.Common.NativeSnapshotAgent());
            }
            TakeSnapshotTask.prototype.start = function () {
                var _this = this;
                return new Microsoft.Plugin.Promise(function (completed, error) {
                    if (!_this.takeSnapshotInternal()) {
                        if (error) {
                            error(new Error("Snapshot Not Currently Enabled"));
                        }
                    }
                    else {
                        _this._snapshotCompleted = completed;
                        _this._snapshotError = error;
                    }
                });
            };
            TakeSnapshotTask.prototype.isCompleted = function (message) {
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj.eventName) {
                        if (obj.eventName === "snapshotData") {
                            if (this._controller.model.isViewBusy) {
                                var snapshotData = obj;
                                if (this._activeSnapshot && snapshotData.id == this._activeSnapshot.id) {
                                    this._activeSnapshot.processAgentData(snapshotData.data.agent, snapshotData.data.data);
                                }
                            }
                        }
                    }
                    else {
                        if (this._controller.model.isViewBusy) {
                            if (obj.snapshotResults) {
                                this.onSnapshotResult(obj);
                            }
                            else {
                                var response = obj;
                                this.onSnapshotFailed(new Error(response.errorMessage));
                            }
                            return true;
                        }
                    }
                }
                return false;
            };
            TakeSnapshotTask.prototype.takeSnapshotInternal = function () {
                if (this._controller.model.isViewBusy) {
                    return false;
                }
                MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.TakeSnapshot, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart, MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotEnd);
                this._controller.model.isTakingSnapshot = true;
                this._activeSnapshot = new MemoryProfiler.Common.SnapshotEngine(Collection.CollectionViewController._nextIdentifier, this._snapshotAgents, this._controller);
                var message = "{ \"commandName\": \"takeSnapshot\", \"snapshotId\": \"" + Collection.CollectionViewController._nextIdentifier + "\", \"agentMask\": \"65535\" }";
                this._controller.sendMessage(message);
                return true;
            };
            TakeSnapshotTask.prototype.onSnapshotResult = function (snapshotResult) {
                var _this = this;
                if (!snapshotResult) {
                    throw new Error("<move to resources>: snapshotAsync ended with no response");
                }
                if (!this._activeSnapshot) {
                    this._controller.model.isTakingSnapshot = false;
                }
                else {
                    this._activeSnapshot.processSnapshotResults(snapshotResult.snapshotResults, function (snapshot) {
                        MemoryProfiler.Common.MemoryProfilerViewHost.session.addSnapshot(snapshot).then(function () {
                            _this.onSnapshotCompleted(_this._activeSnapshot.snapshot);
                        });
                    }, this.onSnapshotFailed);
                }
            };
            TakeSnapshotTask.prototype.onSnapshotCompleted = function (snapshot) {
                if (this._snapshotCompleted) {
                    this._snapshotCompleted(Microsoft.Plugin.Promise.wrap(snapshot));
                }
                this._snapshotCompleted = null;
                this._snapshotError = null;
                if (!snapshot) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("MemProf.1014"));
                }
                Collection.CollectionViewController._nextIdentifier++;
                this._controller.model.snapshotSummaryCollection.add(snapshot);
                this._controller.model.isTakingSnapshot = false;
                this._activeSnapshot = null;
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart);
            };
            TakeSnapshotTask.prototype.onSnapshotFailed = function (error) {
                if (!error) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("MemProf.1015"));
                }
                error.message = Microsoft.Plugin.Resources.getString("SnapshotCreationFailed", error.message);
                this._controller.model.latestSnapshotError = error;
                this._controller.model.isTakingSnapshot = false;
                this._activeSnapshot = null;
                if (this._snapshotError) {
                    this._snapshotError(error);
                }
                this._snapshotCompleted = null;
                this._snapshotError = null;
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart);
                MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
            };
            return TakeSnapshotTask;
        }());
        Collection.TakeSnapshotTask = TakeSnapshotTask;
        var ForceGcCollectionAgentTask = (function () {
            function ForceGcCollectionAgentTask(controller) {
                this._controller = controller;
            }
            ForceGcCollectionAgentTask.prototype.start = function () {
                var _this = this;
                MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ForceGarbageCollection, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionStart, MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionEnd);
                return new Microsoft.Plugin.Promise(function (completed) {
                    _this._controller.model.isForcingGarbageCollection = true;
                    var message = "{ \"commandName\": \"forceGarbageCollection\"}";
                    _this._controller.sendMessage(message);
                    _this._forceGcCompleted = completed;
                });
            };
            ForceGcCollectionAgentTask.prototype.isCompleted = function (message) {
                var result = false;
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj.eventName && obj.eventName === "forcedGarbageCollectionComplete") {
                        this._controller.model.isForcingGarbageCollection = false;
                        MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionStart);
                        result = true;
                    }
                }
                if (this._forceGcCompleted) {
                    this._forceGcCompleted();
                }
                this._forceGcCompleted = null;
                return result;
            };
            return ForceGcCollectionAgentTask;
        }());
        Collection.ForceGcCollectionAgentTask = ForceGcCollectionAgentTask;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
// <reference path="../../Common/controls/componentModel.ts" />
//--------
/// <reference path="../../../../../Common/Script/Hub/plugin.redirect.d.ts" />
/// <reference path="CollectionViewHost.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CommandBase = (function (_super) {
            __extends(CommandBase, _super);
            function CommandBase(host, commandBinding) {
                _super.call(this, commandBinding);
                this._host = host;
            }
            CommandBase.prototype.setNext = function (nextCommand) {
                this._nextCommand = nextCommand;
            };
            CommandBase.prototype.onCollectionFinishing = function () {
                this.setEnabled(false);
                if (this._nextCommand) {
                    this._nextCommand.onCollectionFinishing();
                }
            };
            CommandBase.prototype.onTargetIsManaged = function () {
                if (this._nextCommand) {
                    this._nextCommand.onTargetIsManaged();
                }
            };
            CommandBase.prototype.onPropertyChanged = function (propertyName) {
                if (propertyName === "isViewBusy") {
                    this.setEnabled(this.shouldEnable());
                }
                if (this._nextCommand) {
                    this._nextCommand.onPropertyChanged(propertyName);
                }
            };
            CommandBase.prototype.onClose = function () {
                this.setEnabled(false);
                if (this._nextCommand) {
                    this._nextCommand.onClose();
                }
            };
            CommandBase.prototype.shouldEnable = function () {
                return !this._host.collectionViewController.model.isViewBusy;
            };
            return CommandBase;
        }(Microsoft.VisualStudio.DiagnosticsHub.ToolbarButton));
        Collection.CommandBase = CommandBase;
        var TakeSnapshotCommand = (function (_super) {
            __extends(TakeSnapshotCommand, _super);
            function TakeSnapshotCommand(host) {
                _super.call(this, host, {
                    callback: function () { return host.collectionViewController.takeSnapshot(); },
                    label: Microsoft.Plugin.Resources.getString("TakeSnapshot"),
                    iconEnabled: "image-snapshot",
                    iconDisabled: "image-snapshot-disabled",
                    disabled: function () { return host.collectionViewController.model.isViewBusy; },
                    displayOnToolbar: true
                });
            }
            return TakeSnapshotCommand;
        }(CommandBase));
        Collection.TakeSnapshotCommand = TakeSnapshotCommand;
        var ForceGcCommand = (function (_super) {
            __extends(ForceGcCommand, _super);
            function ForceGcCommand(host) {
                _super.call(this, host, {
                    callback: function () { return host.collectionViewController.forceGarbageCollection(); },
                    label: Microsoft.Plugin.Resources.getString("ForceGc"),
                    iconEnabled: "image-forceGc",
                    iconDisabled: "image-forceGc-disabled",
                    displayOnToolbar: true
                });
                this.isManaged = false;
                this.setEnabled(false);
                this.container.hidden = true;
            }
            ForceGcCommand.prototype.onTargetIsManaged = function () {
                this.isManaged = true;
                this.setEnabled(this.shouldEnable());
                _super.prototype.onTargetIsManaged.call(this);
            };
            ForceGcCommand.prototype.shouldEnable = function () {
                return this.isManaged && _super.prototype.shouldEnable.call(this);
            };
            return ForceGcCommand;
        }(CommandBase));
        Collection.ForceGcCommand = ForceGcCommand;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
/// <reference path="../../../../../common/script/Hub/Plugin.redirect.d.ts" />
/// <reference path="../../../../../common/script/Hub/DiagnosticsHub.redirect.d.ts" />
/// <reference path="CollectionView.ts" />
/// <reference path="VsPluginCommandHelper.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CollectionViewHost = (function (_super) {
            __extends(CollectionViewHost, _super);
            function CollectionViewHost() {
                _super.call(this);
            }
            CollectionViewHost.prototype.sessionStateChanged = function (eventArgs) {
                var currentState = eventArgs.currentState;
                switch (currentState) {
                    case 400 /* CollectionFinishing */:
                        CollectionViewHost.CommandChain.onCollectionFinishing();
                        break;
                    case 500 /* CollectionFinished */:
                        Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().removeStateChangedEventListener(this.sessionStateChanged);
                        // Have session persist our session metadata now
                        var eventCompleteDeferral = eventArgs.getDeferral();
                        var onSaveCompleted = function (success) {
                            eventCompleteDeferral.complete();
                        };
                        this.session.save(this.collectionViewController.managedDataSeen === true).done(onSaveCompleted);
                        break;
                }
            };
            CollectionViewHost.prototype.onPropertyChanged = function (propertyName) {
                CollectionViewHost.CommandChain.onPropertyChanged(propertyName);
            };
            CollectionViewHost.prototype.initializeView = function (sessionInfo) {
                this.collectionViewController = new Collection.CollectionViewController();
                document.getElementById('mainContainer').appendChild(this.collectionViewController.view.rootElement);
                this.collectionViewController.model.registerPropertyChanged(this);
                Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().addStateChangedEventListener(this.sessionStateChanged.bind(this));
                Microsoft.Plugin.addEventListener("close", function () {
                    CollectionViewHost.CommandChain.onClose();
                });
                this.initCommands();
            };
            CollectionViewHost.prototype.initCommands = function () {
                if (Microsoft.Plugin.VS && Microsoft.Plugin.VS.Commands) {
                    var takeSnapshotCommand = new Collection.TakeSnapshotCommand(this);
                    var forceGcCommand = new Collection.ForceGcCommand(this);
                    takeSnapshotCommand.setNext(forceGcCommand);
                    CollectionViewHost.CommandChain = takeSnapshotCommand;
                    var toolbarSection = document.getElementsByClassName('toolbarSection')[0];
                    var toolbar = new Microsoft.VisualStudio.DiagnosticsHub.Toolbar();
                    toolbar.addToolbarItem(takeSnapshotCommand);
                    toolbar.addToolbarItem(forceGcCommand);
                    toolbarSection.appendChild(toolbar.container);
                }
            };
            return CollectionViewHost;
        }(MemoryProfiler.Common.MemoryProfilerViewHostBase));
        Collection.CollectionViewHost = CollectionViewHost;
        Collection.CollectionViewHostInstance = new CollectionViewHost();
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
MemoryProfiler.Collection.CollectionViewHostInstance.loadView();
//# sourceMappingURL=CollectionViewMerged.js.map
// SIG // Begin signature block
// SIG // MIInzwYJKoZIhvcNAQcCoIInwDCCJ7wCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // r1JqyCsZvF1S1NAQ3FeDFIhiaGOaUNnrZh1//wLqu4yg
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
// SIG // ghmiMIIZngIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADTU6RphoosHiPAAAAAANNMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCBbN29Ax2IS4BIC
// SIG // 9VbvQGIFGCF2l8Olhq+/4CYYaTaYgjBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAKfv6aLGhwfroN3BCw5qxIcJ/6GifxYw
// SIG // BaHhVzNZCEchY91t6eYmLhZsbMVYEKb5t37nxRw/4Kip
// SIG // 3XQKHW+KwF5saOAYF5wraqE9tDPw80JljLBBQfzbEt6X
// SIG // Bw8q7ShbCuYyu6QyEUTER5RxHJU+9CVCQWhWj2jIY6LE
// SIG // GV2N7ViSyQB9kFEKy1Ycb64wijyUljz9EBLtwm2TbpMZ
// SIG // AqjPjAtEeaAhUOAiaUyOGndC5lxHpfswu40oC7w4CHPm
// SIG // n34xJuoHhFFZAzMV1xfR7YUYlB1/lT4+X5jf8iTMOjIy
// SIG // n7fRUHw0wyExpPS0ISVWfAe8Mr5Tg2JvWlErPheuH8dW
// SIG // XQ2hghcsMIIXKAYKKwYBBAGCNwMDATGCFxgwghcUBgkq
// SIG // hkiG9w0BBwKgghcFMIIXAQIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBWQYLKoZIhvcNAQkQAQSgggFIBIIBRDCCAUAC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // p18nlvKAYQkWwAYo835F/Hr/Qzcc0bNMTx8iPy+l3OkC
// SIG // BmTfhJDZ9hgTMjAyMzA4MzExNzI1NTguNjg2WjAEgAIB
// SIG // 9KCB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsG
// SIG // A1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
// SIG // cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVT
// SIG // Tjo4NkRGLTRCQkMtOTMzNTElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEXswggcnMIIF
// SIG // D6ADAgECAhMzAAABtyEnGgeiKoZGAAEAAAG3MA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTIyMDkyMDIwMjIxNFoXDTIzMTIxNDIwMjIx
// SIG // NFowgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046ODZE
// SIG // Ri00QkJDLTkzMzUxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQDH/c9XUDQTZEwatxyXJcqY
// SIG // 0HCSJQwIKb7MOLxyXtOp+d9kShpHJ9Fe6euTngNcDqDv
// SIG // vDbKKZ4z6VWfPuLP0YXTAjDT0CV6FnZFjqf96biBLNX8
// SIG // zwYEya3Zs3clGM6wJaCAmMe9toJnaWzX9z9MuWdoETuP
// SIG // LFiGMmHjSWHIfmXyc16qr7r6uxvDZvCDEIvGWsr8fuXU
// SIG // hgTOVWBwcQhI1xfRDekMOwOtEml4yo6I0qVJqWjOBZlX
// SIG // nPfOTzXUofITnj9rS+/NUgWp/dg09fbXzR7/R9BQJhNh
// SIG // xkcIsx5Cf/5gGXUtLOm4v1MDzJLAImuW6ZyAwTqGmHVp
// SIG // FdJVRuazdPpbUc/c45Wh/boXRkyflojSjq+5kZ5c2EAO
// SIG // d37UkiQarBKU8wr+3Ou933b5bcd8uPD3q+r3OlEeXuJE
// SIG // mbB9eNSIcYZkUdkphGm7mCjk3Tu0P75bwH0MbhJyfdzS
// SIG // +C2FdSFsPDvsTTuoJY6waQjnzjk0IFiRfjOvyD8rmK3L
// SIG // +/S7u5XOu0vlPTBLtnaINDLiSKGAjIrlWl0ufhZjiYsn
// SIG // 4gmZtFSbCee9MvZP7REHumkEfTMQ1tadhdx1nm6JV4/b
// SIG // Lu866xJTZRwBL6RYXIKDJ4spTU4k2cy8FI+0x/N4J7oM
// SIG // NRQhFVYeVPZcDTDy9SBrs/91PkU/cGQgSWCKxST3epPF
// SIG // LQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFLPyOT4MNCQF
// SIG // YQ3WAdsjyCPJeLTsMB8GA1UdIwQYMBaAFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3Js
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYB
// SIG // BQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFt
// SIG // cCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQC
// SIG // MAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0P
// SIG // AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQANnWTM
// SIG // m4VcUl02ycxYLzYjAlefwMp+VLsyVOPeWA7XHn6JXdHo
// SIG // UfUARgYR5gDLddFmAh89lkFMjN5kA+CLB3xC9SRMIBvb
// SIG // Rqu9bnJ/XZJywRw99Cb20EYSCnLxUp70QgqVaYpTPBf2
// SIG // GllwvVYm0nn/z1NhlgPtc7OuFRcSah3rsvCqq0MnxdtE
// SIG // gp3fM0WZeGGAXI4fRtBo4SR1DwGBMdK/I0lo8otqNlgB
// SIG // w+gqaQbZMJ2Un+wOvAy+DsMAaZhQd/r7m44DcGiAkvn5
// SIG // Blb0Zz9mYJpX52gGrPDMe4oCanIqqtEOgJ/tKx49ZMYr
// SIG // DXSIk8xZbuRsNnoV6S65efZL7JjjVQCR4Z3acd5/9K++
// SIG // kx/t1jUvVE/Y28UJBPrdrYYn+jCuZKxTJ5ASAgkfw1XF
// SIG // dasPbIOrDBKNMFkl5UGF73EFgOuXlc0pKLMpYSJSGWSy
// SIG // 9xh2Q9S0LQI6dgORewtyMODbewu2gwn6RcaJt2bpUZxS
// SIG // aJZTx297p4/YQPcb0Yip1jADKUuDGQKIleDtvc1imXVM
// SIG // 8oKe4A+FoyitdeSgidKLxHH/dgJ8DAFzJzbNaNCwrM4P
// SIG // rg5okGbOXke483Ss1Xxdc+23w2DTwCb5uaUkHW8t8CDr
// SIG // Df7LWIzPhJGj7VM6/DsjMKxvo6RTG7AeHHzerbyHhra7
// SIG // ZJTCRbZxevAnGWeSADCCB3EwggVZoAMCAQICEzMAAAAV
// SIG // xedrngKbSZkAAAAAABUwDQYJKoZIhvcNAQELBQAwgYgx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
// SIG // MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIy
// SIG // NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIi
// SIG // MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDk4aZM
// SIG // 57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/
// SIG // bErg4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1
// SIG // jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPFdvWGUNzBRMhx
// SIG // XFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41
// SIG // JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP
// SIG // 1uyFVk3v3byNpOORj7I5LFGc6XBpDco2LXCOMcg1KL3j
// SIG // tIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF
// SIG // 50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg
// SIG // 3viSkR4dPf0gz3N9QZpGdc3EXzTdEonW/aUgfX782Z5F
// SIG // 37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
// SIG // lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlM
// SIG // jgK8QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLX
// SIG // pyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ+QuJ
// SIG // YfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzF
// SIG // ER1y7435UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+e
// SIG // FnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkwEgYJKwYB
// SIG // BAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS
// SIG // /mTEmr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0A
// SIG // XmJdg/Tl0mWnG1M1GelyMFwGA1UdIARVMFMwUQYMKwYB
// SIG // BAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEFBQcDCDAZ
// SIG // BgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8E
// SIG // BAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAW
// SIG // gBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBN
// SIG // MEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAx
// SIG // MC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsG
// SIG // AQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIz
// SIG // LmNydDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4Swf
// SIG // ZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0xM7U518Jx
// SIG // Nj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6
// SIG // th542DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9I
// SIG // dQHZGN5tggz1bSNU5HhTdSRXud2f8449xvNo32X2pFaq
// SIG // 95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBew
// SIG // VIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7
// SIG // bj8sCXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7T7uG+jIa
// SIG // 2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzH
// SIG // VG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZ
// SIG // c9d/HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77IVRrakUR
// SIG // R6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
// SIG // QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKi
// SIG // excdFYmNcP7ntdAoGokLjzbaukz5m/8K6TT4JDVnK+AN
// SIG // uOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL6Xu/
// SIG // OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQd
// SIG // VTNYs6FwZvKhggLXMIICQAIBATCCAQChgdikgdUwgdIx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEm
// SIG // MCQGA1UECxMdVGhhbGVzIFRTUyBFU046ODZERi00QkJD
// SIG // LTkzMzUxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAMhnQRjD
// SIG // mzg5bBgWZklF9qFoH6nGoIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQAC
// SIG // BQDomyXhMCIYDzIwMjMwODMxMjI0NDQ5WhgPMjAyMzA5
// SIG // MDEyMjQ0NDlaMHcwPQYKKwYBBAGEWQoEATEvMC0wCgIF
// SIG // AOibJeECAQAwCgIBAAICBFsCAf8wBwIBAAICEVUwCgIF
// SIG // AOicd2ECAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYB
// SIG // BAGEWQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDAN
// SIG // BgkqhkiG9w0BAQUFAAOBgQAVQ/VftQWPuz4chBpllpVy
// SIG // /veSG62A4+OsZ7TxJXi7bZxPKbdwDQj7FwayDITGMBUw
// SIG // wlKZCeEib1xzZirwpgpchHkAFXQogRNzNTZZ6gjm9yoL
// SIG // 451idB/EAnV6A5C71Oz6cllmZ49cGxtgQbz5rad+kRr4
// SIG // 1DsZnB3CUZjrUZxPODGCBA0wggQJAgEBMIGTMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAABtyEnGgei
// SIG // KoZGAAEAAAG3MA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkq
// SIG // hkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcN
// SIG // AQkEMSIEILm6yUUXwwfyKBfv4EryEHWrcaVdyuaGQfrL
// SIG // xC9sURF9MIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCB
// SIG // vQQgbCd407Ie2i/ITXomBi+f/CAZ/M1H6+/0O65DPInN
// SIG // cEEwgZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYw
// SIG // JAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Eg
// SIG // MjAxMAITMwAAAbchJxoHoiqGRgABAAABtzAiBCBHM8CJ
// SIG // yFUSCxXOJANZro6JUgE/qAQHaolXifgXofDV6jANBgkq
// SIG // hkiG9w0BAQsFAASCAgAuCMRe4wZ+Oc4MXxu7cEooDl2H
// SIG // Ya4n7IJVELT++0xDU//uGHzCK8RnmAizm2bjwmQFOejq
// SIG // u2Gq58P234R56bpS6AzO8ooLe5qIAA4SQ/8o3LqoN/OT
// SIG // t3b2ynggWu5jV+XAmN1EpoYj8baDmJk9ZJ4NADt3IWi3
// SIG // EISbI9uqiU9oUdGqdslVu/Ae4WW18ownfHVynZpYnkcK
// SIG // U8b3VKJxQy1xTto9NDnDylGZ0iVz9gUJ0QcLtAE+fA3o
// SIG // QcmTD1SvQ7Lpf9u/qVIvt9kjReasSUfVnP1QCU1fPCVZ
// SIG // ZpM4pAoiPAlBJ7sd6/ZfeZjmMhWry+JDPVwUfMlIQgSG
// SIG // 5wnPu6Bl1lsmGYio+iO1hRnn+rbV7iGAQRIX9Xyda9Zp
// SIG // Q9z9TRyDHICSzD3uwmOlqCZk4V1wU9lhqYJigANWcV9c
// SIG // o4yvY1Fx0HhGKsGY1YtFB6uS7UcE91aWr6kDXKw+2Mt/
// SIG // ry3j5kwYaV0J2FcksCElIGEF3qvW1hjKrH11zMCG230s
// SIG // hQBWke+gZBVfty62K/DRnURfqe14QH8k1WTdjr8a/cBR
// SIG // /YtGS8pKZLTGryGCF54s9XRUOyJmPmMKb9iAlpI4k5lK
// SIG // 6lGTPReu85mwNTI5oqdQys3nhJRtle+cQjGn6u130Rhj
// SIG // mFxVmgCb0XWFl+razX5hGz/Udhv4Cg2w4FdDZbSV1Q==
// SIG // End signature block
