_spBodyOnLoadFunctions.push(function () {
  (function ($) {
    $.fn.extend({
      AppendButton: function () {
        $(this).find('tr').each(function () {
          var $a = $(this).find('a:not([href^="javascript"])');
          var text = $a.text();
          var href = $a.attr('href');

          if (href.match(/\.(JPG|PNG|GIF|BMP)$/i)) {
            $(this).append($('<td />').append($('<button />', {
              text: 'イメージ挿入',
              type: 'button',
            }).click(function () {
              document.execCommand('insertImage', false, href);
            })).addClass('button-img'));
          }

          $(this).append($('<td />').append($('<button />', {
            text: 'リンク挿入',
            type: 'button',
          }).click(function () {
            document.execCommand('createLink', false, href);
            document.execCommand('underline', false);
          })).addClass('button-link'));
        });
      },
    });

    $('#idAttachmentsTable').AppendButton();
  })(jQuery)
});
