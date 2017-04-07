/*
 * 控制同一页面上的多个DIV的显示
 * 须指定要控制的div为相同的name
 * 传入参数：



 * TheDisplayDivID：要显示的DIV的id
 * current_direction:要设置的当前路径信息
 */
function getTheDivDisplay(TheDisplayDivID,current_direction)
{
//	var basedivlist=document.getElementsByName("basediv");
	var basedivlist=$("[name='basediv']");
	
	for(var i=0;i<basedivlist.length;i++)
	{
	   if(basedivlist[i].id == TheDisplayDivID)
	   {
		   document.getElementById(basedivlist[i].id).style.display="block";
	//	   document.getElementById(basedivlist[i].id).style.height="100%";
		}
	   else
	   {
		   document.getElementById(basedivlist[i].id).style.display="none";
	//	   document.getElementById(basedivlist[i].id).style.height="0px";
		}
	}
	if(current_direction.length > 0)
	{
		$(cur_direction).text(current_direction);
	}
}

/*
 * 删除table中某对象所在的TR
 * 传入参数：


 * in_table：对象所在table的tableID
 * in_obj：对象的id
 */
function removeAnRowFromTable(in_table,in_obj)
{
	document.getElementById(in_table).tBodies[0].removeChild(in_obj.parentNode.parentNode);
}

/*
 * 删除table中指定的起始行的TR
 * 传入参数：


 * in_table：对象所在table的tableID
 * in_startrow：起始行
 * in_endrow：截止行
 */
function removeAllDataRowsFromTable(in_tableid,in_startrow,in_endrow)
{
	var v_table =document.getElementById(in_tableid);
	while(v_table.rows.length > in_startrow && v_table.rows.length > 0)
	{
		if(v_table.rows.length >= in_endrow)
		{
			v_table.deleteRow((v_table.rows.length - in_endrow));
		}
		else
		{
			v_table.deleteRow(v_table.rows.length);
		}	
	}
}
/*
 * 清除DIV上的所有对象

 * 
 * 传入参数：
 * divid：要删除所有对象的DIV的id


 */
function removeAllObjFromDiv(divid)
{
	var curdiv = document.getElementById(divid); 
	var cnt=curdiv.children.length;
	var rmchild;
	for(var x=0;rmchild=curdiv.children[x];)
	{
		curdiv.removeChild(rmchild);
	}
}

/*
 * 确认对话框

 * 
 * 传入参数：
 * msgInfo：要显示的确认信息
 * 返回值：



 * 1-确定（true）
 * 0-取消（false）
 */
function optionConfirm(msgInfo)
{
	if(confirm(msgInfo) == true){     //如果用户单击了确定按钮 
		return 1;
	} 
	else{ 
		return 0;     //如果用户单击了取消按钮

	}
}

/*
 * 控制页面中 控件的disabled
 * 须指定要控制的控件为相同的name
 * 传入参数：



 * in_conditionID：选择控件的id,如checkbox的ID
 * in_name:要控制的控件name属性值
 */
function enableConditionWidget(in_conditionID,in_name)
{
	if(document.getElementById(in_conditionID).checked == true)
	{
		$("[name='"+in_name+"']").attr("disabled",false);
	}
	else
	{
		$("[name='"+in_name+"']").attr("disabled",true);
	}
}



/*将用户信息载入表格*/

function loadTableuserList()
{
	var datacentense = "";
	for(var i=0;i<g_AcUserForRule.length;i++)
	{
		datacentense += "<tr>";
		if(g_AcUserForRule[i].op==2)
		{
			datacentense += "<td  align='left' class='sql_all' style='color:red;text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcUserForRule[i].userName+"'> "+g_AcUserForRule[i].userName +"</td>";
			datacentense += "<td align='center' class='Col30per' style='color:red;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+numberConvertToChinese(1,g_AcUserForRule[i].sysUser)+"</td>";
		}
		if(g_AcUserForRule[i].op==3)
		{
			datacentense += "<td align='left' class='sql_all' style='color:green;text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcUserForRule[i].userName+"'> "+g_AcUserForRule[i].userName +"</td>";
			datacentense += "<td align='center' class='Col30per' style='color:green;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+numberConvertToChinese(1,g_AcUserForRule[i].sysUser)+"</td>";
		}
		if(g_AcUserForRule[i].op!=3 && g_AcUserForRule[i].op !=2)
		{
			datacentense += "<td align='left' class='sql_all' style='text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcUserForRule[i].userName+"'> "+g_AcUserForRule[i].userName +"</td>";
			datacentense += "<td align='center' class='Col30per' style='border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+numberConvertToChinese(1,g_AcUserForRule[i].sysUser)+"</td>";
		}
		datacentense += "</tr>";
	}
	removeAllDataRowsFromTable("table_dbuserlist",0,1);
	$(table_dbuserlist).append(datacentense);
	$("tr:odd").addClass("a1");
}
/*将客户端程序信息载入表格*/

function loadTableAppList()
{
	var appdatacentense = "";
	for(var i=0;i<g_AcAppForRule.length;i++)
	{
		appdatacentense += "<tr>";
		if(g_AcAppForRule[i].op==2)
		{
			appdatacentense += "<td align='left' class='sql_all' style='color:red;text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcAppForRule[i].appName+"'> "+g_AcAppForRule[i].appName+"</td>";
			appdatacentense += "<td align='center' class='Col30per' style='color:red;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+appType(g_AcAppForRule[i].appType)+"</td>";
		}
		if(g_AcAppForRule[i].op==3)
		{
			appdatacentense += "<td align='left' class='sql_all' style='color:green;text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcAppForRule[i].appName+"'> "+g_AcAppForRule[i].appName+"</td>";
			appdatacentense += "<td align='center' class='Col30per' style='color:green;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+appType(g_AcAppForRule[i].appType)+"</td>";
		}
		if(g_AcAppForRule[i].op!=2 && g_AcAppForRule[i].op!=3)
		{
			appdatacentense += "<td align='left' class='sql_all' style='text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcAppForRule[i].appName+"'> "+g_AcAppForRule[i].appName+"</td>";
			appdatacentense += "<td align='center' class='Col30per' style='border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+appType(g_AcAppForRule[i].appType)+"</td>";
		}
		appdatacentense += "</tr>";
	}
	removeAllDataRowsFromTable("table_applist",0,1);
	$(table_applist).append(appdatacentense);
	$("tr:odd").addClass("a1");
}
/*将数据库对象信息载入表格*/

function loadDBObjectList()
{
	var appdatacentense = "";
	for(var i=0;i<g_AcObject.length;i++)
	{
		appdatacentense += "<tr>";
		appdatacentense += "<td align='center' class='sql_all' style='width:35%;text-indent:15px;border-width:0px 0px 1px 0px;font-family:微软雅黑;' title='"+g_AcObject[i].schemaName+"'>"+g_AcObject[i].schemaName+"</td>";
		appdatacentense += "<td align='center' style='width:15%;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+range(g_AcObject[i].isSysObject)+"</td>";
		appdatacentense += "<td align='center' class='sql_all' style='width:35%;border-width:0px 1px 1px 1px;font-family:微软雅黑;' title='"+g_AcObject[i].objectName+"'>"+g_AcObject[i].objectName+"</td>";
		appdatacentense += "<td align='center' style='width:15%;border-width:0px 1px 1px 1px;font-family:微软雅黑;'>"+objtype(g_AcObject[i].objectType)+"</td>";
		appdatacentense += "</tr>";
	}
	removeAllDataRowsFromTable("table_applist",0,1);
	$(table_applist).append(appdatacentense);
	$("tr:odd").addClass("a1");
}
//规则类型；1-SQL注入，2-缓冲区溢出，3-权限提升，4-数据漏洞，5-拒绝服务，6-访问操作系统，7-缺省密码
//，8-改密码，9-Bypass FGA，10-修改FGA，11-审计，12-越权，13-游标注入，14-访问敏感组件，15-创建内部JOB，
//16-文件崩溃，17-目录遍历，18-恶意代码，19-VAT，20-非系统用户执行命令，21-未知



function leakType(i)
{
	var leakType = new Array();
	leakType[1]="系统注入";
	leakType[2]="缓冲区溢出";
	leakType[3]="权限提升";
	leakType[4]="数据泄漏";
	leakType[5]="拒绝服务";
	leakType[6]="访问操作系统";
	leakType[7]="缺省密码";
	leakType[8]="改密码";
	leakType[9]="Bypass FGA";
	leakType[10]="修改FGAC";
	leakType[11]="审计";
	leakType[12]="越权";
	leakType[13]="游标注入";
	leakType[14]="访问敏感组件";
	leakType[15]="创建外部JOB";
	leakType[16]="文件崩溃";
	leakType[17]="目录遍历";
	leakType[18]="恶意代码";
	leakType[19]="VAT";
	leakType[20]="非系统用户执行命令";

	leakType[22]="未知类型";
	
	return leakType[i];
}


/*
 * 创建"更多..."超链接

 */
function createMoreItem(entities) {
	var moreItem = document.createElement("A");
	moreItem.innerText = "\u66f4\u591a...";
	moreItem.textContent = "\u66f4\u591a..."; // 兼容FF
	moreItem.href = "javascript:;";
	moreItem.onclick = function () {
	};
	return moreItem;
}
/**
 * 创建【更多...】回调

 */
function createMoreCallback(titleValue, queryParam, winHeight, winWidth) {
	return function () {
		// 点击【更多...】时调用

		var table = openItemsChooseWindow(queryParam[0].titleName, titleValue, queryParam, [queryParam[0].titleName], [function (obj) {
			return obj.displayName;
		}], queryParam[0].displayTypeName, function (obj) {
			return obj.displayName;
		}, function (checked, unchecked) {
			document.getElementById("table_sqloption_" + titleValue).setChecked(checked, true);
			document.getElementById("table_sqloption_" + titleValue).setChecked(unchecked, false);
			closeWindow(titleValue);
		}, winHeight, winWidth);
		table.setChecked(document.getElementById("table_sqloption_" + titleValue).getSelectionDatas(), true);
		table.setChecked(document.getElementById("table_sqloption_" + titleValue).getUnselectionDatas(), false);
	};
}
/**
 * 打开选择窗口

 */
function openItemsChooseWindow(windowTitle, windowId, objects, colNames, callbacks, type, idCallback, clickCallback, winHeight, winWidth ,colWidth,selectedValue) {
	// 确定按钮

	var btnOK = createWindowOKButton();
	// 取消按钮

	var btnCancel = createWindowCancelButton(windowId);
	// 如果过滤后的结果为空，则确认按钮变灰

	var emptyControl = function (entities) {
		if (entities.length === 0) {
			btnOK.disabled = true;
		} else {
			btnOK.disabled = false;
		}
	};
	// 带过滤的表格

	var filterTable = createFilterTableDiv(windowId, objects, colNames, callbacks, type, idCallback, function (entities) {
		if (entities.length === 0) {
			btnOK.disabled = true;
		} else {
			btnOK.disabled = false;
		}
	},colWidth,selectedValue);//增加自动选择
	filterTable.id = "FILTER_ID_" + windowId;
	var int_w = parseInt(winWidth ? (winWidth + "").trim().replace("px", "") : "550px");
	var int_h = parseInt(winHeight ? (winHeight + "").trim().replace("px", "") : "400px");
	winWidth = int_w + "px";
	winHeight = int_h + "px";
	if(winWidth && winHeight){
		filterTable.setSize((int_h - 100) + "px",(int_w - 10) + "px");
	}
	//
	btnOK.onclick = function () {
		// 确定事件处理

		var selections = filterTable.getChecked();
		var unselections = filterTable.getUnchecked();
		if (clickCallback) {
			clickCallback(selections, unselections);
		}
	};
	// 添加按钮 “确定、取消”

	filterTable.appendChild(btnOK);
	filterTable.appendChild(btnCancel);
	// 打开窗口

	showWindow(windowTitle, filterTable, winWidth, winHeight, true, true, windowId);
	//
	return filterTable;
}
/**
 * 创建弹出窗口的确定按钮

 */
function createWindowOKButton() {
	var btnOK = document.createElement("input");
	btnOK.type = "button";
	btnOK.style.width = "60px";
	btnOK.value = "\u786e\u5b9a";
	btnOK.style.marginTop = "10px";
	return btnOK;
}
/**
 * 创建弹出窗口的取消按钮

 */
function createWindowCancelButton(windId) {
	var btnCancel = document.createElement("input");
	btnCancel.type = "button";
	btnCancel.style.width = "60px";
	btnCancel.value = "\u53d6\u6d88";
	btnCancel.style.marginTop = "10px";
	btnCancel.style.marginLeft = "14px";
	btnCancel.onclick = function () {
		closeWindow(windId);
		if ($("#Loading")) {
			closeWindow("Loading");
		}
	};
	return btnCancel;
}

function containtsOption(arr, option){
	for (i = 0; i < arr.length && arr[i].displayName != option.displayName; i++) {
	}
	return !(i == arr.length);
}

function DBType(in_kind)
{
	
	var db_name="";
	switch(in_kind+"")
	{
	case "1":
		db_name="Oracle";
	    break;
	case "2":
		db_name="SQLServer";
	    break;
	case "3":
		db_name="DB2";
	    break;
	case "4":
		db_name="MySQL";
	    break;
	case "5":
		db_name="PostgreSQL";
	    break;
	case "6":
		db_name="Sybase";
	    break;
	case "7":
		db_name="Teradata";
	    break;
	case "8":
		db_name="";
	    break;
	case "10":
		db_name="DM";
	    break;
	case "12":
		db_name="GBASE";
	    break;
	default:
	}
	return db_name;
}
/**
 * 策略管理，规则列表页的根据安全级别设定图片
 * @param i 安全级别 1-低，3-中，5-高


 * @return
 */
function listPage_Level(i)
{
	if(i==1)
	{
		g_low += 1;
		
		return "<img src='"+PREFIX_PATH+"/images/low.gif' style='width:16px;height:16px;vertical-align: middle;'>";
	}
	if(i==3)
	{
		g_middle += 1;
		return "<img src='"+PREFIX_PATH+"/images/middle.gif' style='width:16px;height:16px;vertical-align: middle;'>";
	}
	if(i==5)
	{
		g_high += 1;
		return "<img src='"+PREFIX_PATH+"/images/high.gif' style='width:16px;height:16px;vertical-align: middle;'>";
	}
	if(i==0)
	{
		g_is_audit += 1;
		return "仅审计";

	}
	if(i!=1 && i!=3 && i!=5 && i!=0)
	{
		return "";
	}
}

/**
 * 策略管理，规则详细信息页的根据安全级别设定图片

 * @return
 */
function detailPage_Level()
{
	if(parent.g_policy_logonforbid_detail.riskLevel==5)
	{
		$(rule_level)[0].src=PREFIX_PATH+"/images/high.gif";
	}
	if(parent.g_policy_logonforbid_detail.riskLevel==3)
	{
		$(rule_level)[0].src=PREFIX_PATH+"/images/middle.gif";
	}
	if(parent.g_policy_logonforbid_detail.riskLevel==1)
	{
		$(rule_level)[0].src=PREFIX_PATH+"/images/low.gif";
	}
	if(parent.g_policy_logonforbid_detail.riskLevel != 1 && parent.g_policy_logonforbid_detail.riskLevel != 3 && parent.g_policy_logonforbid_detail.riskLevel != 5)
	{
		$(rule_level)[0].style.display="none";
	}
	
	if(parent.g_policy_logonforbid_detail.resultDelivery==1)
	{
		$(rule_notice)[0].src=PREFIX_PATH+"/images/check_16.png";
	}
	else
	{
	//	$(rule_notice)[0].style.display="none";
		$(rule_notice)[0].src=PREFIX_PATH+"/images/uncheck_16_red.png";
	}
	
	if(parent.g_policy_logonforbid_detail.resultAlarmAudit==1)
	{
		$(rule_audit)[0].src=PREFIX_PATH+"/images/check_16.png";
	}
	else
	{
	//	$(rule_audit)[0].style.display="none";
		$(rule_audit)[0].src=PREFIX_PATH+"/images/uncheck_16_red.png";
	}
	if(parent.g_policy_logonforbid_detail.state==1)
	{
		$(rule_enable)[0].src=PREFIX_PATH+"/images/check_16.png";
	}
	else
	{
	//	$(rule_enable)[0].style.display="none";
		$(rule_enable)[0].src=PREFIX_PATH+"/images/uncheck_16_red.png";
	}
}

function setDetailPageTimes()
{
	if(parent.g_policy_logonforbid_detail.rangedatetime.length>0)
	{
		$(rule_rangedate)[0].style.display="block";
		$(rule_rangedate).text(parent.g_policy_logonforbid_detail.rangedatetime);
	}
	else
	{
		$(rule_rangedate)[0].style.display="none";
	}
	if(parent.g_policy_logonforbid_detail.rangetime.length>0)
	{
		$(rule_rangetime)[0].style.display="block";
		$(rule_rangetime).text(parent.g_policy_logonforbid_detail.rangetime);
	}
	else
	{
		$(rule_rangetime)[0].style.display="none";
	}
	if(parent.g_policy_logonforbid_detail.rangeday.length>0)
	{
		$(rule_rangeday)[0].style.display="block";
		$(rule_rangeday).text(parent.g_policy_logonforbid_detail.rangeday);
	}
	else
	{
		$(rule_rangeday)[0].style.display="none";
	}
	if(parent.g_policy_logonforbid_detail.rangeweek.length>0)
	{
		$(rule_rangeweek)[0].style.display="block";
		$(rule_rangeweek).text(parent.g_policy_logonforbid_detail.rangeweek);
	}
	else
	{
		$(rule_rangeweek)[0].style.display="none";
	}
}

function checkedTheAlertByRiskLevel(in_riskLevel)
{
	showLoadingDialog();
	RiskActionsConfigService.getRiskActionsConfig(parent.getCurrentDbfwId(),parent.getCurrentDatabaseId(),
	{
		callback:function (RiskActionsConfig )
		{
			for(var i=0;i<RiskActionsConfig.actionRules.length;i++)
			{
				if(in_riskLevel ==RiskActionsConfig.actionRules[i].riskLevel)
				{
					//告警通知

					if(RiskActionsConfig.actionRules[i].resultDelivery==1)
					{
						document.getElementById("alert_notice").checked=true;
					}
					else
					{
						document.getElementById("alert_notice").checked=false;
					}
					//告警审计

					if(RiskActionsConfig.actionRules[i].resultAlarmAudit==1)
					{
						document.getElementById("alert_audit").checked=true;
					}
					else
					{
						document.getElementById("alert_audit").checked=false;
					}
				}
			}
			closeLoadingDialog();
		},
		errorHandler:function(e){
			closeLoadingDialog();
			showExceptionDialog(e);
		}
	});
}
function checkedTheIgnore()
{
	showLoadingDialog();
	RiskActionsConfigService.getRiskActionsConfig(parent.getCurrentDbfwId(),parent.getCurrentDatabaseId(),
	{
		callback:function (RiskActionsConfig )
		{
			for(var i=0;i<RiskActionsConfig.ignoreRules.length;i++)
			{
				if(RiskActionsConfig.ignoreRules[i].ignoreType==3)
				{
					//不审计

					if(RiskActionsConfig.ignoreRules[i].ignoreEnable==0)
					{
						document.getElementById("audit_enable").checked=true;
					}
					else
					{
						document.getElementById("audit_enable").checked=false;
					}
				}
			}
			closeLoadingDialog();
		},
		errorHandler:function(e){
			closeLoadingDialog();
			showExceptionDialog(e);
		}
	});
}
/////////////////////////////////
//将十进制转换为2进制    

function toBin(intNum) {  
    var answer = "";  
    if(/\d+/.test(intNum)) {  
      while(intNum != 0) {  
        answer = Math.abs(intNum%2)+answer;  
        intNum = parseInt(intNum/2);  
      }  
      if(answer.length == 0)  
        answer = "0";  
      return answer;  
    } else {  
      return 0;  
    }  
}  

// 返回num个0的字符串拼接  

function addZero (num)  
{  
   var result = '';  
   for ( i=0;i<num; i++ )  
   {  
       result = result+'0';  
   }  
   return result;  
}  
 
// 大数值按位与  

function bigIntAnd(str1,str2)  
{  
     var result = '';  
     str1 = toBin(str1);  
     str2 = toBin(str2);  
     if(str1.length < str2.length)  
     {  
           var temp = str1;  
           str1 = str2;  
           str2 = temp;  
     }  
     str2 = addZero(str1.length - str2.length) + str2;  
     for (i = str2.length - 1 ;i >= 0;i--)  
     {  
         result = ((str1.charAt(i)=='1' && str2.charAt(i)=='1') ? '1' : '0') + result;  
     }  
     return parseInt(result,2);  
}  
//大数值按位或  

function  bigIntOr(str1,str2)  
{  
     var result = '';  
     str1 = toBin(str1);  
     str2 = toBin(str2);  
     if(str1.length < str2.length)  
     {  
           var temp = str1;  
           str1 = str2;  
           str2 = temp;  
     }  
     str2 = addZero(str1.length - str2.length) + str2;  
      

     for (i = str2.length - 1 ;i >= 0;i--)  
     {  
        result = ((str1.charAt(i)=='1' || str2.charAt(i)=='1') ? '1' : '0') + result;  
     }  
     result = str1.substring (0,str1.length - str2.length) +result;  
     return parseInt(result,2);  
} 

// 获取选定的详细风险级别

function getDetailRiskLevel()
{
	for(var i=0;i<8;i++)
	{
		if(document.getElementById("level_grade_detail_"+i).checked)
			{
				return i;
			}
	}
}

// 详细风险级别显示控制 输入：0高1中2低3仅审计

function displayDetailRiskLevel(in_level)
{
	for(var i=0;i<4;i++)
		{
			if(i==in_level && parent.parent.ifTest()==1)
				{
					document.getElementById("span_risk_detail_"+i).style.display="inline";
				}
			else
				{
					document.getElementById("span_risk_detail_"+i).style.display="none";
				}
		}
	if(in_level==0)
	{
		document.getElementById("level_grade_detail_0").checked=true;
	}
	if(in_level==1)
	{
		document.getElementById("level_grade_detail_2").checked=true;
	}
	if(in_level==2)
	{
		document.getElementById("level_grade_detail_4").checked=true;
	}
	if(in_level==3)
	{
		document.getElementById("level_grade_detail_6").checked=true;
	}
	if(parent.parent.ifTest()==1)
	{
		document.getElementById("span_risk_detail").checked=true;
	}
	if(in_level==3)
	{
		document.getElementById("level_grade_detail_6").checked=true;
	}
}

function loadDetailRiskLevel()
{
	if(parent.parent.ifTest()==1)
	{
		document.getElementById("span_risk_detail").style.display="inline";
		document.getElementById("span_risk_detail_0").style.display="inline";
		document.getElementById("span_risk_detail_1").style.display="inline";
		document.getElementById("span_risk_detail_2").style.display="inline";
		document.getElementById("span_risk_detail_3").style.display="inline";
	}
	else
	{
		document.getElementById("span_risk_detail").style.display="none";
		document.getElementById("span_risk_detail_0").style.display="none";
		document.getElementById("span_risk_detail_1").style.display="none";
		document.getElementById("span_risk_detail_2").style.display="none";
		document.getElementById("span_risk_detail_3").style.display="none";
	}
}

function f_detailLevel(in_level)
{
	var detailLevel = new Array();
	detailLevel[0]="详细风险等级：紧急"
	detailLevel[1]="详细风险等级：警报";
	detailLevel[2]="详细风险等级：关键";
	detailLevel[3]="详细风险等级：错误";
	detailLevel[4]="详细风险等级：警告";
	detailLevel[5]="详细风险等级：通知";
	detailLevel[6]="详细风险等级：信息";
	detailLevel[7]="详细风险等级：调试"

	return detailLevel[in_level];
}
//////////////////////////////
