(function () {
  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'ID': {
      'View': function (ctx) {
        var num = ctx.CurrentItem.ID;
        return ('000' + num).slice(-4);
      },
    }
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();