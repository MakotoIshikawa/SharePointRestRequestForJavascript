(function ($) {
  $.fn.extend({
    GetLinkHtml: function (isNew) {
      var $a = $(this);

      var $outer = $('<span />');
      $outer.append($a);

      if (isNew) {
        $outer.append($('<span />').addClass('newdocument-icon'));
      }

      return $outer.html();
    }
  });
  $.extend({
    IsNew: function (item) {
      return (item['Created_x0020_Date.ifnew'] == 1);
    },
    GetLinkTitleView: function (dir, item, dialog, tgt) {
      try {
        if (item.FSObjType != 0) {
          var $a = $('<a />', {
            href: item.FileRef,
            text: item.Title,
            'aria-label': String.format('{0}, フォルダー', item.Title),
          });

          return $a.GetLinkHtml($.IsNew(item));
        }

        var url = String.format('{0}/DispForm.aspx?ID={1}', dir, item.ID);
        var $a = $('<a />', {
          href: url,
          text: item.Title,
          target: tgt ? '_blank' : '_self',
          onclick: (tgt || !dialog)
            ? 'return true;'
            : 'OpenPopUpPage(this.href, RefreshPage); return false;',
        }).addClass('ms-listlink');

        return $a.GetLinkHtml($.IsNew(item));
      } catch (e) {
        return String.format('<span>{0}</span>', e.message);
      }
    },
  });
})(jQuery);

function RegisterLinkTitle() {
  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'LinkTitleNoMenu': {
      'View': function (ctx) {
        return jQuery.GetLinkTitleView(ctx.listUrlDir, ctx.CurrentItem, true);
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
}

RegisterModuleInit("/sites/nissay/_catalogs/masterpage/JSLink/openDialog.js", RegisterLinkTitle);
RegisterLinkTitle();
