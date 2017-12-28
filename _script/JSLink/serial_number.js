(function () {
	var ctx = {};
	ctx.Templates = {};
	ctx.Templates.Fields = {
		'SerialNumber': {
			'View': ZeroPadding,
			'DisplayForm': ZeroPadding,
		},
		'Title': {
			'DisplayForm': function (ctx) {
				var title = ctx.CurrentItem.Title;
				var url = ctx.CurrentItem.DocDispUrl;
				return String.format('<a href="{1}" target="_blank">{0}</a>', title, url);
			},
		},
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();

function ZeroPadding(ctx) {
	var num = ctx.CurrentItem.SerialNumber;
	var serial = num ? 'GW' + ('00000' + num).slice(-6) : '';
	return serial;
}
