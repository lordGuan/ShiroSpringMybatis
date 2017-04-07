/**
 * Created by guanguoli on 2017/1/9.
 */

/**
 * 成功提示框（带确认按钮）
 * @param message 显示的提示内容
 * @param callback 确认按钮所用的回调方法
 */
function showMessageBox(message, callback){
    var messageBox = $("#messageBox");
    messageBox.find("p").html(message+"</BR>");
    messageBox.modal("show");
    messageBox.find("button[name='ok-btn']").one("click",function(){
        if(callback) callback();
    });
}
/**
 * 确认提示框（带确认按钮和取消按钮）
 * @param message 显示提示内容
 * @param okCallback 确认按钮所用回调方法
 * @param cancelCallback 取消按钮所用回调方法
 */
function showConfirmBox(message, okCallback, cancelCallback){
    $("#confirmBox").find("p").html(message);
    $("#confirmBox").find("button[name='ok-btn']").one("click",function(){
        if(okCallback) okCallback();
        $("#confirmBox").modal("hide");
    });
    $("#confirmBox").find("button[name='cancel-btn']").one("click",function(){
        if(cancelCallback) cancelCallback();
        $("#confirmBox").modal("hide");
    });
    $("#confirmBox").modal("show");
}

/**
 * 成功提示窗（带图标，定时关闭，带关闭按钮）
 * @param message 信息
 */
function showSuccessBox(message){
    var successBox = $("#successBox");
    successBox.find("img").attr("src",ROOT_PATH + "/dist/img/avatar.png");
    successBox.find("#message").text(message);
    successBox.modal("show");
}
/**
 * 警告提示框
 * @param title
 * @param message
 */
function showWarningBox(title,message) {

}


function doSessionTimeout(){
    Loading.hide();
    showMessageBox("会话超时！点击确定跳转至登录页面。",function(){
        window.location = getLocalHref() + "/login.jsp";
    });
}

/*打开密码编辑弹窗*/
function openEditPswDialog(){
    $("li.user-menu").removeClass("open");
    $('#editPswDiv input').removeClass('has-error').val('');
    $(".modal-footer").find(".tip").text('');
    $("#editPswDiv").modal("show");
}

/*确认提交修改密码*/
function confirmChange(){
    var tip = $(".modal-footer").find(".tip");
    $('#editPswDiv input').removeClass('has-error');
    var psw = $("#psw").val();
    var newpsw1 = $("#newpsw1").val();
    var newpsw2 = $("#newpsw2").val();

    // 空检验
    var isEmpty = false;
    if(psw == ''){
        $('#psw').addClass('has-error');
        isEmpty = true;
    }
    if(newpsw1 == ''){
        $('#newpsw1').addClass('has-error');
        isEmpty = true;
    }
    if(newpsw2 == ''){
        $('#newpsw2').addClass('has-error');
        isEmpty = true;
    }

    if (isEmpty) {
        tip.text('信息不完整，请确认！');
        return;
    }

    // 长度检验
    if (newpsw1.length<8 || newpsw1.length>16) {
        $('#newpsw1').addClass('has-error');
        $('#newpsw2').addClass('has-error');
        tip.text('密码长度为8-16位，请确认！');
        return;
    }

    // 密码中必须包含数字和字母
    if (!newpsw1.match(/[0-9]/) || !newpsw1.match(/[a-zA-Z]/)) {
        $('#newpsw1').addClass('has-error');
        $('#newpsw2').addClass('has-error');
        tip.text('密码中必须包含数字和字母，请确认！');
        return;
    }
    if(newpsw1 != newpsw2){
        $('#newpsw1').addClass('has-error');
        $('#newpsw2').addClass('has-error');
        tip.text('两次密码不一致，请确认！');
        return;
    }

    $.ajax({
        url: "./PasswordAction.do?opt=editPassword",
        data: {psw:psw,newpsw:newpsw1},
        cache: false,
        success: function(rs){
            if(rs == 0){
                tip.text('原密码不正确，请确认！');
                $('#psw').addClass('has-error');
            }else if(rs == 1){
                $("#editPswDiv").modal("hide");
                showMessageBox('密码修改完成，点击确定回到登录画面重新登录。',function() {
                    window.location.href= getLocalHref();
                });
            }
        }
    });
}


/**
 * 重新展开菜单
 */
function reopenMenu() {
    var currentMenu = getLocationParameters("menu");
    var menuObj = $("li[data-id=" + currentMenu + "]");
    if(menuObj.length > 0){// 如果顶级菜单作为跳转条目直接添加
        menuObj.addClass("active");
    }else{
        $("a[data-id=" + currentMenu + "]").parent("li").addClass("active");
        $("a[data-id=" + currentMenu + "]").parents("ul.treeview-menu").parents("li").addClass("active");
        $("a[data-id=" + currentMenu + "]").parents("ul.treeview-menu").addClass("menu-open");
    }
}

var menu;
/*获取用户菜单*/
function initUserMenus(){
    $.post(ROOT_PATH + "/FrameAction.do?opt=getUserMenus", function (data) {
        var userMenu = JSON.parse(data);
        menu = userMenu;
        treeMenu(userMenu,0,0);
        // 根据url传递的参数进行重新展开
        reopenMenu();
    });

}

/**
 * 递归构造菜单
 * @param userMenu 源数据
 * @param parentid 根节点
 * @param depth 深度
 */
function treeMenu(userMenu,parentid,depth){
    for(var i = 0 ; i < userMenu.length ; i++){
        if(depth == 0){// 顶层菜单
            $('.sidebar-menu').append(getTopMenuHtml(userMenu[i]));
        }else{
            $('ul.treeview-menu[data-pid="' + parentid + '"]').append(getSubMenuHtml(userMenu[i]));
        }
        if(userMenu[i].subMenus.length == 0){// 如果没有子菜单
            continue;
        }
        treeMenu(userMenu[i].subMenus,userMenu[i].id,depth+1);
    }
}

/**
 * 构造顶级菜单html
 * @param node 节点
 * @returns {string} html
 */
function getTopMenuHtml(node){
    var top_menu_html = '<div class="left-icon-bg pull-left"><i class="fa ' + node.icon + '"></i></div>';
    var url = node.url;
    if(url!=''){
        // 该节点有url代表没有下级菜单，用data-url记录目的地址，不需要右侧的下拉菜单
        top_menu_html += '<a name="node" data-id="' + node.id + '" href="' + ROOT_PATH + url + '&menu=' + node.id + '"><i class="fa"></i> ' + node.name + '</a>';
    }else{
        // 如果该节点没有url代表有下级菜单，需要右侧的下拉菜单
        top_menu_html += '<a href="#"><i class="fa"></i> ' + node.name + '<i class="fa fa-angle-left pull-right"></i></a>' +
            '<ul class="treeview-menu" data-pid="' + node.id + '"></ul>';
    }
    return '<li class="treeview" data-id="' + node.id + '">' + top_menu_html + '</li>';
}

/**
 * 构造子菜单html
 * @param node 节点
 * @returns {string} html
 */
function getSubMenuHtml(node){
    var sub_menu_html = '';
    var url = node.url;
    if(url!=''){
        // 该节点有url代表没有下级菜单，用data-url记录目的地址，不需要右侧的下拉菜单
        sub_menu_html += '<li><a name="node" data-id="' + node.id + '" href="' + ROOT_PATH + url + '&menu=' + node.id + '">' +
            '<i class="fa fa-circle-o"></i>' + node.name + '</a></li>';
    }else{
        // 如果该节点没有url代表有下级菜单，需要右侧的下拉菜单
        sub_menu_html += '<li data-id="' + node.id + '"><a href="#"><i class="fa"></i>' + node.name + '<i class="fa fa-angle-left pull-right"></i></a>' +
            '<ul class="treeview-menu" data-pid="' + node.id + '"></ul></li>';
    }
    return sub_menu_html;
}






