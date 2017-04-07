/*dwr超时时间*/
if("undefined" != typeof(dwr)){
	dwr.engine.setTimeout(120000); 
}
/**
 * 去字符串兩端的空字符（空格、製表符、換行符等）
 * 
 * @return
 */
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
/**
 * 去字符串左端的空字符（空格、製表符、換行符等）
 * 
 * @return
 */
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
/**
 * 去字符串右端的空字符（空格、製表符、換行符等）
 * 
 * @return
 */
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}
/*
 * 判断字符串是否以指定的字符串开头
 */
String.prototype.startWithReg = function (str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};
/*
 * 判断字符串是否以指定的字符串开头
 */
String.prototype.startWith = function (str) {
	/*
	 * if(this.length < str.length){ return false; } return this.indexOf(str) >=
	 * 0;
	 */
	 var reg=new RegExp("^"+str);
	 return reg.test(this);
};
/*
 * 判断字符串是否以指定的字符串结尾
 */
String.prototype.endWith = function (str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};
/*
 * 忽略大小写进行字符串比较
 */
String.prototype.equalsIgnoreCase = function (str) {
	return this.toLowerCase() == str.toLowerCase();
};
/*
 * 将字符串中的所有指定内容替换为指定字符串
 */
String.prototype.replaceAll = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);
};
/**
 * 判断数组中是否包含指定元素
 */
Array.prototype.inArray = function (e) {
	for (i = 0; i < this.length && this[i] != e; i++) {
	}
	return !(i == this.length);
};
/**
 * 获取指定元素的下标，如果不存在该元素则返回-1
 */
Array.prototype.indexOf = function (e) {
	for (i = 0; i < this.length && this[i] != e; i++) {
	}
	return (i == this.length)? -1 : --i;
};
/**
 * 删除指定元素
 */
Array.prototype.remove = function (dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[dx]) {
			this[n++] = this[i];
		}
	}
	if(this.length > 0){
		this.length -= 1;
	}
};

/*
 * 希尔排序
 */
Array.prototype.shellSort = function(compare) { 
	for (var step = this.length >> 1; step > 0; step >>= 1) { 
		for (var i = 0; i < step; ++i) { 
			for (var j = i + step; j < this.length; j += step) { 
				var k = j, value = this[j]; 
				while (k >= step 
						&& (compare ? compare(this[k - step], value) > 0
						                     :  this[k - step] > value)) { 
					this[k] = this[k - step]; 
					k -= step; 
				} 
				this[k] = value; 
			} 
		} 
	} 
} ;

/**
 * 
 */
function isSameType(obj1, obj2) {
	return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2);
}

/**
 * 判断一个对象是否是数组
 */
function isArray(obj) {  
	return Object.prototype.toString.call(obj) === '[object Array]';   
}
/**
 * 处理JSON串特殊字符
 */
var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
meta = {    // table of character substitutions
	'\b': '\\b',
	'\t': '\\t',
	'\n': '\\n',
	'\f': '\\f',
	'\r': '\\r',
	'"' : '\\"',
	'\\': '\\\\'
};
function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}
/**
 * 将对象序列化为json格式
 */
var TYPE_NUMBER = new Number();
var TYPE_STRING = "";
var TYPE_ARRAY = new Array();
function toJsonStr(src) {
	var type = typeof (src);
	switch (type) {
	  case "array":
		var strArray = "[";
		for (var i = 0; i < src.length; ++i) {
			var value = "";
			if (src[i]) {
				value = toJsonStr(src[i]);
			}
			strArray += value + ",";
		}
		if (strArray.charAt(strArray.length - 1) == ",") {
			strArray = strArray.substr(0, strArray.length - 1);
		}
		strArray += "]";
		return strArray;
	  case "date":
		return "new Date(" + src.getTime() + ")";
	  case "boolean":
	  case "number":
	  case "string":
		return  quote(src.toString());
	  case "function":
		return "\"\"";
	  default:
		if (isSameType(src, TYPE_STRING) || isSameType(src, TYPE_NUMBER)) {
			return "\"" + src.toString().replace("\"", '\"') + "\"";
		}
		if (isSameType(src, TYPE_ARRAY)) {
			var strArray = "[";
			for (var i = 0; i < src.length; ++i) {
				var value = "";
				if (src[i]) {
					value = toJsonStr(src[i]);
				}
				strArray += value + ",";
			}
			if (strArray.charAt(strArray.length - 1) == ",") {
				strArray = strArray.substr(0, strArray.length - 1);
			}
			strArray += "]";
			return strArray;
		}
		var serialize = "{";
		for (var key in src) {
			if (typeof (src[key]) == "function") {
				continue;
			}
			var subserialize = "null";
			if (src[key] !== undefined && src[key] !== null) {
				subserialize = toJsonStr(src[key]);
			}
			serialize += "\r\n\"" + key + "\" : " + subserialize + ",";
		}
		if (serialize.charAt(serialize.length - 1) == ",") {
			serialize = serialize.substr(0, serialize.length - 1);
		}
		serialize += "\r\n}";
		return serialize;
	}
}
/*
 * 日期格式化
 */
Date.prototype.format = function (mask) {
	var d = this;
	var zeroize = function (value, length) {
		if (!length) {
			length = 2;
		}
		value = String(value);
		for (var i = 0, zeros = ""; i < (length - value.length); i++) {
			zeros += "0";
		}
		return zeros + value;
	};
	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
		switch ($0) {
		  case "d":
			return d.getDate();
		  case "dd":
			return zeroize(d.getDate());
		  case "ddd":
			return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][d.getDay()];
		  case "dddd":
			return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
		  case "M":
			return d.getMonth() + 1;
		  case "MM":
			return zeroize(d.getMonth() + 1);
		  case "MMM":
			return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
		  case "MMMM":
			return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
		  case "yy":
			return String(d.getFullYear()).substr(2);
		  case "yyyy":
			return d.getFullYear();
		  case "h":
			return d.getHours() % 12 || 12;
		  case "hh":
			return zeroize(d.getHours() % 12 || 12);
		  case "H":
			return d.getHours();
		  case "HH":
			return zeroize(d.getHours());
		  case "m":
			return d.getMinutes();
		  case "mm":
			return zeroize(d.getMinutes());
		  case "s":
			return d.getSeconds();
		  case "ss":
			return zeroize(d.getSeconds());
		  case "l":
			return zeroize(d.getMilliseconds(), 3);
		  case "L":
			var m = d.getMilliseconds();
			if (m > 99) {
				m = Math.round(m / 10);
			}
			return zeroize(m);
		  case "tt":
			return d.getHours() < 12 ? "am" : "pm";
		  case "TT":
			return d.getHours() < 12 ? "AM" : "PM";
		  case "Z":
			return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
		  default:
			return $0.substr(1, $0.length - 2);
		}
	});
};
/*
 * 获取事件源，兼容各个浏览器
 */
function getEventSrc(e) {
	if (document.all) {
		return window.event.srcElement;
	} else {
		return e.srcElement || e.targett || e.currentTarget;
	}
}
/*
 * 获取当前document的地址中包含的参数
 * 
 * key 为undefinde,则返回全部 否则返回key所代表的值 如果该值不存在则返回空串
 */
function getLocationParameters(key) {
	var url = location.href;
	// 去地址信息,并用&分成字符串数组
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	var func = undefined;
	// 如果url中包含utf8转码的参数，使用unescape，否则使用decodeURI进行转码
	if(url.indexOf("%u") > 0){
		func = unescape;
	} else {
		func = decodeURI;
	}
	for (var i = 0; j = paraString[i]; i++) {
		var param = func(j.substring(0, j.indexOf("=")));
		paraObj[param] = func(j.substring(j.indexOf("=") + 1, j.length));
	}
	if (key) {
		// 为undefinde,则返回全部
		return paraObj[key];
	}
	var rtnValue = paraObj[key];
	if (typeof (rtnValue) == "undefined") {
		// 如果该值不存在则返回空串
		return "";
	} else {
		// 返回key所代表的值
		return rtnValue;
	}
}
/*
 * 获取对象的绝对位置X
 */
function getAbsoluteLocationX(obj) {
	var ParentObj = obj;
	var left = obj.offsetLeft;
	while (ParentObj = ParentObj.offsetParent) {
		left += ParentObj.offsetLeft;
	}
	return left;
}
/*
 * 获取对象的绝对位置Y
 */
function getAbsoluteLocationY(obj) {
	var ParentObj = obj;
	var top = obj.offsetTop;
	while (ParentObj = ParentObj.offsetParent) {
		top += ParentObj.offsetTop;
	}
	return top;
}
/*
 * 获取对象相对于鼠标的相对位置X
 */
function getRelativePositionX(obj, event) {
	event = event ? event : window.event;
	return event.clientX - getAbsoluteLocationX(obj) + document.body.scrollLeft;
}
/*
 * 获取鼠标相对于对象的相对位置Y
 */
function getRelativePositionX(obj, event) {
	event = event ? event : window.event;
	return event.clientY - getAbsoluteLocationY(obj) + document.body.scrollTop;
}
/*
 * 获取鼠标相对于对象边框的距离X,若鼠标在控件范围内，则返回0
 */
function getRelativeDistanceX(obj, event) {
	event = event ? event : window.event;
	// 左边框的距离
	var left = event.clientX - getAbsoluteLocationX(obj) + document.body.scrollLeft;
	if (left < 0) {
		// 在左边框的左方
		return left;
	}
	if (left - obj.clientWidth > 0) {
		// 在右边框的右方
		return left - obj.clientWidth;
	}
	return 0;
}
/*
 * 获取鼠标相对于对象边框的距离Y,若鼠标在控件范围内，则返回0
 */
function getRelativeDistanceY(obj, event) {
	event = event ? event : window.event;
	// 上边框的距离
	var top = event.clientY - getAbsoluteLocationY(obj) + document.body.scrollTop;
	if (top < 0) {
		// 在上边框的上方
		return top;
	}
	if (top - obj.clientHeight > 0) {
		// 在下边框的下方
		return top - obj.clientHeight;
	}
	return 0;
}
/**
 * 模拟form 进行提交并跳转
 */
function postWithForm(URL, PARAMS) {
	var temp = document.createElement("form");
	temp.action = URL;
	temp.method = "post";
	temp.style.display = "none";
	for (var x in PARAMS) {
		var opt = document.createElement("textarea");
		opt.name = x;
		opt.value = PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}
/**
 * 判断按下的键是否为数字、backspace、上下左右等
 */
function checkForNumberInput(event) {
	var code = event.keyCode ? event.keyCode : event.which;
	event.returnValue = (/[\d]/.test(String.fromCharCode(code))) || (event.charCode === 0);
	if (!event.returnValue) {
		if($.browser.msie) {
		window.event.returnValue = false;
		}else{
		event.preventDefault();
		}
	}
	return event.returnValue;
}
/**
 * 根据指定的值，返回指定的时间范围
 * 
 * 可选的值有：lastmonth thismonth lastweek thisweek yesterday today
 */
function getTimeRange(value) {
	var p_date = new Object();
	p_date.startDate = new Date();
	p_date.endDate = new Date();
	switch (value) {
	  case "nolimit":
	  	p_date.startDate.setTime(Date.parse("01/01/1970"));
	  	p_date.endDate.setTime(Date.parse("01/01/2050"));
	  	p_date.startDate = "";
	  	p_date.endDate = "";
	  	return p_date;
		break;
	  case "lastmonth":
	    /*
		 * date setMonth 如果设置的月数没有当前的日期 则将会自动调制月份。
		 * 
		 * 如： 当前的date为3.30 而想将月份设置为2月即setMonth(1), 此时由于2月没有30号，将自动增加2天，
		 * 设置月份的结果为3月2号
		 * 
		 * 修复该bug： 先设置为1号， 再设置月份即可
		 * 
		 */
		p_date.startDate.setDate(1);
		p_date.endDate.setDate(1);
		if (p_date.startDate.getMonth() == 0) {
										// 一月
			p_date.startDate.setMonth(11);
			p_date.startDate.setFullYear(p_date.endDate.getFullYear() - 1);
		} else {
										// 二~十二月
			p_date.startDate.setMonth(p_date.startDate.getMonth()-1);
		}
		break;
	  case "thismonth":
		p_date.startDate.setDate(1);
		p_date.endDate.setDate(1);
		if (p_date.endDate.getMonth() == 11) {
										// 十二月
			p_date.endDate.setFullYear(p_date.endDate.getFullYear() + 1);
			p_date.endDate.setMonth(0);
		} else {
										// 一~十一月
			p_date.endDate.setMonth(p_date.endDate.getMonth() + 1);
		}
		break;
	  case "lastweek":
		var week=p_date.startDate.getDay();
		if (week==0) {
			p_date.startDate = new Date(p_date.startDate.getTime() - (7 + 6) * 86400000);
			p_date.endDate = new Date(p_date.startDate.getTime() + 7 * 86400000-86400);	
		}else{
			p_date.startDate = new Date(p_date.startDate.getTime() - (week + 6) * 86400000);
			p_date.endDate = new Date(p_date.startDate.getTime() + 7 * 86400000-86400);
		}
		break;
	  case "thisweek":
		var week=p_date.startDate.getDay();
		if (week==0) {
			p_date.startDate = new Date(p_date.endDate.getTime() -6* 86400000);
			p_date.endDate = new Date(p_date.endDate.getTime() + 86400000-86400);
		}else if(week==1){
			p_date.endDate = new Date(p_date.startDate.getTime() + 7 * 86400000-86400);
		}else{
			p_date.startDate = new Date(p_date.startDate.getTime() - (week-1)* 86400000);
			p_date.endDate = new Date(p_date.endDate.getTime() + (8-week)*86400000-86400);
		}
		break;
	  case "yesterday":
		p_date.startDate = new Date(p_date.startDate.getTime() - 86400000-86400);
		break;
	  case "today":
		p_date.endDate = new Date(p_date.endDate.getTime() + 86400000-86400);
		break;
	}
	// 清零时分秒
	p_date.startDate.setHours(0);
	p_date.startDate.setMinutes(0);
	p_date.startDate.setSeconds(0);
	
	p_date.endDate.setHours(0);
	p_date.endDate.setMinutes(0);
	p_date.endDate.setSeconds(0);
	// 在原有基础上再减一秒，使时间变为23:59:59
	p_date.endDate.setSeconds(-1);
	
	// 返回结果
	return p_date;
}

/**
 * 特殊字符（\/*?"<>|& ）限制输入 e：事件 建议onkeydown时调用
 */
function specialCharCannotInput(e)
{
	var key = window.event ? e.keyCode:e.which;
	if(e.shiftKey==true ||e.shiftKey==1)
	{
		if ( key == 188 || key==190 || key==55 || key==32 ||key==191 || key==220 || key==222 ||key==16)
		{
			if(window.event)
			{
				e.returnValue=false;
			}
			else
			{
				e.preventDefault();
			}
		}
	}
	else
	{
		if (  key==222||key==221||key==219||key==192)
		{
			if(window.event)
			{
				e.returnValue=false;
			}
			else
			{
				e.preventDefault();
			}
		}
	}
	
}


/**
 * 特殊字符（\/*?"<>|& ）替换为空 e：事件 in_obj:事件控件 建议onkeyup时调用
 */
function onKeyUP(e,in_obj)
{
	var key = window.event ? e.keyCode:e.which;
	if ((key <46 && key > 32) || (key >112 && key < 123)|| (key>16&&key<18)||(key>48&&key<90)||key==32||key==16)
	{
		if(window.event)
		{
			e.returnValue=false;	// IE
		}
		else
		{
			e.preventDefault();		// 非IE，如firefox，chrome
		}
	}
	else
	{
		in_obj.value=in_obj.value.replace(/\<|\>|[&]|[\\]|[\/]|[?]|[|]|[\']|[\"]/g,"");
	}
}

/**
 * 只能输入数字 e：事件 in_obj:事件控件 建议onkeydown时调用
 */
function onlyNumber(e,in_obj)
{
	var key = window.event ? e.keyCode:e.which;
	if (!((key >95 && key <106) ||(key >47 && key <58)) && key!=8  && key!=37 && key!=39 && key!=9 && key!=16)
	{
		if(window.event)
		{
			e.returnValue=false;	// IE
		}
		else
		{
			e.preventDefault();		// 非IE，如firefox，chrome
		}
	}
}

/**
 * json转换为对象
 * 
 * @return
 */
String.prototype.evalJSON = function(){
    return eval('(' + this + ')');
}

 /**
	 * 特殊字符转义
	 * 
	 * @param str
	 * @return
	 */
 function html_encode(str)   
 {   
     var s = "";   
     if (str.length == 0) return "";   
     s = str.replace(/&/g, "&gt;");   
     s = s.replace(/</g, "&lt;");   
     s = s.replace(/>/g, "&gt;");   
     s = s.replace(/ /g, "&nbsp;");   
     s = s.replace(/\'/g, "&apos;");   
     s = s.replace(/\"/g, "&quot;");   
     s = s.replace(/\n/g, "<br>");   
     s = s.replace(/\#/g, "&#35;"); 
     return s;   
 }
 /**
	 * 特殊字符转义另一种方式
	 * 
	 * @param str
	 * @return
	 */
 function toTXT(str){ 
     var RexStr =/\<|\>|\"|\'|\&/g ;
     str = str.replace(RexStr, 
         function(MatchStr){ 
             switch(MatchStr){ 
                 case "<": 
                     return "&lt;"; 
                     break; 
                 case ">": 
                     return "&gt;"; 
                     break; 
                 case "\"": 
                     return "&quot;"; 
                     break; 
                 case "'": 
                     return "&#39;"; 
                     break; 
                 case "#": 
                     return "&#35;"; 
                     break; 
                 case "&": 
                     return "&amp;"; 
                     break; 
                 default : 
                     break; 
             } 
         } 
     ) 
     return str; 
} 
/**
 * 特殊字符反转义
 * 
 * @param str
 * @return
 */
 function html_decode(str)   
 {   
     var s = "";   
     if (str.length == 0) return "";   
     s = str.replace(/&gt;/g, "&");   
     s = s.replace(/&lt;/g, "<");   
     s = s.replace(/&gt;/g, ">");   
     s = s.replace(/&nbsp;/g, " ");   
     s = s.replace(/'/g, "\'");   
     s = s.replace(/&quot;/g, "\"");   
     s = s.replace(/<br>/g, "\n");   
     return s;   
 }
 /**
	 * 检测IP是否合法
	 * 
	 * @param obj
	 * @return
	 */
 function checkIP(obj)
 {
	 var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	 var reg = obj.match(exp);
	 if(reg==null){
		 return false;
	 }else{
		 return true;
	 }
}

 function isIe(){
 	    return ("ActiveXObject" in window);
 	 }
 function isIe6() {
 	   // ie6是不支持window.XMLHttpRequest的
 	    return isIe() && !window.XMLHttpRequest;
 	 }
 function isIe7() {
 	   // 只有IE8+才支持document.documentMode
 	   return isIe() && window.XMLHttpRequest && !document.documentMode;
 	 }
 function isIe8(){
 	   // alert(!-[1,])//->IE678返回NaN 所以!NaN为true 标准浏览器返回-1 所以!-1为false
 	  return isIe() &&!-[1,]&&document.documentMode;
 	}
 function isIe9(){
 	   // 加入jquery判断，common.js 应该与jquery.js同时存在
 	  return isIe() && $.browser.version.startWith("9.");
 	}
 function isIe10(){
 	// 加入jquery判断，common.js 应该与jquery.js同时存在
 	  return isIe() && $.browser.version.startWith("10.");
 	}
 function isIe11(){
 	// 加入jquery判断，common.js 应该与jquery.js同时存在
 	  return isIe() && $.browser.version.startWith("11.");
 	}
 // 检测函数
 var check = function(r) {
       return r.test(navigator.userAgent.toLowerCase());
 };
 var statics = {
       /**
		 * 是否为webkit内核的浏览器
		 */
       isWebkit : function() {
         return check(/webkit/);
       },
       /**
		 * 是否为火狐浏览器
		 */
       isFirefox : function() {
         return check(/firefox/);
       },
       /**
		 * 是否为谷歌浏览器
		 */
       isChrome : function() {
         return !statics.isOpera() && check(/chrome/);
       },
       /**
		 * 是否为Opera浏览器
		 */
       isOpera : function() {
         return check(/opr/);
       },
       /**
		 * 检测是否为Safari浏览器
		 */
       isSafari : function() {
         // google chrome浏览器中也包含了safari
         return !statics.isChrome() && !statics.isOpera() && check(/safari/);
       }
 };

 var connIntervalId;// 定时刷新Id
 var conectNum=0;// 统计每隔1秒刷新次数
 var loginNum=0;// 统计成功调用login.jsp次数
 var tempLoginNum=0;// 临时记录成功调用login.jsp次数
 /**
	 * 测试与服务器是否通信成功
	 * 
	 * @param intervalSuccessInfo
	 *            通信成功调用函数
	 * @param addURL
	 * @return
	 */
function checkNetworkCommunication(intervalSuccessInfo){
	conectNum=0;
	loginNum=0;
	tempLoginNum=0;
	connIntervalId=setInterval('testCommunication('+intervalSuccessInfo+')',1000);
}

/**
 * 检查服务端的连接是否正常，连接正常后跳转至登录页
 * 
 * @param intervalSuccessInfo
 */
function testCommunication(intervalSuccessInfo){
	if(conectNum!=loginNum && tempLoginNum==0){
		tempLoginNum=loginNum;
	}
	if(tempLoginNum!=0 && tempLoginNum!=loginNum){
		if(connIntervalId!=null && connIntervalId!=""){
			clearInterval(connIntervalId);
			intervalSuccessInfo(); 
			return;
		}
	}
	conectNum++;
	$.post(ROOT_PATH+"/login.jsp", function() {// addressURL 项目路径
		loginNum++;
	}).error(function(xhr,errorText,errorType){
        if(xhr.status == 400){
        	loginNum++;
        }
    });;
}

/**
 * 当指定的iframe加载完成后，调用回调
 * <p>
 * 使用定时器检查是否加载完成 ，当完成时清除定时器并调用回调函数
 * 
 * @param iframe
 *            指定的iframe
 * @param callback
 *            回调函数<br>
 *            示例：<br>
 *            <code>
 *            	callback : function(_window){ <br>
 *            		// _window 为指定iframe的window <br>
 *            	}
 *            </code>
 * @param checkKey
 *            用于检查是否加载完成的key
 */
function onFrameLoadComplete(iframe, callback, checkKey){
	//
	if(!iframe){
		return;
	}
	// 使用定时器检查是否加载完成
	// 当完成时清除定时器并调用回调函数
	var interval = setInterval(function() {
		var _window = iframe.contentWindow || iframe;
		// 直至加载完成才点击第一个菜单
		if (_window[checkKey]) {
			clearInterval(interval);
			callback(_window);
		}
	}, 50);
}

/**
 * 页面加载完成后，修改加载状态
 */
$(function(){
	setTimeout(function(){
		window.LOAD_COMPLETE = true; 
	}, 0);
});

/**
 * 获得去掉年份的时间
 */
function getNoYearDate(date){

	if(date && date != ""){   
		var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(([01]\d{1})|(2[0123])):([0-5]\d):([0-5]\d))?$/;
		if (reg.test(date)) {
			return date.substring(5);
		}
		return date;
	}
	return "";
}

/** 判断获取数据是否为空 * */
function isTextHasVal(testVal){
	return (testVal == ""?"N/A":testVal);
}

/**
 * 获取最顶层的Window对象，多层嵌套iframe时使用
 */
function getRootWindow(current){
	if(!current){
		current = window;
	}
	if(current == parent){
		return current;
	} else {
		return getRootWindow(parent);
	}
}

/**
 * 判断当前Window对象是否为最顶层的Window对象
 */
function isRootWindow(){
	return window == getRootWindow();
}


/**
 * DWR请求发生会话超时时调用
 */
function doSessionTimeout(){
	// 顶层Window对象
	var rootWindow = getRootWindow();
	// 当前用户
	var currentUser = rootWindow.getUserInfo();
	//
	// 弹出对话框
	rootWindow.	 BootstrapDialog.show({
        title: "会话超时",
        message: $("<div style='color: #333333'>会话已过期，请重新登录！</div>"),
        type: BootstrapDialog.TYPE_DEFAULT,
        buttons: [{
            label: "确定",
            cssClass: "btn-primary",
            action: function(dialog) {
            	rootWindow.location.href=ROOT_PATH + "/login.jsp";
            }
        }]
    });
	// 隐藏可能的进度提示
	Loading.hide();
}

/**
 * Ajax请求完成时调用
 */
$(document).ajaxComplete(function (event, request, settings) {
	if (request.status == 400) {
		if(!getExceptRequet(settings)){
			doSessionTimeout();
		}
	}
});

/**
 * 返回例外请求
 * @return
 */
function getExceptRequet(settings){
	var success = false;
	if(settings.url.indexOf(ROOT_PATH+"/login.jsp") != -1 || settings.url.indexOf("highcharts") != -1  || settings.url.indexOf("/LoginAction") != -1){
		success = true;
	}
	return success;
}