/*
 * 加载
 */
(function(window, $) {
	window.Loading = {};
	window.Loading.show = function(options) {
		//
		var _msg, _target, _window;

		//
		if (typeof options == "string") {
			_msg = options;
		} else if (typeof options == "object") {
			_msg = options.message;
			_target = options.target;
			_window  = options.window;
		}

		_msg = _msg ? _msg : "";
		_window = _window ? _window : window;
		_target = _target ? _target : _window.$("body")[0];

		var $ = _window.$;
		var $taget = $(_target);
		
		var $loadingBg = $(".loading-backdrop");
		if ($loadingBg.length == 0) {
			$loadingBg = $("<div class='loading-backdrop hide'>" + _msg + "</div>");
			$taget.append($loadingBg);
		}
		$loadingBg.show();
	};

	window.Loading.hide = function(options) {
		//
		var _target, _window;
		//
		if (typeof options == "object") {
			_target = options.target;
			_window  = options.window;
		}
		_window = _window ? _window : window;
		_target = _target ? _target : _window.$("body")[0];

		var $ = _window.$;
		var $taget = $(_target);
		
		$taget.children(".loading-backdrop").hide();
	};
})(window, jQuery)