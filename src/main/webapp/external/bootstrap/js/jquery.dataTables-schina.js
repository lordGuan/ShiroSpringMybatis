/**
 * 通用参数设置
 */
$.fn.sDataTable = function(opts) {
	return $(this).dataTable($.extend({}, {
		language : {
			processing : "数据处理中...",
			search : "<i class='icon-search'></i>&nbsp;查询&nbsp; ",
			lengthMenu : "_MENU_ 记录数/页",
			info : "显示第  _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
			infoEmpty : "显示第 0 至 0 项记录，共 0 项",
			infoFiltered : "(由 _MAX_ 项记录过滤)",
			infoPostFix : "",
			loadingRecords : "数据加载中...",
			zeroRecords : "没有匹配的记录",
			emptyTable : "没有可用数据",
			paginate : {
				first : "首页",
				previous : "上页",
				next : "下页",
				last : "尾页"
			},
			aria : {
				sortAscending : ": 点击以升序进行排序",
				sortDescending : ": 点击以降序进行排序"
			}
		}
	}, opts)).api();
};