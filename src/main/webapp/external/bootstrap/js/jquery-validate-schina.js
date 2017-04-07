(function($){
	var __validate = $.fn.validate; 
	
	$.fn.sValidate = function(opts) {
	/*opts : 参数值形式
	   1.rules（必选） 校验规则，形式如下：
	    	rules : {
				username:{
					required : true
				},
				......
			}
			 可写在class里面，例如：class="required digits" 
			 也可以使用class="{required:true,minlength:5}"的方式，必须引入：jquery.metadata.js 
		2.message(可选) 错误信息显示，形式如下：
			messages : { 
				userName : {
					required : "用户名不能为空！"
				},
				......
			}
			可写在class="{required:true,minlength:5,messages:{required:'请输入内容'}}"  必须引入：jquery.metadata.js
		3.errorElement（可选） string
		4.errorClass（可选） string
		5.highlight（可选） callback
		6.errorPlacement（可选） callback
		7.success(可选) callback
	 */
		var __rules = $.extend({},opts?(opts.rules||{}):{});
		var __messages = $.extend({},opts?(opts.messages||{}):{});
		var _success = function(label){ // label 错误信息容器span
			$(label).closest('div.control-group').removeClass('error');
			$(label).closest('div.controls').find("input[name='localIp']").css("borderColor", "");
			$(label).remove();
		};
		var _highlight = function(element) {
			if ($(element).closest("tbody").length > 0) {
				$(element).css("border","1px solid #b94a48");
			} else {
				if($(element).closest("div.control-group").length > 0){
					$(element).closest('div.control-group').addClass('error')
				}else{
					$(element).addClass('error');
				}
			}
		};
		var _errorPlacement = function(error, element) {
			// 对于表格中input的校验
			if ($(element).closest("tbody").length > 0) {
				$(element).closest("td").attr("title",$(error).html());
				if ($(error).html().replace(/(^\s*)|(\s*$)/g, "") == "") {
					$(element).css("border", "");
				}
			} else { // 默认将错误信息追加到input后面
				if($(element).closest("div.controls").length > 0){
					var controlsDiv = $(element).closest('div.controls');
					controlsDiv.append(error);
					if(controlsDiv.find("#dynamicPortDiv").length > 0 && !$("#dynamicPortDiv").is(":hidden")){
						controlsDiv.find("span.help-block").css("margin-top","18px");
					}
					if(controlsDiv.find("button").length > 0){
						controlsDiv.find("span.help-block").css("margin-top","12px");
					}
				}else{
					$(element).after(error);
				}
			}
		};
		var __defaultOpts = $.extend(opts||{},{
			rules : __rules,
			messages : __messages,
			focusInvalid : false,
			errorElement : opts?(opts.errorElement||"span"):"span",
			errorClass : opts?(opts.errorClass||"help-block"):"help-block",
			highlight : opts?(opts.highlight|| _highlight):_highlight,
			errorPlacement : opts?(opts.errorPlacement || _errorPlacement):_errorPlacement,
			success : opts?(opts.success|| _success):_success
		});
		$.extend($.fn.validate.prototype,__defaultOpts);
		// 用sValidate替换掉validate 使用时直接调用 $(selector).sValidate({});
		__validate.call(this,__defaultOpts);
		return this;
	}
	
	/**
	 * 自定义校验规则  $.validator.addMethod(name, method, message)
	 */ 
	// 添加ip submask校验方法
	$.validator.addMethod(
		"ip",
		function (value, element) {
		return this.optional(element)
		 || /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
		.test(value);
	}, "请输入正确的IP地址");
	//子网掩码验证    /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
	$.validator.addMethod(
		"submask",
		function (value, element) {
		return this.optional(element)
		 || /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/
		.test(value);
	}, "请输入正确的子网掩码");	
	// 添加管理ip校验规则
	$.validator.addMethod(
			"manageIp",
			function (value, element) {
				var objReg = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
				if(value =="0.0.0.0" || value=="127.0.0.1" || value=="255.255.255.255" || value=="255.255.255.0" || value=="255.255.0.0" || value=="255.0.0.0"){
					return false;
				}
				if(value && value.trim() != "" && objReg.test(value)){
					return true;
				} else {
					return false;
				}			
		}, "请输入合法的管理IP");
	
	 // oracle DB2实例必填校验规则
	 $.validator.addMethod(
	 	"oracleDB2Required",
	 	function (value, element) {
	 		if ($("#auditOjbSelect").val() == 1 || $("#auditOjbSelect").val() == 3) {
	 			return value.trim() != "";
	 		}else{
	 			return true;
	 		}
	 }, "Oracle和DB2数据库实例不能为空！");
	
	 // 非法字符校验
	 $.validator.addMethod(
	 	"illegalCharacter",
	 	function (value, element) {
	 		return !/[<>()（）【】{}！￥=《》!@#\$%\^&\*\?]+/.test(value);
	 }, "请输入合法字符");
	 
	 // 端口号（0~65535）校验
	 $.validator.addMethod(
		 "checkPort",
		 function (value, element) {
			return /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value);
	 }, "数据库端口范围(0-65535)");
	 
})(jQuery)