(function ($) {
  $.extend({
    GetInfoOfAttachmentFiles: function (title, id) {
      var url = $.GetRequestUriAttachments(title, id);
      var data = $.ajax(url, {
        type: 'GET',
        headers: { accept: 'application/json;odata=verbose', },
        async: false,
      }).responseJSON;

      if (!data.d) {
        $.error(data.error.message.value);
      }

      return data.d.results;
    },
    GetRequestUriAttachments: function (title, id) {
      var path = _spPageContextInfo.webAbsoluteUrl;
      path += "/_api/web/lists/getbytitle('" + title + "')/items(" + id + ")/AttachmentFiles";
      return path;
    },
    CreateHyperlink: function (ref, text) {
      var $link = $('<a />', { href: ref, text: (text) ? text : ref, });
      $link.DecorateLink(true);

      return $link;
    },
    IsFile: function (href) {
      return href.match(/\.(TXT|PDF|ZIP|JPG|PNG|GIF|DOC|DOCX|XLS|XLSX|PPT|PPTX|WMV|MSI|MSP)$/i);
    },
    CreateImg: function (filePath) {
      var ext = $.GetExtension(filePath);
      var icon = '/_layouts/15/images/ic' + ext;
      icon += (ext == 'pdf') ? '.png' : '.gif';
      return $('<img />', { src: icon, onerror: 'this.src = "/_layouts/15/images/icgen.gif"' });
    },
    GetContentLength: function (ref) {
      var size;
      $.ajax(ref, {
        type: 'HEAD',
        async: false,
      }).done(function (data, status, xhr) {// 通信成功時の処理
        size = xhr.getResponseHeader('Content-Length');
      });
      return size;
    },
    CnvUnitHtml: function (size) {
      return '&nbsp;<span class="fileInfo">&nbsp;(' + $.CnvUnit(size) + ')</span>';
    },
    CnvUnit: function (size) {
      var unit = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var kb = 1024;
      if (size < kb) {
        return size + '&nbsp' + 'B';
      }

      for (var i = 0; i < unit.length; i++) {
        size /= kb;
        if (size < kb) {
          if (size >= 100) {
            return $.FormatNum(Math.round(size)) + '&nbsp' + unit[i];
          } else {
            return Math.round(size * 10) / 10 + '&nbsp' + unit[i];
          }
        }
      }

      return $.FormatNum(Math.round(size)) + '&nbsp' + unit[7];
    },
    FormatNum: function (val) {
      var s = '' + val;
      if (s.length > 3) {
        var r = ((r = s.length % 3) == 0 ? 3 : r);
        var d = s.substring(r);
        s = s.substr(0, r) + d.replace(/(\d{3})/g, ",$1");
      }
      return s;
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
    GetAttachmentsHtml: function () {
      var $files = $(this);
      if (!$files.length) {
        return $('<span />').addClass('none-attachments').GetOuterHtml();
      }

      var $ul = $('<ul />');
      $files.each(function () {
        $ul.append($('<li />').append(
          $.CreateHyperlink(this.ServerRelativeUrl, this.FileName)
        ));
      });

      return $ul.GetOuterHtml();
    },
    GetOuterHtml: function () {
      var $this = $(this);
      if (!$this || !$this.length) {
        return '';
      }
      return $(this)[0].outerHTML;
    },
    DecorateLink: function (appendFileSize) {
      var $link = $(this);
      var ref = $link.attr('href');
      if (!$.IsFile(ref)) {
        return;
      }

      // ファイルアイコン描画
      $link.prepend($.CreateImg(ref));

      if (!appendFileSize) {
        return;
      }

      // ファイルサイズ描画
      var size = $.GetContentLength(ref);
      if (size) {
        $link.append($.CnvUnitHtml(size));
      }
    },
  });

  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Fields = {
    'Attachments': {
      'View': function (ctx) {
        try {
          if (ctx.CurrentItem.Attachments != 1) {
            return $('<span />').addClass('none-attachments').GetOuterHtml();
          }

          var info = $.GetInfoOfAttachmentFiles(ctx.ListTitle, ctx.CurrentItem.ID);
          var html = $(info).GetAttachmentsHtml();
          return html;
        } catch (e) {
          return $('<span />', { 'text': e.message, }).addClass('none-attachments').GetOuterHtml();
        }
      },
    },
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})(jQuery);
