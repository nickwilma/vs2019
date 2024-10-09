
//
// AddSubdivisions.js
//
function addSubdivisions(geom, polyCollection, polyIndex, splitEdgesMap, polysToSelect) {

    var polygonPointCount = geom.getPolygonPointCount(polyIndex);
    if (polygonPointCount < 3) {
        return;
    }
    // services.debug.trace("splitting poly : " + polyIndex);

    var containingMesh = polyCollection.getContainingMesh();

    // determine if we need to add new texture coordinates
    var IndexingModeUndefined = 0;
    var IndexingModePerPoint = 1;
    var IndexingModePerPointOnPolygon = 3;

    // determine the material index on the pre division polygon
    var materialIndex = geom.getPolygonMaterialIndex(polyIndex);

    // this is our starting index for new points
    var newPointStart = geom.pointCount;

    // we'll compute the center of the triangle
    var avgPos = [0, 0, 0];
    var avgTex = [0, 0];

    // iterate over polypoints and total
    for (var i = 0; i < polygonPointCount; i++) {
        var point = geom.getPointOnPolygon(polyIndex, i);
        avgPos[0] += point[0];
        avgPos[1] += point[1];
        avgPos[2] += point[2];
    }

    // total tex coords if needed
    if (geom.textureCoordinateIndexingMode != IndexingModeUndefined) {
        for (var i = 0; i < polygonPointCount; i++) {
            
            var texCoord = geom.getTextureCoordinateOnPolygon(polyIndex, i);
            avgTex[0] += texCoord[0];
            avgTex[1] += texCoord[1];
        }
    }

    // get the center 
    var div = 1.0 / polygonPointCount;
    avgPos[0] *= div;
    avgPos[1] *= div;
    avgPos[2] *= div;

    avgTex[0] *= div;
    avgTex[1] *= div;

    // add the avg point
    geom.addPoints(avgPos, 1);

    // store tex coords if (if we need to)
    // we'll put these into the geom later
    var texcoords = new Array();
    if (geom.textureCoordinateIndexingMode == IndexingModePerPoint) {
        geom.addTextureCoordinates(avgTex, 1);
    }
    else if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
        texcoords.push(avgTex);
    }

    // split points for this polygon
    var splitPointIndices = new Array();
    
    // compute the split points
    for (var i = 0; i < polygonPointCount; i++) {
        var i0 = i;
        var i1 = i + 1;
        if (i1 >= polygonPointCount) {
            i1 = 0;
        }
        var p0 = geom.getPointOnPolygon(polyIndex, i0);
        var p1 = geom.getPointOnPolygon(polyIndex, i1);

        // get object level indices
        var oi0 = geom.getPolygonPoint(polyIndex, i0);
        var oi1 = geom.getPolygonPoint(polyIndex, i1);

        // index of the point that splits this edge
        var splitPointIndex = 0;

        // we're splitting the edge between object level points
        // p0 and p1, so see if this is edge has been previously split

        var tmp0 = Math.min(oi0, oi1);
        var tmp1 = Math.max(oi0, oi1);

        // services.debug.trace("splitting edge: " + tmp0 + " " + tmp1);

        var wasNewPointCreated = false;
        if (splitEdgesMap.hasOwnProperty("" + tmp0) && (splitEdgesMap[tmp0].hasOwnProperty("" + tmp1)))
        {
            splitPointIndex = splitEdgesMap[tmp0][tmp1];
            // services.debug.trace("using split point: " + splitPointIndex);
        }
        else
        {
            wasNewPointCreated = true;

            var split = [0, 0, 0];
            split[0] = p0[0] + 0.5 * (p1[0] - p0[0]);
            split[1] = p0[1] + 0.5 * (p1[1] - p0[1]);
            split[2] = p0[2] + 0.5 * (p1[2] - p0[2]);

            if (splitEdgesMap.hasOwnProperty("" + tmp0) == false) {
                splitEdgesMap[tmp0] = new Object();
            }

            splitPointIndex = geom.pointCount;
            geom.addPoints(split, 1);

            // services.debug.trace("created split point: " + splitPointIndex);

            splitEdgesMap[tmp0][tmp1] = splitPointIndex;
        }
        splitPointIndices.push(splitPointIndex);

        if (geom.textureCoordinateIndexingMode != IndexingModeUndefined) {

            var texCoord0 = geom.getTextureCoordinateOnPolygon(polyIndex, i0);
            var texCoord1 = geom.getTextureCoordinateOnPolygon(polyIndex, i1);
            var texCoord = [0, 0];
            texCoord[0] = texCoord0[0] + 0.5 * (texCoord1[0] - texCoord0[0]);
            texCoord[1] = texCoord0[1] + 0.5 * (texCoord1[1] - texCoord0[1]);

            if (geom.textureCoordinateIndexingMode == IndexingModePerPoint) {
                if (wasNewPointCreated) {
                    geom.addTextureCoordinates(texCoord, 1);
                }   
            }
            else if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
                texcoords.push(texCoord);
            }
        }

        //
        // we need to split edges on polys if the edge is shared
        //
        var polygonsSharingEdge = geom.getPolygonsFromEdge(tmp0, tmp1);
        var sharedPolyCount = polygonsSharingEdge.getPolygonCount();
        for (var j = 0; j < sharedPolyCount; j++) {
            var sharedPolygonIndex = polygonsSharingEdge.getPolygon(j);
            if (polyCollection.hasPolygon(sharedPolygonIndex) == false) {
                // this is a shared poly, and not part of the set we're going to subdivide explicitly
                // so we need to break the edge tmp0, tmp1
                geom.insertPolygonPoint(sharedPolygonIndex, tmp0, tmp1, splitPointIndex);
            }
        }
    }

    // we now create a new polygon (quad) for each point in the old poly
    // i.e oldpoly point count == old poly edge count == number of new polys created after split
    for (var i = 0; i < polygonPointCount; i++) {

        // wrap around
        var prevIndex;
        if (i > 0) {
            prevIndex = i - 1;
        }
        else {
            prevIndex = polygonPointCount - 1;
        }

        // add a polygon
        var thisPolyIndex = geom.polygonCount;
        geom.addPolygon(materialIndex);

        polysToSelect.push(thisPolyIndex);

        // add points
        var i0 = geom.getPolygonPoint(polyIndex, i);
        var i1 = splitPointIndices[i];
        var i2 = newPointStart;
        var i3 = splitPointIndices[prevIndex];

        geom.addPolygonPoint(thisPolyIndex, i0);
        geom.addPolygonPoint(thisPolyIndex, i1);
        geom.addPolygonPoint(thisPolyIndex, i2);
        geom.addPolygonPoint(thisPolyIndex, i3);

        if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
            geom.addTextureCoordinates(geom.getTextureCoordinateOnPolygon(polyIndex, i), 1);
            geom.addTextureCoordinates(texcoords[i + 1], 1);
            geom.addTextureCoordinates(texcoords[0], 1);
            geom.addTextureCoordinates(texcoords[prevIndex + 1], 1);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// helper to get a designer property as a bool
//
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


// find the mesh child
function findFirstChildMeshElement(parent)
{
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


function UndoableItem(collElem, meshElem) {

    this._clonedColl = collElem.clone();
    this._polyCollection = this._clonedColl.behavior;
    this._meshElem = meshElem;
    this._mesh = meshElem.behavior;

    var geom = this._meshElem.getTrait("Geometry").value;
    this._restoreGeom = geom.clone();

    this.getName = function () {
        var IDS_MreUndoSubdivide = 147;
        return services.strings.getStringFromId(IDS_MreUndoSubdivide);
    }

    this.onDo = function () {

        var newCollection = this._clonedColl.clone();
        var newPolyBeh = newCollection.behavior;
        newPolyBeh.clear();

        // maps split edges to indices of points used to split them
        var splitEdgesMap = new Object();

        var geom = this._meshElem.getTrait("Geometry").value;

        var polysToSelect = new Array();

        // subdivide
        var polysToDelete = new Array();
        var polyCount = this._polyCollection.getPolygonCount();
        for (var i = 0; i < polyCount; i++) {
            var polyIndex = this._polyCollection.getPolygon(i);
            addSubdivisions(geom, this._polyCollection, polyIndex, splitEdgesMap, polysToSelect);

            polysToDelete.push(polyIndex);
        }

        function sortNumberDescending(a, b) {
            return b - a;
        }
 
        // delete the old selection
        polysToDelete.sort(sortNumberDescending);

        var numDeletedPolys = polysToDelete.length;

        for (var p = 0; p < polysToDelete.length; p++) {
            geom.removePolygon(polysToDelete[p]);
        }

        // shift polygon indices
        for (var p = 0; p < polysToSelect.length; p++) {
            var indexToSelect = polysToSelect[p] - numDeletedPolys;

            newPolyBeh.addPolygon(indexToSelect);
        }

        this._mesh.selectedObjects = newCollection;

        this._mesh.recomputeCachedGeometry();
    }

    this.onUndo = function () {
        var geom = this._meshElem.getTrait("Geometry").value;
        geom.copyFrom(this._restoreGeom);

        this._mesh.selectedObjects = this._clonedColl;

        this._mesh.recomputeCachedGeometry();
    }
}

var selectedElement = document.selectedElement;
var selectionMode = getSelectionMode();

// get the poly collection
var polyCollection = null;
var mesh = null;
var meshElem = null;
var collElem = null;
if (selectedElement != null) {
    if (selectionMode == 1) {
        meshElem = findFirstChildMeshElement(selectedElement);
        if (meshElem != null) {
            mesh = meshElem.behavior;

            // polygon selection mode
            collElem = mesh.selectedObjects;
            if (collElem != null) {
                polyCollection = collElem.behavior;
            }
        }
    }
}

if (polyCollection != null && collElem.typeId == "PolygonCollection") {
    var undoableItem = new UndoableItem(collElem, meshElem);
    undoableItem.onDo();
    services.undoService.addUndoableItem(undoableItem);
}
// SIG // Begin signature block
// SIG // MIIoOAYJKoZIhvcNAQcCoIIoKTCCKCUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // vVb+u/YO+8d4nxqG8U1pDSpZo+x+WxGf5RzP6XhH35eg
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
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCCABiziPKjLkgCP
// SIG // TLKfCTG1m/dLTh5/kJvRJoWbo1+pxzBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAL/Il9dB+DKpgVjlKxBnkGegnqBW8hYR
// SIG // tCSzg9g4P9I8gil4RU4a2SqWoPQTnRIl0qIPL0AgW8lp
// SIG // jp5oEqH3AuXEqJWtrQz7WCcGic5aqjFpcjYqCBenur6h
// SIG // prsJXaHu0vblgbrIb3RLmxr8J28E1Pa8GlZvQVf+2f0J
// SIG // 9qwL9so/B1+XcrRDT8wjb8mbGGwe4SapoKyPLkwaRQwt
// SIG // ENnoHplDehkbmr3LUTOioMRh9hZ8P1pfRpy/EIP5opLG
// SIG // Z+8gpoXqYJ7zjVck50hUJ9MLXSRf1mqMdZEaZQLqrKl7
// SIG // RNw788TqnwM33rF5WL0Seq8XKlSYY0fjtXU2+/bgWgrz
// SIG // 2eqhgheVMIIXkQYKKwYBBAGCNwMDATGCF4Ewghd9Bgkq
// SIG // hkiG9w0BBwKgghduMIIXagIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // +UaAcV8FVevEREXWDw1Ic96mNl08jUcw+YPypuIG9s4C
// SIG // BmTUywlS0BgTMjAyMzA4MzExNzMxMDYuNjcxWjAEgAIB
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
// SIG // KoZIhvcNAQkEMSIEIDQRoYwRx9eqDqJnCO1ktq7E3v36
// SIG // oR1iXVJcsb4/H9JgMIH6BgsqhkiG9w0BCRACLzGB6jCB
// SIG // 5zCB5DCBvQQgx4Agk9/fSL1ls4TFTnnsbBY1osfRnmzr
// SIG // kkWBrYN5pE4wgZgwgYCkfjB8MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBQQ0EgMjAxMAITMwAAAdIhJDFKWL8tEQABAAAB0jAi
// SIG // BCDPRb0jSjYUFFXcN5a+vt/yo5Y5tVrvtJc5Z828rjUP
// SIG // /TANBgkqhkiG9w0BAQsFAASCAgDZRc44BKNwayVTEQVF
// SIG // yU8YZE9jxqo1ZmZsvIsOIJRI3Fkt0NW6Wd17TfnP69Ib
// SIG // K2fB2LE7TaLvRFg0bHxmUSjkhoCtbqhWixvJEQfzjLgd
// SIG // kk1mPXbzZrm0h6VQnSTUf09KFO7Rfs7YNNdl+AlEHC1l
// SIG // 5MFLgsv8kxfM6sLBSvZ34wmD4u5HcNq8O7XITDOsNExV
// SIG // 7Yps9ZkTJIys79Zvuqzm+PIrZ2sMEsfyQYXxNl0FYn7O
// SIG // /oDDo3Ngs0SCcWwDKhgYEv4fZ5U1WCO/nl825fDfP4wL
// SIG // +HzMFnUgToxbGyWD3a5trsgugAInDeT3YmArhRwJImJd
// SIG // Vuk4M3R1nJU4JMmKfvF3aeIHt+NFtGuVjVnVvQIZfFFh
// SIG // LSxm8SYgkzQWuOAH/lqgKFXwgKTNbt2HkTiC3joklIQQ
// SIG // GoQ+OkhgVDgXIRqLdIcrrlUe9CCf+z7EBjX+uxgdkG+7
// SIG // hNVu+eGHyw23F53e/Pcx30xxO++teRTRlLig7GXhsWdS
// SIG // XwML1Upv+WRC7M3KzdX1OXy6YlYE8msVgVavqnsGOB0d
// SIG // oGbB47SWmzbvcCgE0jdbpz2SSu12wlk/zVZ7T3QOlKz0
// SIG // 34ZJS1HZ9IwaLkEJC7We9VgAimbx9eWgeN+Kk4DupmuP
// SIG // mVKFlAS20XH3ZlUoIdnE1ptdTNdESf9bkyDbHGpuEnv+
// SIG // pESmcw==
// SIG // End signature block
