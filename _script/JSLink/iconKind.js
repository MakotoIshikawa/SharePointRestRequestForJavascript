(function () {
  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'Kind': {
      'View': function (ctx) {
        var kind = ctx.CurrentItem.Kind;
        return String.format('<div class="kind-icon" title="{0}"><span>{0}</span></div>', kind);
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();
