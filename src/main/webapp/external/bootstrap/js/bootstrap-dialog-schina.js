(function($) {

		/**
		 * @param options
		 * options {
		 * title : 弹出层标题
		 * message : 弹出层内容
		 * btnStyle : 按钮样式 （btn-primary 默认蓝色、btn-warning 警告黄色、 btn-danger 危险红色）
		 * close ： 弹出层标头关闭按钮 boolean
		 * height : 弹出层高度
		 * width : 弹出层宽度
		 * left : 左边距
		 * top : 顶边距
		 * }
		 * 使用方式
		 * $.sDialog.openAlert(options);
		 * 
		 */
	$.sDialog = {
		/**
		 * 对确认弹出层进行修改
		 * btn {
		 * 	text : 按钮文本
		 * 	closed : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * 
		 */	
		openAlert : function(options) {
			var $footer = this._createEmptyFooter();
			//默认值
			options.btn = $.extend({
				text : "确定",
				style : "btn-primary"
			}, options.btn);
			//添加按钮
			var $okBtn = $("<button class='btn dlg-ok-btn'>"+options.btn.text+"</button>");
			$footer.append($okBtn);
			//在ID=footer的div元素内添加关闭按钮
			//自定义按钮点击后弹出层是否消失
			if(options.btn.close){
				$okBtn.attr("data-dismiss", "modal");
				$okBtn.attr("aria-hidden", "true");
			}
			//判断参数是否包含callback参数及判断callback类型是否为function
			if (typeof options.btn.callback == 'function') {
				$okBtn.bind("click", options.callback);
			}
			//判断参数是否包含按钮样式参数，有则使用，无则使用默认（btn-primary 默认蓝色、btn-warning 警告黄色、 btn-danger 危险红色）
			if (options.btn.style) {
				$okBtn.addClass(options.btn.style);
			} 
			//调用通用方法
			return this._open($.extend( {
				id : '_alert',
				_footer : $footer, //id=footer的div
				_content : $("<p>" + options.message + "</p>")
			}, options));
		},
		/**
		 * 确认弹出层
		 * yesBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * noBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * 
		 */
		openConfirm : function(options) {
			var $footer = this._createEmptyFooter();
			//确定按钮默认值
			options.yesBtn = $.extend({
				text : "确定",
				style : "btn-primary"
			}, options.yesBtn);
			
			//关闭按钮默认值
			options.noBtn = $.extend({
				text : "关闭"
			}, options.noBtn);
			//添加两个按钮
			
			$footer.append("<button class='btn dlg-yes-btn'>"+options.yesBtn.text+"</button><button class='btn dlg-no-btn'>"+options.noBtn.text+"</button>");
			//自定义按钮点击后弹出层是否消失
			if(options.yesBtn.close){
				//data-dismiss='modal' aria-hidden='true'
				$footer.children(".dlg-yes-btn").attr("data-dismiss", "modal");
				$footer.children(".dlg-yes-btn").attr("aria-hidden", "true");
			}
			if(options.noBtn.close){
				$footer.children(".dlg-no-btn").attr("data-dismiss", "modal");
				$footer.children(".dlg-no-btn").attr("aria-hidden", "true");
			}
			//判断function
			if (typeof options.yesBtn.callback == 'function'){
				$footer.children(".dlg-yes-btn").bind("click", options.yesBtn.callback);
			}
			if (typeof options.noBtn.callback == 'function'){
				$footer.children(".dlg-no-btn").bind("click", options.noBtn.callback);
			}
			//自定义按钮样式
			if (options.yesBtn.style){
				$footer.children(".dlg-yes-btn").addClass(options.yesBtn.style);
			}
			if (options.noBtn.style){
				$footer.children(".dlg-no-btn").addClass(options.noBtn.style);
			}
			//调用通用方法
			return this._open($.extend( {
				id : '_confirm',
				_footer : $footer, //id=footer的div
				_content : $("<p>" + options.message + "</p>")
			}, options));
		},
		/**
		 * 判断弹出层
		 * yesBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * noBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * cancel{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * 
		 */
		openWhether : function(options) {
			var $footer = this._createEmptyFooter();
			//是按钮默认值
			options.yesBtn = $.extend({
				text : "是",
				style : "btn-primary"
			}, options.yesBtn);
			//否按钮默认值
			options.noBtn = $.extend({
				text : "否"
			}, options.noBtn);
			//取消按钮默认值
			options.cancelBtn = $.extend({
				text : "取消"
			}, options.cancelBtn);
			$footer.append("<button class='btn dlg-yes-btn'>"+options.yesBtn.text+"</button><button class='btn dlg-no-btn'>"+options.noBtn.text+"</button><button class='btn dlg-cancel-btn'>"+options.cancelBtn.text+"</button>");
			//自定义点击按钮后弹出层是否消失
			if(options.yesBtn.close){
				$footer.children(".dlg-yes-btn").attr("data-dismiss", "modal");
				$footer.children(".dlg-yes-btn").attr("aria-hidden", "true");
			}
			if(options.noBtn.close){
				$footer.children(".dlg-no-btn").attr("data-dismiss", "modal");
				$footer.children(".dlg-no-btn").attr("aria-hidden", "true");
			}
			if(options.cancelBtn.close){
				$footer.children(".dlg-cancel-btn").attr("data-dismiss", "modal");
				$footer.children(".dlg-cancel-btn").attr("aria-hidden", "true");
			}
			
			//修改按钮参数
			if (typeof options.yesBtn.callback == 'function'){
				$footer.children(".dlg-yes-btn").bind("click", options.yesCallback);
			}
			if (typeof options.noBtn.callback == 'function'){
				$footer.children(".dlg-no-btn").bind("click", options.noCallback);
			}
			if (typeof options.cancelBtn.callback == 'function'){
				$footer.children(".dlg-cancel-btn").bind("click", options.cancelCallback);
			}
			//修改按钮样式
			if (options.yesBtn.style){
				$footer.children(".dlg-yes-btn").addClass(options.yesBtnStyle);
			}
			if (options.noBtn.style) {
				$footer.children(".dlg-no-btn").addClass(options.noBtnStyle);
			}	
			if (options.cancelBtn.style) {
				$footer.children(".dlg-cancel-btn").addClass(options.cancelBtnStyle);
			}
			return this._open($.extend( {
				id : '_whether',
				_footer : $footer, //id=footer的div
				_content : $("<p>" + options.message + "</p>")
			}, options));
		},
		
		/**
		 * 超链接弹出层
		 * 
		 * okBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * cancelBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * closeBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * 
		 */
		openRemote : function(options) {
			var $footer = this._createEmptyFooter();
			//确定按钮
			if(options.okBtn){
				//确定按钮默认值
				options.okBtn = $.extend({
					text : "确定",
					style : "btn-primary"
				}, options.okBtn);
				$okBtn = $("<button class='btn dlg-ok-btn'>"+options.okBtn.text+"</button>");
				$footer.append($okBtn);
				//修改按钮参数
				if (typeof options.okBtn.callback == 'function'){
					$okBtn.bind("click", options.okBtn.callback);
				}
				//修改按钮样式
				if (options.okBtn.style){
					$okBtn.addClass(options.okBtn.style);
				}
				//自定义点击按钮后弹出层是否消失
				if (options.okBtn.close){
					$okBtn.attr("data-dismiss", "modal");
					$okBtn.attr("aria-hidden", "true");
				}
			}
			//取消按钮
			if(options.cancelBtn){
				//取消按钮默认值
				options.cancelBtn = $.extend({
					text : "取消"
				}, options.cancelBtn);
				$cancelBtn = $("<button class='btn dlg-cancel-btn'>"+options.cancelBtn.text+"</button>");
				$footer.append($cancelBtn);
				//自定义点击按钮后弹出层是否消失
				if (options.cancelBtn.close){
					$cancelBtn.attr("data-dismiss", "modal");
					$cancelBtn.attr("aria-hidden", "true");
				}
				//修改按钮参数
				if (typeof options.cancelBtn.callback == 'function'){
					$cancelBtn.bind("click", options.cancelBtn.callback);
				}
				//修改按钮样式
				if (options.cancelBtn.style) {
					$cancelBtn.addClass(options.cancelBtn.style);
				}
			}
			//关闭按钮
			if(options.closeBtn){
				//关闭按钮默认值
				options.closeBtn = $.extend({
					text : "关闭"
				}, options.closeBtn);
				$closeBtn = $("<button class='btn dlg-close-btn'>"+options.closeBtn.text+"</button>");
				$footer.append($closeBtn);
				//自定义点击按钮后弹出层是否消失
				if (options.closeBtn.close){
					$closeBtn.attr("data-dismiss", "modal");
					$closeBtn.attr("aria-hidden", "true");
				}
				//修改按钮参数
				if (typeof options.closeBtn.callback == 'function'){
					$closeBtn.bind("click", options.closeBtn.callback);
				}
				//修改按钮样式
				if (options.closeBtnStyle) {
					$closeBtn.addClass(options.closeBtn.style);
				}
			}
			return this._open($.extend( {
			id : '_remote',
			_footer : $footer.children()[0] ? $footer : undefined, //id=footer的div
			_content : $("<p>" + options.message + "</p>")
			}, options));
		},
		/**
		 * 自定义div弹出层
		 * options.content 自定义div内容(必填)
		 * okBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * cancelBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * closeBtn{
		 * 	text : 按钮文本
		 * 	close : 点击后是否隐藏
		 *  callback : 点击后回调函数
		 *  style : 按钮式样
		 * }
		 * 
		 */
		openContent : function(options) {
			var $footer = this._createEmptyFooter();
			//确定按钮
			if(options.okBtn){
				//确定按钮默认值
				options.okBtn = $.extend({
					text : "确定",
					style : "btn-primary"
				}, options.okBtn);
				$okBtn = $("<button class='btn dlg-ok-btn'>"+options.okBtn.text+"</button>");
				$footer.append($okBtn);
				//修改按钮参数
				if (typeof options.okBtn.callback == 'function'){
					$okBtn.bind("click", options.okBtn.callback);
				}
				//修改按钮样式
				if (options.okBtn.style){
					$okBtn.addClass(options.okBtn.style);
				}
				//自定义点击按钮后弹出层是否消失
				if (options.okBtn.close){
					$okBtn.attr("data-dismiss", "modal");
					$okBtn.attr("aria-hidden", "true");
				}
			}
			//取消按钮
			if(options.cancelBtn){
				//取消按钮默认值
				options.cancelBtn = $.extend({
					text : "取消"
				}, options.cancelBtn);
				$cancelBtn = $("<button class='btn dlg-cancel-btn'>"+options.cancelBtn.text+"</button>");
				$footer.append($cancelBtn);
				//自定义点击按钮后弹出层是否消失
				if (options.cancelBtn.close){
					$cancelBtn.attr("data-dismiss", "modal");
					$cancelBtn.attr("aria-hidden", "true");
				}
				//修改按钮参数
				if (typeof options.cancelBtn.callback == 'function'){
					$cancelBtn.bind("click", options.cancelBtn.callback);
				}
				//修改按钮样式
				if (options.cancelBtn.style) {
					$cancelBtn.addClass(options.cancelBtn.style);
				}
			}
			//关闭按钮
			if(options.closeBtn){
				//关闭按钮默认值
				options.closeBtn = $.extend({
					text : "关闭"
				}, options.closeBtn);
				$closeBtn = $("<button class='btn dlg-close-btn'>"+options.closeBtn.text+"</button>");
				$footer.append($closeBtn);
				//自定义点击按钮后弹出层是否消失
				if (options.closeBtn.close){
					$closeBtn.attr("data-dismiss", "modal");
					$closeBtn.attr("aria-hidden", "true");
				}
				//修改按钮参数
				if (typeof options.closeBtn.callback == 'function'){
					$closeBtn.bind("click", options.closeBtn.callback);
				}
				//修改按钮样式
				if (options.closeBtnStyle) {
					$closeBtn.addClass(options.closeBtn.style);
				}
			}
			return this._open($.extend( {
			id : '_content',
			_footer : $footer.children()[0] ? $footer : undefined, //id=footer的div
			_content : options.content
			}, options));
		},
		
		/**
		 * @param options
		 * 
		 * content
		 * 
		 */
		_open : function(options) {
			var $modal = $("#" + options.id);
			if($modal[0]){
				if(options.reload){
					$modal.modal("hide");
					$modal.remove();
				}else{
					$modal.modal("show");
					return;
				}
			}
			// TODO 组织一个Header
			var $header = this._createEmptyHeader();
			if (!options.close) {
				
			}else {
				$header.append("<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>");
			}
			if (options.title) {
				$header.append("<h4 id='myModalLabel'>" + options.title + "</h4>");
			} else {
				$header.append("<h4 id='myModalLabel'></h4>");
			}
			// TODO body ，_content, remote
			var $body = $("<div class='modal-body'></div>");
			if (options._content) {
				$body.append(options._content);
			}
			// TODO createModel, id、aria-hidden、 +header+body+footer
			var $modal = $("<div class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'></div>");
			if(options.id){
				$modal.attr("id", options.id);
			}
			$modal.append($header);
			$modal.append($body);
			$modal.append(options._footer);
			//在body内增加一个完整的modal，modal类型由使用者提交的参数决定
			$("body").append($modal);
			//自定义高宽
			if(options.height){
				$(".modal").css("height",options.height);
			}
			if(options.width){
				$(".modal").css("width",options.width);
				// 计算位置，居中
				$(".modal").css("margin-left",-options.width/2);
			}
			//自定义弹出层位置
			if(options.left){
				$(".modal").css("left",options.left);
				$(".modal").css("top",options.top);
			}
			// 默认点击dialog背景不关闭此dialog，如需关闭则指定 options.backdrop = true
			options.backdrop = options.backdrop ? options.backdrop : "static";
			// 禁用键盘事件，默认会关闭此dialog
			options.keyboard = options.keyboard ? options.keyboard : false;
			//
			$modal.modal(options);
			//
			return $modal;
			
		},
		_createEmptyFooter : function() {
			return $("<div class='modal-footer'></div>");
		},
		_createEmptyHeader : function() {
			return $("<div class='modal-header'></div>");
		}
	};

})(jQuery);