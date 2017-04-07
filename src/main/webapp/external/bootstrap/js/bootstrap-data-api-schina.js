(function($) {

	/**
	 * 按钮关联对象 - 显示/隐藏
	 */
	$(document).on('click.button.data-api', '[data-toggle^=button][data-toggle-bind]', function(e) {
		var $btn = $(e.target);
		if (!$btn.hasClass('btn')) {
			$btn = $btn.closest('.btn')
		}
		var $target = $($btn.attr("data-toggle-bind"));
		if ($target.is(":hidden")) {
			$btn.addClass("active");
		} else {
			$btn.removeClass("active");
		}
		$target.toggle(200);
	});

	/**
	 * 按钮关联对象 - 滑动/隐藏
	 */
	$(document).on('click.button.data-api', '[data-toggle^=button][data-toggle-slide-bind]', function(e) {
		var $btn = $(e.target);
		if (!$btn.hasClass('btn')) {
			$btn = $btn.closest('.btn')
		}
		var $target = $($btn.attr("data-toggle-slide-bind"));
		if ($target.is(":hidden")) {
			$btn.addClass("active");
		} else {
			$btn.removeClass("active");
		}
		$target.slideToggle(200);
	});

	/**
	 * 按钮关联对象 - 淡入淡出
	 */
	$(document).on('click.button.data-api', '[data-toggle^=button][data-toggle-fade-bind]', function(e) {
		var $btn = $(e.target);
		if (!$btn.hasClass('btn')) {
			$btn = $btn.closest('.btn')
		}
		var $target = $($btn.attr("data-toggle-fade-bind"));
		if ($target.is(":hidden")) {
			$btn.addClass("active");
		} else {
			$btn.removeClass("active");
		}
		$target.fadeToggle(200);
		// 如果設置了回调方法，则调用
		if ($btn.attr("shownCallback") && typeof eval($btn.attr("shownCallback")) == "function") {
			eval($btn.attr("shownCallback"))();
		}
	});

	/**
	 * 垂直方向自动填充父对象
	 */
	$(window).resize(function(e) {
		// 自动填充控件
		var $children = $(".auto-fill-v");
		// 遍历
		$children.each(function(index, element) {
			// 垂直填充
			_autoFillV(element);
		});
	});

	$(".auto-fill-v-dyna").resize(function(e) {
		// 自动填充控件
		var $children = $(this).siblings(".auto-fill-v");
		// 遍历
		$children.each(function(index, element) {
			// 垂直填充
			_autoFillV(element);
		});
	});

	/**
	 * 将目标元素垂直填充其父控件 ※ 当前性能上不是最优实现
	 * 
	 * @param element
	 */
	function _autoFillV(element) {
		var $child = $(element);
		var $parent = $(element).parent();
		// 父对象内部高度
		var containerH = $parent.height();
		// 同胞对象外部高度总和
		var siblingsH = 0;
		$child.siblings().each(
				function(index, element) {
					var $element = $(element);
					// 如果该对象是可见的
					if (!$element.is(':hidden') && (!$element.css("float") || $element.css("float") == "none")
							&& !($element.css("position") == "fixed") && !($element.css("position") == "absolute")) {
						// 如果是块元素，则使用自身高度
						if ($element.css("display") == "block"
								&& (!$child.css("float") || $child.css("float") == "none")) {
							siblingsH += $element.outerHeight(true);
						} else {
							// 如果不是块元素，则使用同胞元素中最高的
							var maxHeight = 0;
							// 同胞元素仅计算一次
							var $nextAll = $element.nextAll();
							for ( var i = 0; i < $nextAll.length; i++) {
								var $next = $($nextAll[i]);
								if ($next.css("display") == "block" || $nextAll[i] == $child[0]) {
									break;
								}
								maxHeight = $next.outerHeight(true);
							}
							siblingsH += maxHeight;
						}
					}
				});
		// 变化前高度
		var height = $child.height();
		// 设置高度为父对象高度减去同胞对象总高度
		$child.height(containerH - siblingsH - ($child.outerHeight(true) - $child.height()));
		// 回调函数
		if ($child.attr("auto-fill-callback")) {
			var _window = this.contentWindow || this; // 获得Window对象
			if (typeof _window[$child.attr("auto-fill-callback")] == "function") {
				// 参数1 变更的高度
				eval($child.attr("auto-fill-callback"))($child.height() - height);
			}
		}
	}

	// 宽度关联
	$("[size-related-hor]").resize(function(e) {
		$($(this).attr("size-related-hor")).innerWidth($(this).innerWidth());
	});

	// 加载完成后立即执行
	$(function() {
		$(window).resize();
		$("[size-related-hor]").resize();
	});
	/**
	 * IP自动填充
	 */
	$(document).on('keyup.inputIP.data-api', '[class^=ip-setting]', function(e) {
		var idArray = this.id.split("-");
		var seat = idArray[idArray.length - 1];
		if ($("#" + idArray[0] + "-end-ip-" + seat).val().trim() == "") {
			$("#" + idArray[0] + "-end-ip-" + seat).attr("placeholder", $(this).val());
		}
	});
	
	/**
	 * IP自动填充
	 */
	$(document).on('blur.inputIPBlur.data-api', '[name*=-end-ip]', function(e) {
		if($(this).val()==""){
			var idArray = this.id.split("-");
			var seat = idArray[idArray.length - 1];
			$(this).val($("#" + idArray[0] + "-start-ip-" + seat).val());
		}
	});
})(jQuery);
