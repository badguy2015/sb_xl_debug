//鐐瑰嚮鎹竴寮犻獙璇佺爜
function changeImg() {
	var imgSrc = $("#imgObj");   
    var src = imgSrc.attr("src");   
    imgSrc.attr("src",chgUrl(src));  
    $("#info").html("");
}

function chgUrl(url) {
	//涓轰簡浣挎瘡娆＄敓鎴愬浘鐗囦笉涓€鑷达紝鍗充笉璁╂祻瑙堝櫒璇荤紦瀛橈紝鎵€浠ラ渶瑕佸姞涓婃椂闂存埑   
	var timestamp = (new Date()).valueOf();
	url = url.substring(0, 17);
	if ((url.indexOf("&") >= 0)) {
		url = url + "脳tamp=" + timestamp;   
	} else {
		url = url + "?timestamp=" + timestamp;   
	}
	return url;
}

//楠岃瘉鐮侀獙璇�
function isRightCode() {
	var code = $("#veryCode").attr("value");
	//alert(code);
	code = "c=" + code;
	$.ajax( {
		type : "POST",
		url : "ResultServlet",
		data : code,
		success : callback
	});
}

//楠岃瘉浠ュ悗澶勭悊鎻愪氦淇℃伅鎴栭敊璇俊鎭�
function callback(data) {
	if(data.toString()==1)
	{
		$("#info").html("xw绱犳潗缃戞彁閱掓偍锛氭垚鍔熶簡锛�");
	  return;
	}else
	{
		$("#info").html(data);
		return;
	}
}  