// Copyright (c) Microsoft Corporation. All rights reserved.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ls = void 0;
var locate = require("./component-locator");
var loaded = false;
function ls(context) {
context.WaitForRequestData(function (workingDirectory) {
ensureLoaded(workingDirectory, function (npm) {
npm.prefix = workingDirectory;
npm.commands.ls([], true, function (err, result) {
if (result.cached) {
context.RespondNotModified();
}
else {
result.cached = true;
var resultForJson = formatJsonObject(result);
addMissingDependencies(result, resultForJson.dependencies);
context.RespondOkWithJsonData(resultForJson);
}
});
});
});
return true;
}
exports.ls = ls;
function formatJsonObject(lsResult) {
var obj = {};
var properties = ['name', 'version', 'description', 'author', 'bin', 'path', 'repository', 'extraneous', 'isDevDependency', 'missing', 'optional'];
var property;
while (property = properties.shift()) {
if (lsResult[property]) {
obj[property] = lsResult[property];
}
}
obj.dependencies = formatJsonDependencies(lsResult.dependencies, lsResult.devDependencies);
return obj;
}
function formatJsonDependencies(lsDependencies, lsDevDependencies) {
var dependencies = [];
if (lsDependencies) {
for (var key in lsDependencies) {
var lsDependency = lsDependencies[key];
if (lsDevDependencies && lsDevDependencies.hasOwnProperty(key)) {
lsDependency.isDevDependency = true;
}
if (!lsDependency.name) {
lsDependency.name = key;
}
dependencies.push(formatJsonObject(lsDependency));
}
}
return dependencies;
}
function addMissingDependencies(obj, result) {
if (obj._dependencies) {
for (var key in obj._dependencies) {
if (!obj.dependencies[key]) {
result.push({
name: key,
version: obj._dependencies[key],
missing: true
});
}
}
}
if (obj.devDependencies) {
for (var key in obj.devDependencies) {
if (!obj.dependencies[key]) {
result.push({
name: key,
version: obj.devDependencies[key],
missing: true
});
}
}
}
}
function ensureLoaded(workingDirectory, callback) {
var npm = locate(workingDirectory).npm;
if (npm.config.loaded) {
callback(npm);
}
else {
npm.load({
loglevel: 'error'
}, function () {
loaded = true;
callback(npm);
});
}
}

// SIG // Begin signature block
// SIG // MIInkwYJKoZIhvcNAQcCoIInhDCCJ4ACAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // B+Jt25Lff+zHuWi8lP2hb9TfDjwOUR+SrLSvS5zEovGg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghl1MIIZcQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCBaFIXyNmxECsa66VezK9ev3C+TagJdC+Qa
// SIG // UMTYGTZcATBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAL4q6GeD
// SIG // xf811sDoatAgNqsyc7JksaX091FX5XWj/PhNdSWFU1hE
// SIG // Y7kVPezatLHbVAZ5sP9koO3cnl9rshojVVkkybOCX+Pd
// SIG // UthS5k6lsbuaFlFz+3DC96vGLBEhdBo/PYZ6vqBTWsxW
// SIG // G0kJGJgPKEts2B07mxMXz4M3OGpuKZnzeDdOZk7QdyBo
// SIG // nTgkI3lOYlw88oRF+5TdN8eiUCo9xNJRazNOEiZwAhAd
// SIG // IZ12IyRQUJn40eeoYcDYJUHvPSBiyrq//WmKkG4z2HIf
// SIG // sh6aCKhVIhkHoQLByDvE9/ED3TYCO5ZnYTngPP1kobUT
// SIG // LIckZ92gixF7gERW3Yi35uL3QKChghb/MIIW+wYKKwYB
// SIG // BAGCNwMDATGCFuswghbnBgkqhkiG9w0BBwKgghbYMIIW
// SIG // 1AIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUAYLKoZIhvcN
// SIG // AQkQAQSgggE/BIIBOzCCATcCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgJ1NfuVnhin3o4DXkuVzH
// SIG // ZsQ6E5uCZjHBYi1ymssK70kCBmSwc0mAFhgSMjAyMzA3
// SIG // MjYxODM5MTYuMjVaMASAAgH0oIHQpIHNMIHKMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQg
// SIG // QW1lcmljYSBPcGVyYXRpb25zMSYwJAYDVQQLEx1UaGFs
// SIG // ZXMgVFNTIEVTTjpFQUNFLUUzMTYtQzkxRDElMCMGA1UE
// SIG // AxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCC
// SIG // EVcwggcMMIIE9KADAgECAhMzAAABw4tv00i/DpFdAAEA
// SIG // AAHDMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwMB4XDTIyMTEwNDE5MDEyOVoXDTI0
// SIG // MDIwMjE5MDEyOVowgcoxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9wZXJh
// SIG // dGlvbnMxJjAkBgNVBAsTHVRoYWxlcyBUU1MgRVNOOkVB
// SIG // Q0UtRTMxNi1DOTFEMSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAg8AMIICCgKCAgEAu+u86s3R/q+ikos80aD4
// SIG // 2Ym21NDOZtldNRxMFUxm4o9kVWkSh2c8jOCxJXwV2KFo
// SIG // dCTxpGQs9jy5nUI+Lq/bt0HWtSYPMPPtet420gzwM1Es
// SIG // R26kbpwlBHxFY4hk3y3AH+1YKf9bhvPs7kPbXbH7gdac
// SIG // iteB+F7FoORt9e0D/dsBeG80GZAF2y6LWAj6C2mMqlaf
// SIG // XkwbfTyQanuX65Yu+xMpyJ1fAREpuR766rePrqlE0Kaa
// SIG // eD0nqOgGrTkSZeCMDPH6OtJ00jXMwbIDyH7l4fYReIsT
// SIG // fzN5Gf3Uairsjea+KFy22lU8elnIXjoeyx3pcesH+q5a
// SIG // rY1c6HPfeSnkeMok/gxnB7P1Mjt7I9EI9thQtMvy/1SU
// SIG // mLG12rBR/DfheE/VJpcm/TYeoV11NfQQnl/jBbPbSRBp
// SIG // 0HGqTIcWDpY6MgSdBoQET1DvpE4PX4sndNGc1wGyg45p
// SIG // H62ZMfUF/CzGZ7iV637RtnQFXDzTxoSEEkdXMdWDJG+j
// SIG // jxoC16lRk1xFnfkA4uoma4mKso7qvE6d27+K6yzISWQ7
// SIG // TjutYLKJnSzNvfiNiuyv/0xxCASSARvOQ3v9cegvM/pn
// SIG // uU9c6s+4gmK3+5jhcvnWGQqJE0tpYHmk3bmmBL1gHm9T
// SIG // jBJz5m/8rvHM3Rw3OUhV4/wmAL32KmPR5Ubb4ww5HNGi
// SIG // uY0CAwEAAaOCATYwggEyMB0GA1UdDgQWBBQcGL7N2Ndv
// SIG // AaK8TcLrxMTsa8aB1jAfBgNVHSMEGDAWgBSfpxVdAF5i
// SIG // XYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQhk5o
// SIG // dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2Ny
// SIG // bC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIw
// SIG // MjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwGCCsG
// SIG // AQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUtU3Rh
// SIG // bXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMBAf8E
// SIG // AjAAMBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQDd8qZbHBqdBFRDxGGwDollnRyd0WmU
// SIG // njqoP+5QCH4vMPBt4umHVhJuyeRkDELkTWZuWqK3U1z2
// SIG // HnGatbnETcHUlywlH+3I7R7fU0zKYw2PLA+VawCcrnsI
// SIG // CgE3242EsEC/Z0YU740NJ/xbuzrGtTEtUIiQvr2ACPJy
// SIG // hsPote8ItTf4uNW4Mbo1QP0tjcBKCgEezIC4DYUM0BYC
// SIG // WCmeZmNwAlxfpTliOFEKB9UaSqHSs51cH8JY0gqL3LwI
// SIG // 9LYfjEO77++HY/nMqXCMi9ihUKoIp2Tfjfzdm5Ng5V+y
// SIG // w8+wXl29RcW4Q4CvHntNfKxT9oQ3J7YBQQEHWJPg8TNR
// SIG // 9w4B82FzmrDd8sL6ETvGux5hFcwmF+Q2rT5Ma8dYUSdC
// SIG // Sg/ihoEYUGJZnZL9nyDp1snflSVX7FpLyALzDDlHBW1C
// SIG // JhYVffJRoqz1D4kRooqRBNRaMFMPingywwbEghMheJKN
// SIG // oda7AGgq+1HH1afRlE+9qYW9FKMezxeQmf8gcuAuhr9I
// SIG // AXyaF9DF0PJ5f4uhzOSvIC1BkJtzF6op45UYaI7V+9X8
// SIG // dcwXbZJnIIAH1cjVO8KEChxKIkpk4Qgy0PocgUwaGWqm
// SIG // LWRu1hQ1WJWnQXvvBYeYDGWbj/PtSlywv6m8mujLepfM
// SIG // vJcU25KWklSP2FuNx6aOVfeje+pgbwIQIVQ1nTCCB3Ew
// SIG // ggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUwDQYJ
// SIG // KoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // MjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmlj
// SIG // YXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4MjIy
// SIG // NVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUAA4IC
// SIG // DwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC0/3u
// SIG // nAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm95VT
// SIG // cVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aO
// SIG // RmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZTfDlh
// SIG // AnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQHJ1S
// SIG // /rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5LFGc
// SIG // 6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVVmG1o
// SIG // O5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKyzbni
// SIG // jYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpGdc3E
// SIG // XzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2TPYr
// SIG // bqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZfD9M
// SIG // 269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1qGFph
// SIG // AXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6Cm
// SIG // gyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLUHMVr
// SIG // 9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXbGjfH
// SIG // CBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQIDAQAB
// SIG // o4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAjBgkr
// SIG // BgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8vBO4w
// SIG // HQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwG
// SIG // A1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYB
// SIG // BQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNVHSUE
// SIG // DDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvX
// SIG // zpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYB
// SIG // BQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0Nl
// SIG // ckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0BAQsF
// SIG // AAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5O
// SIG // R2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTCj/ts
// SIG // 0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+iehp
// SIG // 4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRX
// SIG // ud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYSEhFd
// SIG // PSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qBwoEZ
// SIG // QhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0DLzs
// SIG // kYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCr
// SIG // dTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARxv2T5
// SIG // JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+kKNxn
// SIG // GSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2tVdU
// SIG // CbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4O+S3
// SIG // Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokLjzba
// SIG // ukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRb
// SIG // atGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNT
// SIG // TY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLOMIICNwIB
// SIG // ATCB+KGB0KSBzTCByjELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEl
// SIG // MCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0
// SIG // aW9uczEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046RUFD
// SIG // RS1FMzE2LUM5MUQxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMV
// SIG // APEdL+Ps+h03e+SLXdGzuY7tLu7OoIGDMIGApH4wfDEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcN
// SIG // AQEFBQACBQDoa2wtMCIYDzIwMjMwNzI2MTc1NTU3WhgP
// SIG // MjAyMzA3MjcxNzU1NTdaMHcwPQYKKwYBBAGEWQoEATEv
// SIG // MC0wCgIFAOhrbC0CAQAwCgIBAAICEB8CAf8wBwIBAAIC
// SIG // EbgwCgIFAOhsva0CAQAwNgYKKwYBBAGEWQoEAjEoMCYw
// SIG // DAYKKwYBBAGEWQoDAqAKMAgCAQACAwehIKEKMAgCAQAC
// SIG // AwGGoDANBgkqhkiG9w0BAQUFAAOBgQCVJP7Ch89Cv1OO
// SIG // QK/PPxBgglPi68Jh6MLWeohs4p2q/hkE+w47fA+74M4z
// SIG // MVUb3+/oZ8Nd3AEgWNKX/TxENt3fAJom1TrhZ7tM7Hrq
// SIG // mzEEIVRwfaeV552jszmFMtd4wytIZeyELpGWf0ElOD0k
// SIG // Mo92iLL89OnAmW+bdFzhBTd4TTGCBA0wggQJAgEBMIGT
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // w4tv00i/DpFdAAEAAAHDMA0GCWCGSAFlAwQCAQUAoIIB
// SIG // SjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJ
// SIG // KoZIhvcNAQkEMSIEIIQ1ovvdtv+QReTbu7t+JOnDsJ3N
// SIG // VJtui7BwRh5b3VJCMIH6BgsqhkiG9w0BCRACLzGB6jCB
// SIG // 5zCB5DCBvQQg0vtTm2+SSerh1KiAkwrJTALxTfJotlPc
// SIG // DZ2ZSn78KkkwgZgwgYCkfjB8MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBQQ0EgMjAxMAITMwAAAcOLb9NIvw6RXQABAAABwzAi
// SIG // BCA5wCg5xdo2Z6/t3C2ATgBxCwnMqzfKZoZjOV2fdQyJ
// SIG // ojANBgkqhkiG9w0BAQsFAASCAgA58kbEzo6Unb0jnIU9
// SIG // bs2qbvzLEKMZpVx+tHpt39FIjLACJafkYF5KrfMVI4I2
// SIG // Gdwc8nKqgxQDBKgyqZd9qCSs2gnv3Vh3ut+Po3Ubyxog
// SIG // sru0dwAe0K+Ops7rMP7ykV3jlAGcM+LOFGjJ2C52UAza
// SIG // SNQKEM5HEodAA1+w8ZCAEvj9jRNDCnVprZeXo7UErhIo
// SIG // issmzKPTBDdiiX77Dl8EeXrxM1n1yvhx6j8Nz6VS/C/Q
// SIG // 2n4a6fshwvNshQuyZ24ez1sRLmVkXb2PLo91DdjU1j/P
// SIG // VZCafIBxEciYtkFTSamSWUAcYR9kEe+txceV9M84UeG3
// SIG // Y25zzbgze4aPFxnA6L1EWhSfEWgfhZYviSwXEGuiAw2U
// SIG // KK6b8TYfCFZSBuzhPv+YK19s5IkqEf9MmnEHtoDvKVj0
// SIG // 3AKabqxWBaHTWKss5n5hOMWqYp6vegphKPaidTUxrcAv
// SIG // ZDTiTXVF/OZm+GMqRPmjgiihQ/uzyw67PWDDzYS5gij+
// SIG // f2MXohdkdNpTCbdd+fSJFfCqSJualYq9QOLsUdeMZqpO
// SIG // tGlXHnlsQ7x2k9Cr6EjW5CZYDudEZ8c3eWq4e0dQjTrG
// SIG // usIUDSechnzEzgN2pRODun1ch9o24ToFFbPCAnV5nYGg
// SIG // sVIspl8V4qNjGkQandwLDjm90uF5yS0q8dPS00g23lBE
// SIG // PrHqIQ==
// SIG // End signature block
