      (function(d){var e=function(a,b,c,f){this.target=a;this.url=b;this.html=[];this.effectQueue=[];this.options=d.extend({ssl:!1,host:"feedrapp.info",limit:null,key:null,layoutTemplate:"{entries}",entryTemplate:'<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',tokens:{},outputMode:"json",dateFormat:"dddd MMM Do",dateLocale:"en",effect:"show",offsetStart:!1,offsetEnd:!1,error:function(){console.log("jQuery RSS: url doesn't link to RSS-Feed")},onData:function(){},
success:function(){}},c||{});this.callback=f||this.options.success};e.htmlTags="doctype,html,head,title,base,link,meta,style,script,noscript,body,article,nav,aside,section,header,footer,h1-h6,hgroup,address,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,figure,figcaption,div,table,caption,thead,tbody,tfoot,tr,th,td,col,colgroup,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,details,summary,command,menu,del,ins,img,iframe,embed,object,param,video,audio,source,canvas,track,map,area,a,em,strong,i,b,u,s,small,abbr,q,cite,dfn,sub,sup,time,code,kbd,samp,var,mark,bdi,bdo,ruby,rt,rp,span,br,wbr".split(",");
e.prototype.load=function(a){var b="http"+(this.options.ssl?"s":"")+"://"+this.options.host+"?callback=?&q="+encodeURIComponent(this.url);this.options.offsetStart&&this.options.offsetEnd&&(this.options.limit=this.options.offsetEnd);null!==this.options.limit&&(b+="&num="+this.options.limit);null!==this.options.key&&(b+="&key="+this.options.key);d.getJSON(b,a)};e.prototype.render=function(){var a=this;this.load(function(b){try{a.feed=b.responseData.feed,a.entries=b.responseData.feed.entries}catch(c){return a.entries=
[],a.feed=null,a.options.error.call(a)}b=a.generateHTMLForEntries();a.target.append(b.layout);if(0!==b.entries.length){d.isFunction(a.options.onData)&&a.options.onData.call(a);var f=d(b.layout).is("entries")?b.layout:d("entries",b.layout);a.appendEntriesAndApplyEffects(f,b.entries)}0<a.effectQueue.length?a.executeEffectQueue(a.callback):d.isFunction(a.callback)&&a.callback.call(a)})};e.prototype.appendEntriesAndApplyEffects=function(a,b){var c=this;d.each(b,function(b,e){var d=c.wrapContent(e);"show"===
c.options.effect?a.before(d):(d.css({display:"none"}),a.before(d),c.applyEffect(d,c.options.effect))});a.remove()};e.prototype.generateHTMLForEntries=function(){var a=this,b={entries:[],layout:null};d(this.entries).each(function(){var c=a.options.offsetStart,f=a.options.offsetEnd;c&&f?index>=c&&index<=f&&a.isRelevant(this,b.entries)&&(c=a.evaluateStringForEntry(a.options.entryTemplate,this),b.entries.push(c)):a.isRelevant(this,b.entries)&&(c=a.evaluateStringForEntry(a.options.entryTemplate,this),
b.entries.push(c))});b.layout=this.options.entryTemplate?this.wrapContent(this.options.layoutTemplate.replace("{entries}","<entries></entries>")):this.wrapContent("<div><entries></entries></div>");return b};e.prototype.wrapContent=function(a){return 0!==d.trim(a).indexOf("<")?d("<div>"+a+"</div>"):d(a)};e.prototype.applyEffect=function(a,b,c){switch(b){case "slide":a.slideDown("slow",c);break;case "slideFast":a.slideDown(c);break;case "slideSynced":this.effectQueue.push({element:a,effect:"slide"});
break;case "slideFastSynced":this.effectQueue.push({element:a,effect:"slideFast"})}};e.prototype.executeEffectQueue=function(a){var b=this;this.effectQueue.reverse();var c=function(){var f=b.effectQueue.pop();f?b.applyEffect(f.element,f.effect,c):a&&a()};c()};e.prototype.evaluateStringForEntry=function(a,b){var c=a,f=this;d(a.match(/(\{.*?\})/g)).each(function(){var a=this.toString();c=c.replace(a,f.getValueForToken(a,b))});return c};e.prototype.isRelevant=function(a,b){var c=this.getTokenMap(a);
return this.options.filter?this.options.filterLimit&&this.options.filterLimit===b.length?!1:this.options.filter(a,c):!0};e.prototype.getFormattedDate=function(a){if(this.options.dateFormatFunction)return this.options.dateFormatFunction(a);return"undefined"!==typeof moment?(a=moment(new Date(a)),a=a.locale?a.locale(this.options.dateLocale):a.lang(this.options.dateLocale),a.format(this.options.dateFormat)):a};e.prototype.getTokenMap=function(a){if(!this.feedTokens){var b=JSON.parse(JSON.stringify(this.feed));
delete b.entries;this.feedTokens=b}return d.extend({feed:this.feedTokens,url:a.link,author:a.author,date:this.getFormattedDate(a.publishedDate),
                                                    
                                                    title:a.title,body:a.content,shortBody:a.contentSnippet.trim(),
                                                    
                                                    bodyPlain:function(a){for(var a=a.content.replace(/<script[\\r\\\s\S]*<\/script>/mgi,"").replace(/<\/?[^>]+>/gi,"").trim(),b=0;b<e.htmlTags.length;b++)a=a.replace(RegExp("<"+e.htmlTags[b],"gi"),"");return a}(a),shortBodyPlain:a.contentSnippet.replace(/<\/?[^>]+>/gi,"").trim(),index:d.inArray(a,this.entries),totalEntries:this.entries.length,

                                                    
teaserImage:function(a){try{return a.enclosure.url}catch(b){return""}}(a),
                                                    
teaserImageUrl:function(a){try{return a.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1]}catch(b){return""}}(a)},
                                                   
                                                   
                                                   this.options.tokens)};e.prototype.getValueForToken=function(a,b){var c=this.getTokenMap(b),d=a.replace(/[\{\}]/g,""),d=c[d];if("undefined"!==typeof d)return"function"===typeof d?d(b,c):d;throw Error("Unknown token: "+a+", url:"+this.url);};d.fn.rss=function(a,b,c){(new e(this,a,b,c)).render();
return this}})(jQuery);

        
        //{index}
        //{teaserImageUrl} || 
function load_rss(rss, no) {
  document.getElementById('loading').setAttribute("style", " display: block;") 
  var num = 1;
  $("#sshas").html("");
  var domain =document.querySelector('.media:checked').value;
  $("#sshas").rss(rss, {
    limit: no,
    ssl: true,
    effect: 'show',
    dateFormat: 'MMMM DD, YYYY',
    entryTemplate: 
    "<li class='search-result-item' data-num='0' data-show='true' data-center='false'>\
                    <div data-full='body' class='info'>\
                        <div class='left'>\
<img src='{teaserImage}'/>\
   <span class='time' data-show='true'>Todays "+domain+" </span>\                        </div>\
                        <div class='right'>\
                            <p class='title'>{title}\
                                <span class='desc-more' data-handle='descMore' data-show='true'></span>\
                            </p>\
                            <p class='min-info'>\
                            <span class='view' data-show='true'><txt style='padding: 3px 7px; background: #772d69; border-radius: 9px; color: #fff; font-size: 11px;'>"+domain+"</txt> {author} Update Hari Ini: {date}\</span>\
                            <span class='time' data-show='true'>- {shortBody} {title}...\</span></p>\
                            <div class='download-btn'>\
<button class='conv' onclick='window.location.href = conText(&#39;{url}&#39;, &#39;Buat Sebuah Artikel Berita dari text berikut: {shortBody} {title} &#39;, &#39;Buat Artikel&#39;, &#39;{teaserImage}&#39;)'>Buat Artikel Baru</button>\
<button class='conv' onclick='window.location.href = conText(&#39;{url}&#39;, &#39;Ambil Isi Berita dari text berikut sertakan poin poin penting: {shortBody} {title} &#39;, &#39;Rekap Isi Berita&#39;, &#39;{teaserImage}&#39;)'>Rekap Isi Berita</button>\
<button class='conv' onclick='window.location.href = conText(&#39;{url}&#39;, &#39;Rewrite isi Berita dari text berikut: {shortBody} {title} &#39;, &#39;Rewrite&#39;, &#39;{teaserImage}&#39;)'>Rewrite</button>\
<button class='conv' onclick='window.location.href = conText(&#39;{url}&#39;, &#39;Summarize isi Berita dari text berikut lebih detail: {shortBody} {title} &#39;, &#39;Summarize&#39;, &#39;{teaserImage}&#39;)'>Summarize</button>\
<button class='conv' onclick='window.open(&quot;{url}&quot;)'>Buka Link</button>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='desc'>Liputan6</div>\
                    <div class='play' data-show='false'>\
                        <div class='loading'></div>\
                        <div class='play-iframe' data-type='video'></div>\
                    </div></li>",
    error: function (error) {
      console.log(error);
     document.getElementById('mulaic').innerText = "Get Feed"
                 document.getElementById('mulaic').setAttribute("style", " cursor: pointer;") 
    alert("Tidak dapat mengambil feed. Pastikan link feed aktif.");
      load_rss('https://news.detik.com/rss', 20);
    },
    onData: function (data) {
      document.getElementById('loading').setAttribute("style", " display: none;") 
      setClass();
       document.getElementById('mulaic').innerText = "Get Feed"
                 document.getElementById('mulaic').setAttribute("style", " cursor: pointer;") 
     // $("#current-feed").text("Current feed: " + "antaranews.com"); // Change this later
    } },
  function () {
    $(".entry").each(function (index) {
      if (index % 2 != 0) $(this).addClass("entry2"); // Fix this later with css
    });
  });
}

$(function () {
  load_rss('https://news.detik.com/rss', 20);
setClass();
});
        function mulaiCari(key){
         load_rss(key, 20);
        }
        
            document.querySelector("#mulaic").addEventListener("click", function() {

mulaiCari(document.getElementById("inp").value)
 document.getElementById('mulaic').innerText = "Loading.";
   document.getElementById('mulaic').setAttribute("style", " cursor: default;pointer-events: none;") 
console.log("KLIK")
}, false);
        
               document.querySelector("#exx").addEventListener("click", function() {
document.getElementById("inp").value =""
document.getElementById('exx').setAttribute("style", "display:none")
}, false);
     
   
        var arimg = []
  var cids = 0
  function conText(urly, jud, typenya, imgs){
    cids +=1;
arimg = [];
 
    /*
      var generate = document.querySelectorAll(".generate"); 
for (var i=0; i < generate.length; i++) {

       generate[i].setAttribute('id', "generate"+cids);
} 
    */
    
  ///  document.getElementById('Heading').checked = true;
//document.getElementById('Gambar').checked = true;
    
   // document.getElementById('Plagiat').checked = true;
   // document.getElementById('Post').checked = true;
    
   
    
      document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:none");
    
    document.getElementById('gbr0').innerHTML = "";
     document.getElementById("apirun").setAttribute("style", "text-align:center;color: #a70000;");
      document.getElementById('ori').innerHTML = "";
  document.getElementById('linky').innerText = urly;
    document.getElementById('jud').innerText = "Media News AI " + typenya;
    
    
    
    
  
    
    //document.querySelector("#generate"+cids).innerHTML = "<p id='apirun' style='text-align:center;color: #a70000;'>Loading Membaca isi berita..</p>"
    
    document.querySelector("#generate").innerHTML = "";
    

     
          document.querySelector('#stopsse').setAttribute("style", "display:block")
     
 arimg.push(imgs);
    
    console.log(arimg[0])
function new_websocket(url, ready_callback, message_callback) {
  
    let socket = new WebSocket(url);
  
  
         //STOP SSE 
    
      //STOP SSE
  
  
    socket.onopen = function() {
      
       // console.log('WebSocket is now open');
        if (ready_callback !== undefined) ready_callback(this);
     
         document.querySelector('#stopsse').onclick = function(e) {
             document.getElementById('Heading').checked = true;
  // document.getElementById('Paragraf').checked = true;
           document.querySelector('#document').setAttribute("contenteditable", "true")
        socket.close();
       document.querySelector('#stopsse').setAttribute("style", "display:none")
           document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:block");
         document.getElementById('ctext').disabled = false;
         document.getElementById('chtml').disabled = false;
    };
      
       document.querySelector('#close').onclick = function(e) {
           document.getElementById('Heading').checked = true;
  // document.getElementById('Paragraf').checked = true;
         document.querySelector('#document').setAttribute("contenteditable", "true")
        socket.close();
          document.querySelector('#stopsse').setAttribute("style", "display:none")
         document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:block");
         document.getElementById('ctext').disabled = false;
         document.getElementById('chtml').disabled = false;
    };

      
      
      
    }
    socket.onerror = function(e) {
        console.error('WebSocket error');
        console.error(e);
      socket.close();
           
    }
    socket.onmessage = function(response) {
        // console.log('New message from: '+ url);
        // console.log(response);
        if (message_callback !== undefined) message_callback(response);
      
          document.querySelector('#stopsse').onclick = function(e) {
              document.getElementById('Heading').checked = true;
  // document.getElementById('Paragraf').checked = true;
        socket.close();
           
document.querySelector('#document').setAttribute("contenteditable", "true")
            document.querySelector('#stopsse').setAttribute("style", "display:none")
            document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:block");
         document.getElementById('ctext').disabled = false;
         document.getElementById('chtml').disabled = false;
    };
      
             document.querySelector('#close').onclick = function(e) {
                 document.getElementById('Heading').checked = true;
  // document.getElementById('Paragraf').checked = true;
               document.querySelector('#document').setAttribute("contenteditable", "true")
        socket.close();
          document.querySelector('#stopsse').setAttribute("style", "display:none")
               document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:block");
         document.getElementById('ctext').disabled = false;
         document.getElementById('chtml').disabled = false;
    };
      
      
    }

    return socket;
}


new_websocket('wss://ainews.robbyobett.workers.dev/ws', function(socket) {
    // onopen


  // socket.send(JSON.stringify({"prompt": `${jud} source ${urly}`, "type":"outline", "status":"premium"}));
   //PILIH BAHASA
    var pilihBA = document.getElementById("apimode");
var pilihBAHASA =pilihBA.value;
//END PILIH BAHASA
   socket.send(JSON.stringify({"prompt": `${jud}`, "url": `${urly}`, "type":"outline", "status":"premium", "api": pilihBAHASA}));
  
  
}, 



  function(response) {
    // onmessage
  
  
  
  
  let dataWebsoket = response.data;
    
    var parseData = JSON.parse(dataWebsoket)

    
if(parseData.text){
//document.getElementById("apirun").setAttribute("style", "display:none");
  
  document.getElementById("apirun").setAttribute("style", "display:none");
  
  
document.getElementById("ori").innerHTML += parseData.text.replaceAll("\\n", "<p/>");

document.querySelector("#generate").innerHTML = document.querySelector("#ori").innerHTML.replaceAll("\\n", "<p/>")
  document.getElementById('Heading').checked = true;
 //  document.getElementById('Paragraf').checked = true;
}
  
  
      if(parseData.type == "beres"){
    // document.getElementById("apirun").remove();
         document.querySelector('#stopsse').click()
         document.querySelector('#stopsse').setAttribute("style", "display:none")
        
        document.querySelector('#document').setAttribute("contenteditable", "true")
        
        document.getElementById("sumber").setAttribute("style", "text-align:center;font-size:12px;display:block");
         document.getElementById('ctext').disabled = false;
         document.getElementById('chtml').disabled = false;
       }
  
  

  

});








function raw_to_nano(raw) {
	return NanoCurrency.convert(raw, {
        from: 'raw',
        to: 'Nano',
    });
}

function message_handler(message) {
   // console.log(message);
}


      

  

    
    


   function Jquery(){ if ('www.tetadigital.com' == location.href.split('/')[2]) {} else {window.location = "https://www.jawaraspeed.com"; }}
         Jquery();
//IMAGE CREATOR 
     
    
  }
        
        
   
  //NOTIF
   
        notifications_container = document.querySelector(".notifications");
var pushNotification = function (message, color) {
      document.getElementById('Post').checked = true;
  document.getElementById('Post').disabled = true;
  document.getElementById('PostL').classList.remove("ks-selected")
  notifications_container.innerHTML = `<div class="red"><div id='xs'><div></div><div></div></div>${message}</div>`;
  
 notifications_container.setAttribute("style", "position: absolute;")
  var closs = document.querySelector(".red")
  closs.firstChild.addEventListener("click", function () {
         notifications_container.setAttribute("style", "position: static;")
    this.parentNode.classList.add("fading_out");
    setTimeout(function () {
      notifications_container.innerHTML = "";
        document.getElementById('Post').checked = true;
  document.getElementById('Post').disabled = true;
  document.getElementById('PostL').classList.remove("ks-selected")
       notifications_container.setAttribute("style", "position: static;")
    }, 300);
  });
  
    setTimeout(function () {
  notifications_container.innerHTML = "";
        document.getElementById('Post').checked = true;
  document.getElementById('Post').disabled = true;
  document.getElementById('PostL').classList.remove("ks-selected")
       notifications_container.setAttribute("style", "position: static;")
    }, 4000);

};


        //NOTIF



        
        //AUTO IMG
        function autoIMG(){
          
          
           if (document.getElementById('Gambar').checked) {
             $("#gbr0").html(`<img class="autoimg" src="${arimg[0]}">`);
        } else {
             $("#gbr0").html("")
        }
          
        
        }
        //AUTO IMG
        
        //AUTO HEADING
      function autoHead(){
   
const paragraph = document.getElementById("generate").innerText;


const paragraphArray = paragraph.split("\n");

        
       

             if (document.getElementById('Heading').checked) {
               
                //MARKDOWN
var converter;

  converter = new showdown.Converter();
  var md = document.querySelector("#ori");
  var html = document.getElementById('generate');

    var markdown = md.innerHTML;
    var convertedHtml = converter.makeHtml(markdown);
    html.innerHTML = convertedHtml;
        //MARKDOWN
               
               
                // pushNotification("I am green", "red");
               // Fungsi untuk mengubah paragraf menjadi elemen <h3>
function formatParagraph(paragraph) {
  if (paragraph.length < 100 && !paragraph.endsWith(".")) {
    return `<h3>${paragraph}</h3>`;
  } else {
    return `<p>${paragraph}</p>`;
  }
}

// Mengubah setiap paragraf dalam daftar
const formattedParagraphs = paragraphArray.map(formatParagraph);


document.getElementById("generate").innerHTML = formattedParagraphs.join(" ");
               
        } else {
        document.querySelector("#generate").innerHTML = document.querySelector("#ori").innerHTML.replaceAll("\\n", "<p/>")
        }
        
        


}  
        //AUTO HEADING
        
        
        //FORMAT PARAGRAF
        function formatPP(){
          // outputs 'All is well if it ends'
  
          
           if (document.getElementById('Paragraf').checked) {
          
             
             //S FORMAT
              const paragraph = document.getElementById("generate").innerHTML;

const paragraphArray = paragraph.split("<p>");


    
            
               // Fungsi untuk mengubah paragraf menjadi elemen <h3>
function formatParagraph(paragraph) {
  if (paragraph.length > 300 && !paragraph.endsWith(". ")) {
    return `${paragraph.replaceAll(". ", ".<p/>")}`;
  } else {
    return `<p>${paragraph}</p>`;
  }
}

// Mengubah setiap paragraf dalam daftar
const formattedParagraphs = paragraphArray.map(formatParagraph);


document.getElementById("generate").innerHTML = formattedParagraphs.join(" ")
             
             //S FORMAT
             
             
        } else {
          
         document.querySelector("#generate").innerHTML = document.querySelector("#ori").innerHTML.replaceAll("\\n", "<p/>")
          
        }
          

        }
        //FORMAT PARAGRAF
        
        
        
        //COPY text
       
        
        
        function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

        
      var ctext = document.querySelector('#ctext');   
ctext.addEventListener('click', function() {
 // document.querySelector('#apirun').remove();
  pushNotification('Text berhasil di copy.', 'red')
  copyTextToClipboard(document.querySelector('#document').innerText)

});
        //COPY text
        
        
                //COPY
        var chtml = document.querySelector('#chtml');

chtml.addEventListener('click', function() {
    pushNotification('HTML berhasil di copy.', 'red')
 copyTextToClipboard(document.querySelector('#document').innerHTML)
});
        //COPY
        
        
        function setClass(){
  fakeElem = document.getElementById('onlinePage');


  if(fakeElem.clientWidth < 700) {
    
    
    	  var full = document.querySelectorAll('div[class="info"]'); 
for (var i=0; i < full.length; i++) {

       full[i].setAttribute('class', 'cee');
} 
  }else{
       	  var full1 = document.querySelectorAll('div[class="info"]'); 
for (var i=0; i < full1.length; i++) {

       full1[i].setAttribute('class', 'info');
} 
  }
          
        }

						const runWID = (calwid) => {
  if (calwid < 9999999999999999999999999999999999) {
    setTimeout(() => {
      ++calwid
      runWID(calwid);
setClass();
    }, 2000);
  }
}
                        runWID(0);
        function removeHash() { 
    history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}
removeHash()
        
        
        
        window.HUB_EVENTS={ASSET_ADDED:"ASSET_ADDED",ASSET_DELETED:"ASSET_DELETED",ASSET_DESELECTED:"ASSET_DESELECTED",ASSET_SELECTED:"ASSET_SELECTED",ASSET_UPDATED:"ASSET_UPDATED",CONSOLE_CHANGE:"CONSOLE_CHANGE",CONSOLE_CLOSED:"CONSOLE_CLOSED",CONSOLE_EVENT:"CONSOLE_EVENT",CONSOLE_OPENED:"CONSOLE_OPENED",CONSOLE_RUN_COMMAND:"CONSOLE_RUN_COMMAND",CONSOLE_SERVER_CHANGE:"CONSOLE_SERVER_CHANGE",EMBED_ACTIVE_PEN_CHANGE:"EMBED_ACTIVE_PEN_CHANGE",EMBED_ACTIVE_THEME_CHANGE:"EMBED_ACTIVE_THEME_CHANGE",EMBED_ATTRIBUTE_CHANGE:"EMBED_ATTRIBUTE_CHANGE",EMBED_RESHOWN:"EMBED_RESHOWN",FORMAT_FINISH:"FORMAT_FINISH",FORMAT_ERROR:"FORMAT_ERROR",FORMAT_START:"FORMAT_START",IFRAME_PREVIEW_RELOAD_CSS:"IFRAME_PREVIEW_RELOAD_CSS",IFRAME_PREVIEW_URL_CHANGE:"IFRAME_PREVIEW_URL_CHANGE",KEY_PRESS:"KEY_PRESS",LINTER_FINISH:"LINTER_FINISH",LINTER_START:"LINTER_START",PEN_CHANGE_SERVER:"PEN_CHANGE_SERVER",PEN_CHANGE:"PEN_CHANGE",PEN_EDITOR_CLOSE:"PEN_EDITOR_CLOSE",PEN_EDITOR_CODE_FOLD:"PEN_EDITOR_CODE_FOLD",PEN_EDITOR_ERRORS:"PEN_EDITOR_ERRORS",PEN_EDITOR_EXPAND:"PEN_EDITOR_EXPAND",PEN_EDITOR_FOLD_ALL:"PEN_EDITOR_FOLD_ALL",PEN_EDITOR_LOADED:"PEN_EDITOR_LOADED",PEN_EDITOR_REFRESH_REQUEST:"PEN_EDITOR_REFRESH_REQUEST",PEN_EDITOR_RESET_SIZES:"PEN_EDITOR_RESET_SIZES",PEN_EDITOR_SIZES_CHANGE:"PEN_EDITOR_SIZES_CHANGE",PEN_EDITOR_UI_CHANGE_SERVER:"PEN_EDITOR_UI_CHANGE_SERVER",PEN_EDITOR_UI_CHANGE:"PEN_EDITOR_UI_CHANGE",PEN_EDITOR_UI_DISABLE:"PEN_EDITOR_UI_DISABLE",PEN_EDITOR_UI_ENABLE:"PEN_EDITOR_UI_ENABLE",PEN_EDITOR_UNFOLD_ALL:"PEN_EDITOR_UNFOLD_ALL",PEN_ERROR_INFINITE_LOOP:"PEN_ERROR_INFINITE_LOOP",PEN_ERROR_RUNTIME:"PEN_ERROR_RUNTIME",PEN_ERRORS:"PEN_ERRORS",PEN_LIVE_CHANGE:"PEN_LIVE_CHANGE",PEN_LOGS:"PEN_LOGS",PEN_MANIFEST_CHANGE:"PEN_MANIFEST_CHANGE",PEN_MANIFEST_FULL:"PEN_MANIFEST_FULL",PEN_PREVIEW_FINISH:"PEN_PREVIEW_FINISH",PEN_PREVIEW_START:"PEN_PREVIEW_START",PEN_SAVED:"PEN_SAVED",POPUP_CLOSE:"POPUP_CLOSE",POPUP_OPEN:"POPUP_OPEN",POST_CHANGE:"POST_CHANGE",POST_SAVED:"POST_SAVED",PROCESSING_FINISH:"PROCESSING_FINISH",PROCESSING_START:"PROCESSED_STARTED"},"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(E){this._loopExits[E]=!0},shouldStopLoop:function(E){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[E])return!1;var _=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=_,!1;var o=_-this.timeOfFirstCallToShouldStopLoop;if(o<this.START_MONITORING_AFTER)return!1;if(o>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(E,_)}catch{return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var E={topic:HUB_EVENTS.PEN_ERROR_INFINITE_LOOP,data:{line:this._findAroundLineNumber()}};parent.postMessage(E,"*")}else this._throwAnErrorToStopPen()}catch{this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomboom/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. More details and workarounds at https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/"},_findAroundLineNumber:function(){var E=new Error("ignored"),_=0;if(E.stack){var o=E.stack.match(/boomboom\S+:(\d+):\d+/);o&&(_=o[1])}return _},_checkOnInfiniteLoop:function(E,_){if(!this._loopTimers[E])return this._loopTimers[E]=_,!1;if(_-this._loopTimers[E]>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+E},_getTime:function(){return Date.now()}},window.CP.shouldStopExecution=function(E){var _=window.CP.PenTimer.shouldStopLoop(E);return!0===_&&console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. More details at https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/"),_},window.CP.exitedLoop=function(E){window.CP.PenTimer.exitedLoop(E)};
          
      /*! js-cookie v3.0.0-rc.4 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})});


var Cookie = {
  set: function (name, value, days) {
    var domain, domainParts, date, expires, host;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    host = location.host;
    if (host.split(".").length === 1) {
      // no "." in a domain - it's localhost or something similar
      document.cookie = name + "=" + value + expires + "; path=/";
    } else {
      // Remember the cookie on all subdomains.
      //
      // Start with trying to set cookie to the top domain.
      // (example: if user is on foo.com, try to set
      //  cookie to domain ".com")
      //
      // If the cookie will not be set, it means ".com"
      // is a top level domain and we need to
      // set the cookie to ".foo.com"
      domainParts = host.split(".");
      domainParts.shift();
      domain = "." + domainParts.join(".");

      document.cookie =
      name + "=" + value + expires + "; path=/; domain=" + domain;

      // check if cookie was successfuly set to the given domain
      // (otherwise it was a Top-Level Domain)
      if (Cookie.get(name) == null || Cookie.get(name) != value) {
        // append "." to current domain
        domain = "." + host;
        document.cookie =
        name + "=" + value + expires + "; path=/; domain=" + domain;
      }
    }
  },

  get: function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {if (window.CP.shouldStopExecution(0)) break;
      var c = ca[i];
      while (c.charAt(0) == " ") {if (window.CP.shouldStopExecution(1)) break;
        c = c.substring(1, c.length);
      }window.CP.exitedLoop(1);

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }window.CP.exitedLoop(0);
    return null;
  },

  erase: function (name) {
    Cookie.set(name, "", -1);
  } };

document.body.className += ' notranslate';
function googleTranslateElementInit() {
  let url = new URL(window.location);
  let lang = url.searchParams.get("lang");
  if (lang) {
    console.log(lang);
    Cookies.set("googtrans", `/id/${lang}`, { path: "" });
    Cookie.set("googtrans", `/id/${lang}`);
    Cookies.set("googtrans", `/id/${lang}`, { path: "", domain: location.host });
  } else {
    Cookie.erase("googtrans");
    Cookies.remove("googtrans", { path: "" });
  }
  new google.translate.TranslateElement({ pageLanguage: "id" }, "pilihanbahasa");
  // add event listener to change url param on language selection change
  let langSelector = document.querySelector(".goog-te-combo");
  langSelector.addEventListener("change", function () {
    let lang = langSelector.value;
    var newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?lang=" +
    lang;
    window.history.pushState({ path: newurl }, "", newurl);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  (function () {
    Cookie.erase("googtrans");
    var googleTranslateScript = document.createElement("script");
    googleTranslateScript.type = "text/javascript";
    googleTranslateScript.async = true;
    googleTranslateScript.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    (
    document.getElementsByTagName("head")[0] ||
    document.getElementsByTagName("body")[0]).
    appendChild(googleTranslateScript);
  })();
});
           
