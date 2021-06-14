"use strict";let results="",video=[],number=0;const fade=500;function loadVideo(e){clear(),log(`录像路径: '${e}'`),time("录像准备"),results=null;const r=new XMLHttpRequest,t=e.substring(e.lastIndexOf("."),e.length);r.open("GET",e,!0),r.responseType="arraybuffer",r.url=e,r.onreadystatechange=function(){if(4===r.readyState)if(200===r.status){timeLog("录像准备","请求录像文件资源");const e=new Uint8Array(r.response);try{switch(t){case".txt":case".rawvf":ready(),playRawVideo(new TextDecoder("windows-1251").decode(e));break;case".avf":case".mvf":case".rmv":runtimeInitialized?(log("Emscripten 的 Runtime 已准备完成"),Module.ccall("parser_"+t.replace(".",""),"null",["number","array"],[e.length,e])):(log("等待 Emscripten 的 Runtime 准备完成"),Module.onRuntimeInitialized=function(){log("Emscripten 的 Runtime 已准备完成"),Module.ccall("parser_"+t.replace(".",""),"null",["number","array"],[e.length,e])});break;default:videoError(i18n.errFormatPre+t+i18n.errFormatPost)}}catch(e){"ExitStatus"!==e.name&&(error(e),videoError(e.toString()))}}else videoError(i18n.errRequest+r.status)},r.send()}function ready(){$("#video-stage",parent.document).fadeIn(500),$("#video-iframe",parent.document).fadeIn(500,(function(){pause_avf(),pause_avf()}))}function videoError(e){alert(e),exitVideo()}function exitVideo(){container.init(0),$("#video-stage",parent.document).fadeOut(0),$("#video-iframe",parent.document).fadeOut(0)}function playRawVideo(e){reset(),video=[],timeLog("录像准备","重置数据");const r=e.split("\n"),t={},i=/^-?\d+\.\d+[ ]+(mv|sc|mt|[lrm][cr])[ |\d]+\([ ]*\d+[ ]*\d+[ ]*\)([ ]*\(l?r?m?\))?$/,n=/^[a-zA-Z_]+?[:][ ]*.*\S$/,o=/^[*0]+$/;let a=0;for(let e=0;e<r.length;e++){let s=r[e].trim();if(i.test(s)){const e=s.replaceAll(/\(l?r?m?\)|[()]/g,"").replaceAll(/[ ]{2,}|\./g," ").trim().split(" "),r=video[a-1],t=parseInt(e[e.length-2]),i=parseInt(e[e.length-1]),n=a>0?r.path+Math.pow(Math.pow(t-r.x,2)+Math.pow(i-r.y,2),.5):0;video[a++]={sec:parseInt(e[0]),hun:parseInt(e[1].substring(0,2)),mouse:e[2],rows:parseInt(t/16)+1,columns:parseInt(i/16)+1,x:t,y:i,path:n}}else n.test(s)?t[s.substring(0,s.indexOf(":"))]=s.substring(s.indexOf(":")+1,s.length).trim():o.test(s)&&(t.Board=t.Board?t.Board+s:s)}if("beginner"===t.Level.toLowerCase())video[0].level=1;else if("intermediate"===t.Level.toLowerCase())video[0].level=2;else if("expert"===t.Level.toLowerCase())video[0].level=3;else{if("custom"!==t.Level.toLowerCase())throw`不支持的游戏级别: ${t.Level}`;video[0].level=4}video[0].board=[...t.Board],video[0].player=t.Player,video[0].realtime=(100*video[video.length-1].sec+video[video.length-1].hun)/100,video[0].size=a,video_invalid=!1,setQuestionMode(t.Marks&&"on"===t.Marks.toLowerCase()),timeLog("录像准备","解析 RAW 数据"),container.init(video[0].level,parseInt(t.Width),parseInt(t.Height),parseInt(t.Mines)),timeLog("录像准备","录像初始化"),container.setVideoMines(video[0].board),start_avf(video)}Module.onProgress=function(e){results+=e},Module.onSuccess=function(){timeLog("录像准备","解析录像文件"),ready(),playRawVideo(results)},Module.onError=function(e,r){switch(e){case 1:videoError(i18n.errParserTooLarge);break;case 2:videoError(i18n.errParserUnexpectedEnd);break;case 3:videoError(i18n.errParserInvalidFile);break;case 4:videoError(i18n.errParserInvalidEvent);break;case 5:videoError(i18n.errParserInvalidVideoType);break;case 6:videoError(i18n.errParserInvalidBoardSize);break;case 7:videoError(i18n.errParserInvalidVideoHeader);break;case 8:videoError(i18n.errParserInvalidMinePosition);break;default:videoError(i18n.errParserUnknown)}},window.addEventListener("orientationchange",(function(){log("屏幕："+window.orientation+"度"),90===window.orientation||-90===window.orientation?document.getElementsByTagName("meta")[1].content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0":3===container.level&&(document.getElementsByTagName("meta")[1].content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale="+window.screen.width/640+", maximum-scale="+window.screen.width/640)}),!1);