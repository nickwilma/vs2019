(()=>{var e={857:(e,t,r)=>{const{Hasher:s}=r(749),i=r(147),{promisify:a}=r(837),{StringDecoder:n}=r(576),c=a(i.open),o=a(i.read),l=a(i.close),u=Buffer.alloc(20);t.hash=e=>{const t=new s;return t.update(w(e)),t.digest(u),t.free(),u.toString("hex")},t.hashFile=async(e,t=4096)=>{t%2==1&&t++;const r=Buffer.alloc(t),i=new s;let a;try{a=await c(e,"r");let t=await o(a,r,0,r.length,null);const s=r.slice(0,t.bytesRead);if(d(s))for(i.update(s.slice(2));t.bytesRead===r.length;)t=await o(a,r,0,r.length,null),i.update(r.slice(0,t.bytesRead));else if(h(s))for(i.update(s.slice(2).swap16());t.bytesRead===r.length;)t=await o(a,r,0,r.length,null),i.update(r.slice(0,t.bytesRead).swap16());else if(f(s)){const e=new n("utf8");for(i.update(Buffer.from(e.write(s.slice(3)),"utf16le"));t.bytesRead===r.length;)t=await o(a,r,0,r.length,null),i.update(Buffer.from(e.write(r.slice(0,t.bytesRead)),"utf16le"))}else{const e=new n("utf8");for(i.update(Buffer.from(e.write(s),"utf16le"));t.bytesRead===r.length;)t=await o(a,r,0,r.length,null),i.update(Buffer.from(e.write(r.slice(0,t.bytesRead)),"utf16le"))}return i.digest(u),u.toString("hex")}finally{i.free(),void 0!==a&&await l(a)}};const f=e=>e.length>=3&&239===e[0]&&187===e[1]&&191===e[2],d=e=>e.length>=2&&255===e[0]&&254===e[1],h=e=>e.length>=2&&254===e[0]&&255===e[1],w=e=>f(e)?p(e.slice(3)):d(e)?e.slice(2):h(e)?e.slice(2).swap16():p(e),p=e=>Buffer.from(e.toString("utf8"),"utf16le")},749:(e,t,r)=>{let s,i={};i.__wbindgen_placeholder__=e.exports;const{TextDecoder:a}=r(837);let n=new a("utf-8",{ignoreBOM:!0,fatal:!0});n.decode();let c=null;function o(){return null!==c&&c.buffer===s.memory.buffer||(c=new Uint8Array(s.memory.buffer)),c}let l=0;function u(e,t){const r=t(1*e.length);return o().set(e,r/1),l=e.length,r}class f{static __wrap(e){const t=Object.create(f.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_hasher_free(e)}constructor(){var e=s.hasher_new();return f.__wrap(e)}update(e){var t=u(e,s.__wbindgen_malloc),r=l;s.hasher_update(this.ptr,t,r)}digest(e){try{var t=u(e,s.__wbindgen_malloc),r=l;s.hasher_digest(this.ptr,t,r)}finally{e.set(o().subarray(t/1,t/1+r)),s.__wbindgen_free(t,1*r)}}}e.exports.Hasher=f,e.exports.__wbindgen_throw=function(e,t){throw new Error((r=e,s=t,n.decode(o().subarray(r,r+s))));var r,s};const d=r(17).join(__dirname,"chromehash_bg.wasm"),h=r(147).readFileSync(d),w=new WebAssembly.Module(h),p=new WebAssembly.Instance(w,i);s=p.exports,e.exports.__wasm=s},379:function(e,t,r){"use strict";var s=this&&this.__createBinding||(Object.create?function(e,t,r,s){void 0===s&&(s=r),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,s){void 0===s&&(s=r),e[s]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&s(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.LocalAndRemoteFsUtils=t.RemoteFsThroughDapUtils=t.LocalFsUtils=t.IFsUtils=t.readFileRaw=t.writeFile=t.readfile=t.readdir=t.stat=t.moveFile=t.existsWithoutDeref=t.existsInjected=t.copyFile=t.canAccess=t.fsModule=void 0;const n=a(r(147)),c=a(r(837));async function o({access:e},t){if(!t)return!1;try{return await e(t),!0}catch(e){return!1}}t.fsModule=n,t.canAccess=o,t.copyFile=async function(e,t,r){try{await e.copyFile(t,r)}catch(s){try{if(!await o(e,r))throw s;await e.unlink(r),await e.copyFile(t,r)}catch(e){throw s}}},t.existsInjected=async function({stat:e},t){if(t)try{return await e(t)}catch(e){return}},t.existsWithoutDeref=async function({lstat:e},t){if(t)try{return await e(t)}catch(e){return}},t.moveFile=async function({copyFile:e,rename:t,unlink:r},s,i){try{await t(s,i)}catch(t){await e(s,i),await r(s)}},t.stat=function(e){return new Promise((t=>{n.stat(e,((e,r)=>t(e?void 0:r)))}))},t.readdir=function(e){return new Promise((t=>{n.readdir(e,"utf8",(async(e,r)=>{t(e?[]:r)}))}))},t.readfile=function(e){return new Promise((t=>{n.readFile(e,"utf8",(async(e,r)=>{t(e?"":r)}))}))},t.writeFile=c.promisify(n.writeFile),t.readFileRaw=function(e){return n.promises.readFile(e).catch((()=>Buffer.alloc(0)))},t.IFsUtils=Symbol("FsUtils");class l{constructor(e){this.fs=e}realPath(e){return this.fs.realpath(e)}async exists(e){try{return await this.fs.access(e,n.constants.F_OK),!0}catch(e){return!1}}readFile(e){return this.fs.readFile(e)}}t.LocalFsUtils=l;class u{constructor(e){this.dap=e}async realPath(){throw new Error("not implemented")}async exists(e){try{const{doesExists:t}=await this.dap.remoteFileExistsRequest({localFilePath:e});return t}catch(e){return!1}}readFile(){throw new Error("not implemented")}}t.RemoteFsThroughDapUtils=u,t.LocalAndRemoteFsUtils=class{constructor(e,t,r){this.remoteFilePrefix=e,this.localFsUtils=t,this.remoteFsUtils=r}static create(e,t,r){const s=new l(t);return void 0!==e?new this(e.toLowerCase(),s,new u(r)):s}async exists(e){return this.selectFs(e).exists(e)}async readFile(e){return this.selectFs(e).readFile(e)}async realPath(e){return this.selectFs(e).realPath(e)}selectFs(e){return e.toLowerCase().startsWith(this.remoteFilePrefix)?this.remoteFsUtils:this.localFsUtils}}},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")},576:e=>{"use strict";e.exports=require("string_decoder")},837:e=>{"use strict";e.exports=require("util")}},t={};function r(s){var i=t[s];if(void 0!==i)return i.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,r),a.exports}(()=>{"use strict";const e=r(857),t=r(379),s=Buffer.from("(function (exports, require, module, __filename, __dirname) { "),i=Buffer.from("\n});"),a=Buffer.from("(function (exports, require, module, __filename, __dirname, process, global, Buffer) { return function (exports, require, module, __filename, __dirname) { "),n=Buffer.from("\n}.call(this, exports, require, module, __filename, __dirname); });"),c=Buffer.from("#!"),o=Buffer.from("\r")[0],l=Buffer.from("\n")[0],u=(t,r,u)=>{if(e.hash(t)===r)return!0;if(u){if(f=c,t.slice(0,f.length).equals(f)){let s=t.indexOf(l);return t[s-1]===o&&s--,e.hash(t.slice(s))===r}if(e.hash(Buffer.concat([s,t,i]))===r)return!0}var f;return e.hash(Buffer.concat([a,t,n]))===r},f=e=>e instanceof Buffer?e:Buffer.from(e,"utf-8");var d;process.send&&(d=process.send.bind(process),process.on("message",(r=>{(async function(r){switch(r.type){case 0:try{const s=await t.readFileRaw(r.file);return{id:r.id,hash:e.hash(s)}}catch(e){return{id:r.id}}case 1:try{return{id:r.id,hash:e.hash(f(r.data))}}catch(e){return{id:r.id}}case 2:try{const e=await t.readFileRaw(r.file);return{id:r.id,matches:u(e,r.expected,r.checkNode)}}catch(e){return{id:r.id,matches:!1}}case 3:try{return{id:r.id,matches:u(f(r.data),r.expected,r.checkNode)}}catch(e){return{id:r.id,matches:!1}}}})(r).then(d)})))})()})();
//# sourceMappingURL=hash.bundle.js.map
// SIG // Begin signature block
// SIG // MIInuAYJKoZIhvcNAQcCoIInqTCCJ6UCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // VxRHDyQVJYSc2uOfvD21BqolnCuG9VV/Irpt39NiRX2g
// SIG // gg2BMIIF/zCCA+egAwIBAgITMwAAAlKLM6r4lfM52wAA
// SIG // AAACUjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIxMDkwMjE4MzI1OVoX
// SIG // DTIyMDkwMTE4MzI1OVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 0OTPj7P1+wTbr+Qf9COrqA8I9DSTqNSq1UKju4IEV3HJ
// SIG // Jck61i+MTEoYyKLtiLG2Jxeu8F81QKuTpuKHvi380gzs
// SIG // 43G+prNNIAaNDkGqsENQYo8iezbw3/NCNX1vTi++irdF
// SIG // qXNs6xoc3B3W+7qT678b0jTVL8St7IMO2E7d9eNdL6RK
// SIG // fMnwRJf4XfGcwL+OwwoCeY9c5tvebNUVWRzaejKIkBVT
// SIG // hApuAMCtpdvIvmBEdSTuCKZUx+OLr81/aEZyR2jL1s2R
// SIG // KaMz8uIzTtgw6m3DbOM4ewFjIRNT1hVQPghyPxJ+ZwEr
// SIG // wry5rkf7fKuG3PF0fECGSUEqftlOptpXTQIDAQABo4IB
// SIG // fjCCAXowHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFDWSWhFBi9hrsLe2TgLuHnxG
// SIG // F3nRMFAGA1UdEQRJMEekRTBDMSkwJwYDVQQLEyBNaWNy
// SIG // b3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEWMBQG
// SIG // A1UEBRMNMjMwMDEyKzQ2NzU5NzAfBgNVHSMEGDAWgBRI
// SIG // bmTlUAXTgqoXNzcitW2oynUClTBUBgNVHR8ETTBLMEmg
// SIG // R6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3JsMGEGCCsGAQUFBwEBBFUwUzBRBggrBgEFBQcw
// SIG // AoZFaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEL
// SIG // BQADggIBABZJN7ksZExAYdTbQJewYryBLAFnYF9amfhH
// SIG // WTGG0CmrGOiIUi10TMRdQdzinUfSv5HHKZLzXBpfA+2M
// SIG // mEuJoQlDAUflS64N3/D1I9/APVeWomNvyaJO1mRTgJoz
// SIG // 0TTRp8noO5dJU4k4RahPtmjrOvoXnoKgHXpRoDSSkRy1
// SIG // kboRiriyMOZZIMfSsvkL2a5/w3YvLkyIFiqfjBhvMWOj
// SIG // wb744LfY0EoZZz62d1GPAb8Muq8p4VwWldFdE0y9IBMe
// SIG // 3ofytaPDImq7urP+xcqji3lEuL0x4fU4AS+Q7cQmLq12
// SIG // 0gVbS9RY+OPjnf+nJgvZpr67Yshu9PWN0Xd2HSY9n9xi
// SIG // au2OynVqtEGIWrSoQXoOH8Y4YNMrrdoOmjNZsYzT6xOP
// SIG // M+h1gjRrvYDCuWbnZXUcOGuOWdOgKJLaH9AqjskxK76t
// SIG // GI6BOF6WtPvO0/z1VFzan+2PqklO/vS7S0LjGEeMN3Ej
// SIG // 47jbrLy3/YAZ3IeUajO5Gg7WFg4C8geNhH7MXjKsClsA
// SIG // Pk1YtB61kan0sdqJWxOeoSXBJDIzkis97EbrqRQl91K6
// SIG // MmH+di/tolU63WvF1nrDxutjJ590/ALi383iRbgG3zkh
// SIG // EceyBWTvdlD6FxNbhIy+bJJdck2QdzLm4DgOBfCqETYb
// SIG // 4hQBEk/pxvHPLiLG2Xm9PEnmEDKo1RJpMIIHejCCBWKg
// SIG // AwIBAgIKYQ6Q0gAAAAAAAzANBgkqhkiG9w0BAQsFADCB
// SIG // iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEw
// SIG // OTA5WjB+MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQD
// SIG // Ex9NaWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDEx
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // q/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4Bjga
// SIG // BEm6f8MMHt03a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSH
// SIG // fpRgJGyvnkmc6Whe0t+bU7IKLMOv2akrrnoJr9eWWcpg
// SIG // GgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpc
// SIG // oRb0RrrgOGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnn
// SIG // Db6gE3e+lD3v++MrWhAfTVYoonpy4BI6t0le2O3tQ5GD
// SIG // 2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLT
// SIG // swM9sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOE
// SIG // y/S6A4aN91/w0FK/jJSHvMAhdCVfGCi2zCcoOCWYOUo2
// SIG // z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
// SIG // A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL
// SIG // 5zmhD+kjSbwYuER8ReTBw3J64HLnJN+/RpnF78IcV9uD
// SIG // jexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmnEyim
// SIG // p31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8Hh
// SIG // hUSJxAlMxdSlQy90lfdu+HggWCwTXWCVmj5PM4TasIgX
// SIG // 3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0wggHpMBAG
// SIG // CSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXT
// SIG // gqoXNzcitW2oynUClTAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx
// SIG // 0SOJNDBaBgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4G
// SIG // CCsGAQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
// SIG // HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEF
// SIG // BQcCARYzaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
// SIG // aW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsGAQUF
// SIG // BwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5
// SIG // AF8AcwB0AGEAdABlAG0AZQBuAHQALiAdMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKbC5YR4WOS
// SIG // mUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np
// SIG // 22O/IjWll11lhJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r
// SIG // 4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6I/MTfaaQdION
// SIG // 9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWlu
// SIG // WpiW5IP0wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiX
// SIG // mE0OPQvyCInWH8MyGOLwxS3OW560STkKxgrCxq2u5bLZ
// SIG // 2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNA
// SIG // BQamASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPD
// SIG // XVJihsMdYzaXht/a8/jyFqGaJ+HNpZfQ7l1jQeNbB5yH
// SIG // PgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
// SIG // XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbS
// SIG // oqKfenoi+kiVH6v7RyOA9Z74v2u3S5fi63V4GuzqN5l5
// SIG // GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33VtY5E9
// SIG // 0Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZO
// SIG // SEXAQsmbdlsKgEhr/Xmfwb1tbWrJUnMTDXpQzTGCGY8w
// SIG // ghmLAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTECEzMAAAJSizOq+JXzOdsAAAAAAlIwDQYJYIZI
// SIG // AWUDBAIBBQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQB
// SIG // gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
// SIG // ARUwLwYJKoZIhvcNAQkEMSIEIPpBa+WdCvrMc+EuLNRp
// SIG // AVnPa8sqKH3CSBzsGEIEaCspMEIGCisGAQQBgjcCAQwx
// SIG // NDAyoBSAEgBNAGkAYwByAG8AcwBvAGYAdKEagBhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
// SIG // BQAEggEAo3h/8JeMaKxauHtha2fVvc7P5vU1+svAG5ZS
// SIG // I0BwuX+lO2KEm/vMWK3nRevdpgmb5fnGicFG3uBoZinG
// SIG // M1jOLtkk8WEdRiqIkd2Q80z7HJqHigj8ai5Rdp6Nefra
// SIG // y3LloRvOExm+JFfgWDROdoc3kX2Snrwc31te9nLZ6YrF
// SIG // eMbc60Z1B7h/rv79GJb4v9kzDOALsh6slR3N6ON+6cQf
// SIG // 9m+kKUOc/0+u938nUitbtybO3mreCiA7zlO/mh/YXIzA
// SIG // ba9a+/4nCyQttZnjq7Nof7GLzkwXunndIz4dysi3teMG
// SIG // 7EE2qn7LMTwuEMr/Jlzvb/X7wpC86Ewi7zem9FExv6GC
// SIG // FxkwghcVBgorBgEEAYI3AwMBMYIXBTCCFwEGCSqGSIb3
// SIG // DQEHAqCCFvIwghbuAgEDMQ8wDQYJYIZIAWUDBAIBBQAw
// SIG // ggFZBgsqhkiG9w0BCRABBKCCAUgEggFEMIIBQAIBAQYK
// SIG // KwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCCIDvcn
// SIG // AkyT6IDZyI+xQmK3nEGTMo00QCP2YjgaMdsKzQIGYcIe
// SIG // ftP3GBMyMDIyMDExMTAyNTYyMS42NjRaMASAAgH0oIHY
// SIG // pIHVMIHSMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQL
// SIG // EyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExp
// SIG // bWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1MgRVNOOjNC
// SIG // RDQtNEI4MC02OUMzMSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloIIRaDCCBxQwggT8oAMC
// SIG // AQICEzMAAAGJtL+GMIQcS48AAQAAAYkwDQYJKoZIhvcN
// SIG // AQELBQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAw
// SIG // HhcNMjExMDI4MTkyNzQxWhcNMjMwMTI2MTkyNzQxWjCB
// SIG // 0jELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWlj
// SIG // cm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVk
// SIG // MSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjozQkQ0LTRC
// SIG // ODAtNjlDMzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgU2VydmljZTCCAiIwDQYJKoZIhvcNAQEBBQAD
// SIG // ggIPADCCAgoCggIBAL0GV8WRZmuqZZrjsrzaVfMTjTsH
// SIG // GKJWRvwY8mVhkpOSThmi8qyiHeVcVR1h5bJiROEr587H
// SIG // abCplcfKLTjb3iFBb0nHhGafFV5ruZtX7vC+3Pt5cF3I
// SIG // m43HKrRL7ULJaJEFcdK/i+eGm6zQ2q8BRu9yGkYnSEtY
// SIG // vXPrpyfKGMoQ0S6wsrBQFcckITzWZFiu2fP1RrpGiiwF
// SIG // h1wof/ked4eNoBS/vf5gAC8cwl17qH4vH/1ygpu8TcFX
// SIG // NYTjQgs+qKveALn81TZJCFuG61EIGKQnCZvVNFzZkL7a
// SIG // 6KWA5/VLWPGENDSnp1z7XYCx3UPDZ794oBKyi61iNGuZ
// SIG // +Y43Sn8JPvJr2pKnWZpTrHnjktV7KUDSQCtbmZZQCE3J
// SIG // 0GTnDuaH4zkN97o1nJAF3c/v8d6O5eAFP00jjMxmTMIV
// SIG // HbVcAt3UmyLaUlRYJ4zNgjhCfc4AmnbzoqxgyzeO9Y2S
// SIG // NowpZI7CU3YD5N+N00AOCRb3bP7p2atLi6/p4md1+ODg
// SIG // cdsfoFZZZ9nOFG2VzbngOMktUyRm2yRSCCwJk1APQLo+
// SIG // XiEhk2zYslse/R5wjk2q9/UBCqM5uC505g18tPyiPx/5
// SIG // 2GRirkx33JD9vMEEtOqw/nw0ucS8HETAlvdg5B15rW4R
// SIG // skYpQTi+S8WXpUH8beeMJeFlAtAHQBKJT3pDg8DvAgMB
// SIG // AAGjggE2MIIBMjAdBgNVHQ4EFgQUl28fs0daeCCAHoLg
// SIG // OqxypK35e1AwHwYDVR0jBBgwFoAUn6cVXQBeYl2D9OXS
// SIG // ZacbUzUZ6XIwXwYDVR0fBFgwVjBUoFKgUIZOaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3JsMGwGCCsGAQUFBwEBBGAwXjBcBggrBgEFBQcw
// SIG // AoZQaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIw
// SIG // UENBJTIwMjAxMCgxKS5jcnQwDAYDVR0TAQH/BAIwADAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG9w0BAQsF
// SIG // AAOCAgEAjrS3aVlCOCsHyy632iqywfdg6mwLKRljONU2
// SIG // juCZfrB8T6OdtrrtxikAo5pEVq3h7ZX8svZDpOy1msd5
// SIG // N5HvBrX3rX24e6h9C3ldlzloN/QTpx3+pk3GauxWEmWX
// SIG // IdSQ0I3PfPjnZaMPqFoodA27eAlf3tfWXBPtZ9c81pLJ
// SIG // FBHdH+YzyFIrN96fr5GPLM3bgLQnCHDxVISPB2+WpT1A
// SIG // DzIxs8Cm+zSCm53/I/HD9fALOSL3nJBdKIdXMOt0WP7z
// SIG // yutiw2HaYu1pxtjm754H1lSrcIsEyOIx49nDvat+xw3v
// SIG // zz5dteoEqVGYdGqduJipjA33CqdTeJhHbMc+KLHjqz2H
// SIG // hbBx1iRSegIr76p+9Ck3iaaea/g8Uqm3kstJsSFDqv5Q
// SIG // GlMYDUkFVF9urfK/n3IpKHyr9t1h67UVd7e61U7AfWM6
// SIG // 0WoopJs+vCuR1nbfTKlC8T0D6PqaWdC0apDmnuOuvlCk
// SIG // WNCcVrXazHObx5R2X56o2sI/0bDNkukOn2vU/Qp2NTc+
// SIG // w2ARt8mScgjxbK4FNObPZY6n7EqbaRXVIfUeHHvi+9Ul
// SIG // gyzNsf9TBSyxwDG17BKfCpaBBrWg1C58bX0trWIX7ihq
// SIG // kV6BHwzwDJyHU70D4dxh0OEo5JAQERy9DGO+WpYRkyh1
// SIG // owtmi1TqPKGyiAZPIX5xQ1H/xMlcOLkwggdxMIIFWaAD
// SIG // AgECAhMzAAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3
// SIG // DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYD
// SIG // VQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBB
// SIG // dXRob3JpdHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0z
// SIG // MDA5MzAxODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
// SIG // CgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9Kp
// SIG // bE51yMo1V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5K
// SIG // Wv64NmeFRiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTz
// SIG // xXb1hlDcwUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9
// SIG // cmmvHaus9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl
// SIG // 3GoPz130/o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3K
// SIG // Ni1wjjHINSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3t
// SIG // pK56KTesy+uDRedGbsoy1cCGMFxPLOJiss254o2I5Jas
// SIG // AUq7vnGpF1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ
// SIG // 1v2lIH1+/NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHo
// SIG // vwUDo9Fzpk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz
// SIG // 1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymei
// SIG // XtcodgLiMxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8w
// SIG // dJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFd
// SIG // Etsluq9QBXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94
// SIG // q0W29R6HXtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0w
// SIG // ggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGC
// SIG // NxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1Ud
// SIG // DgQWBBSfpxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAE
// SIG // VTBTMFEGDCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIB
// SIG // FjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L0RvY3MvUmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYI
// SIG // KwYBBQUHAwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBD
// SIG // AEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8w
// SIG // HwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQw
// SIG // VgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9v
// SIG // Q2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEB
// SIG // BE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRf
// SIG // MjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIB
// SIG // AJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEG
// SIG // k5c9MTO1OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi
// SIG // 7ulmZzpTTd2YurYeeNg2LpypglYAA7AFvonoaeC6Ce57
// SIG // 32pvvinLbtg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OO
// SIG // PcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECW
// SIG // OKz3+SmJw7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWK
// SIG // NsIdw2FzLixre24/LAl4FOmRsqlb30mjdAy87JGA0j3m
// SIG // Sj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSw
// SIG // ethQ/gpY3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23K
// SIG // jgm9swFXSVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4
// SIG // S5pu+yFUa2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFE
// SIG // fnyhYWxz/gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+
// SIG // pTFRhLy/AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/
// SIG // Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7t
// SIG // fqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJt
// SIG // pQUQwXEGahC0HVUzWLOhcGbyoYIC1zCCAkACAQEwggEA
// SIG // oYHYpIHVMIHSMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYD
// SIG // VQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25z
// SIG // IExpbWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1MgRVNO
// SIG // OjNCRDQtNEI4MC02OUMzMSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4D
// SIG // AhoDFQAhpQmt5Hrcnrnsu2yTaVpDLognEKCBgzCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMA0GCSqG
// SIG // SIb3DQEBBQUAAgUA5Yb6mTAiGA8yMDIyMDExMTAyMzQw
// SIG // MVoYDzIwMjIwMTEyMDIzNDAxWjB3MD0GCisGAQQBhFkK
// SIG // BAExLzAtMAoCBQDlhvqZAgEAMAoCAQACAgm0AgH/MAcC
// SIG // AQACAhHkMAoCBQDliEwZAgEAMDYGCisGAQQBhFkKBAIx
// SIG // KDAmMAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAI
// SIG // AgEAAgMBhqAwDQYJKoZIhvcNAQEFBQADgYEAUUk8Uni0
// SIG // qwzY1+k2OatlaqtyOHl1U7wplGT4ngAzjl1Os1oDPlpB
// SIG // HVBaeosenr+P7zfqkQ2omwle/YhmKWL1xj2DHzM6qSo9
// SIG // j/02wyEfq5QcFS+AwhTNA8stGpi8fuc0aw/lGkv4hHh2
// SIG // od8t7G5T/Xcsxbjfgd8+5KRjaP3oJzoxggQNMIIECQIB
// SIG // ATCBkzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAAYm0v4YwhBxLjwABAAABiTANBglghkgBZQMEAgEF
// SIG // AKCCAUowGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEE
// SIG // MC8GCSqGSIb3DQEJBDEiBCDYXuhmAD30/LNdrBCMLPhR
// SIG // DH3DwPwHs0DDKAsUSaXyCjCB+gYLKoZIhvcNAQkQAi8x
// SIG // geowgecwgeQwgb0EIGZ3RzHcUFdVbG6Vhzkx6lhMnL3E
// SIG // SZu3GOvZf1Jk/I9FMIGYMIGApH4wfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAGJtL+GMIQcS48AAQAA
// SIG // AYkwIgQgS0DpkbJPKem5Gq1mwuyCWgXxngsyMV1LR/68
// SIG // AL69g34wDQYJKoZIhvcNAQELBQAEggIARXgduj0BAOK9
// SIG // F8y8cw54G+wSwML4SGmsOtZRuZSGfERcyufO2XBms4gb
// SIG // mkypH8YQHOFcByOdcWs3iJOVBAmCdakPgrwXGRWoPLH5
// SIG // N/tgN1BHiWM8tvUZHS2FRnz0RUixQDLU3+5ELn5DLZTF
// SIG // SDVLuVmxNuGvTH489jbq2lbMgCoNcjNTdt+vsNUG194O
// SIG // 9VOrCX26isGnKUm8cUsxJbANv6YOMZiQEiHurKB6z0FL
// SIG // ptZkfMWNPKkPi4lCqrsFPgTdg8BsJ7DgAlsbm+wHu3z3
// SIG // PXeRqThe+NHJaalNvJDpvXvHFrI6Jy39ntyei9zSd9TW
// SIG // K3GP+ffIs/+6ne+3+sjrppDyWjFn0LoYceIdhNljgTu1
// SIG // /j9vSAMkbmv8QwfJ/G+sFUrkEBOmsT7ax2qYH57Xhw1i
// SIG // a9riLWx2y3xfhOdEK2uHrE4Abih1wZSZOTFxPKSYnLCs
// SIG // AjGLXWYk3QDuOHGH8Qb+uU13Xxk+B/EQ3DBEOgOxACID
// SIG // bO2sVj0b8/nCMYtcX03H0l/NlAZFHmsaHZ+ytQLqAr6w
// SIG // FtJN2x3XuzkP0ezIWhO+ZwwkBrX7r8qNtmjpIYo0ssR+
// SIG // Ye+Waqwx7OVGnoPKRc8CdWx3HmoOB3Nk9I1/z9aD59Ae
// SIG // qgB8//EJKKczzXOXYElGtrHpAMbpduEsk9df/nO/7mGC
// SIG // YwIj21+sbIY=
// SIG // End signature block