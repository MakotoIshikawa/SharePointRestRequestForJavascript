(function () {
	var ctx = {};
	ctx.Templates = {};
	ctx.Templates.Fields = {
		'SerialNumber': {
			'View': ZeroPadding,
			'DisplayForm': ZeroPadding,
		},
		'Title': {
			'DisplayForm': GetHyperlink,
		},
		'Link': {
			'DisplayForm': GetHyperlink,
		},
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();

function ZeroPadding(ctx, field, listItem, listSchema) {
	var num = ctx.CurrentItem.SerialNumber;
	var serial = num ? 'GW' + ('00000' + num).slice(-6) : '';
	return serial;
}

function GetHyperlink(ctx) {
	var text = ctx.CurrentFieldValue;
	var url = ctx.CurrentItem.Link;
	return String.format('<a href="{1}?web=1" target="_blank">{0}</a>', text, url);
}

