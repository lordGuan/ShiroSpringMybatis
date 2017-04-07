(function($) {
	/**
	 * $.sTooltip.tooltip({
	 * 	id : 元素ID，必须与页面元素相同
	 *	title : 提示内容
	 *	placement : 工具提示方向
	 *	html : 启用ajax的必须前置参数 true/false
	 *	trigger : 触发方式
	 *	color : 颜色
	 *	animation : 是否开启动画效果
	 *	method : 方法体
	 *	width : 工具提示宽度
	 *	height : 工具提示高度
	 * });
	 * 
	 * 
	 */
	$.sTooltip = {
		tooltip : function(options) {
			$("#" + options.id).tooltip(options);
			$("#" + options.id).on('shown.bs.tooltip', function(){
				//取消最大宽度限制
				$(".tooltip").css("max-width","none");
				$(".tooltip-inner").css("max-width","none");
				//自定义function方法体
				if(options.method){
					options.method;
				}
				//自定义宽度
				if(options.width){
					$("#" + options.id).next(".tooltip").find(".tooltip-inner").width(options.width);
				}
				//自定义高度
				if(options.height){
					$("#" + options.id).next(".tooltip").find(".tooltip-inner").height(options.height);
				}
				//自定义边框是否存在，宽度，颜色
				if(options.border){
					if(options.border.width){
						if(options.border.color){
							var $borderParam = options.border.width + " " + options.border.color + " solid";
							$("#" + options.id).next(".tooltip").find(".tooltip-inner").css("border",$borderParam);
						}else{
							var $borderParam2 = options.border.width + " #333333 solid";
							$("#" + options.id).next(".tooltip").find(".tooltip-inner").css("border",$borderParam2);						
						}
					}
				}
				//自定义颜色
				if(options.color){
					$("#" + options.id).next(".tooltip").find(".tooltip-inner").css("background-color", options.color);
					if(options.placement){
						$("#" + options.id).next(".tooltip").find(".tooltip-arrow").css("border-"+options.placement+"-color", options.color);	
					}else{
						$("#" + options.id).next(".tooltip").find(".tooltip-arrow").css("border-top-color", options.color);
					}
				}
				//自动定位
				if(options.placement){
					if (options.placement == "top" || options.placement == "bottom"){
						$("#" + options.id).next(".tooltip").find(".tooltip-arrow").css("left", ($("#"+options.id).offset().left + ($("#"+options.id).width()/2)));
					}
					if (options.placement == "left" || options.placement == "right"){
						$("#" + options.id).next(".tooltip").find(".tooltip-arrow").css("top", $("#"+options.id).height()/2);
						$("#" + options.id).next(".tooltip").css("top", $("#"+options.id).offset().top);
					}
				}else{
					$("#" + options.id).next(".tooltip").find(".tooltip-arrow").css("left", ($("#"+options.id).offset().left + ($("#"+options.id).width()/2)));
				}
			});				
		}
	}
})(jQuery);