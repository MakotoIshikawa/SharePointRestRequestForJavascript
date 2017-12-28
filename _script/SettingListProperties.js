// このコードを実行する前に、プレースホルダの値を変更します
var m_listTitle = "権限付与検証";
var groupName = '外部ユーザグループ';
var roleDefinitionName = '閲覧';
var value = [{
		"Key": "業務マニュアル 営業部編集者",
		"DisplayText": "業務マニュアル 営業部編集者",
		"IsResolved": true,
		"Description": "業務マニュアル 営業部編集者",
		"EntityType": "",
		"EntityGroupName": "",
		"HierarchyIdentifier": null,
		"EntityData": {
			"SPUserID": "26",
			"AccountName": "業務マニュアル 営業部編集者",
			"PrincipalType": "User"
		},
		"MultipleMatches": [],
		"ProviderName": "",
		"ProviderDisplayName": "",
		"Resolved": true
	},
	{
		"Key": "業務マニュアル 開発部編集者",
		"DisplayText": "業務マニュアル 開発部編集者",
		"IsResolved": true,
		"Description": "業務マニュアル 開発部編集者",
		"EntityType": "",
		"EntityGroupName": "",
		"HierarchyIdentifier": null,
		"EntityData": {
			"SPUserID": "28",
			"AccountName": "業務マニュアル 開発部編集者",
			"PrincipalType": "User"
		},
		"MultipleMatches": [],
		"ProviderName": "",
		"ProviderDisplayName": "",
		"Resolved": true
	},
];

_spBodyOnLoadFunctions.push(jQuery(function ($) {
	$.extend({
		GetListItems: function (listName, key) {
			var url = $.GetRequestUrlOfListItems(listName, !key ? false : {
				filter: encodeURIComponent(String.format("{0} eq '{1}'", 'ID', key)),
			});
			$.GetAjaxOfJson(url, true).done(function (data, status, xhr) {
				$('#P1').RenderData(data);
			}).fail(function (xhr, status, error) {
				alert(String.format('リスト情報の取得に失敗しました: {0}\n{1}\n{2}'), xhr.status, error, xhr.responseText);
				$('#P1').html('');
				$('#list_name').val('');
			});
		},
		GetSiteGroupID: function (name) { // ターゲットグループのIDを取得します
			var url = String.format("{0}/_api/Web/SiteGroups/GetByName('{1}')/ID", _spPageContextInfo.webAbsoluteUrl, name);
			return $.GetResponseJSON(url).Id;
		},
		GetRoleDefinitionID: function (name) { // グループに割り当てる権限を定義ロール定義のIDを取得します
			var url = String.format("{0}/_api/Web/RoleDefinitions/GetByName('{1}')/ID", _spPageContextInfo.webAbsoluteUrl, name);
			return $.GetResponseJSON(url).Id;
		},
		GetRoleDefinitions: function () { // ロール定義を取得します
			var url = String.format("{0}/_api/Web/RoleDefinitions", _spPageContextInfo.webAbsoluteUrl);
			return $.GetResponseJSON(url);
		},
		GetSiteUsers: function () {
			var url = String.format("{0}/_api/Web/SiteUsers", _spPageContextInfo.webAbsoluteUrl);
			return $.GetResponseJSON(url);
		},
		BreakRoleInheritance: function (targetURL) { // 親の継承を切ります
			var url = targetURL;
			var digest = $('#__REQUESTDIGEST').val();
			url += String.format("/breakroleinheritance({0})", true);
			return $.ajax(url, {
				type: 'POST',
				headers: {
					'X-RequestDigest': digest,
				},
			});
		},
		DeleteCurrentRole: function (targetURL, principalID) { // 現在の役割の割り当てを削除します
			var url = targetURL;
			var digest = $('#__REQUESTDIGEST').val();
			url += String.format("/RoleAssignments/getbyprincipalid({0})", principalID);
			return $.ajax(url, {
				type: 'POST',
				headers: {
					'X-RequestDigest': digest,
					'X-HTTP-Method': 'DELETE'
				},
			});
		},
		SetNewPermissions: function (targetURL, principalID, roleDefID) { // 新しい役割の割り当てを追加します
			var url = targetURL;
			var digest = $('#__REQUESTDIGEST').val();
			url += String.format("/RoleAssignments/AddRoleAssignment(principalid={0},roleDefId={1})", principalID, roleDefID);
			return $.ajax(url, {
				type: 'POST',
				headers: {
					'X-RequestDigest': digest,
				},
			});
		},
	});
	$.fn.extend({
		RenderData: function (data) {
			var strres = '';
			$.each(data.d.results, function () {
				var click = String.format('onclick="setItemDate({0}, \'{1}\', {2}); return false;"', this.Id, this.Title, this.ReferenceId);
				strres += String.format('  <tr class="static" {0}>', click) + '\n';
				strres += String.format('    <td class="ms-rteTable-default">{0}</td>', this.Id) + '\n';
				strres += String.format('    <td class="ms-rteTable-default">{0}</td>', this.Title) + '\n';
				strres += String.format('    <td class="ms-rteTable-default">{0}</td>', this.ReferenceId) + '\n';
				strres += String.format('  </tr>') + '\n';
			});
			if (!strres) {
				strres += '<tr><td colspan=3>(Empty)</td></tr>';
			}
			var body = '';
			body += '<table width="100%" class="ms-rteTable-default" cellspacing="0">' + '\n';
			body += '  <tr>' + '\n';
			body += '    <th class="ms-rteTableHeaderEvenCol-default">ID</th>' + '\n';
			body += '    <th class="ms-rteTableHeaderOddCol-default">タイトル</th>' + '\n';
			body += '    <th class="ms-rteTableHeaderEvenCol-default">グループID</th>' + '\n';
			body += '  </tr>' + '\n';
			body += strres + '\n';
			body += '</table>' + '\n';
			$(this).html(body);
		},
	});

	$('#Query').click(function () {
		var listName = $('#list_name').val().trim();
		var key = $("#itemid").val();
		$.GetListItems(listName, key);
	});

	$('#Assign').click(function () {
		var listName = $('#list_name').val().trim();
		var key = $("#itemid").val();
		var gID = $("#groupid").val();
		var rID = $.GetRoleDefinitionID(roleDefinitionName);

		var targetURL = $.GetRequestUrlOfListItem(listName, key);
		$.BreakRoleInheritance(targetURL).done(function (data, status, xhr) {
			alert(String.format('{0} : 親からの権限の継承を切りました。', status));

			$.DeleteCurrentRole(targetURL, gID).done(function (data, status, xhr) {
				alert(String.format('{0} : 権限を削除しました。', status));
			}).fail(function (xhr, status, error) {
				alert(String.format('権限の削除に失敗しました: {0}:{1}:{2}'), xhr.status, error, xhr.responseText);
			}).always(function (data, status, xhr) {
				$.SetNewPermissions(targetURL, gID, rID).done(function (data, status, xhr) {
					alert(String.format('{0} : 権限を割り当てました。', status));
				}).fail(function (xhr, status, error) {
					alert(String.format('権限を割り当てに失敗しました: {0}:{1}:{2}'), xhr.status, error, xhr.responseText);
				});
			});
		}).fail(function (xhr, status, error) {
			alert(String.format('継承の切断に失敗しました: {0}:{1}:{2}'), xhr.status, error, xhr.responseText);
		});
	});

	$('#list_name').val(m_listTitle);
	$.GetListItems(m_listTitle);
}));

function setItemDate(itemid, title, groupid) {
	$("#itemid").val(itemid);
	$("#title").val(title);
	$("#groupid").val(groupid);
}
