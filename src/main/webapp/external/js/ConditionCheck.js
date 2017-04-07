/**
 * 检查控件的内容的是否同时包含数字和字母，如不符合，则控件边框变成red颜色
* 传入参数：
 * widgetID：要检查的的控件的id
 * 返回值：0-符合；1-不符合
 */
function IsCharAndInt(widgetID)
{  
    var objReg=/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;  
    var text = document.getElementById(widgetID).value;
    if(objReg.test(text)){
		document.getElementById(widgetID).style.borderColor = "";
		return 0 ;
	} else {
		document.getElementById(widgetID).style.borderColor = "red";
		return 1;
	}
}

/*
 * 检查控件的内容的是否符合手机号码规范，如不符合，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * 返回值：0-符合；1-不符合
 */
function checkmobile(in_obj)
{
	var text = document.getElementById(in_obj).value;
	// 判断
	var objReg = /^\d{11}$/;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(objReg.test(text)){
		document.getElementById(in_obj).style.borderColor = "";
		return 0 ;
	} else {
		document.getElementById(in_obj).style.borderColor = "red";
		return 1;
	}
}
/*
 * 检查控件的内容的是否符合邮箱地址规范，如不符合，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * 返回值：0-符合；1-不符合
 */
function checkemail(in_obj)
{
	var text = document.getElementById(in_obj).value;
	// 判断
	var objReg = /\S+[@]{1}\S+[.]{1}\S+/;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(objReg.test(text)){
		document.getElementById(in_obj).style.borderColor = "";
		return 0 ;
	} else {
		document.getElementById(in_obj).style.borderColor = "red";
		return 1;
	}
}

/*
 * 检查两个控件的内容的是否相同，如不符合，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * widgetID2：要检查的的控件2的id
 * 返回值：0-符合；1-不符合
 */
function checkEqual(widgetID,widgetID2)
{
	var widgetID = document.getElementById(widgetID);
	var widgetID2 = document.getElementById(widgetID2);
	if(widgetID.value.length ==0 || widgetID2.value.length ==0)
		{
			widgetID.style.borderColor = "red";
			widgetID2.style.borderColor = "red";
			return 1;
		}
	if(widgetID.value == widgetID2.value)
	{
		widgetID.style.borderColor = "";
		widgetID2.style.borderColor = "";
		return 0;
	}
	else
	{
		widgetID.style.borderColor = "red";
		widgetID2.style.borderColor = "red";
		return 1;
	}
}

/**
 * 比较两个ip的大小
 * @param ipBegin 起始ip
 * @param ipEnd 截至ip
 * @returns {Number} 0：begin<end; 1: begin>end
 */
function compareIP(ipBegin, ipEnd)  
{  
    var temp1;  
    var temp2;    
    temp1 = ipBegin.split(".");  
    temp2 = ipEnd.split(".");     
    if (temp2[0]-temp1[0]<0)  
    {  
        return 1;  
    }  
    else
    {
    	if (temp2[0]-temp1[0]==0)  
    	{
	    	if (temp2[1]-temp1[1]<0)  
	        {  
	            return 1;  
	        }  
	    	else
	    	{
	    		if (temp2[1]-temp1[1]==0)  
	    		{
		    		if (temp2[2]-temp1[2]<0)  
		            {  
		                return 1;  
		            }  
		    		else
		    		{
		    			if (temp2[2]-temp1[2]==0)  
		    			{
			    			if (temp2[3]-temp1[3]<0)  
			    	        {  
			    	            return 1;  
			    	        }  
		    			}
		    		}
	    		}
	    	}
    	}
    }
/*    for (var i = 0; i < 4; i++)  
    {  
        if (temp2[i]-temp1[i]<0)  
        {  
            return 1;  
        }  
    }*/  
    return 0;     
} 
/*
 * 检查控件的内容的长度是否符合要求，如不符合，则截取设定的最大长度
 * 
 * 传入参数：
 * widget：要检查的的控件的id
 * in_length：符合要求的最大长度
 * 返回值：0-符合；1-不符合
 */
function substrByLength(widget,in_length)
{
	if(widget.value.length > in_length)
	{
		widget.value=widget.value.substr(0,in_length);
		return 0;
	}
}
/*
 * 检查控件的内容的长度是否符合要求（字节数），如不符合，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * in_length：符合要求的最大长度
 * 一个汉字按三字节计算
 * 返回值：0-符合；1-不符合
 */
function checkLength(widgetID,in_max_length,in_min_length)
{
	var v_widget_obj = $("#"+widgetID);
	if(in_min_length==undefined)
	{
		if(v_widget_obj.val().replace(/[^\x00-\xff]/g, "***").trim().length <= in_max_length)
		{
			v_widget_obj[0].style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj[0].style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		if(v_widget_obj.val().replace(/[^\x00-\xff]/g, "***").trim().length <= in_max_length && v_widget_obj.val().replace(/[^\x00-\xff]/g, "***").trim().length >= in_min_length)
		{
			v_widget_obj[0].style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj[0].style.borderColor = "red";
			return 1;
		}
	}
}

/*
 * 检查控件的内容的长度是否符合要求（字符数），如不符合，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * in_length：符合要求的最大长度
 * 返回值：0-符合；1-不符合
 */
function checkCharLength(widgetID,in_max_length,in_min_length)
{
	if(in_min_length==undefined)
	{
		var v_widget_obj = document.getElementById(widgetID);
		if(v_widget_obj.value.length <= in_max_length)
		{
			v_widget_obj.style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		var v_widget_obj = document.getElementById(widgetID);
		if(v_widget_obj.value.length <= in_max_length && v_widget_obj.value.length >= in_min_length)
		{
			v_widget_obj.style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
}

/*
 * 检查控件的内容是否为空值，如为空值，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * noerrorStyle : 是否需要设置错误样式
 * 返回值：0-非空；1-空
 */
function checknull(widgetID, noerrorStyle)
{
	var v_widget_obj = document.getElementById(widgetID);
	
	var objVal = v_widget_obj.value.replaceAll(" ","#");
	
	if(objVal.trim().length>0)
	{
		v_widget_obj.style.borderColor = "";
		return 0;
	}
	else
	{
		if(!noerrorStyle){
			v_widget_obj.style.borderColor = "red";
		}
		else{
			v_widget_obj.style.borderColor = "";
		}
		return 1;
	}
}
/*
 * 检查端口号是否在范围：1～65535，如不符合条件，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * cannull:1允许空；0不允许空
 * 返回值：0-符合；1-不符
 */
function checkport(widgetID,cannull)
{
	var v_widget_obj = document.getElementById(widgetID);
	if(cannull == 1)
	{
		if((parseInt(v_widget_obj.value)>0 && parseInt(v_widget_obj.value)<65536) || v_widget_obj.value.length == 0)
		{
			v_widget_obj.style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		if(parseInt(v_widget_obj.value)>0 && parseInt(v_widget_obj.value)<65536)
		{
			v_widget_obj.style.borderColor = "";
			return 0;
		}
		else
		{
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
}

/*
 * 检查IP是否符合格式规范，如不符合条件，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * cannull:1允许空；0不允许空
 * 返回值：0-符合；1-不符
 */
function checkip(widgetID,cannull)
{
	var objReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var v_widget_obj = document.getElementById(widgetID);
	text = v_widget_obj.value;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(cannull == 1)
	{
		if((text&&text.trim()!=""&&objReg.test(text)) || text.length==0){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		if(text&&text.trim()!=""&&objReg.test(text)){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
}

/*
 * 检查IP是否符合存在掩码的格式规范，如不符合条件，则控件边框变成red颜色
 * 可以为192.168.1.*--192.168.*.*
 * 不能为--192.168.*.1
 * 传入参数：
 * widgetID：要检查的的控件的id
 * cannull:1允许空；0不允许空
 * 返回值：0-符合；1-不符
 */
function checkipinclude2mask(widgetID,cannull)
{
	//var objReg = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([*]|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|([*]\.[*]))$/g;
	var objReg = /(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([*]|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([*]\.[*]))$/g;
	
	var v_widget_obj = document.getElementById(widgetID);
	text = v_widget_obj.value;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(cannull == 1)
	{
		if((text&&text.trim()!=""&&objReg.test(text)) || text.length==0){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		if(text&&text.trim()!=""&&objReg.test(text)){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
}
/*
 * 检查IP是否符合存在掩码的格式规范，如不符合条件，则控件边框变成red颜色
 * 可以为192.168.1.*; 192.168.1.2
 * 传入参数：
 * widgetID：要检查的的控件的id
 * cannull:1允许空；0不允许空
 * 返回值：0-符合；1-不符
 */
function checkipinclude1mask(widgetID,cannull)
{
	var objReg = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([*]|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	var v_widget_obj = document.getElementById(widgetID);
	text = v_widget_obj.value;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(cannull == 1)
	{
		if((text&&text.trim()!=""&&objReg.test(text)) || text.length==0){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
	else
	{
		if(text&&text.trim()!=""&&objReg.test(text)){
			v_widget_obj.style.borderColor = "";
			return 0;
		} else {
			v_widget_obj.style.borderColor = "red";
			return 1;
		}
	}
}
/*
 * 检查IP1是否包含IP，如不符合条件，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * cannull:1允许空；0不允许空
 * 返回值：0-符合；1-不符
 */
function checkIP1includeIP2(IP1widgetID,IP2widgetID)
{
	var v_ip1 = document.getElementById(IP1widgetID).value;
	var v_ip2 = document.getElementById(IP2widgetID).value;
	
	if(v_ip1.length == 0)
	{
	/*	document.getElementById(IP1widgetID).style.borderColor = "red";
		return 1; */
		return 0;
	}
	if(v_ip2.length == 0)
	{
		return 0;
	}
	
	var v_I_part1=v_ip1.substr(0,v_ip1.indexOf(".",0));
	v_ip1=v_ip1.substr(v_ip1.indexOf(".",0)+1,11);
	var v_I_part2=v_ip1.substr(0,v_ip1.indexOf(".",0));
	v_ip1=v_ip1.substr(v_ip1.indexOf(".",0)+1,11);
	var v_I_part3=v_ip1.substr(0,v_ip1.indexOf(".",0));
	v_ip1=v_ip1.substr(v_ip1.indexOf(".",0)+1,11);
	var v_I_part4=v_ip1;
	
	var v_E_part1=v_ip2.substr(0,v_ip2.indexOf(".",0));
	v_ip2=v_ip2.substr(v_ip2.indexOf(".",0)+1,11);
	var v_E_part2=v_ip2.substr(0,v_ip2.indexOf(".",0));
	v_ip2=v_ip2.substr(v_ip2.indexOf(".",0)+1,11);
	var v_E_part3=v_ip2.substr(0,v_ip2.indexOf(".",0));
	v_ip2=v_ip2.substr(v_ip2.indexOf(".",0)+1,11);
	var v_E_part4=v_ip2;
	
	if(v_I_part1!=v_E_part1 || v_I_part2!=v_E_part2)
	{
		document.getElementById(IP2widgetID).style.borderColor = "red";
		return 1;
	}
	else
	{
		document.getElementById(IP1widgetID).style.borderColor = "";
		document.getElementById(IP2widgetID).style.borderColor = "";
	}
	
	if(v_I_part3=="*")
	{
		if(v_E_part3=="*")
		{
			document.getElementById(IP2widgetID).style.borderColor = "red";
			return 1;
		}
		else
		{
			document.getElementById(IP1widgetID).style.borderColor = "";
			document.getElementById(IP2widgetID).style.borderColor = "";
		}
	}
	else
	{
		if(v_I_part3!=v_E_part3 )
		{
			document.getElementById(IP2widgetID).style.borderColor = "red";
			return 1;
		}
		else
		{
			document.getElementById(IP1widgetID).style.borderColor = "";
			document.getElementById(IP2widgetID).style.borderColor = "";
		}
	}

	if(v_I_part4=="*")
	{
		if(v_E_part4=="*")
		{
			if(v_I_part3=="*" && v_E_part3!="*")
			{
				document.getElementById(IP1widgetID).style.borderColor = "";
				document.getElementById(IP2widgetID).style.borderColor = "";
			}
			else
			{
				document.getElementById(IP1widgetID).style.borderColor = "red";
				document.getElementById(IP2widgetID).style.borderColor = "red";
				return 1;
			}
		}
		else
		{
			document.getElementById(IP1widgetID).style.borderColor = "";
			document.getElementById(IP2widgetID).style.borderColor = "";
		}
	}
	else
	{
		document.getElementById(IP1widgetID).style.borderColor = "red";
		document.getElementById(IP2widgetID).style.borderColor = "red";
		return 1;
	}
	return 0;
}
/*
 * 检查MAC是否符合格式规范，如不符合条件，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * 返回值：0-符合；1-不符
 */
function checkTimer(widgetID)
{
	//"^([0-9a-fA-F]{2})(([0-9a-fA-F]{2}){5})$ ";
	var objReg = /[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}$/; 
	var v_widget_obj = document.getElementById(widgetID);
	text = v_widget_obj.value;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(text&&text.trim()!=""&&objReg.test(text)){
		v_widget_obj.style.borderColor = "";
		return 0;
	} else {
		v_widget_obj.style.borderColor = "red";
		return 1;
	}
}

/*
 * 检查时间是否符合格式规范00：00：00，如不符合条件，则控件边框变成red颜色
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * 返回值：0-符合；1-不符
 */
function checkMac(widgetID)
{
	//"^([0-9a-fA-F]{2})(([0-9a-fA-F]{2}){5})$ ";
	var objReg = /[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}$/; 
	var v_widget_obj = document.getElementById(widgetID);
	text = v_widget_obj.value;
	//if (text && text.trim() != "" && (text == text.match(objReg)[0])) {
	if(text&&text.trim()!=""&&objReg.test(text)){
		v_widget_obj.style.borderColor = "";
		return 0;
	} else {
		v_widget_obj.style.borderColor = "red";
		return 1;
	}
}
/*
 * 为select控件添加option
 * 
 * 传入参数：
 * widgetID：要检查的的控件的id
 * seri: 
 * 		1:小时 0~23
 *  	2: 1~31 号
 *  	3：周一～周日
 * 
 */
function addoption(widgetID,seri)
{
	var v_widget_obj = document.getElementById(widgetID);
	v_widget_obj.options.length = 0;
	var adddefaultoption = document.createElement("option");
	adddefaultoption.value = -1;
	adddefaultoption.text = "请选择";
	v_widget_obj.options.add(adddefaultoption);
	if(seri == 1)
	{
		for(var i=0;i<24;i++)
		{
			var add24houroption = document.createElement("option");
			add24houroption.value = i;
			add24houroption.text = i;
			v_widget_obj.options.add(add24houroption);
		}
	}
	if(seri == 2)
	{
		for(var i=1;i<32;i++)
		{
			var adddayoption = document.createElement("option");
			adddayoption.value = i;
			adddayoption.text = i;
			v_widget_obj.options.add(adddayoption);
		}
	}
	if(seri == 3)
	{
		var addweekoption = document.createElement("option");
		addweekoption.value = 0;
		addweekoption.text = "周日";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 1;
		addweekoption.text = "周一";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 2;
		addweekoption.text = "周二";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 3;
		addweekoption.text = "周三";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 4;
		addweekoption.text = "周四";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 5;
		addweekoption.text = "周五";
		v_widget_obj.options.add(addweekoption);
		var addweekoption = document.createElement("option");
		addweekoption.value = 6;
		addweekoption.text = "周六";
		v_widget_obj.options.add(addweekoption);
	}
}

/*
 * 将一个数组中的一列拼接成一个以指定分隔符分隔的字符串
 * 
 * 传入参数：
 * in_array：数组
 * in_colname: 列名
 * in_sep: 分隔符
 * in_strmaxlen: 拼接后最大长度，超过长度将字符串截取到in_strmaxlen-3+”。。。“
 * 
 */
function toJointOneString(in_array,in_colname,in_sep,in_strmaxlen)
{
	var ret_str = "";
	for(var i=0;i<in_array.length;i++)
	{
		if(in_array[i][in_colname].length>0)
		{
			ret_str += in_array[i][in_colname]+in_sep;
		}
		if(ret_str.length > in_strmaxlen)
		{
			ret_str = ret_str.substring(0,(in_strmaxlen-3))+"...";
			break;
		}
	}
	
	return ret_str;
}

/*
 * 给定一个值判断多个checkbox选中需选中哪个
 * 
 * 传入参数：
 * in_number：传入的数值（0~(2^in_checkboxCNT)-1）
 * in_checkboxCNT: 多选框控件个数
 * in_checkboxID:多选框ID属性，最后一位（或多位）为第几个，传入时不传入：
 * 如checkbox_0;checkbox_1;checkbox_2... 传入值为”checkbox_“
 * 
 */
function toCheckTheCheckbox(in_number,in_checkboxCNT,in_checkboxID)
{
	for(var i=0;i<in_checkboxCNT;i++)
	{
		if((in_number & (Math.pow(2,i)))==(Math.pow(2,i)))
		{
			document.getElementById(in_checkboxID+i).checked=true;
		}
		else
		{
			document.getElementById(in_checkboxID+i).checked=false;
		}
	}
}
/*
 * 给定一个时间设定，根据timetype将有效的时间拼成字符串
 * 
 * 传入参数：
 * in_timearray：传入的时间设定，后台接口返回的时间属性
 * 
 */
function toJoinDetailTimeParam(in_timearray)
{
	if(in_timearray.length==0)
	{
		parent.g_policy_logonforbid_detail.rangedatetime="任意时间";
		parent.g_policy_logonforbid_detail.rangetime = "";
		parent.g_policy_logonforbid_detail.rangeday = "";
		parent.g_policy_logonforbid_detail.rangeweek = "";
	}
	else
	{
		if((in_timearray[0].timeType & 1)== 1) //时间范围
		{
			parent.g_policy_logonforbid_detail.rangedatetime = "时间范围："
				+in_timearray[0].rangeBeginTime.substring(0,19) + "  至   "
				+in_timearray[0].rangeEndTime.substring(0,19);
		}
		else
		{
			parent.g_policy_logonforbid_detail.rangedatetime = "";
		}
		if((in_timearray[0].timeType & 2)== 2) //每天
		{
			parent.g_policy_logonforbid_detail.rangetime = "每天：  "
				+in_timearray[0].dayBeginTime + "  至   "
				+in_timearray[0].dayEndTime;
			if(in_timearray.length>1)
			{
				parent.g_policy_logonforbid_detail.rangetime += "; \t  "
					+in_timearray[1].dayBeginTime + "  至   "
					+in_timearray[1].dayEndTime;
			}
		}
		else
		{
			parent.g_policy_logonforbid_detail.rangetime = "";
		}
		if((in_timearray[0].timeType & 8)== 8) //每月
		{
			parent.g_policy_logonforbid_detail.rangeday = "每月："
				+in_timearray[0].monthBeginDay + "日   至   "
				+in_timearray[0].monthEndDay + "日  ";
		}
		else
		{
			parent.g_policy_logonforbid_detail.rangeday = "";
		}
		if((in_timearray[0].timeType & 4)== 4) //每周
		{
			parent.g_policy_logonforbid_detail.rangeweek = "每周："
				+getWeekDayByNumber(in_timearray[0].weekBeginDay) + "  至   "
				+getWeekDayByNumber(in_timearray[0].weekEndDay);
		}
		else
		{
			parent.g_policy_logonforbid_detail.rangeweek = "";
		}
	}
}
function getWeekDayByNumber(in_num)
{
	var day="";
	switch(in_num)
	{
		case 0:
			day="周日";
			break;
		case 1:
			day="周一";
			break;
		case 2:
			day="周二";
			break;
		case 3:
			day="周三";
			break;
		case 4:
			day="周四";
			break;
		case 5:
			day="周五";
			break;
		case 6:
			day="周六";
			break;
	}
	return day;
}
/*
 * 根据checkbox的选中情况生成一个数值，toCheckTheCheckbox的反函数
 * 
 * 传入参数：
 * 
 * in_checkboxCNT: 多选框控件个数
 * in_checkboxID:多选框ID属性，最后一位（或多位）为第几个，传入时不传入：
 * 如checkbox_0;checkbox_1;checkbox_2... 传入值为”checkbox_“
 * 
 * 返回值：
 * out_number：传入的数值（0~(2^in_checkboxCNT)-1）
 */
function toCreateNumberByCheckbox(in_checkboxCNT,in_checkboxID)
{
	var out_number = 0;
	for(var i=0;i<in_checkboxCNT;i++)
	{
		if(document.getElementById(in_checkboxID+i).checked==true)
		{
			out_number |= Math.pow(2,i);
		}
	}
	return out_number;
}

function getDateTimeConditionFromWidget(in_twoday)
{
	var AcTimeForRule = new Object();
	AcTimeForRule.dbfwId = parent.getCurrentDbfwId();      // 安全实例ID
	AcTimeForRule.dbId = parent.getCurrentDatabaseId();      // 数据库ID
	
	AcTimeForRule.timeType = toCreateNumberByCheckbox(4,"datetimecondition_");      //0~15  时间类型；0-时间范围； 1-每天； 2-每周； 3-每月
	if(document.getElementById("datetimecondition_0").checked==true)
	{
		AcTimeForRule.rangeBeginTime = document.getElementById("input_rule_frdate").value + " " +document.getElementById("select_rule_frhour").value+":00:00";      // 起始时间（格式'yyyy-mm-dd hh24:MM:ss'）；当timeType==0时有效
		AcTimeForRule.rangeEndTime = document.getElementById("input_rule_todate").value + " " +document.getElementById("select_rule_tohour").value+":00:00";       // 终止时间（格式'yyyy-mm-dd hh24:MM:ss'）；当timeType==0时有效
	}
	else
	{
		AcTimeForRule.rangeBeginTime = null;      // 起始时间（格式'yyyy-mm-dd hh24:MM:ss'）；当timeType==0时有效
		AcTimeForRule.rangeEndTime = null;       // 终止时间（格式'yyyy-mm-dd hh24:MM:ss'）；当timeType==0时有效
	}
	
	if(document.getElementById("datetimecondition_1").checked==true)
	{
		if(in_twoday == 1)
		{
			AcTimeForRule.dayBeginTime = document.getElementById("condition_frtime_n").value;      // 每天起始时间（格式'hh24:MM:ss'）；
			AcTimeForRule.dayEndTime = document.getElementById("condition_totime_n").value;      // 每天终止时间（格式'hh24:MM:ss'）；
		}
		else
		{
			AcTimeForRule.dayBeginTime = document.getElementById("condition_frtime").value;      // 每天起始时间（格式'hh24:MM:ss'）；
			AcTimeForRule.dayEndTime = document.getElementById("condition_totime").value;      // 每天终止时间（格式'hh24:MM:ss'）；
		}
			
	}
	else
	{
		AcTimeForRule.dayBeginTime = null;      // 每天起始时间（格式'hh24:MM:ss'）；
		AcTimeForRule.dayEndTime = null;      // 每天终止时间（格式'hh24:MM:ss'）；
	}
	if(document.getElementById("datetimecondition_2").checked==true)
	{
		AcTimeForRule.weekBeginDay = document.getElementById("condition_frweek").value;      // 每天起始时间（格式'hh24:MM:ss'）；
		AcTimeForRule.weekEndDay = document.getElementById("condition_toweek").value;      // 每天终止时间（格式'hh24:MM:ss'）；
	}
	else
	{
		AcTimeForRule.weekBeginDay = -1;      // 每周的起始天（范围1~7）；当timeType==2时有效
		AcTimeForRule.weekEndDay = -1;      // 每周的终止天（范围1~7）；当timeType==2时有效
	}
	if(document.getElementById("datetimecondition_3").checked==true)
	{
		AcTimeForRule.monthBeginDay = document.getElementById("condition_frday").value;      // 每天起始时间（格式'hh24:MM:ss'）；
		AcTimeForRule.monthEndDay = document.getElementById("condition_today").value;      // 每天终止时间（格式'hh24:MM:ss'）；
	}
	else
	{
		AcTimeForRule.monthBeginDay = -1;      // 每月的起始天（范围1~7）；当timeType==3时有效
		AcTimeForRule.monthEndDay = -1;      // 每月的终止天（范围1~7）；当timeType==3时有效
	}
	
	AcTimeForRule.op = 0;      // 前台界面对其进行的操作（设置规则时使用）；0-无操作；1-修改；2-删除
	AcTimeForRule.ruleId = 0;      // 规则ID
	AcTimeForRule.id = 0;      // ID
	return AcTimeForRule;
}
 
function checkTimeWidgetIfSetValue()
{
	var ret=0;
	if(document.getElementById("datetimecondition_2").checked==true)
	{
		if(document.getElementById("condition_frweek").value==-1 || document.getElementById("condition_toweek").value==-1)
		{
			document.getElementById("condition_frweek").style.borderColor = "red";
			document.getElementById("condition_toweek").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("condition_frweek").style.borderColor = "";
			document.getElementById("condition_toweek").style.borderColor = "";
		}
	}
	if(document.getElementById("datetimecondition_3").checked==true)
	{
		if(document.getElementById("condition_frday").value==-1 || document.getElementById("condition_today").value==-1)
		{
			document.getElementById("condition_frday").style.borderColor = "red";
			document.getElementById("condition_today").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("condition_frday").style.borderColor = "";
			document.getElementById("condition_today").style.borderColor = "";
		}
	}
	if(document.getElementById("datetimecondition_0").checked==true)
	{
		if(document.getElementById("select_rule_frhour").value==-1 || document.getElementById("select_rule_tohour").value==-1)
		{
			document.getElementById("select_rule_frhour").style.borderColor = "red";
			document.getElementById("select_rule_tohour").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("select_rule_frhour").style.borderColor = "";
			document.getElementById("select_rule_tohour").style.borderColor = "";
		}
		if(document.getElementById("input_rule_frdate").value.length<10)
		{
			document.getElementById("input_rule_frdate").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("input_rule_frdate").style.borderColor = "";
		}
		if(document.getElementById("input_rule_todate").value.length<10)
		{
			document.getElementById("input_rule_todate").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("input_rule_todate").style.borderColor = "";
		}
	}
	if(document.getElementById("datetimecondition_1").checked==true)
	{
		if(document.getElementById("condition_frtime").value.length<8)
		{
			document.getElementById("condition_frtime").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("condition_frtime").style.borderColor = "";
		}
		if(document.getElementById("condition_totime").value.length<8)
		{
			document.getElementById("condition_totime").style.borderColor = "red";
			ret=1;
		}
		else
		{
			document.getElementById("condition_totime").style.borderColor = "";
		}
		if(document.getElementById("datetimecondition_n").checked==true)
		{
			if(document.getElementById("condition_frtime_n").value.length<8)
			{
				document.getElementById("condition_frtime_n").style.borderColor = "red";
				ret=1;
			}
			else
			{
				document.getElementById("condition_frtime_n").style.borderColor = "";
			}
			if(document.getElementById("condition_totime_n").value.length<8)
			{
				document.getElementById("condition_totime_n").style.borderColor = "red";
				ret=1;
			}
			else
			{
				document.getElementById("condition_totime_n").style.borderColor = "";
			}
		}
		else
		{
			document.getElementById("condition_totime_n").style.borderColor = "";
			document.getElementById("condition_frtime_n").style.borderColor = "";
		}
	}
	return ret;
}
/*
 * 限定区间段的两个控件的值，起始值必须小于终止值
 * 
 * 传入参数：
 * in_widgetID_start：起始值控件ID
 * in_widgetID_end: 终止值控件ID
 * 
 */
function toCheckWhichRange(in_widgetID_start,in_widgetID_end)
{
	
	if(document.getElementById(in_widgetID_start).value==-1 )
	{
		for(var i=0;i<document.getElementById(in_widgetID_end).options.length;i++)
		{
			document.getElementById(in_widgetID_end).options[i].disabled=false;
		}
	}
	else
	{
		if(document.getElementById(in_widgetID_start).name=="date-time")
		{
			if(document.getElementById("input_rule_frdate").value <document.getElementById("input_rule_todate").value)
			{
				for(var i=0;i<document.getElementById(in_widgetID_end).options.length;i++)
				{
					document.getElementById(in_widgetID_end).options[i].disabled=false;
				}
			}
			else
			{
				for(var i=0;i<document.getElementById(in_widgetID_end).options.length;i++)
				{
					if(parseInt(document.getElementById(in_widgetID_end).options[i].value) <= parseInt(document.getElementById(in_widgetID_start).value) && parseInt(document.getElementById(in_widgetID_end).options[i].value)!=-1)
					{
						document.getElementById(in_widgetID_end).options[i].disabled=true;
					}
					else
					{
						document.getElementById(in_widgetID_end).options[i].disabled=false;
					}
				}
			}
		}
		else
		{
			for(var i=0;i<document.getElementById(in_widgetID_end).options.length;i++)
			{
				if(parseInt(document.getElementById(in_widgetID_end).options[i].value) < parseInt(document.getElementById(in_widgetID_start).value) && parseInt(document.getElementById(in_widgetID_end).options[i].value)!=-1)
				{
					document.getElementById(in_widgetID_end).options[i].disabled=true;
				}
				else
				{
					document.getElementById(in_widgetID_end).options[i].disabled=false;
				}
			}
		}
	}
	if(document.getElementById(in_widgetID_end).value==-1 )
	{
		for(var i=0;i<document.getElementById(in_widgetID_start).options.length;i++)
		{
			document.getElementById(in_widgetID_start).options[i].disabled=false;
		}
	}
	else
	{
		if(document.getElementById(in_widgetID_end).name=="date-time")
		{
			if(document.getElementById("input_rule_frdate").value <document.getElementById("input_rule_todate").value)
			{
				for(var i=0;i<document.getElementById(in_widgetID_start).options.length;i++)
				{
					document.getElementById(in_widgetID_start).options[i].disabled=false;
				}
			}
			else
			{
				for(var i=0;i<document.getElementById(in_widgetID_start).options.length;i++)
				{
					if(parseInt(document.getElementById(in_widgetID_start).options[i].value) >= parseInt(document.getElementById(in_widgetID_end).value))
					{
						document.getElementById(in_widgetID_start).options[i].disabled=true;
					}
					else
					{
						document.getElementById(in_widgetID_start).options[i].disabled=false;
					}
				}
			}
		}
		else
		{
			for(var i=0;i<document.getElementById(in_widgetID_start).options.length;i++)
			{
				if(parseInt(document.getElementById(in_widgetID_start).options[i].value) > parseInt(document.getElementById(in_widgetID_end).value))
				{
					document.getElementById(in_widgetID_start).options[i].disabled=true;
				}
				else
				{
					document.getElementById(in_widgetID_start).options[i].disabled=false;
				}
			}
		}
	} 
}
