(function ($) {
  $.extend({
    IsWithinDate: function (dateStr, period) {
      // 現在の日時を取得する
      var now = new Date();

      // 新規表示する最日を取得する
      var tday = now.getDate();
      var before = now.setDate(tday - period);

      var cday = new Date(dateStr);

      return (before < cday)
    },
  });

  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'ReleaseDate': {
      'View': function (ctx) {
        try {
          var item = ctx.CurrentItem;
          if ($.IsWithinDate(item.ReleaseDate, 7)) {
            return $('<span />', { 'title': item.ReleaseDate, }).addClass('newdocument-icon').GetOuterHtml();
          }

          var dateStr = $.ConvertDateToString.Format(new Date(item.ReleaseDate), 'MM/dd');
          return $('<span />', { 'title': item.ReleaseDate, 'text': dateStr, }).GetOuterHtml();
        } catch (e) {
          return $('<span />', { 'text': e.message, }).GetOuterHtml();
        }
      }
    }
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})(jQuery);
