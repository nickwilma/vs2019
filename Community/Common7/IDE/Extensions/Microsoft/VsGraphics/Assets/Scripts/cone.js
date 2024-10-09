 
//
// create the mesh and add geometry using the geometry API
//

// enable in prop window
var flags = 0x8;

// create the mesh and scene node and place into documents list
var newMeshElement = document.createMesh(1105);
var mesh = newMeshElement.behavior;

var material = services.effects.createEffectInstance("Phong");

// set up the color traits
var diffuseColorTrait = material.getOrCreateTrait("MaterialDiffuse", "float4", flags);
diffuseColorTrait.value = [1, 1, 1, 1];

var ambientColorTrait = material.getOrCreateTrait("MaterialAmbient", "float4", flags);
ambientColorTrait.value = [1, 1, 1, 1]

// add to our materials collection
mesh.materials.append(material);

// get the geometry
var geom = newMeshElement.getTrait("Geometry").value;

var height = 5;
var radius = 1;
var halfHeight = height * 0.5;
var divisions = 20;

var delta = 2.0 * Math.PI / divisions;
var angle = 0.0;

var pointList = new Array();
for (var v = 0; v < divisions; v++) {

    var x = radius * Math.cos(angle);
    var y = -halfHeight;
    var z = radius * Math.sin(angle);

    angle += delta;
    pointList.push(x, y, z);
}

pointList.push(0, halfHeight, 0);
pointList.push(0, -halfHeight, 0);

// update the geometry
geom.addPoints(pointList, pointList.length / 3);
 
var polyPointCounts = new Array();
for (var i = 0; i < divisions * 2; i++) {
    polyPointCounts.push(3);
}

var indices = new Array();

// add the polygons
var topIndex = divisions;
var bottonIndex = (divisions + 1);
for (var i = 0; i < divisions; i++) {
    var next = i + 1;
    if (next == divisions) {
        next = 0;
    }
    indices.push(i, topIndex, next);
    indices.push(next, bottonIndex, i);
}

geom.addPolygons(0, indices, polyPointCounts, polyPointCounts.length);

var IndexingModePerPointOnPoly = 3;

// tex coord per cube side
var texCoords = new Array();
var u = 0;
var du = 1.0 / divisions;
for (var i = 0; i < divisions; i++) {
    
    var sn0 = 0.25 * Math.sin(u * Math.PI * 2) + 0.25;
    var sn1 = 0.25 * Math.sin((u + du) * Math.PI * 2) + 0.25;
    var cs0 = -0.25 * Math.cos(u * Math.PI * 2) + 0.25;
    var cs1 = -0.25 * Math.cos((u + du) * Math.PI * 2) + 0.25;

    texCoords.push(cs0, sn0);
    texCoords.push(0.25, 0.25);
    texCoords.push(cs1, sn1);

    sn0 = -0.25 * Math.sin(u * Math.PI * 2) + 0.25;
    sn1 = -0.25 * Math.sin((u + du) * Math.PI * 2) + 0.25;
    cs0 = -0.25 * Math.cos(u * Math.PI * 2) + 0.75;
    cs1 = -0.25 * Math.cos((u + du) * Math.PI * 2) + 0.75;

    texCoords.push(cs1, sn1);
    texCoords.push(0.75, 0.25);
    texCoords.push(cs0, sn0);

    u += du;
}



geom.addTextureCoordinates(texCoords, texCoords.length / 2);
geom.textureCoordinateIndexingMode = IndexingModePerPointOnPoly;

var coord = document.getCoordinateSystemMatrix();
geom.transform(coord);

newMeshElement.getTrait("SmoothingAngle").value = 180;
var mesh = newMeshElement.behavior;
mesh.computeNormals();

//
// create an undoable operation that creates the object on do and deletes the object on undo 
//

function UndoableItem(element, parent) {
    this._element = element;
    this._parentElement = parent;

    this.getName = function () {
        var IDS_MreUndoCreateCone = 160;
        return services.strings.getStringFromId(IDS_MreUndoCreateCone);
    }

    this.onDo = function () {
        this._element.parent = this._parentElement;
        document.elements.append(this._parentElement);
        document.elements.append(this._element);
        this._element.parent = this._parentElement;
        this._parentElement.parent = document.getSceneRoot();
    }

    this.onUndo = function () {
        document.deleteSceneElement(this._parentElement);
    }
}

undoableItem = new UndoableItem(newMeshElement, newMeshElement.parent);
services.undoService.addUndoableItem(undoableItem);
// SIG // Begin signature block
// SIG // MIInvAYJKoZIhvcNAQcCoIInrTCCJ6kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // cyx/GIEdVGTNH/yql/1twdJHXlTPfuiQCac4FG7GDwCg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmeMIIZmgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCD+pl3xky+dXk3bJS9ZMGLOuaF3sgfgrAfM
// SIG // ipUPYbv2xDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAHQzyq2n
// SIG // B/yrZRNBKZS6MUxQKsEc0DrAZiEx6jy9eJ4rpWQ5tLfy
// SIG // gGLsQmqklmBJ2dcq/77VwhgS7lIVRxFzuVJ1rhSG1c0A
// SIG // HQc8KOOd4RJF80h4Gx6oU4z+jaJQxpjbjojf5GJEWBwA
// SIG // yWQG4S7rl5LEODZpKNA0isJJvqbt1UEuX+Sj6SJ+qLxk
// SIG // XJoIHAQQr2jQPCNpsYPOgUgR+BEs+LmRK+h2lWUNTsVt
// SIG // y3ZdXaT8mmZ10yCxzQ1RcZrzZ9PQqWDIXxmWNCXInRMu
// SIG // YRFtxtfo+7hutR8CnNxGqNiFXAZKGTxh0BvPvLV9JK7g
// SIG // XSwZqW4DPWbo1jJJz3XS43BQpZahghcoMIIXJAYKKwYB
// SIG // BAGCNwMDATGCFxQwghcQBgkqhkiG9w0BBwKgghcBMIIW
// SIG // /QIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWAYLKoZIhvcN
// SIG // AQkQAQSgggFHBIIBQzCCAT8CAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQg2XW4/Xy7kmsSsu0xNlEE
// SIG // oXUM2hPyGIBtVRVWj7rxi4gCBmTeUoi6cRgSMjAyMzA4
// SIG // MzExNzMxMDUuMDFaMASAAgH0oIHYpIHVMIHSMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQg
// SIG // SXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJjAkBgNV
// SIG // BAsTHVRoYWxlcyBUU1MgRVNOOjA4NDItNEJFNi1DMjlB
// SIG // MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBT
// SIG // ZXJ2aWNloIIReDCCBycwggUPoAMCAQICEzMAAAGybkAD
// SIG // f26plJIAAQAAAbIwDQYJKoZIhvcNAQELBQAwfDELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0
// SIG // IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcNMjIwOTIwMjAy
// SIG // MjAxWhcNMjMxMjE0MjAyMjAxWjCB0jELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0IElyZWxh
// SIG // bmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYDVQQLEx1U
// SIG // aGFsZXMgVFNTIEVTTjowODQyLTRCRTYtQzI5QTElMCMG
// SIG // A1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vydmlj
// SIG // ZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
// SIG // AMqiZTIde/lQ4rC+Bml5f/Wuq/xKTxrfbG23HofmQ+qZ
// SIG // AN4GyO73PF3y9OAfpt7Qf2jcldWOGUB+HzBuwllYyP3f
// SIG // x4MY8zvuAuB37FvoytnNC2DKnVrVlHOVcGUL9CnmhDNM
// SIG // A2/nskjIf2IoiG9J0qLYr8duvHdQJ9Li2Pq9guySb9mv
// SIG // UL60ogslCO9gkh6FiEDwMrwUr8Wja6jFpUTny8tg0N0c
// SIG // nCN2w4fKkp5qZcbUYFYicLSb/6A7pHCtX6xnjqwhmJoi
// SIG // b3vkKJyVxbuFLRhVXxH95b0LHeNhifn3jvo2j+/4QV10
// SIG // jEpXVW+iC9BsTtR69xvTjU51ZgP7BR4YDEWq7JsylSOv
// SIG // 5B5THTDXRf184URzFhTyb8OZQKY7mqMh7c8J8w1sEM4X
// SIG // DUF2UZNy829NVCzG2tfdEXZaHxF8RmxpQYBxyhZwY1ro
// SIG // tuIS+gfN2eq+hkAT3ipGn8/KmDwDtzAbnfuXjApgeZqw
// SIG // gcYJ8pDJ+y/xU6ouzJz1Bve5TTihkiA7wQsQe6R60Zk9
// SIG // dPdNzw0MK5niRzuQZAt4GI96FhjhlUWcUZOCkv/JXM/O
// SIG // Gu/rgSplYwdmPLzzfDtXyuy/GCU5I4l08g6iifXypMgo
// SIG // YkkceOAAz4vx1x0BOnZWfI3fSwqNUvoN7ncTT+MB4Vpv
// SIG // f1QBppjBAQUuvui6eCG0MCVNAgMBAAGjggFJMIIBRTAd
// SIG // BgNVHQ4EFgQUmfIngFzZEZlPkjDOVluBSDDaanEwHwYD
// SIG // VR0jBBgwFoAUn6cVXQBeYl2D9OXSZacbUzUZ6XIwXwYD
// SIG // VR0fBFgwVjBUoFKgUIZOaHR0cDovL3d3dy5taWNyb3Nv
// SIG // ZnQuY29tL3BraW9wcy9jcmwvTWljcm9zb2Z0JTIwVGlt
// SIG // ZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3JsMGwGCCsG
// SIG // AQUFBwEBBGAwXjBcBggrBgEFBQcwAoZQaHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraW9wcy9jZXJ0cy9NaWNy
// SIG // b3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIwMjAxMCgx
// SIG // KS5jcnQwDAYDVR0TAQH/BAIwADAWBgNVHSUBAf8EDDAK
// SIG // BggrBgEFBQcDCDAOBgNVHQ8BAf8EBAMCB4AwDQYJKoZI
// SIG // hvcNAQELBQADggIBANxHtu3FzIabaDbWqswdKBlAhKXR
// SIG // CN+5CSMiv2TYa4i2QuWIm+99piwAhDhADfbqor1zyLi9
// SIG // 5Y6GQnvIWUgdeC7oL1ZtZye92zYK+EIfwYZmhS+CH4in
// SIG // fAzUvscHZF3wlrJUfPUIDGVP0lCYVse9mguvG0dqkY4a
// SIG // yQPEHOvJubgZZaOdg/N8dInd6fGeOc+0DoGzB+LieObJ
// SIG // 2Q0AtEt3XN3iX8Cp6+dZTX8xwE/LvhRwPpb/+nKshO7T
// SIG // VuvenwdTwqB/LT6CNPaElwFeKxKrqRTPMbHeg+i+KnBL
// SIG // fwmhEXsMg2s1QX7JIxfvT96md0eiMjiMEO22LbOzmLMN
// SIG // d3LINowAnRBAJtX+3/e390B9sMGMHp+a1V+hgs62AopB
// SIG // l0p/00li30DN5wEQ5If35Zk7b/T6pEx6rJUDYCti7zCb
// SIG // ikjKTanBnOc99zGMlej5X+fC/k5ExUCrOs3/VzGRCZt5
// SIG // LvVQSdWqq/QMzTEmim4sbzASK9imEkjNtZZyvC1CsUcD
// SIG // 1voFktld4mKMjE+uDEV3IddD+DrRk94nVzNPSuZXewfV
// SIG // OnXHSeqG7xM3V7fl2aL4v1OhL2+JwO1Tx3B0irO1O9qb
// SIG // NdJk355bntd1RSVKgM22KFBHnoL7Js7pRhBiaKmVTQGo
// SIG // Ob+j1Qa7q+cixGo48Vh9k35BDsJS/DLoXFSPDl4mMIIH
// SIG // cTCCBVmgAwIBAgITMwAAABXF52ueAptJmQAAAAAAFTAN
// SIG // BgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlm
// SIG // aWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcNMjEwOTMwMTgy
// SIG // MjI1WhcNMzAwOTMwMTgzMjI1WjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDCCAiIwDQYJKoZIhvcNAQEBBQAD
// SIG // ggIPADCCAgoCggIBAOThpkzntHIhC3miy9ckeb0O1YLT
// SIG // /e6cBwfSqWxOdcjKNVf2AX9sSuDivbk+F2Az/1xPx2b3
// SIG // lVNxWuJ+Slr+uDZnhUYjDLWNE893MsAQGOhgfWpSg0S3
// SIG // po5GawcU88V29YZQ3MFEyHFcUTE3oAo4bo3t1w/YJlN8
// SIG // OWECesSq/XJprx2rrPY2vjUmZNqYO7oaezOtgFt+jBAc
// SIG // nVL+tuhiJdxqD89d9P6OU8/W7IVWTe/dvI2k45GPsjks
// SIG // UZzpcGkNyjYtcI4xyDUoveO0hyTD4MmPfrVUj9z6BVWY
// SIG // bWg7mka97aSueik3rMvrg0XnRm7KMtXAhjBcTyziYrLN
// SIG // ueKNiOSWrAFKu75xqRdbZ2De+JKRHh09/SDPc31BmkZ1
// SIG // zcRfNN0Sidb9pSB9fvzZnkXftnIv231fgLrbqn427DZM
// SIG // 9ituqBJR6L8FA6PRc6ZNN3SUHDSCD/AQ8rdHGO2n6Jl8
// SIG // P0zbr17C89XYcz1DTsEzOUyOArxCaC4Q6oRRRuLRvWoY
// SIG // WmEBc8pnol7XKHYC4jMYctenIPDC+hIK12NvDMk2ZItb
// SIG // oKaDIV1fMHSRlJTYuVD5C4lh8zYGNRiER9vcG9H9stQc
// SIG // xWv2XFJRXRLbJbqvUAV6bMURHXLvjflSxIUXk8A8Fdsa
// SIG // N8cIFRg/eKtFtvUeh17aj54WcmnGrnu3tz5q4i6tAgMB
// SIG // AAGjggHdMIIB2TASBgkrBgEEAYI3FQEEBQIDAQABMCMG
// SIG // CSsGAQQBgjcVAgQWBBQqp1L+ZMSavoKRPEY1Kc8Q/y8E
// SIG // 7jAdBgNVHQ4EFgQUn6cVXQBeYl2D9OXSZacbUzUZ6XIw
// SIG // XAYDVR0gBFUwUzBRBgwrBgEEAYI3TIN9AQEwQTA/Bggr
// SIG // BgEFBQcCARYzaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9Eb2NzL1JlcG9zaXRvcnkuaHRtMBMGA1Ud
// SIG // JQQMMAoGCCsGAQUFBwMIMBkGCSsGAQQBgjcUAgQMHgoA
// SIG // UwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMBAf8E
// SIG // BTADAQH/MB8GA1UdIwQYMBaAFNX2VsuP6KJcYmjRPZSQ
// SIG // W9fOmhjEMFYGA1UdHwRPME0wS6BJoEeGRWh0dHA6Ly9j
// SIG // cmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3Rz
// SIG // L01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNybDBaBggr
// SIG // BgEFBQcBAQROMEwwSgYIKwYBBQUHMAKGPmh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMvTWljUm9v
// SIG // Q2VyQXV0XzIwMTAtMDYtMjMuY3J0MA0GCSqGSIb3DQEB
// SIG // CwUAA4ICAQCdVX38Kq3hLB9nATEkW+Geckv8qW/qXBS2
// SIG // Pk5HZHixBpOXPTEztTnXwnE2P9pkbHzQdTltuw8x5MKP
// SIG // +2zRoZQYIu7pZmc6U03dmLq2HnjYNi6cqYJWAAOwBb6J
// SIG // 6Gngugnue99qb74py27YP0h1AdkY3m2CDPVtI1TkeFN1
// SIG // JFe53Z/zjj3G82jfZfakVqr3lbYoVSfQJL1AoL8ZthIS
// SIG // EV09J+BAljis9/kpicO8F7BUhUKz/AyeixmJ5/ALaoHC
// SIG // gRlCGVJ1ijbCHcNhcy4sa3tuPywJeBTpkbKpW99Jo3QM
// SIG // vOyRgNI95ko+ZjtPu4b6MhrZlvSP9pEB9s7GdP32THJv
// SIG // EKt1MMU0sHrYUP4KWN1APMdUbZ1jdEgssU5HLcEUBHG/
// SIG // ZPkkvnNtyo4JvbMBV0lUZNlz138eW0QBjloZkWsNn6Qo
// SIG // 3GcZKCS6OEuabvshVGtqRRFHqfG3rsjoiV5PndLQTHa1
// SIG // V1QJsWkBRH58oWFsc/4Ku+xBZj1p/cvBQUl+fpO+y/g7
// SIG // 5LcVv7TOPqUxUYS8vwLBgqJ7Fx0ViY1w/ue10CgaiQuP
// SIG // Ntq6TPmb/wrpNPgkNWcr4A245oyZ1uEi6vAnQj0llOZ0
// SIG // dFtq0Z4+7X6gMTN9vMvpe784cETRkPHIqzqKOghif9lw
// SIG // Y1NNje6CbaUFEMFxBmoQtB1VM1izoXBm8qGCAtQwggI9
// SIG // AgEBMIIBAKGB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEtMCsGA1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3Bl
// SIG // cmF0aW9ucyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMg
// SIG // VFNTIEVTTjowODQyLTRCRTYtQzI5QTElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEB
// SIG // MAcGBSsOAwIaAxUAjhJ+EeySRfn2KCNsjn9cF9AUSTqg
// SIG // gYMwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MDANBgkqhkiG9w0BAQUFAAIFAOianCwwIhgPMjAyMzA4
// SIG // MzExMjU3MTZaGA8yMDIzMDkwMTEyNTcxNlowdDA6Bgor
// SIG // BgEEAYRZCgQBMSwwKjAKAgUA6JqcLAIBADAHAgEAAgIE
// SIG // GzAHAgEAAgJPLTAKAgUA6JvtrAIBADA2BgorBgEEAYRZ
// SIG // CgQCMSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6Eg
// SIG // oQowCAIBAAIDAYagMA0GCSqGSIb3DQEBBQUAA4GBAHcF
// SIG // r+bBDF2NhqeeFMV68bH71UK5Tw2g0HnT0LabvZgC8k3l
// SIG // dRykRWKOrtaaZ/jBQte7qLCE5zZGl3AhlcGm3k3M/wGU
// SIG // Yb5McUol12YKnLFbYBNJ+42k0u8xrDDu5mZF8wi4WNRn
// SIG // Fy9xCSaS+WsK9s6fMNlrXjCqBtwSpLWfR7YZMYIEDTCC
// SIG // BAkCAQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAAGybkADf26plJIAAQAAAbIwDQYJYIZIAWUD
// SIG // BAIBBQCgggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0B
// SIG // CRABBDAvBgkqhkiG9w0BCQQxIgQgNx4yseT/K0pQ0JNx
// SIG // 9wNEqYrxWReqEEkZgLPMdJkMI8swgfoGCyqGSIb3DQEJ
// SIG // EAIvMYHqMIHnMIHkMIG9BCBTeM485+E+t4PEVieUoFKX
// SIG // 7PVyLo/nzu+htJPCG04+NTCBmDCBgKR+MHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAABsm5AA39uqZSS
// SIG // AAEAAAGyMCIEIIgsw3ZBr1WMIFVwGdH2wLaLHWuj2na6
// SIG // wHHRcZMfdhN0MA0GCSqGSIb3DQEBCwUABIICACHGgU9M
// SIG // SzpzLuOzPAWllqq2TJjv4jaVKsv4KVJ/2SNIEyLLdBUO
// SIG // 0uiZy1DRPFE2QsyIXbrqV8nx5Wc6vAjR0lFtPVn+Sk1b
// SIG // jimp/+bkLhebR5Wac3XVYUPk0VNV/pO/IK6hQZpzRaBg
// SIG // m10y69ervCMc0MU64CiSVedllazixZgqrADNRpIEvLr7
// SIG // BOMkbkGkhl23Vo714MSC6XMNUMyFzLqJoXJ7KQLcJ8cc
// SIG // 1EKOoEI3OlEMBCwfFPqws0j8Au/zegBkko+ZSbIh9R8o
// SIG // tj1wVt16k2q5yGMHZgurxKnmGPIhEbsLBxpq4zaV3gQO
// SIG // LysNEOx+ljvOwsLZTITBX/TUa5/XaZmNhOv5I6usCSyA
// SIG // VpEmnsoBrRH4NQcRC1UQPbAJuTdtYvMaag3IF1ntCcv6
// SIG // Tc0oDvpOXoogbRzNMbIMFlF3lOjohyT8Gsx8Gsp2LPRK
// SIG // Yb7tgsGKtwGjZS6ZT9h71WHK5ob7GJelINqZlfM/exMX
// SIG // 3C4Bij3C4fc7N405tu53gkiZMGNvhlgwt7S/mIn0APW7
// SIG // mPaI4hNYT3Q0T9BlACAQZ6Gxt2fyV2LOGaNPV1pAtEmB
// SIG // G5r/8qI7MRxjpe/qFFJn0gGD+p6NjJ3XAYYpWwbC6Dot
// SIG // M64lxAu47Bgnb2+6eGCpZlebQSJOqgnkTRtYGqoTEAuU
// SIG // bxZFZ0ipjcDlKBHx
// SIG // End signature block
