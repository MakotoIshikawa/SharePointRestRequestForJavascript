var m_listTitle = 'カスタムリスト';

jQuery(function ($) {
  $.extend({
    SetItemDate: function (itemid, title) {
      $("#txt_id").val(itemid);
      $("#txt_title").val(title);
    }
  });
  $.fn.extend({
    RenderData: function (data) {
      var strres = '';
      $.each(data.d.results, function () {
        var click = String.format('$.SetItemDate({0}, \'{1}\');', this.Id, this.Title);
        var modified = new Date(this.Modified);
        var dateStr = modified.format('yyyy/MM/dd(ddd) hh:mm:ss');
        strres += String.format('<tr class="static" onclick="{0}">', click);
        strres += String.format('<td class="static">{0}</td>', this.Id);
        strres += String.format('<td class="static">{0}</td>', this.Title);
        strres += String.format('<td class="static">{0}</td>', dateStr);
        strres += '</tr>';
      });
      if (!strres) {
        strres += '<tr><td>(Empty)</td><td /><td /></tr>';
      }

      var $table = $('<table />');
      $table.append('<thead><tr><th>ID</th><th>タイトル</th><th>更新日時</th></tr></thead>')
      .append(String.format('<tbody>{0}</tbody>', strres));
      $(this).empty().append($table);
    }
  });

  $('#txt_list_name').val(m_listTitle);
  
  $('#btn_query').click(function () {
    var listTitle = $('#txt_list_name').val().trim();
    var title = $("#txt_title").val();
    var options = (!title)
      ? null
      : { filter: String.format('Title%20eq%20\'{0}\'', encodeURIComponent(title)) };
    var url = $.GetRequestUrlOfListItems(listTitle, options);
    $.GetAjaxOfJson(url).done(function (data, status, xhr) {
      $('#Panel_Table').RenderData(data);
    }).fail(function (xhr, status, error) {
      alert(xhr.status + ": " + xhr.statusText);
    });
  }).click();

  $('#btn_add').click(function () {
    var listTitle = $('#txt_list_name').val().trim();
    var title = $("#txt_title").val().trim();
    AddListItem(listTitle, title);
  });

  $('#btn_update').click(function () {
    var listTitle = $('#txt_list_name').val().trim();
    var id = $("#txt_id").val().trim();
    var title = $("#txt_title").val().trim();
    UpdateListItem(listTitle, id, title);
  });

  $('#btn_delete').click(function () {
    var listTitle = $('#txt_list_name').val().trim();
    var id = $("#txt_id").val().trim();
    DelListItem(listTitle, id);
  });
});

var myDigest = null;
function runWithFormDigest(fn) {
  if (myDigest != null) {
    fn(myDigest);
    return;
  }

  var url = _spPageContextInfo.webAbsoluteUrl + '/_api/contextinfo';
  $.ajax(url, {
    type: 'POST',
    contentType: 'application/x-www-url-encoded',
    dataType: 'json',
    headers: {
      accept: 'application/json;odata=verbose',
    },
    contentLength: 0,
    beforeSend: function (xhr) { xhr.withCredentials = true; },
  }).done(function (data, status, xhr) {
    if (data.d) {
      var digest = data.d.GetContextWebInformation.FormDigestValue;
      myDigest = digest;
      fn(digest);
    }
  }).fail(function (xhr, status, error) {
    alert(xhr.status + ": " + xhr.statusText);
    myDigest = null;
  });
}

function AddListItem(listTitle, title) {
  runWithFormDigest(function (digest) {
    $.support.cors = true;
    var url = $.GetRequestUrlOfListItems(listTitle);
    $.ajax(url, {
      type: 'POST',
      data: JSON.stringify({
        '__metadata': { type: 'SP.ListItem' },
        Title: title,
      }),
      headers: {
        accept: 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'x-requestforceauthentication': true,
        'X-RequestDigest': digest,
      },
    }).done(function (data, status, xhr) {
      alert('アイテムを追加しました。');
      $.SetItemDate();
      $('#btn_query').click();
    }).fail(function (xhr, status, error) {
      alert(xhr.status + ": " + xhr.statusText);
    });
  });
}

function UpdateListItem(listTitle, id, title) {
  runWithFormDigest(function (digest) {
    $.support.cors = true;
    var url = $.GetRequestUrlOfListItemByTitle(listTitle, id);
    $.ajax(url, {
      type: 'POST',
      data: JSON.stringify({
        '__metadata': { type: 'SP.ListItem' },
        Title: title,
      }),
      headers: {
        'X-HTTP-Method': 'MERGE',
        accept: 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'x-requestforceauthentication': true,
        'X-RequestDigest': digest,
        'IF-MATCH': '*',
      },
    }).done(function (data, status, xhr) {
      alert('アイテムを更新しました。');
      $.SetItemDate();
      $('#btn_query').click();
    }).fail(function (xhr, status, error) {
      alert(xhr.status + ": " + xhr.statusText);
    });
  });
}

function DelListItem(listTitle, id) {
  runWithFormDigest(function (digest) {
    $.support.cors = true;
    var url = $.GetRequestUrlOfListItemByTitle(listTitle, id);
    $.ajax(url, {
      type: 'POST',
      headers: {
        'X-HTTP-Method': 'DELETE',
        accept: 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'x-requestforceauthentication': true,
        'X-RequestDigest': digest,
        'IF-MATCH': '*',
      },
    }).done(function (data, status, xhr) {
      alert('アイテムを削除しました。');
      $.SetItemDate();
      $('#btn_query').click();
    }).fail(function (xhr, status, error) {
      alert(xhr.status + ": " + xhr.statusText);
    });
  });
}
