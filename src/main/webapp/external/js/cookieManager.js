//IE提示console未定义问题解决 
if (!window.console || !console.firebug){
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
}

/**
 * cookie字典
 */
var dictionary = {
	TableColumnsView : '0',
	TimelySearch : '1',
	AuditLogHome : '2',
	AppList : '3',
	ClientIpList : '4',
	DBUserList : '5',
	LastLoginList : '6',
	LoginFailActive : '7',
	SessionAllActive : '8',
	VirtualPatch : '9',
	Blacklist : 'a',
	Whitelist : 'b',
	NewsqlClassify : 'c',
	FailedSql : 'd',
	Ac : 'e',
	SqlInject : 'f',
	VPatch : 'g',
	DataLeak : 'h',
	DataTamper : 'i',
	ViolateLogin : 'j',
	ConditionObjsShow : 'k'
};

/**
 * cookie-object
 */
var cookieObj = {
	Version : '0'
};

/**
 * 设置cookie值
 * 
 * @param name 值路径
 * @param value 值
 */
function setCookie(name, value){

	var fullPath = name.split('.');

	var path = getCompressPath(fullPath);

	var jsonStr = '{"jsonKey" : "jsonValue"}';

	for (var i = path.length - 1; i >= 0  ; i--) {
		if (i == path.length - 1) {
			jsonStr = jsonStr.replace('jsonKey', path[i]).replace('jsonValue', value);
		} else {
			jsonStr = '{"' + path[i] + '" : ' + jsonStr + '}';
		}
	}

	var newObj = JSON.parse(jsonStr);

	if (window.top) {
		cookieObj = window.top.cookieObj;
	}

	$.extend(true, cookieObj, newObj);

	if (window.top) {
		window.top.cookieObj = cookieObj;
	}

	saveCookieObj();
};

/**
 * 保存cookie
 */
function saveCookieObj(){

	// check size

	// save
	$.cookie('DBAA', JSON.stringify(cookieObj), { expires: 365, path: '/' });
};

/**
 * 获取压缩路径
 * 
 * @param path 未压缩路径
 * @return 压缩路径
 */
function getCompressPath(path){

	var pathArray = new Array();

	// compress
	for (var i = 0; i < path.length; i++) {
		var value = getValueFormDic(path[i]);
		pathArray.push(value);
	}

	return pathArray;
};

/**
 * 查询字典获取压缩值
 * 
 * @param str 字典key
 * @return 压缩值
 */
function getValueFormDic(str){
	var strNew = dictionary[str];
	if (strNew) {
		return strNew;
	} else {
		if(console){
			console.warn(name + '没有被压缩替换');
		}
		return str;
	}
};

/**
 * 获取cookie值
 * 
 * @param name 值路径
 * @return cookie值
 */
function getCookie(name){

	var fullPath = name.split('.');

	var path = getCompressPath(fullPath);

	var getStr = 'cookieObj';

	if (window.top) {
		cookieObj = window.top.cookieObj;
	}

	var obj = cookieObj;

	for (var i = 0; i < path.length; i++) {

		if (obj[path[i]]) {
			getStr = getStr + '["' + [path[i]] + '"]';
			obj = obj[path[i]];
		} else {
			if(console){
				console.warn(getStr + '["' + [path[i]] + '"]' + '未找到此路径');
				return;
			}
		}
	}
	var value = eval(getStr);
	return value;
};

/**
 * 删除cookie值
 * 
 * @param name 值路径
 */
function delCookie(name){

	var fullPath = name.split('.');

	var path = getCompressPath(fullPath);

	var delStr = 'delete cookieObj';

	if (window.top) {
		cookieObj = window.top.cookieObj;
	}

	var obj = cookieObj;

	for (var i = 0; i < path.length; i++) {

		if (obj[path[i]]) {
			delStr = delStr + '["' + [path[i]] + '"]';
			obj = obj[path[i]];
		} else {
			if(console){
				console.warn(delStr + '["' + [path[i]] + '"]' + '未找到此路径');
				return;
			}
		}
	}
	eval(delStr);
};

// 页面加载获取cookie
(function($) {
	$(window).load(function() {
		var obj = $.cookie('DBAA');
		if (obj) {
			obj = JSON.parse(obj);
			if (cookieObj.Version == obj.Version) {
				cookieObj = obj;
			} else {
				delCookieObj();
			}
			if (window.top) {
				window.top.cookieObj = cookieObj;
			}
		}
	});
})(jQuery);

/**
 * 清除cookie
 */
function delCookieObj(){
	$.cookie('DBAA', { expires: -1 });
};
