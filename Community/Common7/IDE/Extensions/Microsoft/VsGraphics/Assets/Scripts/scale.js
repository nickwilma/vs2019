//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
//
// Use of this source code is subject to the terms of the Microsoft shared
// source or premium shared source license agreement under which you licensed
// this source code. If you did not accept the terms of the license agreement,
// you are not authorized to use this source code. For the terms of the license,
// please see the license agreement between you and Microsoft or, if applicable,
// see the SOURCE.RTF on your install media or the root of your tools installation.
// THE SOURCE CODE IS PROVIDED "AS IS", WITH NO WARRANTIES OR INDEMNITIES.
//

///////////////////////////////////////////////////////////////////////////////
// heper to get a designer property as a bool
///////////////////////////////////////////////////////////////////////////////
function getDesignerPropAsBool(tname) {
    if (document.designerProps.hasTrait(tname))
        return document.designerProps.getTrait(tname).value;

    return false;
}

function getSelectionMode() {
    if (getDesignerPropAsBool("usePivot"))
        return 0; // default to object mode when using pivot
    if (document.designerProps.hasTrait("SelectionMode"))
        return document.designerProps.getTrait("SelectionMode").value;
    return 0;
}

function getCommandState(commandName) {
    var commandData = services.commands.getCommandData(commandName);
    if (commandData != null) {
        var trait = commandData.getTrait("state");
        if (trait != null) {
            return trait.value;
        }
    }
    return -1;
}

///////////////////////////////////////////////////////////////////////////////
// Button state trait
///////////////////////////////////////////////////////////////////////////////
var state = command.getTrait("state");

///////////////////////////////////////////////////////////////////////////////
// Property window and tool option settings 
///////////////////////////////////////////////////////////////////////////////

var enablePropertyWindow = 8;

var stepAmount = 1.0;

function StepAmountChanged(sender, args) {
    stepAmount = document.toolProps.getTrait("StepAmount").value;
}

var toolProps;
var toolPropCookie;
var snapCookie;
function createOptions() {
    toolProps = document.createElement("toolProps", "type", "toolProps");
    toolProps.getOrCreateTrait("StepAmount", "float", enablePropertyWindow);
    document.toolProps = toolProps;

    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapCookie = snapTrait.addHandler("OnDataChanged", OnSnapEnabledTraitChanged);

    toolProps.getTrait("StepAmount").value = stepAmount;

    // Set up the callback when the option traits are changed
    toolPropCookie = toolProps.getTrait("StepAmount").addHandler("OnDataChanged", StepAmountChanged);

    OnSnapEnabledTraitChanged(null, null);
}

function OnSnapEnabledTraitChanged(sender, args) {
    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    if (toolProps != null) {
        var stepAmountTrait = toolProps.getTrait("StepAmount");
        if (stepAmountTrait != null) {
            var newFlags = stepAmountTrait.flags;
            if (snapTrait.value) {
                newFlags |= enablePropertyWindow;
            }
            else {
                newFlags &= ~enablePropertyWindow;
            }
            stepAmountTrait.flags = newFlags;

            document.refreshPropertyWindow();
        }
    }
}

function getCameraElement()
{
    var camera = document.elements.findElementByTypeId("Microsoft.VisualStudio.3D.PerspectiveCamera");
    return camera;
}

function getWorldMatrix(element) {
    return element.getTrait("WorldTransform").value;
}

// find the mesh child
function findFirstChildMesh(parent) {
    // find the mesh child
    for (var i = 0; i < parent.childCount; i++) {

        // get child and its materials
        var child = parent.getChild(i);
        if (child.typeId == "Microsoft.VisualStudio.3D.Mesh") {
            return child;
        }
    }
    return null;
}

function getFirstSelectedWithoutAncestorInSelection() {
    var count = services.selection.count;
    for (var i = 0; i < count; i++) {
        var currSelected = services.selection.getElement(i);

        //
        // don't operate on items whose parents (in scene) are ancestors
        // since this will double the amount of translation applied to those
        //
        var hasAncestor = false;
        for (var otherIndex = 0; otherIndex < count; otherIndex++) {
            if (otherIndex != i) {
                var ancestor = services.selection.getElement(otherIndex);
                if (currSelected.behavior.isAncestor(ancestor)) {
                    hasAncestor = true;
                    break;
                }
            }
        }

        if (!hasAncestor) {
            return currSelected;
        }
    }
    return null;
}

///////////////////////////////////////////////////////////////////////////////
// Manipulator registration and event handling
///////////////////////////////////////////////////////////////////////////////
var manipulatorData = services.manipulators.getManipulatorData("ScaleManipulator");
var manipulator = services.manipulators.getManipulator("ScaleManipulator");
var undoableItem;

var manipulatorTraitXYZTraitChangedCookie;
var mxyz;

var accumDx;
var accumDy;
var accumDz;

///////////////////////////////////////////////////////////////////////////////
// Scale logic
///////////////////////////////////////////////////////////////////////////////
function coreScale(dx, dy, dz) {

    var selectionMode = getSelectionMode();

    var selectedElement = getFirstSelectedWithoutAncestorInSelection();

    if (selectedElement == null) {
        return;
    }

    if (selectionMode == 0) {

        //
        // object mode
        //
        var t = selectedElement.getTrait("Scale").value;

        var isSnapMode = getDesignerPropAsBool("snap");
        if (isSnapMode && stepAmount != 0) {

            var targetX = t[0] + dx + accumDx;
            var targetY = t[1] + dy + accumDy;
            var targetZ = t[2] + dz + accumDz;

            var roundedX = Math.round(targetX / stepAmount) * stepAmount;
            var roundedY = Math.round(targetY / stepAmount) * stepAmount;
            var roundedZ = Math.round(targetZ / stepAmount) * stepAmount;

            var halfStep = stepAmount * 0.5;
            var stepPct = halfStep * 0.9;

            if (Math.abs(roundedX - targetX) < stepPct) {
                t[0] = roundedX;
            }

            if (Math.abs(roundedY - targetY) < stepPct) {
                t[1] = roundedY;
            }

            if (Math.abs(roundedZ - targetZ) < stepPct) {
                t[2] = roundedZ;
            }

            accumDx = targetX - t[0];
            accumDy = targetY - t[1];
            accumDz = targetZ - t[2];
        }
        else {
            t[0] = t[0] + dx;
            t[1] = t[1] + dy;
            t[2] = t[2] + dz;
        }

        var minScale = 0.00001;
        if (Math.abs(t[0]) < minScale) {
            t[0] = minScale;
        }
        if (Math.abs(t[1]) < minScale) {
            t[1] = minScale;
        }
        if (Math.abs(t[2]) < minScale) {
            t[2] = minScale;
        }

        undoableItem._lastValue = t;
        undoableItem.onDo();
    }
    else if (selectionMode == 1 || selectionMode == 2 || selectionMode == 3) {

        // subobjects    
        undoableItem._currentDelta[0] = dx;
        undoableItem._currentDelta[1] = dy;
        undoableItem._currentDelta[2] = dz;

        undoableItem.onDo();
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// Listens to manipulator position changes
//
///////////////////////////////////////////////////////////////////////////////
function onManipulatorXYZChangedHandler(sender, args) {
    var xyzDelta = manipulatorData.getTrait("ManipulatorTraitXYZ").value;
    var dx = xyzDelta[0];
    var dy = xyzDelta[1];
    var dz = xyzDelta[2];

    coreScale(dx, dy, dz);
}

function UndoableSubobjectScale(obj, elem) {

    obj._totalDelta = [1, 1, 1];
    obj._currentDelta = [0, 0, 0];
    
    // find the mesh child
    obj._meshElem = findFirstChildMesh(elem);
    if (obj._meshElem == null) {
        return;
    }

    // get the scale origin in local space of node we're manipulating
    var manipulatorToWorld = manipulator.getWorldTransform();
    manipulatorToWorld = math.getNormalizedMatrix(manipulatorToWorld);

    var localToWorldMatrix = getWorldMatrix(obj._meshElem);

    var worldToLocal = math.getInverse(localToWorldMatrix);
    obj._manipulatorToLocal = math.multiplyMatrix(worldToLocal, manipulatorToWorld);
    obj._localToManipulator = math.getInverse(obj._manipulatorToLocal);

    obj._mesh = obj._meshElem.behavior;

    // loop over the elements in the polygon collection
    var collElem = obj._mesh.selectedObjects;
    if (collElem == null) {
        return;
    }

    obj._collectionElem = collElem.clone();

    // get the actual collection we can operate on
    obj._collection = obj._collectionElem.behavior;

    obj._geom = obj._meshElem.getTrait("Geometry").value
}

function SubobjectDoScale(obj)
{
    var polygonPoints = obj.getPoints();
    var lastTotal = [0, 0, 0];

    lastTotal[0] = obj._totalDelta[0];
    lastTotal[1] = obj._totalDelta[1];
    lastTotal[2] = obj._totalDelta[2];

    obj._totalDelta[0] += obj._currentDelta[0];
    obj._totalDelta[1] += obj._currentDelta[1];
    obj._totalDelta[2] += obj._currentDelta[2];

    var scale = [obj._totalDelta[0] / lastTotal[0], obj._totalDelta[1] / lastTotal[1], obj._totalDelta[2] / lastTotal[2]];

    var scaleMatrix = math.createScale(scale);

    var transform = math.multiplyMatrix(scaleMatrix, obj._localToManipulator);
    transform = math.multiplyMatrix(obj._manipulatorToLocal, transform);

    // loop over the unique set of indices and transform the associated point
    for (var key in polygonPoints) {

        var ptIdx = polygonPoints[key];
        var pt = obj._geom.getPointAt(ptIdx);

        pt = math.transformPoint(transform, pt);

        obj._geom.setPointAt(ptIdx, pt);
    }

    // invalidate the mesh collision
    obj._mesh.recomputeCachedGeometry();
}

function SubobjectUndoScale(obj) {
    var polygonPoints = obj.getPoints();

    var scale = [1.0 / obj._totalDelta[0], 1.0 / obj._totalDelta[1], 1.0 / obj._totalDelta[2]];

    var scaleMatrix = math.createScale(scale);

    var transform = math.multiplyMatrix(scaleMatrix, obj._localToManipulator);
    transform = math.multiplyMatrix(obj._manipulatorToLocal, transform);

    // loop over the unique set of indices and transform the associated point
    for (var key in polygonPoints) {

        var ptIdx = polygonPoints[key];
        var pt = obj._geom.getPointAt(ptIdx);

        pt = math.transformPoint(transform, pt);

        obj._geom.setPointAt(ptIdx, pt);
    }

    obj._currentDelta[0] = obj._totalDelta[0] - 1;
    obj._currentDelta[1] = obj._totalDelta[1] - 1;
    obj._currentDelta[2] = obj._totalDelta[2] - 1;

    obj._totalDelta[0] = 1;
    obj._totalDelta[1] = 1;
    obj._totalDelta[2] = 1;

    obj._mesh.recomputeCachedGeometry();
}

function onBeginManipulation() {

    undoableItem = null;

    //
    // Check the selection mode
    //
    var selectionMode = getSelectionMode();
    if (selectionMode == 0) {
        //
        // object selection
        //

        accumDx = 0;
        accumDy = 0;
        accumDz = 0;

        function UndoableScale(trait, traitValues, initialValue) {
            this._traitArray = traitArray;
            this._traitValues = traitValues;
            this._initialValues = initialValue;
        }

        var traitArray = new Array();
        var traitValues = new Array();
        var initialValues = new Array();

        //
        // add the traits of selected items to the collections that we'll be operating on
        //
        var count = services.selection.count;
        for (i = 0; i < count; i++) {
            var currSelected = services.selection.getElement(i);

            //
            // don't operate on items whose parents (in scene) are ancestors
            // since this will double the amount of translation applied to those
            //
            var hasAncestor = false;
            for (var otherIndex = 0; otherIndex < count; otherIndex++) {
                if (otherIndex != i) {
                    var ancestor = services.selection.getElement(otherIndex);
                    if (currSelected.behavior.isAncestor(ancestor)) {
                        hasAncestor = true;
                        break;
                    }
                }
            }

            if (!hasAncestor) {
                var currTrait = currSelected.getTrait("Scale");

                traitArray.push(currTrait);
                traitValues.push(currTrait.value);
                initialValues.push(currTrait.value);
            }
        }


        // create the undoable item
        undoableItem = new UndoableScale(traitArray, traitValues, initialValues);

        undoableItem.onDo = function () {

            var count = this._traitArray.length;

            // movement delta of all the selected is determined by delta of the first selected
            var delta = [0, 0, 0];
            if (count > 0) {
                delta[0] = this._lastValue[0] - this._initialValues[0][0];
                delta[1] = this._lastValue[1] - this._initialValues[0][1];
                delta[2] = this._lastValue[2] - this._initialValues[0][2];
            }

            for (i = 0; i < count; i++) {
                var currTrait = this._traitArray[i];
                this._traitValues[i][0] = this._initialValues[i][0] + delta[0];
                this._traitValues[i][1] = this._initialValues[i][1] + delta[1];
                this._traitValues[i][2] = this._initialValues[i][2] + delta[2];

                var theVal = [this._traitValues[i][0], this._traitValues[i][1], this._traitValues[i][2]];
                this._traitArray[i].value = theVal;
            }
        }

        undoableItem.onUndo = function () {
            var count = this._traitArray.length;
            for (i = 0; i < count; i++) {
                this._traitArray[i].value = this._initialValues[i];
            }
        }
    }
    else {
        
        // create the undoable item
        undoableItem = new Object();
        UndoableSubobjectScale(undoableItem, document.selectedElement);

        if (selectionMode == 1) {
            
            // face selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // map we will store indices in
                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the point indices in the poly collection
                var polyCount = this._collection.getPolygonCount();
                for (var i = 0; i < polyCount; i++) {
                    var polyIndex = this._collection.getPolygon(i);

                    // get the point count and loop over polygon points
                    var polygonPointCount = this._geom.getPolygonPointCount(polyIndex);
                    for (var j = 0; j < polygonPointCount; j++) {

                        // get the point index
                        var pointIndex = this._geom.getPolygonPoint(polyIndex, j);
                        polygonPoints[pointIndex] = pointIndex;
                    }
                }

                return polygonPoints;
            }
        }
        else if (selectionMode == 2) {

            // edges selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the edges collection
                var edgeCount = this._collection.getEdgeCount();
                for (var i = 0; i < edgeCount; i++) {
                    var edge = this._collection.getEdge(i);
                    polygonPoints[edge[0]] = edge[0];
                    polygonPoints[edge[1]] = edge[1];
                }

                return polygonPoints;
            }
        }
        else if (selectionMode == 3) {

            // point selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the point indices in the collection
                var ptCount = this._collection.getPointCount();
                for (var i = 0; i < ptCount; i++) {
                    var pt = this._collection.getPoint(i);
                    polygonPoints[pt] = pt;
                }

                return polygonPoints;
            }
        }

        //
        // do
        //
        undoableItem.onDo = function () {
            SubobjectDoScale(this);
        }

        //
        // undo
        //
        undoableItem.onUndo = function () {
            SubobjectUndoScale(this);
        }
    }

    if (undoableItem != null) {
        //
        // getName()
        //
        undoableItem.getName = function () {
            var IDS_MreUndoScale = 145;
            return services.strings.getStringFromId(IDS_MreUndoScale);
        }

        // add to undo stack
        services.undoService.addUndoableItem(undoableItem);
    }
}

//
// the tool
//
var tool = new Object();

var onBeginManipulationHandler;

tool.activate = function () {
    state.value = 2;

    createOptions();

    services.manipulators.activate("ScaleManipulator")

    mxyz = manipulatorData.getTrait("ManipulatorTraitXYZ");

    manipulatorTraitXYZTraitChangedCookie = mxyz.addHandler("OnDataChanged", onManipulatorXYZChangedHandler);

    onBeginManipulationHandler = manipulator.addHandler("OnBeginManipulation", onBeginManipulation);
}

tool.deactivate = function () {
    state.value = 0;

    toolProps.getTrait("StepAmount").removeHandler("OnDataChanged", toolPropCookie);

    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapTrait.removeHandler("OnDataChanged", snapCookie);

    mxyz.removeHandler("OnDataChanged", manipulatorTraitXYZTraitChangedCookie);
    
    manipulator.removeHandler("OnBeginManipulation", onBeginManipulationHandler);

    services.manipulators.deactivate("ScaleManipulator");
}

///////////////////////////////////////////////////////////////////////////////
// Global code
///////////////////////////////////////////////////////////////////////////////
if (state.value != 2) {
    document.setTool(tool);
}
// SIG // Begin signature block
// SIG // MIInvQYJKoZIhvcNAQcCoIInrjCCJ6oCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // sfppIvAUfmoyDEnMCUyCiCNyBUQJN01CKjbrhRDg+Iqg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmfMIIZmwIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCANy8WGJO7NaQ/TYFTI8D56WfFGjvAFdw7H
// SIG // pvM/AwO5oTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAJnDSJlQ
// SIG // X0uxgtGAy9856nXXu6nt7ya8ZB/+o92wAFx1k2Fa8OZY
// SIG // StidCzLBzRErWNP1DromCtIcYtbTlICkp4VRPIEw24om
// SIG // 8Waoi5I//3LFgs7t9Gw2ktLVc/d04E1Ur0CQA7snA68j
// SIG // qrDnc//afma0yrpJOtRVpMYXMjI7vLCyhV1I3GjFCzrT
// SIG // c0Fq2xTZ9Z+z8hoPr7C1vD5RpZCgfzjtZQafSqP5nJNB
// SIG // DaNAh/lFPp2UW9GmX6sbscGRb7cKbPwfBuQjW+VP2TcC
// SIG // rStooIkC8mo83j//TiBjZNtNiO6LJmGTKLXjsHmeS114
// SIG // oXOD7/pwDoF7YShxumcJCKhJDuWhghcpMIIXJQYKKwYB
// SIG // BAGCNwMDATGCFxUwghcRBgkqhkiG9w0BBwKgghcCMIIW
// SIG // /gIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWQYLKoZIhvcN
// SIG // AQkQAQSgggFIBIIBRDCCAUACAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgHUn2R+uLOnv115CP48sc
// SIG // RJJyIL534UL/1sI9waXLz3ACBmTeXl8/GxgTMjAyMzA4
// SIG // MzExNzMxMDguOTk1WjAEgAIB9KCB2KSB1TCB0jELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0
// SIG // IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYD
// SIG // VQQLEx1UaGFsZXMgVFNTIEVTTjo4RDQxLTRCRjctQjNC
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaCCEXgwggcnMIIFD6ADAgECAhMzAAABs/4l
// SIG // zikbG4ocAAEAAAGzMA0GCSqGSIb3DQEBCwUAMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTIyMDkyMDIw
// SIG // MjIwM1oXDTIzMTIxNDIwMjIwM1owgdIxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVs
// SIG // YW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMd
// SIG // VGhhbGVzIFRTUyBFU046OEQ0MS00QkY3LUIzQjcxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQC0fA+65hiAriywYIKyvY3t4SUqXPQk8G62v+Cm9nru
// SIG // Q2UeqAoBbQm4oDLjHGN9UJR6/95LloRydOZ+Prd++zx6
// SIG // J3Qw28/3VPqvzX10iq9acFNji8pWNLMOd9VWdbFgHcg9
// SIG // hEAhM03Sw+CiWwusJgAqJ4iQQKr4Q8l8SdDbr5ZO+K3V
// SIG // RL64m7A2ccwpVhGuL+thDY/x8oglF9zGRp2PwIQ8ms36
// SIG // XIQ1qD+nCYDQkl5h1fV7CYFyeJfgGAIGqgLzfDfhKTft
// SIG // ExKwoBTn8GVdtXIO74HpzlePIJhvxDH9C70QHoq8T1Lv
// SIG // ozQdyUhW1tVlPGecbCxKDZXt+YnHRE/ht8AzZnEl5UGL
// SIG // OLfeCFkeeNfj7FE5KtJJnT+P9TuBg+eGbCeXlJy2msFz
// SIG // scU9X4G1m/VUYNWeGrKVqbi+YBcB2vFDTEcbCn36K+qq
// SIG // 11VUNTnSTktSZXr4aWZbLEglQ6HTHN9CN31ns58urTTq
// SIG // H6X2j67cCdLpF3Cw9ck/vPbuLkAf66lCuiex6ZDbtH0e
// SIG // TOcRrTnIfZ8p3DvWpaK8Q34hHW+s3qrQn3G6OOrvv637
// SIG // LJXBkriRc5cBDZ1Pr0PiSeoyUVKwfpq+dc1lDIlkyw1Z
// SIG // oS3euv/w2v2AYwNAYtIXGLjv1nLX1pP98fOwC27ahwG5
// SIG // OotXCfGtnKInro/vQQEko7l5AQIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFNAaXcJRZ1IMGIs4SCH/XgXcn8ONMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQBahrs3zrAJuMACXxEZiYFltLTS
// SIG // yz5OlWI+d/oQZlCArKhoI/aFzTWrYAqvox7dNxIk81Yc
// SIG // bXilji6EzMd/XAnFCYAzkCB/ho7so2FVXTgmvRcepSOv
// SIG // dPzgWRZc9gw7i6VAbqP/793uCp7ONdpjtwOpg0JJ3cXi
// SIG // UrHQUm5CqnHAe0wv5rhToc4N/Zn4oxiAnNZGc4iRP+h3
// SIG // SghfKffr7NchlEebs5CKPuvKv5+ZDbd94XWkNt+FRIdM
// SIG // D0hPnQoKSkan8YGLAU/+bV2t3vE18iZVaBvY8Fwayp0k
// SIG // G+PpNfYx1Qd8FVH5Z7gDSUSPWs1sKmBSg22VpH0PLaTa
// SIG // BXyihUR21qJnKHT9W1Z+5CllAkwPGBtkZUwbb67NwqmN
// SIG // 5gA0yVIoOHJDfzBugCK/EPgApigRJuDhaTnGTF9HMWrK
// SIG // KXYMTPWknQbrGiX2dyLZd7wuQt0RPe7lEbFQdqbwvgp4
// SIG // xbbfz5GO9ZfVEx81AjvvjOIUhks5H7vsgYVzBngWai15
// SIG // fXH34GD3J0RY0E/exm/24OLLCyBbjSTTQCbm/iL8YaJk
// SIG // a7VrgeEjfd+aDH7xuXBHme3smKQWeA25LzeOGbxEdBB0
// SIG // WpC9sW9a67I+3PCPmrhKmM7VKQ57qugcaQSFAJRd1Ayd
// SIG // EjBucalv/YSzFp2iQryHqxFkxZuuI7YQItAQzMJwsDCC
// SIG // B3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUw
// SIG // DQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4
// SIG // MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUA
// SIG // A4ICDwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC
// SIG // 0/3unAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm
// SIG // 95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNE
// SIG // t6aORmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZT
// SIG // fDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQ
// SIG // HJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5
// SIG // LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVV
// SIG // mG1oO5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKy
// SIG // zbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpG
// SIG // dc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2
// SIG // TPYrbqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZ
// SIG // fD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
// SIG // GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSL
// SIG // W6CmgyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLU
// SIG // HMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXb
// SIG // GjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQID
// SIG // AQABo4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAj
// SIG // BgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8v
// SIG // BO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1Gely
// SIG // MFwGA1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNV
// SIG // HSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwU
// SIG // tj5OR2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTC
// SIG // j/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+
// SIG // iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhT
// SIG // dSRXud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYS
// SIG // EhFdPSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qB
// SIG // woEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0
// SIG // DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxy
// SIG // bxCrdTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARx
// SIG // v2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+k
// SIG // KNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2
// SIG // tVdUCbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4
// SIG // O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
// SIG // jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTm
// SIG // dHRbatGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/Z
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLUMIIC
// SIG // PQIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046OEQ0MS00QkY3LUIzQjcxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
// SIG // ATAHBgUrDgMCGgMVAHGLROiW3R4SpcJCXiqAldSSJA5h
// SIG // oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwDQYJKoZIhvcNAQEFBQACBQDomqbJMCIYDzIwMjMw
// SIG // ODMxMTM0MjMzWhgPMjAyMzA5MDExMzQyMzNaMHQwOgYK
// SIG // KwYBBAGEWQoEATEsMCowCgIFAOiapskCAQAwBwIBAAIC
// SIG // AkUwBwIBAAICEsUwCgIFAOib+EkCAQAwNgYKKwYBBAGE
// SIG // WQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAweh
// SIG // IKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOBgQCB
// SIG // HyyTB/Wg4W2E01FcocWNJ40koWe81U2khBX7unWhpRO8
// SIG // 11t6skn5JC4tqyqyXZpVogvl/xDKlNuAiPDxnOvRdxRL
// SIG // VreRNLdty3EodTH9EbfKqDQRkuohDvKw0azSB2K3c86e
// SIG // CxefVPArFURb/EPFd/SFNKrm1xgjbud+o48pgTGCBA0w
// SIG // ggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwAhMzAAABs/4lzikbG4ocAAEAAAGzMA0GCWCGSAFl
// SIG // AwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcN
// SIG // AQkQAQQwLwYJKoZIhvcNAQkEMSIEIMhOYo04TxSdYkSe
// SIG // c5djC0Z310NebnPaQk2ZIVj6TG+LMIH6BgsqhkiG9w0B
// SIG // CRACLzGB6jCB5zCB5DCBvQQghqEz1SoQ0ge2RtMyUGVD
// SIG // No5P5ZdcyRoeijoZ++pPv0IwgZgwgYCkfjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAbP+Jc4pGxuK
// SIG // HAABAAABszAiBCBPKhvm/sTTxgxJ5EWmcCU9dwa+rQmL
// SIG // +f5fE4dMq0nV7zANBgkqhkiG9w0BAQsFAASCAgCX54e5
// SIG // CqVrcN43QiGrlOc8ADYQDMe0m2omhXfTPJekaLAEDav4
// SIG // sHIH5xd//MLy+mA5ixH0K+OTUzOdj4N5Z4qKIkOo4qIv
// SIG // wJc2AKP2zEt3PUSGSVTWmRrySDRKr7X6OqakO46NF3j1
// SIG // +dqKmDExi+E36h3WZ9QbcvkoCH/TXhWxPjwPjmt0B/Jc
// SIG // cqsqm8GriN7wlRxP1wGdhnnAOTzB3Dw7i2VY6WHrzV7n
// SIG // CtgiV0k3enVmsLCE8FzsSyki9Njre6U1siMH19oo1Jx1
// SIG // KXhvL87tx6VMU7fLJLndH6o21pY4x0SAbsv53H36ArFV
// SIG // 3c/LXAGAjRHD3tEv3v0QJ2BSC4qfhwQQXi8vvc5SaD7M
// SIG // k+84zVEWqXZfPN+r1qGqdS3tfYWtf56WqByYcoknHBFR
// SIG // 4imPKuTB7gK0vHQgBhQ6MWwuQbWZgGzL8n6zLWqm3792
// SIG // QYsxDsLzH5/6k8M8uNPaAcr1j6txK50PVr4l9IDFUQy1
// SIG // sval7KSvPbk12o4RHtP691kndbouq769kS7hZmfRW5TR
// SIG // YJVUb0bmLAM4Eo45dpuIlqfozl/1zB8ZXLdz2Yqyr4f+
// SIG // 1/SGmYdK2Wds6a+OqKokSceIGxNQ0G3W3ri1Hh39+uBy
// SIG // mb2FErCfW2sKYukWUuP85Ea+2Y3gt0DJrFLYYUWb/reb
// SIG // Baxczp+sExX28tdA0Q==
// SIG // End signature block
