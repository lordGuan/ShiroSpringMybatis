(function(window, $) {

	var TITLE_ALERT = "提示";
	var TITLE_SUCCESS = "成功";
	var TITLE_WARNING = "警告";
	var TITLE_ERROR = "错误";
	var TITLE_CONFIRM = "确认";

	var HTML_BODY = "<div class='alert'></div>";
	var HTML_CLOSE_BTN = "<button type='button' class='close'>×</button>";

	var HTML_BODY = "<div class='alert'></div>";
	var HTML_CLOSE_BTN = "<button type='button' class='close'>×</button>";

	defaultOptions = {
		title : "",
		titleTag : "h4", // 标题标签，还可以使用h1~h4，通常使用h4和strong
		close : true,
		style : "",
		message : "",
		autoClose : false,
		closeDelay : 2000
	};

	window.SAlert = function() {

		/**
		 * 显示提示框
		 */
		this.show = function(options) {
			//
			options = $.extend(true, {}, defaultOptions, options);

			// 提示框主体
			var $alertBody = $(HTML_BODY);

			// 设置风格
			if (options.style) {
				$alertBody.addClass(options.style);
			}

			// 关闭按钮
			if (options.close) {
				var $closeBtn = $(HTML_CLOSE_BTN);
				$closeBtn.click(function() {
					$($alertBody).alert("close");
				});
				$alertBody.append($closeBtn);
			}

			// 标题
			if (options.title) {
				var $title = $("<" + options.titleTag + ">");
				$title.append(options.title);
				//
				$alertBody.append($title);
			}

			// 设置内容
			$alertBody.append("<p>" + options.message + "</p>");

			// 按钮
			if (options.buttons) {
				// 按钮栏
				var $btnP = $("p");
				// 遍历按钮
				for ( var i = 0; i < options.buttons.length; i++) {
					var $btn = $("<a class='btn' href='javascript:;'></a>");
					var btnOpt = options.buttons[i];
					$btn.text(btnOpt.text); // 文本
					$btn.addClass(btnOpt.style); // 样式
					// 回调函数
					$btn.click(function() {
						if (btnOpt.callback()) {
							$($alertBody).alert("close");
						}
					});
					$btnP.append($btn);
				}
				// 添加按钮栏
				$alertBody.append($btnP);
			}

			// 自动关闭
			if (options.autoClose) {
				setTimeout(function() {
					$($alertBody).alert("close");
				}, options.closeDelay);
			}

			// 设置CSS
			$alertBody.css({
				position : "absolute",
				top : "40px",
				margin : "50%",
				left : "-130px",
				width : "260px"
			});

			// 弹出提示框
			$("body").append($alertBody);
			$alertBody.alert();
		};
	};

	/**
	 * 消息提示框
	 */
	SAlert.alert = function(message) {
		new SAlert().show({
			title : "提示",
			close : true,
			message : message,
			autoClose : false
		});
	};

})(window, jQuery);