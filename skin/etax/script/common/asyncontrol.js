/*!
 * AscynDataLoader.js v1.0.0
 * 
 * Copyright 2011, Foresee Ltd
 * 
 * Includes jQuery.js
 * 
 * @author  wangbozheng
 * 
 * 椤甸潰鏁版嵁寮傛鍔犺浇 
 *
 * Date: 2012-1-07
 */
  // 鍙傝€僯query 浣跨敤闂寘鏂瑰紡
(function( window, undefined ) {
	var context ='';
	if (typeof(webContext) ==='undefined' || webContext === 'null' || webContext === null || webContext === ""){
		context =  '/etax';
	}else {
		context =webContext;
	};
  var document = window.document;
  var fsAsynDataLoader = (function(){
    // 瀹氫箟鏈湴鍙橀噺
    var fsAsynDataLoader = function (param){
      return new fsAsynDataLoader.fn.init(param);
    };

  	fsAsynDataLoader.fn = fsAsynDataLoader.prototype = {
  	  constructor: fsAsynDataLoader,
  	 
  	  init: function (param){},

  	  isNull: function(param){
	  	 if (param === null || param === "null" || param === undefined || param === "undefined"){
	  	  	 return true;
	  	  } 
	  	  return false;
  	  },
  	  
  	  isValidString: function(str){
  		 if ((!fsAsynDataLoader.fn.isNull(str)) && (str != "")){
  			 return true;
  		 } 
  		 return false;
  	  }, 
  	  // 鏁版嵁濉厖鍒拌〃鏍间腑
  	  fillTable: function(tableElement,datas,html,showReduncyRow){
  		  // 娓呯悊鏃ф暟鎹�
  		  fsAsynDataLoader.fn.clearTable(tableElement);
  		  
  		  var jqElement =  $(tableElement);
	      var rowTemplate =  jqElement.find("#rowTemplate");
	      rowTemplate.removeAttr("id");
	      var intervalClass = rowTemplate.attr("intervalClass");
	      var maxItem = jqElement.attr("maxItem");
	      var cloneRow  ;
	      var dataContainer = rowTemplate.parent();
    	 
	      // 鍥炶皟鍑芥暟濡傛灉鐩存帴娓叉煋浜嗘暟鎹�,鎶婃覆鏌撲簡html鏁版嵁浼犺繃鏉�
  		  if (fsAsynDataLoader.fn.isValidString(html)) {
  	    	 rowTemplate.remove();
  	    	 dataContainer.append($(html));
  	         return ;
  	      }
  	      
  	      var isFirstRowClass = true;
	      var count = 0;   
    	  $.each(datas,function(index,value){
    		 if (maxItem > 0){
    			//瓒呰繃璁惧畾鏈€澶ц 涓嶈繘琛屽鐞�
    			if (count >= maxItem){ 
    				return;
    			};
    			count++;
    		 } 
    		cloneRow = rowTemplate.clone();
    		cloneRow.attr("dynamicRow",index);
    		cloneRow.attr("reduncyRow",'false');
    		cloneRow.show();
    		 $.each(value,function(name,subValue){
    	    	var j = cloneRow.find("#" + name);
    	    	if (j.length >= 1){
    	    	  var targetAttr = j.attr("targetAttr"); 
    	    	  if (fsAsynDataLoader.fn.isNull(targetAttr)) {
    	    		 j.text(subValue);
    	    	  }  else {
    	    		  // 鏈夎瀹氱洰鏍囧睘鎬э紝鎶婂€煎啓杩涘幓鐩爣灞炴€т腑
    	    	     j.attr(targetAttr,subValue);
    	    	  };
    	    	};
    		 });
    		 // 鏄惁鏈夊簭鍙峰垪
    		 if (cloneRow.find("#columnOrder").length > 0){
    			 cloneRow.find("#orderNumber").text(index + 1);	
    		 }
    		//  澶勭悊琛ㄦ牸琛屾牱寮忎氦鏇垮嚭鐜扮殑鎯呭喌 
    		intervalClasses = cloneRow.find("[intervalClass]");
    		intervalClasses.each(function(){
    		  var j = $(this);
    		  if (isFirstRowClass){
    			j.removeAttr("intervalClass");
    		  }else{
    			j.removeClass("*");
    			j.addClass(j.attr("intervalClass")); 
    			j.removeAttr("intervalClass");
    		  } 
    		});
    		
    		isFirstRowClass = !isFirstRowClass;
    		cloneRow.appendTo(dataContainer);
    	  });
    	
    	 // 涓嶅鏈€澶ц鏁帮紝绌鸿琛ヨ冻锛涜В鍐虫暟鎹涓嶅锛岀牬鍧忛〉闈㈠竷灞€鐨勯棶棰�
    	for (var i = 0 ;i < (maxItem -count) ;i++){
    		cloneRow = rowTemplate.clone();
    		cloneRow.attr("dynamicRow",i);
    		cloneRow.attr("reduncyRow",'true');
    		cloneRow.show();
    		if (!showReduncyRow){
    		  cloneRow[0].style.visibility ="hidden";
    		}
    		dataContainer.append(cloneRow);
    	}
    	
    	rowTemplate.attr("id","rowTemplate");
    	rowTemplate.hide();  
    	//rowTemplate.remove();  		  
  	  },
  	  //  鏄剧ず鏁版嵁鍔犺浇鏃讹紝琛ㄦ牸涓畾涔夌殑绛夊緟鍥剧墖
  	  showTableWaitingImg: function(tableElement){
  		  tableElement.style.display = "none";
  		  var jq = $(tableElement);
	
	      var loadingImgSrc = jq.attr("loadingImgSrc");
	      var loadingHint = jq.attr("loadingHint");
	      var loadingImgDivHeight = jq.attr("loadingImgDivHeight");
	      
	      if (!fsAsynDataLoader.fn.isValidString(loadingImgSrc)) {
	          if (fsAsynDataLoader.fn.isNull(context)) {
	        	  context = "/etax";
	          };
	    	  loadingImgSrc = context + "/style/images-common/waiting/loading.gif";
	      }
	      if (!fsAsynDataLoader.fn.isValidString(loadingHint)) {
	    	  loadingHint = "姝ｅ湪鍔犺浇鏁版嵁,璇锋偍绋嶇瓑...";
	      }
	      
	      if (!fsAsynDataLoader.fn.isValidString(loadingImgDivHeight)) {
	    	  loadingImgDivHeight = "100%";
	      }
	      var loaddingDiv = $('<div id = "loadingDiv" style = "text-align:center; height:'+loadingImgDivHeight+'; background-image: url('+loadingImgSrc+
	    		              ');background-position: center;background-repeat: no-repeat;" >'+
	                         '<div id = "hintDiv" style="position: relative; top:65%;"><span id = "hint" style="">'+loadingHint+'</span></div></div>'); 
	      loaddingDiv.prependTo(jq.parent());  
	      
	      return loaddingDiv;
  	  },
  	  // 鏁版嵁鍔犺浇鍚庯紝鏄剧ず涓€浜涗俊鎭�
  	  showMsgAfterLoadData: function(loaddingDiv,Msg,errorMsgTop){
 		 loaddingDiv.css("background-image","none");
	     loaddingDiv.find("#hintDiv").css("top",errorMsgTop);
		 loaddingDiv.find("#hint").text(Msg);
  	  },
  	  // 娓呯悊琛ㄥ崟
  	  clearTable: function(tableElement){
  		 var jElement = $(tableElement);
  		 var elements = jElement.find('*[dynamicRow]');  
  		 elements.each(function (index){
  			 var jq = $(this); 
  			 jq.remove();
  		 });
  	  },
  	  //  娓呴櫎鎺夊姩鎬佸鍔犵殑绛夊緟鐨勫姞杞藉眰
  	  clearLoadingDiv: function(tableElement,loaddingDiv){
   		 tableElement.style.display = "block";
  		  var loading = loaddingDiv || "loading";
  		  if (loading != "loading"){
	        loaddingDiv.css("display","none");
	        loaddingDiv.remove();
	      } else {
	    	 var lj =  $("#"+ loading);
	    	 if (lj.length > 0) {
	    		 lj.css("display","none");
	    		 lj.remove();
	    	 } 
	      } 
  	  },
  	  // xml杞崲鎴愬姞杞借〃鏍奸渶瑕佺殑json鏍煎紡.
  	  xmlToJson: function(xml,selector){
  		  var jxml = $(xml);
	      var json = new Array();
	      var sel = sel || '*';
	      jxml.find(selector).each(function(index){
	    	  var jsonElemnt = {};
	    	  $(this).find('*').each(function(index){
	    		   jsonElemnt[$(this).context.nodeName] = $(this).text();  
	    	     });
	    	  json.push(jsonElemnt);
   	       });
   	       json.push(jsonElemnt);  
   	       return json;
  	  },
  	  // 寮傛鏂瑰紡锛屾妸鏁版嵁鍔犺浇鍒拌〃鏍间腑
  	  asynLoadDataToTable: function(reqParam,tableId){
  		  var jq = $("#" + tableId);
  		  var loaddingDiv = fsAsynDataLoader.fn.showTableWaitingImg(jq[0]);
  	      var timeout = jq.attr("timeout");
  	      var timeoutFlag = false;
  	    
  	      // 瓒呮椂瑙﹀彂鐨勫鐞嗗嚱鏁�
  	      var timeoutHandler = function(){
  	  	       timeoutFlag = true;
  		       fsAsynDataLoader.fn.showMsgAfterLoadData(loaddingDiv,"鏁版嵁鍔犺浇瓒呮椂锛�","50%");  	    	  
  	          } ;
  	     
  	      var timeoutHandle =  window.setTimeout(timeoutHandler, timeout);
  	      var pageCallback = reqParam.callBack;
  	      
  	      // 寮傛璁块棶鍥炶皟鍑芥暟
  	 	  function callback(status, msg, dataType, datas) {
  	 	  	  window.clearTimeout(timeoutHandle); 
  	 	  	  // 椤甸潰鏈夋満浼氬鐞嗗紓姝ヨ繑鍥炵殑鏁版嵁
  	 	  	  datas = pageCallback(status, msg, dataType, datas);
  	   	      if (timeoutFlag) {
  		  	  // 宸茬粡瓒呮椂锛屾棤璁烘暟鎹幏鍙栨垚鍔熸槸鍚︼紝涓嶅啀鍔犺浇鏁版嵁鍒伴〉闈�
  		  	   return;
  		      }
  		      if (status != "0000"){
  			    // 璇锋眰澶辫触
  			    fsAsynDataLoader.fn.showMsgAfterLoadData(loaddingDiv,msg,"50%");
  			    return;
  		      }
  		      fsAsynDataLoader.fn.clearLoadingDiv(jq[0],loaddingDiv);
  		      fsAsynDataLoader.fn.fillTable(jq[0],datas,"");
  		}
  	 	reqParam.callBack = callback;
  	 	//寮傛璇锋眰鏁版嵁
  	    fsAsynDataLoader.fn.asynRequestData(reqParam);	  		  
  	  },
  	  // 鎵弿椤甸潰椤甸潰闇€瑕佸紓姝ユ暟鎹姞杞界殑鍏冪礌,骞跺姞杞芥暟鎹�
  	  scanAsyncElement: function(cssSelector){
  		  var elements = $('*[ascynDataLoad="true"]'); 
     	  // 閬嶅巻
    	  elements.each(function (index){
			  var jq = $(this);
    		  if (this.tagName === "TABLE"){
	  				// 闅愯棌鑷韩	  
				  this.style.display = "none";
				  var element = this;
			      //var elementName = this.tagName;  
			
			      var maxItem = jq.attr("maxItem");
			      var timeout = jq.attr("timeout");
			      var loadDataProcedure = jq.attr("loadDataProcedure");
			      var rowTemplate =  jq.find("#rowTemplate");
			      
			      //  鏄剧ず婊氬姩鍥剧墖
			      var loaddingDiv = fsAsynDataLoader.fn.showTableWaitingImg(element);
			      
			      var timeoutFlag = false;
                  
			      // 瓒呮椂瑙﹀彂鐨勫鐞嗗嚱鏁�
			      var timeoutHandler = function(){
			    	    timeoutFlag = true;
				        fsAsynDataLoader.fn.showMsgAfterLoadData(loaddingDiv,"鏁版嵁鍔犺浇瓒呮椂锛�","50%");  	    	  
			          }  ;
			       
			      var timeoutHandle =  window.setTimeout(timeoutHandler, timeout);
			        	      
			      //璇锋眰鏁版嵁鎴愬姛鍚庣殑锛屽洖璋冨嚱鏁帮紱浼犲洖璇锋眰鐘舵€佸拰璇锋眰鏁版嵁
			      //requestStatus锛氳姹傜姸鎬�,html锛氭覆鏌撳悗鐨刪tml,datas锛氳繑鍥炲師濮嬫暟鎹�
			      var afterLoadData = function (requestStatus,html,datas){
			    	  window.clearTimeout(timeoutHandle); 
			    	  if (timeoutFlag) {
			    		  // 宸茬粡瓒呮椂锛屾棤璁烘暟鎹幏鍙栨垚鍔熸槸鍚︼紝涓嶅啀鍔犺浇鏁版嵁鍒伴〉闈�
			    		  return;
			    	  }
			    	  if (requestStatus != "0000"){
			    		  // 璇锋眰澶辫触
			    		 fsAsynDataLoader.fn.showMsgAfterLoadData(loaddingDiv,html,"50%");
			    		 return;
			    	  }
			    	    	    	  
			    	  fsAsynDataLoader.fn.clearLoadingDiv(element,loaddingDiv);
				      fsAsynDataLoader.fn.fillTable(element,datas,html);
			      };
	    		  
			      // 璋冪敤寮傛鑾峰彇鏁版嵁杩囩▼  	      
			      loadDataProcedure = eval("(" +  loadDataProcedure  + ")");
			      loadDataProcedure(rowTemplate, maxItem, afterLoadData); 
    		  } else{ 
			     var loadDataProcedure = jq.attr("loadDataProcedure");
			     loadDataProcedure = eval("(" +  loadDataProcedure  + ")");
			     loadDataProcedure(this);
    		  }
  		}); 
  	  },
  	  // 寮傛璇锋眰鏁版嵁
  	  //dataType:锛坸ml, json, script, or text锛� 
  	  //ajaxType:(GET,POST)
  	  //qAjaxType:(GET,POST)
  	  // reqParam(url,data,dataType,timeout,callBack,qurl,qdataType,queryData,ajaxType,qAjaxType)
  	  asynRequestData: function(reqParam){
  		 var id;
  		 var qIntervalTime;
  		 var timeoutFlag = false;
	      // 璇锋眰宸茬粡瀹屾垚
	     var requestCompleted = false;
  		 var queryHandle = null;
   		 var qdata = reqParam.queryData || {};
   		 var url = reqParam.url || ""; 
   		 var timeout = reqParam.timeout || 10000*1000*20;
   		 var dataType = reqParam.dataType || "xml";
   		 var qurl = reqParam.qurl || reqParam.url;
   		 var data = reqParam.data || {};
   		 var qdataType = reqParam.qdataType || "xml";
   		 var ajaxType = reqParam.ajaxType || "POST" ;
   		 var qAjaxType = reqParam.qAjaxType || "POST" ;
   		 //var qdt = qdataType || "xml";
   		 var callBack = reqParam.callBack;
   		 var isShowErrorInfo = reqParam.isShowErrorInfo;
   		 if (fsAsynDataLoader.fn.isNull(isShowErrorInfo)) {
   			isShowErrorInfo = true;
   		 }
   		 
   		 var queryTimeout = 0;
   		 // 鏌ヨ鐘舵€佸璞�
   		 var queryStateObj = null;
   		 
   		 // 澶勭悊寮傚父
   		 var handleTimeOut = function(status,eMsg,DetailMsg){
    		   var loadingDiv = $("#loading");
    		   var dMsg = DetailMsg || "";
    		   if (loadingDiv.length > 0){
    			  loadingDiv.css('background-image','none');
    			  loadingDiv.css('font-size','10pt');
    			  loadingDiv.css('font-weight','bold');
    			  loadingDiv.css('color','red');
    			  loadingDiv.find("#hintDiv").css('top','45%');
    			  loadingDiv.find('#hint').text(eMsg);
    			  var timeoutAction = $("#timeoutAction");
    			  if (timeoutAction.length <= 0){
    				 loadingDiv.append($('<div id = "timeoutAction"><a style="color: black" href = "#" onclick="$.unblockUI();">鍏抽棴</a></div>'));
    			  }
                  if (dMsg !== ""){
                	  loadingDiv.css('height','70px');
                	  loadingDiv.parent().css("top","10%");
                	  loadingDiv.parent().css("height","500px");
                	  loadingDiv.parent().css("width","68%");
                	  loadingDiv.parent().css("left","16%");
                	  //loadingDiv.parent().append($('<div><textarea rows="26" cols="98" value="' + dMsg + '"></textarea></div>'));
                	  loadingDiv.parent().append($('<div><iframe id="msgFrame" style="width: 100%;height: 450px; display: none" frameborder="0" name="msgFrame" scrolling="auto"></iframe></div>'));
                	  var msgFRame = document.getElementById('msgFrame');
                	  msgFRame.contentWindow.document.write(DetailMsg);
                	  msgFRame.style.display = "block";
                  }
    		    }
    		  };
    		  
    	  var handleException = reqParam.exceptionCallback || function(status,eMsg,DetailMsg){
    			  var errorMessge = eMsg;
    			  if (fsAsynDataLoader.fn.isValidString(DetailMsg)) {
    				  errorMessge = DetailMsg;
    			  }

    			  var wh = 300;
    			  var ht = 185;
    			  // 澶ф浼扮畻鎻愮ず妗嗙殑澶у皬
    			  if (errorMessge.length > 60){
    				  var m = 220 * 65 / 60 * errorMessge.length;
    				  wh = 100 + Math.sqrt(m*5/3);
    				  ht = 50 + Math.sqrt(m*3/5);
    			  } 
    			  //fsAsynDataLoader.fn.unBlockPage();
    			  $("#loading").parent().hide();
    			  var msg = {allowSelect: true,message:errorMessge,width:wh,height:ht,handler:function(){fsAsynDataLoader.fn.unBlockPage();}};
    			  if(errorMessge.indexOf("浠ｆ墸浠ｇ即杞﹁埞绋庣敵鎶ヨ〃鍑虹幇閿欒") >=0){
    				  errorMessge = errorMessge.replace(/<\/br>/g,'\n ');
        			  var rowErr = errorMessge.split('\n').length;
        			  var htErr = rowErr * 16+20;
        			  var content = '<link href='
        					+ webContext
        					+'"/style/css-swzj-01/style.css" rel="stylesheet" type="text/css">'
        					+'<textarea  name="" type="text" style="width:755px; height:'+htErr+'px; overflow:hidden"> \n '
        					+errorMessge+'</textarea>' ;
        			  Message.win({message:content, width:780, height:430, title:'鎻愮ず', btn: ['OK'],closeBtn:true,autoClose:true,handler:function(){fsAsynDataLoader.fn.unBlockPage();},maxBtn:false,minBtn:false});
    			  }else{
    				  Message.errorInfo(msg);
    			  }
    		  };
    		  
    	 var timeoutEvent = function(){
    		    // 宸茬粡瓒呮椂 
             timeoutFlag = true;
    		  
 		    window.clearTimeout(queryHandle);
 		    if (!requestCompleted){
 		    	if (queryStateObj === null){
 	 		       handleTimeOut('timeout','澶勭悊瓒呮椂浜嗭紒');  
 	 		    } else {
 	 		       callBack("0002",'','xml',queryStateObj); 
 	 		    }
 		    };  
	        //callBack("timeout","鏁版嵁鍔犺浇瓒呮椂浜嗭紒",null,null);  
    	  };	  
    		  
  		 // 璁剧疆瓒呮椂
         var timeoutHandle =  window.setTimeout(timeoutEvent, timeout);
         
	     // 鏌ヨ缁撴灉璇锋眰鏂规硶
         var queryReq = function(){
			 $.ajax({
	  			  url: qurl,
	  			  data: qdata,
	  			  dataType: qdataType,
	  			  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
	  		   	  headers:{"Accept":"text/plain;charset=UTF-8"},
	  		   	  type: ajaxType,
		  		  complete:function(){  
		  		    	//鐗规畩澶勭悊锛屽湪杩涘叆琛ㄥ崟鏃剁敱浜庤杞芥暟鎹瘮杈冩參锛屾墍浠ユ敼鍙樻彁绀哄眰淇℃伅
		  		    	if(typeof(reqParam.data)!='undefined' && typeof(reqParam.data.action)!='undefined' && reqParam.data.action==='sbFormInit'){
		  		    		$('#hint')[0].innerText = '璇锋眰鏁版嵁瀹屾瘯锛屾鍦ㄥ姞杞芥暟鎹�,璇锋偍绋嶇瓑...';
		  		    	}
	                },
	  			  success:function(qdata1, textStatus, jqXHR){
		  		     if (timeoutFlag){
			  			  return;
			  			 };
	  				//鎴愬姛杩斿洖涓氬姟鏁版嵁
			  		requestCompleted = true;
			  		callBack("0000","",qdataType,qdata1,qdata.tid);
	  			  },
	  			  
	  			  timeout: timeout,
	  			  
	  			  error: function(jqXHR, textStatus, errorThrown){
	  				if (timeoutFlag){
		  			  // 瓒呮椂浜�
	  				} else {
	  					if(jqXHR.status === 300) {
	  						// 缁х画鏌ヨ
	  						try{
	  						   if (queryStateObj === null && jqXHR.responseText !== ''){
	  							 var respText  = $.trim(jqXHR.responseText);
	  							 if (respText.indexOf('<') === 0){
	  								queryStateObj = $.parseXML(respText);
	  								var str = $(queryStateObj).find("result > returnCode").text(); 
	  								if (str === ''){
	  								  queryStateObj = null;
	  								}
	  							 }
	  						   }
	  						}catch(e){
	  							queryStateObj = null;
	  						}
	  			            queryHandle = window.setTimeout(queryReq, qIntervalTime);
	  					}  else {
	  						//exceptionCallBack(jqXHR.status, jqXHR.responseText);
	  						requestCompleted = true;
	  						//鏄剧ず寮傚父淇℃伅鏍囧織涓簍rue鐩存帴鏄剧ず寮傚父淇℃伅锛�
	  						if (isShowErrorInfo) {
	  							//杩斿洖鍐呭涓洪敊璇姤鏂囷紝涓旇繑鍥炵爜涓嶄负0锛屾樉绀烘姤鏂囦腑message鍐掑彿reason锛屽叾浠栨儏鍐电洿鎺ユ樉绀鸿繑鍥炲唴瀹�
	  							errorInfo = jqXHR.responseText;
	  							try{
	  								responseXml = $($.parseXML(jqXHR.responseText));
	  								rtnCode = "";
	  								message= "";
	  								reason = "";
	  								if(responseXml.find("bizResult > head > rtnCode").length>0){
	  									rtnCode=responseXml.find("bizResult > head > rtnCode")[0].text;
	  									message=responseXml.find("bizResult > head > rtnMsg > message")[0].text;
	  									reason=responseXml.find("bizResult > head > rtnMsg > reason")[0].text;
	  								}
	  								if (fsAsynDataLoader.fn.isValidString(rtnCode)) {
	  									errorInfo = message;
	  									if (fsAsynDataLoader.fn.isValidString(reason)) {
	  										errorInfo = message + "锛�" +  reason;
	  									}
  									} 
	  							} catch (e) {
	  								
	  							}
	  							handleException(jqXHR.status,'绯荤粺鏈嶅姟寮傚父锛岃绋嶇瓑鐗囧埢鍚庨噸鏂板姙鐞嗕笟鍔★紒',errorInfo);
	  						} else {
	  							//璁剧疆浜嗕笉缁熶竴鏄剧ず閿欒锛岃繑鍥炲唴瀹逛负閿欒鎶ユ枃锛屽叾浠栨儏鍐垫墽琛屽洖璋�
	  							try{
	  								$.parseXML(jqXHR.responseText);
	  								callBack("0001","",qdataType,jqXHR.responseText);
	  							} catch (e) {
	  								//铏界劧璁剧疆浜嗕笉缁熶竴鏄剧ず閿欒锛屼絾杩斿洖鍐呭涓洪潪閿欒杩斿洖鎶ユ枃鏂囧瓧鍐呭鐩存帴鏄剧ず寮傚父淇℃伅
	  								handleException(jqXHR.status,'绯荤粺鏈嶅姟寮傚父锛岃绋嶇瓑鐗囧埢鍚庨噸鏂板姙鐞嗕笟鍔★紒',jqXHR.responseText);
	  							}
	  						}
	  						
	  					}
	  				  
	  				}		 
	  			  }
	  		});
		 };   
         // 涓氬姟璇锋眰锛屾湇鍔＄蹇€熻繑鍥炶姹�
  		 $.ajax({
  			  url: url,
  			  data: data,
  			  dataType: dataType, 
  			  headers:{"Accept":"text/plain;charset=UTF-8"},
  			  type: qAjaxType,
  			 beforeSend:function(){  
	  		    	//鐗规畩澶勭悊锛屽湪杩涘叆琛ㄥ崟鏃剁敱浜庤杞芥暟鎹瘮杈冩參锛屾墍浠ユ敼鍙樻彁绀哄眰淇℃伅
	  		    	if(typeof(reqParam.data)!='undefined' && typeof(reqParam.data.action)!='undefined' && reqParam.data.action==='sbFormInit'){
	  		    		$('#hint')[0].innerText = '姝ｅ湪鍔犺浇鏁版嵁,璇锋偍绋嶇瓑...';
	  		    	}
             },
  			  success: function(sdata, textStatus, jqXHR){
  				 var doc = $(sdata);
  				 id = doc.find("result>tid").text(); 
  				 sid = doc.find("result>sid").text(); 
 				 qIntervalTime = doc.find("result>waitingTime").text(); 
 				 queryTimeout = doc.find("result>timeoutTime").text();
 				 if (queryTimeout !== null && queryTimeout !=='' &&  queryTimeout > 0){
 					window.clearTimeout(timeoutHandle); 
 					window.setTimeout(timeoutEvent, queryTimeout);
 				 }
 				 if(qIntervalTime > 3000) {
 					qIntervalTime = 3000;
 				 }

 				 // TO DO 鏌ヨurl鍜屽弬鏁版牸寮忔湭瀹�
 				 //qdata = {tid:id};
 				 qdata.tid = id;
 				 qdata.sid = sid;
 			    // 寮€濮嬪畾鏃惰疆璇㈡煡璇�  			   
  			    queryHandle = window.setTimeout(queryReq, qIntervalTime);
  			  },
  		      error: function(jqXHR, textStatus, errorThrown){
	  			// window.clearTimeout(queryHandle);		
	  			  //銆€TO DO  闈炰笟鍔℃€у紓甯革紝鐢╤ttp澶翠綋鐜�
  		    	if (timeoutFlag){
  		    	   // callBack("timeout","鏁版嵁鍔犺浇瓒呮椂浜嗭紒",null,null);  
  		    	 }else{
  		    		//exceptionCallBack(jqXHR.status, null);
  		    		handleException(jqXHR.status,'绯荤粺鏈嶅姟寮傚父锛岃绋嶇瓑鐗囧埢鍚庨噸鏂板姙鐞嗕笟鍔★紒',jqXHR.responseText);
  		    	 }  
  		      },
  			  timeout: timeout,
  			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
		  	  complete:function(XMLHttpRequest, textStatus){
		  	  	if(XMLHttpRequest.status==401){
		  	  		top.window.location.href="/etax/admin/userLoginOtherPlace.do";
		  	  	}
		  	  }  
  			});
  		 
  	  },
  	  /**
  	   *   閿佸畾椤甸潰
  	   * @param hintMsg
  	   */
  	  blockPage: function(hintMsg){
  		 var html = '<div id = "loading" style = "text-align:center;height:150px; background-image: url('
			+ '/skin/www/style/images-common/waiting/loading.gif);background-position: center;background-repeat: no-repeat;" >'
			+ '<div id = "hintDiv" style="position: relative; top:65%;"><span id = "hint" style="">'+hintMsg+'</span></div></div>';
  		 $.blockUI({
    		  message : html,
    		  css : {
    			  "border-style" : "none",
    			  width : 370,
    			  height : 150,
    			  top :  ($(window).height() - 150) / 2,
    			  left : ($(window).width() - 370) / 2,
    			  cursor : 'wait'
    		  },
    		  overlayCSS : {
    			  backgroundColor : '#000',
    			  opacity : 0.3
    		  }
  		 });  		  
  	  },
  	  
  	  /**
  	   *  浣跨敤绌虹櫧灞傞攣瀹氶〉闈�
  	   * @param hintMsg
  	   */
  	  blockPagePureDiv: function(){
  		 var html = '<div id = "loading" style = "display:none"></div>';
  		 $.blockUI({
    		  message : html,
    		  css : {
    			  "border-style" : "none",
    			  width : 0,
    			  height : 0,
    			  top :  0,
    			  left : 0,
    			  cursor : 'wait'
    		  },
    		  overlayCSS : {
    			  backgroundColor : '#000',
    			  opacity : 0.1
    		  }
  		 });  		  
  	  },
  	  /**
  	   *
  	   *   瑙ｉ攣椤甸潰
  	   */
      unBlockPage: function(){
    	 $.unblockUI(); 
   	     window.setTimeout(function(){$("html").css('cursor','pointer');}, 100);
      },
  	  /**
 	   *
 	   * 闅愯棌娑堟伅鎻愮ず妗�
 	   */
     hideBlockUIMsg: function(){
    	 $("#loading").parent().hide();
     },      
  	 getVersion: function(){ return "v1.0.0" ;}
  	};
  	
  	fsAsynDataLoader.fn.init.prototype = fsAsynDataLoader.fn;
  	
  	// 鏆撮湶鍒板叏灞€
  	return fsAsynDataLoader;
  })();
  
  // 鍏ㄥ眬寮曠敤
  window.fsAsynDataLoader = fsAsynDataLoader();
})(window);