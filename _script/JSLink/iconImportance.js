(function () {
  var docCategory = {};
  docCategory.Templates = {};
  docCategory.Templates.Fields = {
    'Importance': {
      'View': function (ctx) {
        var item = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        switch (item) {
        case '重要':
        case 'はい':
          return '<img src="/sites/cs/_images/icon_warning.png"/>';
        default:
          return '<span></span>';
        }
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(docCategory);
})();
