var key,Module=void 0!==Module?Module:{},moduleOverrides={};for(key in Module)Module.hasOwnProperty(key)&&(moduleOverrides[key]=Module[key]);var arguments_=[],thisProgram="./this.program",quit_=function(e,n){throw n},ENVIRONMENT_IS_WEB=!1,ENVIRONMENT_IS_WORKER=!1,ENVIRONMENT_IS_NODE=!1,ENVIRONMENT_IS_SHELL=!1;ENVIRONMENT_IS_WEB="object"==typeof window,ENVIRONMENT_IS_WORKER="function"==typeof importScripts,ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var read_,readAsync,readBinary,setWindowTitle,nodeFS,nodePath,scriptDirectory="";function locateFile(e){return Module.locateFile?Module.locateFile(e,scriptDirectory):scriptDirectory+e}ENVIRONMENT_IS_NODE?(scriptDirectory=ENVIRONMENT_IS_WORKER?require("path").dirname(scriptDirectory)+"/":__dirname+"/",read_=function(e,n){return nodeFS||(nodeFS=require("fs")),nodePath||(nodePath=require("path")),e=nodePath.normalize(e),nodeFS.readFileSync(e,n?null:"utf8")},readBinary=function(e){var n=read_(e,!0);return n.buffer||(n=new Uint8Array(n)),assert(n.buffer),n},process.argv.length>1&&(thisProgram=process.argv[1].replace(/\\/g,"/")),arguments_=process.argv.slice(2),"undefined"!=typeof module&&(module.exports=Module),process.on("uncaughtException",(function(e){if(!(e instanceof ExitStatus))throw e})),process.on("unhandledRejection",abort),quit_=function(e){process.exit(e)},Module.inspect=function(){return"[Emscripten Module object]"}):ENVIRONMENT_IS_SHELL?("undefined"!=typeof read&&(read_=function(e){return read(e)}),readBinary=function(e){var n;return"function"==typeof readbuffer?new Uint8Array(readbuffer(e)):(assert("object"==typeof(n=read(e,"binary"))),n)},"undefined"!=typeof scriptArgs?arguments_=scriptArgs:"undefined"!=typeof arguments&&(arguments_=arguments),"function"==typeof quit&&(quit_=function(e){quit(e)}),"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&(ENVIRONMENT_IS_WORKER?scriptDirectory=self.location.href:"undefined"!=typeof document&&document.currentScript&&(scriptDirectory=document.currentScript.src),scriptDirectory=0!==scriptDirectory.indexOf("blob:")?scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1):"",read_=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},ENVIRONMENT_IS_WORKER&&(readBinary=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),readAsync=function(e,n,r){var t=new XMLHttpRequest;t.open("GET",e,!0),t.responseType="arraybuffer",t.onload=function(){200==t.status||0==t.status&&t.response?n(t.response):r()},t.onerror=r,t.send(null)},setWindowTitle=function(e){document.title=e});var wasmBinary,out=Module.print||console.log.bind(console),err=Module.printErr||console.warn.bind(console);for(key in moduleOverrides)moduleOverrides.hasOwnProperty(key)&&(Module[key]=moduleOverrides[key]);moduleOverrides=null,Module.arguments&&(arguments_=Module.arguments),Module.thisProgram&&(thisProgram=Module.thisProgram),Module.quit&&(quit_=Module.quit),Module.wasmBinary&&(wasmBinary=Module.wasmBinary);var wasmMemory,noExitRuntime=Module.noExitRuntime||!0;"object"!=typeof WebAssembly&&abort("no native wasm support detected");var EXITSTATUS,ABORT=!1;function assert(e,n){e||abort("Assertion failed: "+n)}function getCFunc(e){var n=Module["_"+e];return assert(n,"Cannot call unknown function "+e+", make sure it is exported"),n}function ccall(e,n,r,t,o){var i={string:function(e){var n=0;if(null!=e&&0!==e){var r=1+(e.length<<2);stringToUTF8(e,n=stackAlloc(r),r)}return n},array:function(e){var n=stackAlloc(e.length);return writeArrayToMemory(e,n),n}},a=getCFunc(e),u=[],s=0;if(t)for(var l=0;l<t.length;l++){var c=i[r[l]];c?(0===s&&(s=stackSave()),u[l]=c(t[l])):u[l]=t[l]}var d=a.apply(null,u);return d=function(e){return"string"===n?UTF8ToString(e):"boolean"===n?Boolean(e):e}(d),0!==s&&stackRestore(s),d}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64,UTF8Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function UTF8ArrayToString(e,n,r){for(var t=n+r,o=n;e[o]&&!(o>=t);)++o;if(o-n>16&&e.subarray&&UTF8Decoder)return UTF8Decoder.decode(e.subarray(n,o));for(var i="";n<o;){var a=e[n++];if(128&a){var u=63&e[n++];if(192!=(224&a)){var s=63&e[n++];if((a=224==(240&a)?(15&a)<<12|u<<6|s:(7&a)<<18|u<<12|s<<6|63&e[n++])<65536)i+=String.fromCharCode(a);else{var l=a-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}else i+=String.fromCharCode((31&a)<<6|u)}else i+=String.fromCharCode(a)}return i}function UTF8ToString(e,n){return e?UTF8ArrayToString(HEAPU8,e,n):""}function stringToUTF8Array(e,n,r,t){if(!(t>0))return 0;for(var o=r,i=r+t-1,a=0;a<e.length;++a){var u=e.charCodeAt(a);if(u>=55296&&u<=57343&&(u=65536+((1023&u)<<10)|1023&e.charCodeAt(++a)),u<=127){if(r>=i)break;n[r++]=u}else if(u<=2047){if(r+1>=i)break;n[r++]=192|u>>6,n[r++]=128|63&u}else if(u<=65535){if(r+2>=i)break;n[r++]=224|u>>12,n[r++]=128|u>>6&63,n[r++]=128|63&u}else{if(r+3>=i)break;n[r++]=240|u>>18,n[r++]=128|u>>12&63,n[r++]=128|u>>6&63,n[r++]=128|63&u}}return n[r]=0,r-o}function stringToUTF8(e,n,r){return stringToUTF8Array(e,HEAPU8,n,r)}function writeArrayToMemory(e,n){HEAP8.set(e,n)}function updateGlobalBufferAndViews(e){buffer=e,Module.HEAP8=HEAP8=new Int8Array(e),Module.HEAP16=HEAP16=new Int16Array(e),Module.HEAP32=HEAP32=new Int32Array(e),Module.HEAPU8=HEAPU8=new Uint8Array(e),Module.HEAPU16=HEAPU16=new Uint16Array(e),Module.HEAPU32=HEAPU32=new Uint32Array(e),Module.HEAPF32=HEAPF32=new Float32Array(e),Module.HEAPF64=HEAPF64=new Float64Array(e)}var wasmTable,INITIAL_MEMORY=Module.INITIAL_MEMORY||16777216,__ATPRERUN__=[],__ATINIT__=[],__ATPOSTRUN__=[],runtimeInitialized=!1,runtimeExited=!1;function preRun(){if(Module.preRun)for("function"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=!0,callRuntimeCallbacks(__ATINIT__)}function exitRuntime(){runtimeExited=!0}function postRun(){if(Module.postRun)for("function"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(e){__ATPRERUN__.unshift(e)}function addOnInit(e){__ATINIT__.unshift(e)}function addOnPostRun(e){__ATPOSTRUN__.unshift(e)}var runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;function addRunDependency(e){runDependencies++,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(e){if(runDependencies--,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies),0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled)){var n=dependenciesFulfilled;dependenciesFulfilled=null,n()}}function abort(e){throw Module.onAbort&&Module.onAbort(e),err(e+=""),ABORT=!0,EXITSTATUS=1,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(e)}Module.preloadedImages={},Module.preloadedAudios={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(e){return e.startsWith(dataURIPrefix)}function isFileURI(e){return e.startsWith("file://")}var wasmBinaryFile="parser.wasm";function getBinary(e){try{if(e==wasmBinaryFile&&wasmBinary)return new Uint8Array(wasmBinary);if(readBinary)return readBinary(e);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if("function"==typeof fetch&&!isFileURI(wasmBinaryFile))return fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+wasmBinaryFile+"'";return e.arrayBuffer()})).catch((function(){return getBinary(wasmBinaryFile)}));if(readAsync)return new Promise((function(e,n){readAsync(wasmBinaryFile,(function(n){e(new Uint8Array(n))}),n)}))}return Promise.resolve().then((function(){return getBinary(wasmBinaryFile)}))}function createWasm(){var e={a:asmLibraryArg};function n(e,n){var r=e.exports;Module.asm=r,updateGlobalBufferAndViews((wasmMemory=Module.asm.g).buffer),wasmTable=Module.asm.j,addOnInit(Module.asm.h),removeRunDependency("wasm-instantiate")}function r(e){n(e.instance)}function t(n){return getBinaryPromise().then((function(n){return WebAssembly.instantiate(n,e)})).then(n,(function(e){err("failed to asynchronously prepare wasm: "+e),abort(e)}))}if(addRunDependency("wasm-instantiate"),Module.instantiateWasm)try{return Module.instantiateWasm(e,n)}catch(e){return err("Module.instantiateWasm callback failed with error: "+e),!1}return wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(wasmBinaryFile)||isFileURI(wasmBinaryFile)||"function"!=typeof fetch?t(r):fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(n){return WebAssembly.instantiateStreaming(n,e).then(r,(function(e){return err("wasm streaming compile failed: "+e),err("falling back to ArrayBuffer instantiation"),t(r)}))})),{}}function callRuntimeCallbacks(e){for(;e.length>0;){var n=e.shift();if("function"!=typeof n){var r=n.func;"number"==typeof r?void 0===n.arg?wasmTable.get(r)():wasmTable.get(r)(n.arg):r(void 0===n.arg?null:n.arg)}else n(Module)}}isDataURI(wasmBinaryFile)||(wasmBinaryFile=locateFile(wasmBinaryFile));var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function _emscripten_memcpy_big(e,n,r){HEAPU8.copyWithin(e,n,n+r)}function abortOnCannotGrowMemory(e){abort("OOM")}function _emscripten_resize_heap(e){HEAPU8.length,abortOnCannotGrowMemory(e>>>=0)}function _exit(e){exit(e)}function _onerror(e,n){return onerror(e,UTF8ToString(n))}function _onprogress(e){return onprogress(UTF8ToString(e))}function _onsuccess(){return onsuccess()}var calledRun,asmLibraryArg={d:_emscripten_memcpy_big,e:_emscripten_resize_heap,b:_exit,a:_onerror,f:_onprogress,c:_onsuccess},asm=createWasm(),___wasm_call_ctors=Module.___wasm_call_ctors=function(){return(___wasm_call_ctors=Module.___wasm_call_ctors=Module.asm.h).apply(null,arguments)},_parser_avf=Module._parser_avf=function(){return(_parser_avf=Module._parser_avf=Module.asm.i).apply(null,arguments)},_parser_mvf=Module._parser_mvf=function(){return(_parser_mvf=Module._parser_mvf=Module.asm.k).apply(null,arguments)},_parser_rmv=Module._parser_rmv=function(){return(_parser_rmv=Module._parser_rmv=Module.asm.l).apply(null,arguments)},stackSave=Module.stackSave=function(){return(stackSave=Module.stackSave=Module.asm.m).apply(null,arguments)},stackRestore=Module.stackRestore=function(){return(stackRestore=Module.stackRestore=Module.asm.n).apply(null,arguments)},stackAlloc=Module.stackAlloc=function(){return(stackAlloc=Module.stackAlloc=Module.asm.o).apply(null,arguments)};function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function run(e){function n(){calledRun||(calledRun=!0,Module.calledRun=!0,ABORT||(initRuntime(),Module.onRuntimeInitialized&&Module.onRuntimeInitialized(),postRun()))}e=e||arguments_,runDependencies>0||(preRun(),runDependencies>0||(Module.setStatus?(Module.setStatus("Running..."),setTimeout((function(){setTimeout((function(){Module.setStatus("")}),1),n()}),1)):n()))}function exit(e,n){EXITSTATUS=e,n&&keepRuntimeAlive()&&0===e||(keepRuntimeAlive()||(exitRuntime(),Module.onExit&&Module.onExit(e),ABORT=!0),quit_(e,new ExitStatus(e)))}if(Module.ccall=ccall,dependenciesFulfilled=function e(){calledRun||run(),calledRun||(dependenciesFulfilled=e)},Module.run=run,Module.preInit)for("function"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);Module.preInit.length>0;)Module.preInit.pop()();run();