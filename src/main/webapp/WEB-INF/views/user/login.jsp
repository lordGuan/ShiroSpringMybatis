<%@ page pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>系统登录</title>

<%@ include file="/common/head/head.jsp"%>
</head>
<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo">登录</div>
		<div class="login-box-body">
			<p class="login-box-msg">登录系统</p>
			<form action="" method="post">
				<div class="form-group has-feedback">
					<input type="text" id="username" class="form-control" placeholder="用户名">
					<span class="glyphicon glyphicon-user form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" id="password" class="form-control" placeholder="密码">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-8">
						<div class="checkbox icheck"></div>
					</div>
					<div class="col-xs-4">
						<button type="button" class="btn btn-primary btn-block btn-flat"  id="login">登录</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<%@ include file="/common/foot/foot.jsp"%>
	<script  src="${pageContext.request.contextPath}/external/plugins/layer/layer.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/user/login.js"></script>
</body>
</html>
