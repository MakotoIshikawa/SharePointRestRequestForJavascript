(function ($) {
	$.extend({
		CreateHyperlink: function (href, text, dialog, another) {
			var $link = $('<a />', {
				href: href,
				text: (!text) ? href : text,
				target: another ? '_blank' : '_self',
				onclick: (another || !dialog) ?
					'return true;' :
					'OpenPopUpPage(this.href, RefreshPage); return false;',
			}).addClass('ms-listlink');
			return $link;
		},
	});
	$.fn.extend({
		GetOuterHtml: function () {
			var $this = $(this);
			if (!$this || !$this.length) {
				return '';
			}
			return $(this)[0].outerHTML;
		},
	});

	var ctx = {};
	ctx.Templates = {};
	ctx.Templates.Fields = {
		'_ModerationStatus': {
			'View': function (ctx, field, listItem, listSchema) {
				var templateID = '{6008520c-6260-42d6-aa44-ee4ee08edc30}';
				var e_uri = encodeURIComponent(ctx.listUrlDir);
				var url = String.format('{0}/_layouts/15/IniWrkflIP.aspx?List={1}&ID={2}&ItemGuid={3}&TemplateID={4}&Source={5}'
					, ctx.HttpRoot
					, ctx.listName
					, listItem.ID
					, listItem.UniqueId
					, templateID
					, e_uri);

				var st = listItem._ModerationStatus;
				var $a = $.CreateHyperlink(url, st, true);

				var htm = $a.GetOuterHtml();
				return htm;
			},
		},
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})(jQuery);
