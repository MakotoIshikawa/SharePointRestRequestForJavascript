(function ($) {
  $.extend({
    GetRequestUrlOfAttachments: function (listName, id) {
      var url = String.format("{0}/_api/Web/Lists/GetByTitle('{1}')/items({2})/AttachmentFiles", _spPageContextInfo.webAbsoluteUrl, listName, id);
      return url;
    },
    GetInfoOfAttachmentFiles: function (listName, id) {
      var url = $.GetRequestUrlOfAttachments(listName, id);
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
    CreateHyperlink: function (href, text) {
      var $link = $('<a />', { href: href, text: (!text) ? href : text, });
      return $link;
    },
  });
  $.fn.extend({
    GetOuterHtml: function () {
      var $this = $(this);
      if (!$this || !$this.length) {
        return '';
      }
      return $(this)[0].outerHTML;
    },
    GetAttachmentsHtml: function () {
      var $files = $(this);
      if (!$files.length) {
        return $('<span />').addClass('none-attachments').GetOuterHtml();
      }

      var $ul = $('<ul />').css({
        'list-style': 'none',
        'margin': 0,
        'padding': 0,
      });
      $files.each(function () {
        $ul.append($('<li />').append(
          $.CreateHyperlink(this.ServerRelativeUrl, this.FileName)
        ));
      });

      return $ul.GetOuterHtml();
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
