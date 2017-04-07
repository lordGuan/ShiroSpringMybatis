/**
 * 点击复制内容方法
 * 需要引用ZeroClipboard.js
 * @param content 复制的内容
 * @param id 被绑定的ID
 * @return
 */
function getCopyContent(content,id){
	var clip = new ZeroClipboard.Client();
	  clip.setHandCursor( true );
	  clip.setCSSEffects( true );
	  clip.addEventListener( 'mouseDown', function(client){
	    clip.setText(content);
	  });
	  clip.addEventListener( 'complete', function(){
		  BootstrapDialog.show( {
				title : '信息提示',
				message : '复制成功！',
				type : BootstrapDialog.TYPE_DEFAULT,
				closable : false,
				buttons : [ {
					label : '确认',
					cssClass : 'btn-primary',
					action : function(dialogItself) {
						dialogItself.close();
					}
				} ]
			});
	  });
	  clip.glue(id);
}