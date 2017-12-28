(function () {
	var ctx = {};
	ctx.BaseViewID = 1;
	ctx.ListTemplateType = 104;
	ctx.Templates = {};
	ctx.Templates.Header = function (ctx) {
		var sb = '';
		sb += '<div id="Attention" class="web-parts">' + '\n';
		sb += '  <ul class="details">' + '\n';
		return sb;
	};
	ctx.Templates.Footer = function (ctx) {
		var sb = '';
		sb += '  </ul>' + '\n';
		sb += '</div>' + '\n';
		return sb;
	};
	ctx.Templates.Item = function (ctx) {
		var item = ctx.CurrentItem;
		var url = String.format('{0}/DispForm.aspx?ID={1}', ctx.listUrlDir, item.ID);

		var sb = '';
		sb += '<li>' + '\n';
		sb += String.format('  <img class="item-icon" src="{0}" />', item.DisplayTemplateJSIconUrl) + '\n';
		sb += '  <dl>' + '\n';
		sb += String.format('  <dt class="item-title"><a href="{0}"><span>{1}</span></a></dt>', url, item.Title) + '\n';
		sb += String.format('  <dd class="item-body"><span>{0}</span></dd>', item.Body) + '\n';
		sb += '  </dl>' + '\n';
		sb += '</li>' + '\n';
		return sb;
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();
