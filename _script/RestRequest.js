(function ($) {
  $.extend({
    GetCurrentUser: function () {
      var url = String.format("{0}/_api/Web/currentUser", _spPageContextInfo.webAbsoluteUrl);
      return $.GetResponseJSON(url);
    },
    GetMyProperties: function () {
      var url = String.format("{0}/_api/SP.UserProfiles.PeopleManager/GetMyProperties", _spPageContextInfo.webAbsoluteUrl);
      return $.GetResponseJSON(url);
    },
    GetRequestUrlOfListByTitle: function (listName) {
      var url = String.format("{0}/_api/Web/Lists/GetByTitle('{1}')", _spPageContextInfo.webAbsoluteUrl, listName);
      return url;
    },
    GetRequestUrlOfListByGuid: function (guid) {
      var url = String.format("{0}/_api/Web/Lists('{1}')", _spPageContextInfo.webAbsoluteUrl, guid);
      return url;
    },
    GetRequestUrlOfListItems: function (listName, options) {
      var url = String.format("{0}/Items", $.GetRequestUrlOfListByTitle(listName));
      if (!options) {
        return url;
      }

      var options = $.extend(true, {
        orderby: 'ID',
        top: 100,
      }, options);

      var sb = [];
      $.each(options, function (key, value) {
        sb.push(String.format('${0}={1}', key, value));
      });

      if (sb.length) {
        var op = sb.join('&');
        url += '?' + op;
      }

      return url;
    },
    GetRequestUrlOfListItemByTitle: function (listName, id) {
      var url = String.format("{0}/Items({1})", $.GetRequestUrlOfListByTitle(listName), id);
      return url;
    },
    GetRequestUrlOfListItemByGuid: function (guid, id) {
      var url = String.format("{0}/Items({1})", $.GetRequestUrlOfListByGuid(guid), id);
      return url;
    },
    GetRequestUrlOfAttachments: function (listName, id) {
      var url = String.format("{0}/AttachmentFiles", $.GetRequestUrlOfListItemByTitle(listName, id));
      return url;
    },
    GetAjaxOfJson: function (url, async) {
      return $.ajax(url, {
        type: 'GET',
        async: (!async) ? false : true,
        headers: {
          'accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          'x-requestforceauthentication': true,
        },
      });
    },
    GetResponseJSON: function (url) {
      var data = $.GetAjaxOfJson(url).responseJSON;

      if (!data.d) {
        $.error(data.error.message.value);
      }

      return data.d;
    },
    GetListProperties: function (listName) {
      var url = $.GetRequestUrlOfListByTitle(listName);
      return $.GetResponseJSON(url);
    },
    GetListItemByTitle: function (listName, id) {
      var url = $.GetRequestUrlOfListItemByTitle(listName, id);
      return $.GetResponseJSON(url);
    },
    GetListItemByGuid: function (guid, id) {
      var url = $.GetRequestUrlOfListItemByGuid(guid, id);
      return $.GetResponseJSON(url);
    },
    GetItemOfThisList: function (id) {
      var item = $.GetListItemByGuid(_spPageContextInfo.listId, id);
      return item;
    },
  });
})(jQuery);
