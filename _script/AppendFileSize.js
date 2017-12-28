_spBodyOnLoadFunctions.push(function () {
  (function ($) {
    $.extend({
      FormatNum: function (val) {
        var s = '' + val;
        if (s.length > 3) {
          var r = ((r = s.length % 3) == 0 ? 3 : r);
          var d = s.substring(r);
          s = s.substr(0, r) + d.replace(/(\d{3})/g, ",$1");
        }
        return s;
      },
      CnvUnit: function (size) {
        var unit = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var kb = 1024;
        var format = '{0}&nbsp{1}';
        if (size < kb) {
          return String.format(format, size, 'B');
        }

        for (var i = 0; i < unit.length; i++) {
          size /= kb;
          if (size < kb) {
            if (size >= 100) {
              return String.format(format, $.FormatNum(Math.round(size)), unit[i]);
            } else {
              return String.format(format, Math.round(size * 10) / 10, unit[i]);
            }
          }
        }

        return String.format(format, $.FormatNum(Math.round(size)), unit[7]);
      },
    });
    $.fn.extend({
      AppendLinksFileSize: function () {
        var $links = $(this).find("a[href]").not(":has('img')").not(".noFileInfo");
        $links.each(function () {
          var $link = $(this);
          var href = $link.attr('href');
          $.ajax(href, { type: 'HEAD', }).done(function (data, status, xhr) {
            var size = xhr.getResponseHeader('Content-Length');
            var html = String.format('<span class="fileInfo">&nbsp({0})</span>', $.CnvUnit(size));
            $link.append(html);
          });
        });
      },
    });

    $('#idAttachmentsTable').AppendLinksFileSize();
  })(jQuery);
});
