(function ($) {
	$.fn.extend({
		SetRows: function (data) {
			if (!data) {
				return;
			}

			var $table = $(this);
			var columns = $table.find('th').map(function () {
				var sTitle = $(this).text();
				var mData = $(this).attr('name') ? $(this).attr('name') : sTitle;
				return {
					sTitle: sTitle,
					mData: mData,
				}
			}).get();

			$table.show();

			return $table.dataTable({
				bDestroy: true,
				bProcessing: true,
				aaData: data,
				aoColumns: columns,
				iDisplayLength: 100,
				dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
				bLengthChange: false,
				bProcessing: true,
			});
		},
	});
})(jQuery);
