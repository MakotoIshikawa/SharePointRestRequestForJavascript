(function ($) {
  $.extend({
    IsNew: function (item) {
      // ---<内部情報との比較>---
      //return (item['Created_x0020_Date.ifnew'] == 1);

      // ---<登録日との比較>---
      // 現在の日時を取得する
      var now = new Date();

      // 新規表示する最日を取得する
      var tday = now.getDate();
      var before = now.setDate(tday - 7);

      var cday = new Date(item.Created);
      //var cday = new Date(item.Modified);

      return (before < cday)
    },
    GetLinkTitleView: function (ctx, dialog, tgt) {
      var item = ctx.CurrentItem;

      var url = (item.FSObjType != 0)
        ? item.FileRef
        : ctx.listUrlDir + '/DispForm.aspx?ID=' + item.ID;

      var $a = $('<a />', {
        href: url,
        text: item.Title,
        target: tgt ? '_blank' : '_self',
        onclick: (tgt || !dialog || item.FSObjType != 0)
          ? 'return true;'
          : String.format('OpenPopUpPage("{0}",RefreshPage); return false;', url),
      }).addClass('ms-listlink');

      var $outer = $('<span />');
      $outer.append($a);

      if ($.IsNew(item)) {
        $outer.append($('<span />').addClass('newdocument-icon'));
      }

      return $outer.html();
    },
  });

  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'LinkTitleNoMenu': {
      'View': function (ctx) {
        try {
          var html = $.GetLinkTitleView(ctx, true);
          return html;
        } catch (e) {
          return $('<span />', { 'text': e.message, }).GetOuterHtml();
        }
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})(jQuery);
