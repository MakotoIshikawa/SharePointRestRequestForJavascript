(function ($) {
  var ctx = {};
  ctx.ListTemplateType = 100;
  ctx.BaseViewID = 1;
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'Title': {
      'View': function (ctx, field, listItem, listSchema) {
        var ref = listItem.link;
        if (!ref) {
          return listItem.Title;
        }

        var a = '<a href="' + ref + '" target=”_blank”>';
        a += listItem.Title;
        a += '</a>';

        return a;
      },
    },
    'link': {
      'View': function (ctx, field, listItem, listSchema) {
        return '';
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);

  $(window).load(function () {
    var $div = $('div[displayname="リンク先"]');
    if (!$div) {
      return;
    }
    var $th = $div.closest('th');
    $th.hide();
  });
})(jQuery);

