﻿

function UndoableItem() {
    this._geomToTriangulate = new Array();
    this._restoreGeom = new Array();
    this._mesh = new Array();

    var selectedElementCount = services.selection.count;

    // loop over selected
    for (var i = 0; i < selectedElementCount; i++) {

        // loop over immediate children of selected
        var selectedElement = services.selection.getElement(i);
        for (var j = 0; j < selectedElement.childCount; j++) {

            // get child and its materials
            var child = selectedElement.getChild(j);

            // is this a mesh?
            if (child.typeId == "Microsoft.VisualStudio.3D.Mesh") {
                var mesh = child.behavior;

                var geom = child.getTrait("Geometry").value;
                this._geomToTriangulate.push(geom);
                this._mesh.push(mesh);
            }
        }
    }

    this.getName = function () {
        var IDS_MreUndoTriangulate = 151;
        return services.strings.getStringFromId(IDS_MreUndoTriangulate);
    }

    this.onDo = function () {
        // services.debug.trace("[Triangulate.js] onDo()");
        
        this._restoreGeom = new Array();

        for (var i = 0; i < this._geomToTriangulate.length; i++) {
            var geom = this._geomToTriangulate[i];
            var cloned = geom.clone();
            this._restoreGeom.push(cloned);
            geom.triangulateInPlace();
        }

        for (var i = 0; i < this._mesh.length; i++) {
            var mesh = this._mesh[i];

            mesh.selectedObjects = null;

            mesh.recomputeCachedGeometry();
        }
    }

    this.onUndo = function () {
        // services.debug.trace("[Triangulate.js] onUndo()");

        for (var i = 0; i < this._restoreGeom.length; i++) {
            // services.debug.trace("[Triangulate.js] restoring item " + i);            
            this._geomToTriangulate[i].copyFrom(this._restoreGeom[i]);
        }

        for (var i = 0; i < this._mesh.length; i++) {
            var mesh = this._mesh[i];

            mesh.selectedObjects = null;

            mesh.recomputeCachedGeometry();
        }
    }
}

var undoableItem = new UndoableItem();
undoableItem.onDo();
services.undoService.addUndoableItem(undoableItem);

// SIG // Begin signature block
// SIG // MIIoOgYJKoZIhvcNAQcCoIIoKzCCKCcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // pFQvJUTQhbt3khoIk/3wR69Bh63/1BuknvqG70o6kMmg
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
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCAhMrNRO99SV/Fn
// SIG // 94G4mZxoO0XHu3VI+t8EkxBuCzTL6jBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAAwphlWp9WpB8i+63NV7fjseu/LkY3E2
// SIG // 3FCNmMA6n2RYLbc84MV0DuvkMt2gPB03PU7YDJvQlk+C
// SIG // z7SpUr8pusig0hM6DleGhCkDJd/xuiJmYBC7HEwn8XxR
// SIG // 6zcqkqAHdkhlT/V4VNAMxi9mNtnEtSe4QYO+g3YVfYB/
// SIG // MHrBuzWLTQ/IHVDfp/NIDZF+2+AvJYO18J2X4SyS3IAo
// SIG // uP8LOO2hRZmR7Yo5+tI7YvVsg/igZ1EPLmoFpA7m4msm
// SIG // fNehRZgvzxi1B6t8BzH1tNB4/WFhCbddJhPzFZfNJKtS
// SIG // aXfaqckLhZafXQrVU19Do18//Zm0Aj3GqWWs3KGDCIez
// SIG // aq6hgheXMIIXkwYKKwYBBAGCNwMDATGCF4Mwghd/Bgkq
// SIG // hkiG9w0BBwKgghdwMIIXbAIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // PaoWWlREm3emJbGoRV2bkCAkysDtoMWCr5X5XcDf1UkC
// SIG // BmTUyljQEhgTMjAyMzA4MzExNzMxMDYuNTkyWjAEgAIB
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
// SIG // BgkqhkiG9w0BCQQxIgQgF3Cjti88fzx0eKKAauZHC4JF
// SIG // lzVNRHam6uuzPU2csD4wgfoGCyqGSIb3DQEJEAIvMYHq
// SIG // MIHnMIHkMIG9BCDZvyOGDNeuiTDOxCiHGL5XG69gh4yg
// SIG // tC1DpqWSGwbB/zCBmDCBgKR+MHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwAhMzAAAB1akCz8WnyelaAAEAAAHV
// SIG // MCIEIAx+QviGyhH/ila9LlrMn6uClu93sCGDIXacU76i
// SIG // CgFiMA0GCSqGSIb3DQEBCwUABIICABurcI44BWBekjIQ
// SIG // SJPwwQkyLm1NrX3kcuyKTbwBuRHyrV4mCEOcU6ZNyHTj
// SIG // 0mh5nB9JfejYzHxjPnuzNanFtZByve9T6m0GVdnY7/TB
// SIG // iE88ZprqsbmXSMxWGnEb7WJRa1GMoGK5e1mDsiT6xgHA
// SIG // F6vU1fmxJnvmTBmcPJ0toKDAs2PaymYqxxh0dmqq4lUy
// SIG // GIr7533Z0D006riyC02uk3s4SteYb0jAnAPvTBoIqrhX
// SIG // zmzWjiy2Nu+XwbY2WruAnJOd4xhr+3WonXu3gGTZQOb2
// SIG // dhKkdP1PcSgzbqBXHNkBiZsxl3/fmlifI8naqY9OCEsq
// SIG // wkn/6Hvn3Yz4Icl+oJCJPJyxpWYXozn1lNBqR4d/ZBdq
// SIG // OLLsfDAJOsL8LeKc9pmWMT+fkU59G87Q8hkGZJyKdMhI
// SIG // 3JVp6cPRl0MUtdSVVuPs78lPElsCzEYMXFTvvyfqhh4d
// SIG // HOX7RccP0gkpPus6ejDR38ea7WCsczlV49d6cZkV3HKu
// SIG // iEWFpwRDw5x3h7/bhpCitk+Q+O4IaxF91S8NhbQhnznJ
// SIG // 8oW4Sibux87ezvaDhHPnX+cG+ZuPUdRNclrnTbov5AAM
// SIG // P85pCTXXmuNb97MYzjdpbHfTpvHSmNAbBe9j9sIbIKZL
// SIG // gfoAIW/TwwdNC5wUyKtQQKanZKkc9iYN9tW/f4v4q5l7
// SIG // rSMarJ4q
// SIG // End signature block