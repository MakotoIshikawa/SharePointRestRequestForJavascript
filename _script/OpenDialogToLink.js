_spBodyOnLoadFunctions.push(function () {
  (function ($) {
    $.fn.extend({
      OpenDialogLinks: function () {
        var $links = $(this).find('a[href]').not('[href^="javascript"]');
        $links.each(function () {
          $(this).click(function () {
            OpenPopUpPage(this.href, RefreshPage);
            return false;
          });
        });
      },
    });

    $('.open-dialog').OpenDialogLinks();
  })(jQuery);
});
