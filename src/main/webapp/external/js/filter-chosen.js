/*
 * 创建一个带过滤器选择栏
 */
function createFilterChosen(options) {
	var options = $.extend({}, {
		type : 'checkbox',
		entities : [],
		selected : [],
		formatter : function(entity) {
			return entity;
		}
	}, options);
	// 整体
	var $filterChosen = $("<div class='filter-chosen'></div>");

	// 筛选栏
	var $chosenTop = $("<div class='filter-chosen-top'></div>");
	$chosenTop.append($("<input type='text' class='filter-chosen-text'>"));
	$chosenTop.append($("<a href='javascript:;'>	<i class='icon-filter'></i><span></span></a>"));
	$chosenTop.appendTo($filterChosen);

	// 内容区域
	var $chosenBody = $("<div class='filter-chosen-body'></div>");
	// 添加复选框/单选框
	for ( var i = 0; i < options.entities.length; i++) {
		$chosenBody.append($("<input type='" + options.type + "'>"));
		$chosenBody.append("<span>" + options.formatter(options.entities[i]) + "</span>");
	}
	$chosenBody.appendTo($filterChosen);
	//
	/*
	 * 渲染iCheck复选框
	 */
	$chosenBody.children("input").each(function() {
		var self = $(this), label = self.next(), label_text = label.text();
		label.remove();
		self.iCheck({
			checkboxClass : 'icheckbox_line-blue',
			radioClass : 'iradio_line-blue',
			insert : '<div class="icheck_line-icon"></div>' + label_text
		});
	});
	//
	return $filterChosen;
}

/**
 * 创建菜单选项
 */
function bindFilterChosen($jqg) {
	//
	// 获取所有的列
	var colModel = $jqg.getGridParam("colModel");
	var colNames = $jqg.getGridParam("colNames");

	// 菜单选项
	var options = [];

	// 遍历所有的列并添加选项
	$(colModel).each(function(index, column) {
		// 判断是否允许隐藏
		if (colNames[index] && colNames[index].trim() != '' && !column.mustShow) {
			var icon = column.hidden ? "<i class='icon-eye-close'></i>" : "<i class='icon-eye-open'></i>";
			options.push({
				name : icon + colNames[index],
				fun : function() {
					// 改变列的显示状态
					if ($(this).children("i").hasClass("icon-eye-close")) {
						// 改变图标
						$(this).children("i").removeClass("icon-eye-close").addClass("icon-eye-open");
						// 隐藏或显示列
						$jqg.setGridParam().showCol(column.name);
					} else {
						// 改变图标
						$(this).children("i").removeClass("icon-eye-open").addClass("icon-eye-close");
						// 隐藏或显示列
						$jqg.setGridParam().hideCol(column.name);
					}
					// 触发resize事件，重新设置表格高宽
					$jqg.resize();
				}
			});
		}
	});
	//
	return options;
}