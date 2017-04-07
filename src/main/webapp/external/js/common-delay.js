/*
 * 
 * 封装了延迟调用相关方法
 * 
 * 主要用于解决多iframe下页面加载延迟的问题
 * 
 */

(function($) {

	$(function() {
		// 设置页面状态 - 加载完成
		setTimeout(function() {
			window.LOAD_COMPLETE = true;
		}, 0);
	});

	$.Delay = {};

	/**
	 * 当指定的iframe加载完成后，调用回调
	 * <p>
	 * 使用定时器检查是否加载完成 ，当完成时清除定时器并调用回调函数
	 * 
	 * @param iframe
	 *            指定的iframe
	 * @param callback
	 *            回调函数<br>
	 *            示例：<br>
	 *            <code>
	 *            	callback : function(_window){ <br>
	 *            		// _window 为指定iframe的window <br>
	 *            	}
	 *            </code>
	 */
	$.Delay.onFrameLoadComplete = function(iframe, callback) {

		// 使用定时器检查是否加载完成
		// 当完成时清除定时器并调用回调函数
		var interval = setInterval(function() {
			var _window = iframe.contentWindow || iframe;
			// 直至加载完成
			if (_window.LOAD_COMPLETE) {
				// 清除定时器并
				clearInterval(interval);
				callback(_window);
			}
		}, 50);
	}

})(jQuery)
