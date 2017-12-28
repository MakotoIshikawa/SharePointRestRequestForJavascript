(function ($) {
	var ctx = {};
	ctx.Templates = {};
	ctx.Templates.Fields = {
		'_ModerationStatus': {
			'View': function (ctx, field, listItem, listSchema) {
				var id = listItem.DocumentsListId;
				if (!id) {
					return '';
				}

				var item = $.GetListItemByTitle('ドキュメント一覧', id);
				var e_uri = encodeURIComponent(ctx.listUrlDir);
				var url = String.format('{0}/_layouts/15/approve.aspx?List={1}&ID={2}&Source={3}'
					, ctx.HttpRoot, ctx.listName, listItem.ID, e_uri);

				var st = item.ApprovalStatus;
				if (st.indexOf('最終承認') < 0) {
					return st;
				}
				
				var $a = $.CreateHyperlink(url, st, true).addClass('link-button');
				var htm = $a.GetOuterHtml();
				return htm;
			},
		},
		'DocumentsListId': {
			'View': function (ctx, field, listItem, listSchema) {
				var caption = '詳細 (Details)';
				var id = listItem.DocumentsListId;
				if (!id) {
					return String.format('<span class="link-button-disabled">{0}</span>', caption);
				}

				var item = $.GetListItemByTitle('ドキュメント一覧', id);
				var url = item.DispUrl;
				if (!item || !url) {
					var err = '[ERROR]エラー';
					return String.format('<span class="error">{0}</span>', err);
				}

				var $a = $.CreateHyperlink(url, caption, true).addClass('link-button');
				var htm = $a.GetOuterHtml();
				return htm;
			},
		},
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})(jQuery);
