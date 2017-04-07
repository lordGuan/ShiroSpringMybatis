
function CreateDiv(tabid, url, name, reopen) {
	notifyListenersDIV(tabid);
	// /如果当前tabid存在直接显示已经打开的tab
	if (reopen && document.getElementById("div_" + tabid) != null) {
		RemoveDiv(tabid);
	}
	if (document.getElementById("div_" + tabid) === null) {
		// 创建iframe
		var box = document.createElement("iframe");
		box.id = "div_" + tabid;
		box.name = "div_" + tabid;
		box.src = url;
		box.height = "100%";
		box.frameBorder = 0;
		box.width = "100%";
		document.getElementById("div_pannel").appendChild(box);

		// 遍历并清除开始存在的tab当前效果并隐藏其显示的div
		var tablist = document.getElementById("div_tab").getElementsByTagName("li");
		var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
		if (tablist.length > 0) {
			for (i = 0; i < tablist.length; i++) {
				tablist[i].className = "";
				pannellist[i].style.display = "none";
			}
		}

		// 创建li菜单
		var tab = document.createElement("li");
		tab.className = "crent";
		tab.id = tabid;
		var litxt = "<span><a href=\"javascript:;\" onclick=\"javascript:CreateDiv('" + tabid + "','" + url + "','" + name + ",false')\" title=" + name + " class=\"menua\">" + name + "</a><a onclick=\"RemoveDiv('" + tabid + "')\" class=\"win_close\" title=\"\u5173\u95ed\u5f53\u524d\u7a97\u53e3\"><a></span>";
		tab.innerHTML = litxt;
		document.getElementById("div_tab").appendChild(tab);
	} else {
		var tablist = document.getElementById("div_tab").getElementsByTagName("li");
		var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
		// alert(tablist.length);
		for (i = 0; i < tablist.length; i++) {
			tablist[i].className = "";
			pannellist[i].style.display = "none";
		}
		document.getElementById(tabid).className = "crent";
		document.getElementById("div_" + tabid).style.display = "block";
	}
}
function RemoveDiv(obj) {
	var ob = document.getElementById(obj);
	if (!ob) {
		
	}else{
	ob.parentNode.removeChild(ob);
	var obdiv = document.getElementById("div_" + obj);
	obdiv.parentNode.removeChild(obdiv);
	var tablist = document.getElementById("div_tab").getElementsByTagName("li");
	var pannellist = document.getElementById("div_pannel").getElementsByTagName("iframe");
	if (tablist.length > 0) {
		tablist[tablist.length - 1].className = "crent";
		pannellist[tablist.length - 1].style.display = "block";
	}
}
}
function frame(obj) {
	$.post("<%=Constants.PREFIX_PATH%>/SourceAndTargetAction.do?opt=resultAction", {telnum:obj.getElementById("telnum"), userid:$("#userid").val(), realname:$("#realname").val(), username:$("#username").val(), contentType:"application/text;charset=utf-8"});
}

// **************************************************
// 数据集
var datas = new Object();
var keyID = 0;
/*
 * 在数据集中放入数据
 */
function putData(key, data) {
	datas[key] = data;
}
/*
 * 从数据集中取出数据
 */
function getData(key) {
	return datas[key];
}
/*
 * 从数据集中删除数据
 */
function removeData(key) {
	var temp = datas[key];
	datas[key] = undefined;
	return temp;
}
/*
 * 从数据集中删除数据
 */
function clearDatas(key) {
	datas = new Object();
}
function getKey() {
	return "DATA_SET_KEY_" + (keyID += 1);
}
// **************************************************

/**
 * 注册的监听器
 *
 * 当当前的安全实例、数据库实例发生变化时，通知这些监听
 */
 var listenersDIV = new Array();
 
 /**
 * 注册监听
 */
 function registeListenerDIV(listener){
     listenersDIV.push(listener);
 }
 
 /**
 * 移除监听器
 */
 function removeListenerDIV(listener){
     listenersDIV.remove(listenersDIV.indexOf(listener));
 }
 
 function notifyListenersDIV(tabid){
     for(var i=0;i<listenersDIV.length;i+=1){
         if(listenersDIV[i]){
         	try{
            	 listenersDIV[i](tabid);
            }catch(e){}
         }
     }
 }