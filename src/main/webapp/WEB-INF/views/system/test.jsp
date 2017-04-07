<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <base href="<%=basePath%>">
    
    <title>Test</title>
    	<link   rel="icon" href="https://open.sojson.com/favicon.ico" type="image/x-icon" />
		<link   rel="shortcut icon" href="http://img.wenyifan.net/images/favicon.ico" />
		<link href="${pageContext.request.contextPath}/js/common/bootstrap/3.3.5/css/bootstrap.min.css?${_v}" rel="stylesheet"/>
		<link href="${pageContext.request.contextPath}/css/common/base.css?${_v}" rel="stylesheet"/>
		<script  src="http://open.sojson.com/common/jquery/jquery1.8.3.min.js"></script>
		<script  src="https://${header['host']}${pageContext.request.contextPath}/js/common/layer/layer.js"></script>
		<script  src="${pageContext.request.contextPath}/js/common/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script  src="${pageContext.request.contextPath}/js/shiro.demo.js"></script>
  </head>
  
  <body>
  	<div class="container" style="padding-bottom: 15px;min-height: 300px; margin-top: 40px;">
		<div class="row">
		    This is my JSP page. <br>
		    ${users.email} <br>
		    ${users} <br>
		    <%=basePath%> <br>
		    <form action="" enctype="multipart/form-data" method="post" id="testFrom" >
				<div class="form-group">
					<input type="text" class="form-control" autocomplete="off" id="value" maxlength="20" name=value  placeholder="测试提交">
				</div>
				<div class="form-group">
					<button type="button" class="btn btn-success" onclick="post()" id="testBth">提交</button>
				</div>
		    </form>
	    </div>
	</div>
    <script type="text/javascript">
	function post(){
		if($("#value").val() == ""){
			layer.msg('请输入值',function(){});
    		$("#value").parent().removeClass('has-success').addClass('has-error');
    		return;
		}else{
			$("#value").parent().removeClass('has-error').addClass('has-success');
		}
		var load = layer.load();
		$.ajax({
		    url:"http://127.0.0.1/BaseWeb/test/test.shtml",  
		    type:"post",  
		    dataType:"json",
		    data:{
		      value : $("#value").val()
		    },
		    success:function(result){ 
		    	layer.close(load);
		      	if(result && result.status != 200){
					layer.msg(result.message,function(){});
				}else{
					layer.msg(result.message);
				}
		    },  
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(XMLHttpRequest.readyState);
				console.log(textStatus);
				console.log(errorThrown);
				layer.close(load);
		    }  
		 });

// 		$.post('<%=basePath%>test/test.shtml',
// 				{value : $("#value").val()},
// 				function(result){
// 					alert(result);
// 					layer.close(load);
// 					if(result && result.status != 200){
// 						layer.msg(result.message,function(){});
// 		    			return;
// 					}else{
// 						layer.msg(result.message);
// 					}
// 				},
// 				'json');
// 		layer.close(load);
		
	}
// 	$(function(){
//		var load;
//		$("#testFrom").ajaxForm({
//	    	success:function (result){
//	    		layer.close(load);
//	    		if(result && result.status != 200){
//	    			layer.msg(result.message,function(){});
//	    			return;
//	    		}else{
//		    		layer.msg('操作成功！');
//	    		}
//	    	},beforeSubmit:function(){
//    		判断参数
//	    		if($.trim($("#value").val()) == ''){
//		    		layer.msg('请输入值!',function(){});
//		    		$("#value").parent().removeClass('has-success').addClass('has-error');
//		    		return !1;
//	    		}else{
//	    			$("#value").parent().removeClass('has-error').addClass('has-success');
//	    		}
//	    		load = layer.load('正在提交！！！');
//	    	},
//	    	clearForm:false
//		});
// }); 
		</script>
  </body>
</html>
