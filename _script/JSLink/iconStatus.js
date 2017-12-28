(function () {
  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'Status': {
      'View': function (ctx) {
        var url = String.format('{0}&ID={1}', ctx.displayFormUrl, ctx.CurrentItem.ID)
        var title = ctx.CurrentItem.Title;
        var status = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        return String.format('<a href="{0}"><div class="status-icon" title="{1}" value="{2}"><span>{2}</span></div></a>', url, title, status);
      },
    },
    'DetailedStatus_x003a_Level': {
      'View': function (ctx) {
        var url = String.format('{0}&ID={1}', ctx.displayFormUrl, ctx.CurrentItem.ID)
        var title = ctx.CurrentItem.Title;
        var status = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        return String.format('<a href="{0}"><div class="status-icon" title="{1}" value="{2}"><span>{2}</span></div></a>', url, title, status);
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();
