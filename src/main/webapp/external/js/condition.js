
/*
 * 超过指定的行数，多出的内容将被隐藏
 */
var hideLimit = 2;
/*
 * 创建分析助手页，标题和input
 */
function createEntityDiv(id, title, entities, callback, moreCallback, colNum, style) {
	if (!colNum) {
		// 默认值为5列
		colNum = 5;
		hideLimit = 2;
	}
	if (colNum != 5) {
		hideLimit = 5;
	}
	// 排序
	ftt_sortEntities(entities);

	// 创建一个条件
	var condition = $("<div id='" + id + "' class='row-condition " + style + "'></div>");
	// 条件的标题
	condition.append("<div class='row-condition-title " + style + "'><span>" + title + "</span></div>");
	// 条件选项容器
	var container = $("<div class='condition-container'></div>");
	
	if(parent.getKey){
		// 生成新的Key
		var dataKey = parent.getKey();
		// 存储新的条件数据
		parent.putData(dataKey, entities);
		// 更多按钮
		var dataObj = parent.getData(dataKey);
		container.append("<div class='condition-more' title='更多选项' onclick=\"chooseQueryVal('"+id+"','"+dataKey+"','"+title+"');\"><span>... </span><i class='icon-share'></i></div>");
	}
	
	//
	container.appendTo(condition);
	// 条件的选项
	$(entities).each(function (index, entity) {
		container.append(createInput(id, entity, id, callback, index === 0));
		container.append("<label>" + entity.displayName + "</label>");
	});
	/*
	 * 添加各中函数
	 */
	// 添加方法 返回选中的input的data
	condition[0].getSelectionDatas = function () {
		var selections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && inputs[k].checked) {
				selections.push(inputs[k].data);
			}
		}
		return selections;
	};
	// 添加方法 返回未选中的input的data
	condition[0].getUnselectionDatas = function () {
		var unselections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && !inputs[k].checked) {
				unselections.push(inputs[k].data);
			}
		}
		return unselections;
	};
	// 添加方法 返回所有data
	condition[0].getDatas = function () {
		var datas = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name) {
				datas.push(inputs[k].data);
			}
		}
		return datas;
	};
	// 设置选择
	condition[0].setChecked = function (objs, _checked) {
		// 如果数据不可用，则返回
		if (!objs || !objs.length || objs.length < 1) {
			return;
		}
		// 拿到所有data
		var _entities = table.getDatas();
		// 设置选中状态
		for (var k = 0; k < _entities.length; k += 1) {
			for (var j = 0; j < objs.length; j += 1) {
				if (_entities[k].displayName == objs[j].displayName) {
					_entities[k].checked = _checked ? true : false;
					objs[j].checked = _checked ? true : false;
				}
			}
			// 如果是单选按钮，设置其他按钮为未选中
			if (_checked && "radio".equalsIgnoreCase(objs[0].displayTypeName)) {
				if (_entities[k].displayName != objs[0].displayName) {
					_entities[k].checked = false;
				}
			}
		}
		// 排序
		ftt_sortEntities(_entities);
		var index = 0;
		var colNum = content.rows[0].cells.length;
		for (var m = 0; m < _entities.length; m += 1) {
			var _td = content.rows[parseInt(index / colNum)].cells[index % colNum];
			index += 1;
			if (_td.fillType != "ENTITY") {
				_td = content.rows[parseInt(index / colNum)].cells[index % colNum];
				index += 1;
			}
			$(_td).empty();
			ftt_fillTd(_td, id, _entities[m], id, callback, false);
		}
		// 更新全选按钮状态
		(function (_id, _name) {
			ftt_updateCheckAllState(_id, _name);
		})(id, id);
	};
	//
	condition[0].getRightCell = function (index) {
		var rows = content.rows;
		var temp = 0;
		for (var rowNum = 0; rowNum < rows.length; rowNum += 1) {
			if ((temp + rows[rowNum].cells.length) > index) {
				return rows[rowNum].cells[index - temp];
			} else {
				temp += rows[rowNum].cells.length;
			}
		}
		return undefined;
	};
	return condition;
}

/*
 * 创建INPUT
 */
function createInput(id, entity, inputName, callback, firstCell) {
	var input;
	if (document.all && !jQuery.browser.version.startWith("9.") && !jQuery.browser.version.startWith("10.") && !jQuery.browser.version.startWith("11.")) {
		// 如果是IE6 IE6使用常规方式创建将不能正常点击
		input = document.createElement("<input name=" + "INPUT_NAME_" + inputName + ">");
	} else {
		input = document.createElement("input");
		input.name = "INPUT_NAME_" + inputName;
	}
	input.id = "INPUT_ID_" + id + "_" + entity.value;
	input.type = entity.displayTypeName;
	input.value = entity.value;
	$(input).bind("change", function (e) {
		// 更新全选按钮
		(function (_id, _name) {
			ftt_updateCheckAllState(_id, _name);
		})(id, inputName);
		// 回调
		if (callback) {
			callback(e);
		}
	});
	input.data = entity;
	if ("radio".equalsIgnoreCase(entity.displayTypeName)) {
		if (firstCell) {
			// radio 选中第一个
			input.defaultChecked = true;
		} else {
			input.defaultChecked = entity.checked;
		}
	} else {
		if ("checkbox".equalsIgnoreCase(entity.displayTypeName)) {
			input.defaultChecked = entity.checked ? true : false;
		}
	}
	return input;
}

/*
 * 对数据进行排序
 */
function ftt_sortEntities(entities) {
	entities.shellSort(function (e1, e2) {
		if (e1.checked && !e2.checked) {
			return false;
		}
		if (e2.checked && !e1.checked) {
			return true;
		}
		return e1.displayName.localeCompare(e2.displayName);
	});
}

/*
 * 更新全选按钮的状态
 */
function ftt_updateCheckAllState(id, name) {
	var isChecked = true;
	var temp = $("[name=INPUT_NAME_" + name + "]");
	for (var m = 0; m < temp.length; m++) {
		if (!temp[m].checked) {
			isChecked = false;
			break;
		}
	}
	$("#ALL_CHECK_ID_" + id).attr("checked", isChecked);
}
var tempNum=0;
function chooseQueryVal(id,dataKey,title){
	tempNum++;
	var allCheckedArry=new Array();
	$("input[name='INPUT_NAME_"+id+"']:checked").each(function(){
		allCheckedArry.push($(this).val());
	});
	var dataObj = parent.getData(dataKey);
	var msg="<div><input type='text' id='query-val-text_"+id+"' width='130px;'></input><button class='btn btn-small btn-primary' style='margin-left:10px;margin-bottom:10px;' onclick=\"lookQueryVal('"+id+"','"+dataKey+"');\">查找</button><button class='btn btn-small btn-primary' style='margin-left:10px;margin-bottom:10px;' onclick=\"cancelChooseBox('"+id+"');\">取消选择</button></div>";
	msg+="<table  style='width:100%;border:1px;border-collapse: collapse; border-width: 1px; border-color: #D6E3F3;'>";
	msg+="<tr><td style='width: 7%; height: 10px; text-align: center; border-color: #D6E3F3; background-color: #D6E3F3;color:#333333;'>选择</td>";
	msg+="<td style='width:93%; height: 10px; text-align: center; border-color: #D6E3F3; background-color: #D6E3F3;color:#333333;'>条件</td></tr>";
	msg+="</table>";
	msg+="<div style='height: 233px;overflow:auto;'>";
	msg+="<table id='more-query-table_"+id+"' style='width:100%;border:1px;border-collapse: collapse; border-width: 1px; border-color: #D6E3F3;color:#333333'>";
	for(var i=0;i<dataObj.length;i++){
		msg+="<tr><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3;'><input type='checkbox' name='query-check-val' value='"+dataObj[i].param_value+"' ";
		for(var j=0;j<allCheckedArry.length;j++){
			if(dataObj[i].param_value==allCheckedArry[j]){
				msg+="checked='checked'";
				break;
			}
		}
		msg+=" ></input></td><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3; color:#333333;'>"+dataObj[i].param_value+"</td></tr>"
	}
	msg+="</table>";
	msg+="</div>";
	$("div[id='text-query-open"+id+"']").remove();	
	BootstrapDialog.show({
		id : "text-query-open"+id,
		title : '条件查询',
		message : msg,
		type : BootstrapDialog.TYPE_DEFAULT,
		closable : false,
		buttons : [ {
			label : '确定',
			cssClass : 'btn-primary',
			action : function(dialogItself) {
				var allCheckedArry=new Array();
				$("input[name='query-check-val']:checked").each(function(){
					allCheckedArry.push($(this).val());
				});
				if(allCheckedArry.length>10){
					$("#text-query-open"+id).attr("style","z-Index:100000");
					/*$.sDialog.openAlert({
						id:"text-query-alert"+id,
						message : '至少选择一个条件！',
						btn : {
							text : "关闭",
							close : true,
						}
					});*/
					//$("#text-query-alert"+id).attr("style","z-Index:16777271");
					alert("最多选择10个条件！");
				}else{
					var tempObject=new Array();
					for(var i=0;i<dataObj.length;i++){
						for(var j=0;j<allCheckedArry.length;j++){
							if(dataObj[i].param_value==allCheckedArry[j]){
								tempObject.push(dataObj[i]);
								break;
							}
						}
					}
					if(tempObject.length<10){
						for(var i=tempObject.length;i<dataObj.length;i++){
							var tempNum=0;
							for(var j=0;j<allCheckedArry.length;j++){
								if(dataObj[i].param_value!=allCheckedArry[j]){
									tempNum++;
								}
							}
							if(tempNum==allCheckedArry.length){
								tempObject.push(dataObj[i]);
							}
							if(tempObject.length>38){
								break;
							}
						}
					}
					$("#"+id).text("");
					$("#"+id).append(createNewQuery(id,title, tempObject, undefined,5,dataKey));
					/**
					 * 渲染iCheck复选框
					 */
					$("#"+id+" input[type='checkbox']").each(function() {
						var self = $(this), label = self.next(), label_text = label.text();
						label.remove();
						var tempNum=0;
						for(var i=0;i<allCheckedArry.length;i++){
							if(label_text==allCheckedArry[i]){
								tempNum++;
							}
						}
						if(tempNum>0){
							$(this)[0].checked=true;
							self.iCheck({
								checkboxClass : 'icheckbox_line-blue checked ',
								radioClass : 'iradio_line-blue',
								insert : '<div class="icheck_line-icon"></div>' + label_text
							});
						}else{
							self.iCheck({
								checkboxClass : 'icheckbox_line-blue',
								radioClass : 'iradio_line-blue',
								insert : '<div class="icheck_line-icon"></div>' + label_text
							});
						}
					});
				}
				dialogItself.close();
			  }
			},{
				label : '关闭',
				cssClass : 'btn-default',
				action : function(dialogItself) {
					dialogItself.close();
				}
			} ],
			/*onshow : function($dialogItself){
				var width = 700;
				var height =400;
				$dialogItself.$modalBody.css({
					maxHeight: 1000,
					minHeight: height - 100
				});
				$dialogItself.$modal.css({
					width: width,
					minHeight: height,
					marginLeft: -1/2 * width
				});
			}*/
			//修改在低分辨率下页面显示高度
			onshow: function($dialogItself){
				var height = document.body.clientHeight-160;
				$dialogItself.$modalBody.css({
					maxHeight: height - 100
				});
				$dialogItself.$modal.css({
					minHeight: height
				});
			},
		});
	$("#query-val-text_"+id).val("");
	lookQueryVal(id,dataKey);
}

function lookQueryVal(id,dataKey){
	$("#more-query-table_"+id).empty();
	var queryVal="";
	if($("#query-val-text_"+id).length > 0){
		queryVal = $("#query-val-text_"+id).val().trim();
	}
	var msg="";
	var dataObj = parent.getData(dataKey);
	var allCheckedArry=new Array();
	$("input[name='INPUT_NAME_"+id+"']:checked").each(function(){
		allCheckedArry.push($(this).val());
	});
	for(var i=0;i<dataObj.length;i++){
		if(queryVal!=""){
			if(dataObj[i].param_value.indexOf(queryVal)>=0){
				msg+="<tr><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3;'><input type='checkbox' name='query-check-val' value='"+dataObj[i].param_value+"' ";
				for(var j=0;j<allCheckedArry.length;j++){
					if(dataObj[i].param_value==allCheckedArry[j]){
						msg+="checked='checked'";
						break;
					}
				}
				msg+=" ></td><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3;'>"+dataObj[i].param_value+"</td></tr>"
			}
		}else{
			msg+="<tr><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3;'><input type='checkbox' name='query-check-val' value='"+dataObj[i].param_value+"' ";
			for(var j=0;j<allCheckedArry.length;j++){
				if(dataObj[i].param_value==allCheckedArry[j]){
					msg+="checked='checked'";
					break;
				}
			}
			msg+=" ></td><td style='border: 1px solid #D6E3F3;border-collapse: collapse;height: 20px; text-align: center; border-color: #D6E3F3;'>"+dataObj[i].param_value+"</td></tr>"
		}
	}
	$("#more-query-table_"+id).append(msg);
}
function createNewQuery(id, title, entities, callback, colNum,dataKey) {
	if (!colNum) {
		// 默认值为5列
		colNum = 5;
		hideLimit = 2;
	}
	if (colNum != 5) {
		hideLimit = 5;
	}
	// 排序
	ftt_sortEntities(entities);

	// 创建一个条件
	var condition = $("<div id='" + id + "' class='row-condition'></div>");
	// 条件的标题
	condition.append("<div class='row-condition-title'><span>" + title + "</span></div>");
	// 条件选项容器
	var container = $("<div class='condition-container'></div>");
	// 更多按钮
	container.append("<div class='condition-more' title='更多选项' onclick=\"chooseQueryVal('"+id+"','"+dataKey+"','"+title+"');\"><span>... </span><i class='icon-share'></i></div>");
	//
	container.appendTo(condition);
	// 条件的选项
	$(entities).each(function (index, entity) {
		container.append(createInput(id, entity, id, callback, index === 0));
		container.append("<label>" + entity.displayName + "</label>");
	});
	/*
	 * 添加各中函数
	 */
	// 添加方法 返回选中的input的data
	condition[0].getSelectionDatas = function () {
		var selections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && inputs[k].checked) {
				selections.push(inputs[k].data);
			}
		}
		return selections;
	};
	// 添加方法 返回未选中的input的data
	condition[0].getUnselectionDatas = function () {
		var unselections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && !inputs[k].checked) {
				unselections.push(inputs[k].data);
			}
		}
		return unselections;
	};
	// 添加方法 返回所有data
	condition[0].getDatas = function () {
		var datas = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name) {
				datas.push(inputs[k].data);
			}
		}
		return datas;
	};
	// 设置选择
	condition[0].setChecked = function (objs, _checked) {
		// 如果数据不可用，则返回
		if (!objs || !objs.length || objs.length < 1) {
			return;
		}
		// 拿到所有data
		var _entities = table.getDatas();
		// 设置选中状态
		for (var k = 0; k < _entities.length; k += 1) {
			for (var j = 0; j < objs.length; j += 1) {
				if (_entities[k].displayName == objs[j].displayName) {
					_entities[k].checked = _checked ? true : false;
					objs[j].checked = _checked ? true : false;
				}
			}
			// 如果是单选按钮，设置其他按钮为未选中
			if (_checked && "radio".equalsIgnoreCase(objs[0].displayTypeName)) {
				if (_entities[k].displayName != objs[0].displayName) {
					_entities[k].checked = false;
				}
			}
		}
		// 排序
		ftt_sortEntities(_entities);
		var index = 0;
		var colNum = content.rows[0].cells.length;
		for (var m = 0; m < _entities.length; m += 1) {
			var _td = content.rows[parseInt(index / colNum)].cells[index % colNum];
			index += 1;
			if (_td.fillType != "ENTITY") {
				_td = content.rows[parseInt(index / colNum)].cells[index % colNum];
				index += 1;
			}
			$(_td).empty();
			ftt_fillTd(_td, id, _entities[m], id, callback, false);
		}
		// 更新全选按钮状态
		(function (_id, _name) {
			ftt_updateCheckAllState(_id, _name);
		})(id, id);
	};
	//
	condition[0].getRightCell = function (index) {
		var rows = content.rows;
		var temp = 0;
		for (var rowNum = 0; rowNum < rows.length; rowNum += 1) {
			if ((temp + rows[rowNum].cells.length) > index) {
				return rows[rowNum].cells[index - temp];
			} else {
				temp += rows[rowNum].cells.length;
			}
		}
		return undefined;
	};
	return condition;
}
/**
 * 取消弹出框的复选框
 * @return
 */
function cancelChooseBox(){
	$("input[name='query-check-val']:checked").each(function(){
		$(this)[0].checked=false;
	});
}
/*
 * 创建分析助手页，标题和input
 */
function createEntityDivNoMore(id, title, entities, callback, moreCallback, colNum, style,flag) {
	hideLimit = 50;
	// 排序
	ftt_sortEntities(entities);

	// 创建一个条件
	var condition = $("<div id='" + id + "' class='row-condition " + style + "'></div>");
	if(flag==0){
		// 条件的标题
		condition.append("<div class='row-condition-title " + style + "'><span>" + title + "</span></div>");
	}
	// 条件选项容器
	var container = $("<div class='condition-container-rule'></div>");
	
	if(parent.getKey){
		// 生成新的Key
		var dataKey = parent.getKey();
		// 存储新的条件数据
		parent.putData(dataKey, entities);
	}

	container.appendTo(condition);
	// 条件的选项
	$(entities).each(function (index, entity) {
		container.append(createInput(id, entity, id, callback, index === 0));
		container.append("<label>" + entity.displayName + "</label>");
	});
	/*
	 * 添加各中函数
	 */
	// 添加方法 返回选中的input的data
	condition[0].getSelectionDatas = function () {
		var selections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && inputs[k].checked) {
				selections.push(inputs[k].data);
			}
		}
		return selections;
	};
	// 添加方法 返回未选中的input的data
	condition[0].getUnselectionDatas = function () {
		var unselections = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name && !inputs[k].checked) {
				unselections.push(inputs[k].data);
			}
		}
		return unselections;
	};
	// 添加方法 返回所有data
	condition[0].getDatas = function () {
		var datas = new Array();
		// 兼容IE6，不使用getElementsByName
		var inputs = document.getElementsByTagName("input");
		for (var k = 0; k < inputs.length; k += 1) {
			if (("INPUT_NAME_" + id) == inputs[k].name) {
				datas.push(inputs[k].data);
			}
		}
		return datas;
	};
	// 设置选择
	condition[0].setChecked = function (objs, _checked) {
		// 如果数据不可用，则返回
		if (!objs || !objs.length || objs.length < 1) {
			return;
		}
		// 拿到所有data
		var _entities = table.getDatas();
		// 设置选中状态
		for (var k = 0; k < _entities.length; k += 1) {
			for (var j = 0; j < objs.length; j += 1) {
				if (_entities[k].displayName == objs[j].displayName) {
					_entities[k].checked = _checked ? true : false;
					objs[j].checked = _checked ? true : false;
				}
			}
			// 如果是单选按钮，设置其他按钮为未选中
			if (_checked && "radio".equalsIgnoreCase(objs[0].displayTypeName)) {
				if (_entities[k].displayName != objs[0].displayName) {
					_entities[k].checked = false;
				}
			}
		}
		// 排序
		ftt_sortEntities(_entities);
		var index = 0;
		var colNum = content.rows[0].cells.length;
		for (var m = 0; m < _entities.length; m += 1) {
			var _td = content.rows[parseInt(index / colNum)].cells[index % colNum];
			index += 1;
			if (_td.fillType != "ENTITY") {
				_td = content.rows[parseInt(index / colNum)].cells[index % colNum];
				index += 1;
			}
			$(_td).empty();
			ftt_fillTd(_td, id, _entities[m], id, callback, false);
		}
		// 更新全选按钮状态
		(function (_id, _name) {
			ftt_updateCheckAllState(_id, _name);
		})(id, id);
	};
	//
	condition[0].getRightCell = function (index) {
		var rows = content.rows;
		var temp = 0;
		for (var rowNum = 0; rowNum < rows.length; rowNum += 1) {
			if ((temp + rows[rowNum].cells.length) > index) {
				return rows[rowNum].cells[index - temp];
			} else {
				temp += rows[rowNum].cells.length;
			}
		}
		return undefined;
	};
	return condition;
}

/**
 * 显示所有检索条件值
 */
function getFilterWords(queryTime, otherFilterWords, queryParams) {

	var filterWords = "";
	filterWords += queryTime.startDate + "~" + queryTime.endDate;
	if (otherFilterWords && otherFilterWords != "") {
		filterWords += " + " + otherFilterWords;
	}

	// 条件计数，2个以上显示...
	var count = 0;
	var tempCode;
	for (var i = 0; i < queryParams.length; i++) {
		if (queryParams[i].displayName && queryParams[i].displayName != "") {
			if (queryParams[i].param_code == tempCode) {
				if (count > 2) {
					count++;
					continue;
				} else if (count == 2) {
					filterWords += "...";
					count++;
				} else {
					filterWords += "," + queryParams[i].displayName;
					count++;
				}
			} else {
				filterWords += " + " + queryParams[i].displayName;
				tempCode = queryParams[i].param_code;
				count = 1;
			}
		}
	}
	return filterWords;
}
