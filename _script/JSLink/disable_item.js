(function () {
	var ctx = {};
	ctx.Templates = {};
	ctx.Templates.Fields = {
		'Text': {// 1行テキスト
			'EditForm': function (ctx) {
				// 判定処理を書く
				var readOnly = false;
				if (readOnly) {
					return SPField_FormDisplay_Default(ctx);
				} else {
					return SPFieldText_Edit(ctx);
				}
			},
		},
		'Note': {// 複数行テキスト
			'EditForm': function (ctx) {
				// 判定処理を書く
				var readOnly = false;
				if (readOnly) {
					return SPFieldNote_Display(ctx);
				} else {
					return SPFieldNote_Edit(ctx);
				}
			},
		},
		'User': {// ユーザー
			'EditForm': function (ctx) {
				// 判定処理を書く
				var readOnly = true;
				if (readOnly) {
					prepareUserFieldValue(ctx);
					return SPFieldUser_Display(ctx);
				} else {
					return SPClientPeoplePickerCSRTemplate(ctx);
				}
			},
		},
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();

// コンテンツを正しく表示するには、ユーザーコントロールに特定の書式設定された値が必要です。
function prepareUserFieldValue(ctx) {
	var userFields = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

	var fieldValue = "";

	for (var i = 0; i < userFields.length; i++) {
		var user = userFields[i];
		fieldValue += user.EntityData.SPUserID;
		fieldValue += SPClientTemplates.Utility.UserLookupDelimitString;
		fieldValue += user.DisplayText;

		if ((i + 1) != userFields.length) {
			fieldValue += SPClientTemplates.Utility.UserLookupDelimitString;
		}
	}

	ctx.CurrentFieldValue = fieldValue;
}
