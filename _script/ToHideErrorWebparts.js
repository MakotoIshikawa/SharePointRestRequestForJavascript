_spBodyOnLoadFunctions.push(function () {
  (function ($) {
    $.fn.extend({
      HideWebpart: function () {
        var $webParts = $(this).closest('div.ms-webpart-chrome');
        $webParts.hide();
        $webParts.parent().hide();
      },
    });

    $('[errorwebpart]').HideWebpart();
    $('td[colspan="99"]').HideWebpart();
  })(jQuery);
});
