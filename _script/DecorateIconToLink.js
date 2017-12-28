_spBodyOnLoadFunctions.push(function () {
  (function ($) {
    $.extend({
      IsFile: function (href) {
        return href.match(/\.(ASP|ASPX|CSS|DOC|DOCM|DOCX|GEN|GIF|GIF|HTM|INI|JPEG|JPG|JS|LOG|PDF|PPT|PPTM|PPTX|PUB|RTF|STP|TIF|TIFF|TXT|WMA|XLS|XLSM|XLSX|XML|XPS|XSD|XSL|ZIP)$/i);
      },
      CreateImg: function (filePath) {
        var ext = $.GetExtension(filePath);
        var icon = '/_layouts/15/images/ic' + ext;
        icon += (ext == 'pdf') ? '.png' : '.gif';
        return $('<img />', { src: icon, onerror: 'this.src = "/_layouts/15/images/icgen.gif"' });
      },
      GetExtension: function (href) {
        if (!href) {
          return '';
        }
        var len = href.length;
        var inx = href.lastIndexOf(".") + 1;
        return href.substring(inx, len).toLowerCase();
      },
    });
    $.fn.extend({
      DecorateIconToLink: function () {
        var $link = $(this);
        var ref = $link.attr('href');
        if (!$.IsFile(ref)) {
          return;
        }

        $link.prepend($.CreateImg(ref));
      },
      DecorateLinks: function () {
        var $links = $(this).find("a[href]").not(":has('img')").not(".noFileInfo");
        $links.each(function () {
          $(this).DecorateIconToLink();
        });
      },
    });

    $('#idAttachmentsTable').DecorateLinks();
  })(jQuery);
});
