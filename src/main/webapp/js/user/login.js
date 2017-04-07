
//回车事件绑定
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){ 
		$('#login').click();
	}
}; 

//登录操作
$('#login').click(function() {
	var username = $('#username').val();
	var password = $('#password').val();
	if (username == '') {
		layer.msg('用户名不能为空!');
		return false;
	}
	if (password == '') {
		layer.msg('密码不能为空!');
		return false;
	}
	var data = {
		pswd : password,
		email : username
	};
	var load = layer.load(2,{shade: [0.1,'#fff']});
	$.post(ROOT_PATH+"/u/submitLogin.shtml", data, function(result) {
		layer.close(load);
		if (result && result.status != 200) {
			layer.msg(result.message, function() {
			});
			$('#password').val('');
			return;
		} else {
			layer.msg('登录成功！');
			setTimeout(function() {
				// 登录返回
				window.location.href = result.back_url || ROOT_PATH;
			}, 10)
		}
	}, "json");

});
