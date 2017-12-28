// 1行目は列ヘッダとみなし、項目名として取得している
function csv2json(rows) {
	var jsonArray = [];
	var header = rows[0];

	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];
		var a_line = {};
		for (var j = 0; j < header.length; j++) {
			a_line[header[j].v] = row[j].v;
		}

		jsonArray.push(a_line);
	}

	return jsonArray;
}

jQuery(function ($) {
	$('#btn_get').click(function () {
		// SharePoint ドキュメントライブラリ（Excelファイル）からの取得
		var fileRelativeUrl = "Shared%20Documents/13TOKYO_HeaderPlus.xlsx";
		var sheetName = "13TOKYO_HeaderPlus";

		// ExcelのRange指定でデータ取得（C1～I1400セル）
		var range = "C1|I1400";

		var url = _spPageContextInfo.webServerRelativeUrl;
		url += String.format('/_vti_bin/ExcelRest.aspx/{0}' + fileRelativeUrl);
		url += String.format("/model/Ranges('{0}!{1}')?$format=json", sheetName, range);

		$.ajax(url, {
			type: 'GET',
			dataType: 'json',
			async: false,
			headers: {
				Accept: 'application/json;odata=nometadata'
			},
		}).done(function (data, textStatus, jqXHR) {
			var aaData = csv2json(data.rows);
			$('#ZipViewTable').SetRows(aaData);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			alert('Error retrieving Tasks: ' + unescape(jqXHR.responseText.replace(/\\/g, '%')));
		});

		return false;
	});
});
