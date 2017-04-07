(function($) {

	/**
	 * 不存在时间选择控件，则返回
	 */
	if ($(".time-btn-group").length == 0) {
		return;
	}

	/**
	 * 如果当前没有选中项，缺省按照缓存中的时间选中，不存在缓存数据则缺省选中第一个时间
	 */
	if ($(".time-btn-group .btn[btn-time].active").length == 0) {
		//
		var cacheTime = $(".time-btn-group").attr("CACHE_TIME_CONDITION");
		// 如果存在缓存的时间且该时间控件在当前页存在
		if (cacheTime && cacheTime != "" && $(".time-btn-group .btn[btn-time='" + cacheTime.replaceAll("'", "\\'") + "']").length > 0) {
			// 选中该时间
			$(".time-btn-group .btn[btn-time='" + cacheTime.replaceAll("'", "\\'") + "']").addClass("active");
		} else {
			// 选中第一个时间
			$(".time-btn-group .btn[btn-time]:eq(0)").addClass("active");
		}
	}

	/**
	 * 如果当前选中的自定义，则显示输入框，否则隐藏
	 */
	if (eval("btnTime=" + $(".time-btn-group .btn[btn-time].active").attr("btn-time")).type == 'custom') {
		// 显示自定义
		showCustom();
	} else {
		// 隐藏自定义
		hideCustom();
	}

	/**
	 * 添加方法，用于获取时间按钮组的当前时间
	 * <p>
	 * <p> ※ 如果当前包含多个.time-btn-group控件，则只会返回第一个的值
	 * 
	 * @return {start: Date, end: Date}
	 */
	$.fn.setTimeCallback = function(callback) {
		var btnGroup = this.filter(".time-btn-group");
		// 无可用的对象
		if (!btnGroup[0]) {
			return;
		}
		// 当前选中的按钮时间
		var btnTime = eval("btnTime=" + btnGroup.first().children(".active").attr("btn-time"));
		//
		if (btnTime.type == 'custom') {
			// 自定义
			var result = {};
			callback({
				start : new Date(Date.parse($("#btn_time_starttime")[0].value.replace(/-/g, "/"))),
				end : new Date(Date.parse($("#btn_time_endtime")[0].value.replace(/-/g, "/")))
			});
		} else if (btnTime.type == 'last') {
			// 最近
			DWRUtilService.getCurrentTime({
				callback : function(time) {
					callback({
						start : new Date(time - parseInt(btnTime.interval)),
						end : new Date(time)
					});
				},
				errorHandler : function(error) {
				}
			});
		} else if (btnTime.type == 'range') {
			// 范围
			callback(getTimeRange(btnTime.value));
		}
	}

	/**
	 * 绑定点击按钮
	 */
	$(document).on('click.button.data-api', '.time-btn-group .btn[btn-time]', function(e) {
		var $btn = $(e.target);
		// 按钮组
		var $group = $btn.closest(".time-btn-group");

		/**
		 * 判断当前点击按钮是否是之前选中的按钮
		 */
		if ($btn[0] == $btn.parent().children(".btn[btn-time].active")[0]) {
			// 相同则返回
			return;
		}
		/**
		 * 如果定义了onchange，根据onchange的返回结果，如果true则继续，为false则不生效
		 */
		if ($group.attr("onchange") && !eval("result = " + $group.attr("onchange"))) {
			return;
		}

		/**
		 * 变更按钮状态（或自定义输入框状态）
		 */
		// 移除之前选中效果
		$btn.siblings(".active").removeClass("active");
		// 为当前按钮添加选中效果
		$btn.addClass("active");
		// 对自定义特殊处理
		var btnTime = eval("btnTime=" + $btn.attr("btn-time"));
		// 判断是否是自定义
		if (btnTime.type == 'custom') {
			// 显示自定义
			showCustom();
		} else {
			// 隐藏自定义
			hideCustom();
		}
		/**
		 * 如果定义了onchanged，则在变更完成时调用
		 */
		if ($group.attr("onchanged")) {
			eval($group.attr("onchanged"));
		}
	});

	/**
	 * 显示自定义
	 */
	function showCustom() {
		$("#btn_time_starttime").show();
		$("#btn_time_endtime").show();
		$("#btn_time_lable").show();
	}

	/**
	 * 隐藏自定义
	 */
	function hideCustom() {
		$("#btn_time_starttime").hide();
		$("#btn_time_endtime").hide();
		$("#btn_time_lable").hide();
	}

	/**
	 * 根据指定的值，返回指定的时间范围
	 * 
	 * 可选的值有：lastmonth thismonth lastweek thisweek yesterday today
	 */
	function getTimeRange(value) {
		var p_date = new Object();
		p_date.start = new Date();
		p_date.end = new Date();
		switch (value) {
		case "nolimit":
			p_date.start.setTime(Date.parse("01/01/1970"));
			p_date.end.setTime(Date.parse("01/01/2050"));
			p_date.start = "";
			p_date.end = "";
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
			p_date.start.setDate(1);
			p_date.end.setDate(1);
			if (p_date.start.getMonth() == 0) {
				// 一月
				p_date.start.setMonth(11);
				p_date.start.setFullYear(p_date.end.getFullYear() - 1);
			} else {
				// 二~十二月
				p_date.start.setMonth(p_date.start.getMonth() - 1);
			}
			break;
		case "thismonth":
			p_date.start.setDate(1);
			p_date.end.setDate(1);
			if (p_date.end.getMonth() == 11) {
				// 十二月
				p_date.end.setFullYear(p_date.end.getFullYear() + 1);
				p_date.end.setMonth(0);
			} else {
				// 一~十一月
				p_date.end.setMonth(p_date.end.getMonth() + 1);
			}
			break;
		case "lastweek":
			var week = p_date.start.getDay();
			if (week == 0) {
				p_date.start = new Date(p_date.start.getTime() - (7 + 6) * 86400000);
				p_date.end = new Date(p_date.start.getTime() + 7 * 86400000 - 86400);
			} else {
				p_date.start = new Date(p_date.start.getTime() - (week + 6) * 86400000);
				p_date.end = new Date(p_date.start.getTime() + 7 * 86400000 - 86400);
			}
			break;
		case "thisweek":
			var week = p_date.start.getDay();
			if (week == 0) {
				p_date.start = new Date(p_date.end.getTime() - 6 * 86400000);
				p_date.end = new Date(p_date.end.getTime() + 86400000 - 86400);
			} else if (week == 1) {
				p_date.end = new Date(p_date.start.getTime() + 7 * 86400000 - 86400);
			} else {
				p_date.start = new Date(p_date.start.getTime() - (week - 1) * 86400000);
				p_date.end = new Date(p_date.end.getTime() + (8 - week) * 86400000 - 86400);
			}
			break;
		case "yesterday":
			p_date.start = new Date(p_date.start.getTime() - 86400000 - 86400);
			break;
		case "today":
			p_date.end = new Date(p_date.end.getTime() + 86400000 - 86400);
			break;
		}
		// 清零时分秒
		p_date.start.setHours(0);
		p_date.start.setMinutes(0);
		p_date.start.setSeconds(0);

		p_date.end.setHours(0);
		p_date.end.setMinutes(0);
		p_date.end.setSeconds(0);
		// 在原有基础上再减一秒，使时间变为23:59:59
		p_date.end.setSeconds(-1);

		// 返回结果
		return p_date;
	}
	/**
	 * 日期格式格式化方法 返回格式如:对象 属性:startDate endDate 格式:2015-01-09 06:06:06
	 */
	$.fn.setFormatTimeCallback = function(callback) {
		$(this).setTimeCallback(function(result) {
			var timeObject = new Object();
			timeObject.startDate = result.start.format("yyyy-MM-dd HH:mm:ss");
			timeObject.endDate = result.end.format("yyyy-MM-dd HH:mm:ss");
			callback(timeObject);
		});
	}

	/**
	 * 当时间选择变化时，将最新的时间条件存储与Session中，下次使用本控件时，自动选择该时间
	 */
	$(function() {
		$(".time-btn-group button.btn").bind("click", function() {
			var $timeBtn = $(this);
			$.post(ROOT_PATH + "/FrameAction.do?opt=cacheLastTimeCondition", {
				CACHE_TIME_CONDITION : $timeBtn.attr("btn-time")
			});
		});
	});
})(jQuery);