(function ($) {
  $.extend({
    Init: function () {
      $('.level-menu[name]').each(function () {
        var $this = $(this);
        var listName = $this.attr('name');
        var properties = $.GetProperties(listName);
        var des = properties.Description;
        if (des.length) {
          $this.attr('href', des);
        }

        $this.ToHtmlListItems(listName);
      });
    },
    GetRequestUrlOfList: function (listName) {
      var url = String.format("{0}/_api/Web/Lists/GetByTitle('{1}')", _spPageContextInfo.webAbsoluteUrl, listName);
      return url;
    },
    GetRequestUrlOfListItems: function (listName, options) {
      var url = String.format("{0}/_api/Web/Lists/GetByTitle('{1}')/Items", _spPageContextInfo.webAbsoluteUrl, listName);
      if (!options) {
        return url;
      }

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
    GetResponseJSON: function (url) {
      var data = $.ajax(url, {
        type: 'GET',
        async: false,
        headers: {
          "accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "x-requestforceauthentication": true,
        },
      }).responseJSON;

      if (!data.d) {
        $.error(data.error.message.value);
      }

      return data.d;
    },
    GetProperties: function (listName) {
      var url = $.GetRequestUrlOfList(listName);
      return $.GetResponseJSON(url);
    },
    GetItems: function (listName, done, fail) {
      var url = $.GetRequestUrlOfListItems(listName, {
        orderby: 'ID',
        top: 100,
      });
      $.ajax({
        url: url,
        type: "GET",
        headers: {
          "accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "x-requestforceauthentication": true
        },
      }).done(function (data, status, xhr) {
        if ($.isFunction(done)) {
          done(data, status, xhr);
        }
      }).fail(function (xhr, status, error) {
        if ($.isFunction(fail)) {
          fail(xhr, status, error);
        }
      });
    },
    ToHtmlStr: function (item) {
      var $span = $('<span />', { text: item.Title, });
      if (item.URL) {
        var $a = $('<a />', {
          href: item.URL.Url,
          target: (item.Blank && item.Blank == 'はい') ? '_blank' : '_self',
        }).append($span);
        return $a.GetOuterHtml();
      } else {
        return $span.GetOuterHtml();
      }
    },
    ToHtmlList: function (items) {
      if (!items.length) {
        return '';
      }

      var $ul = $('<ul />');
      $(items).each(function () {
        var $li = $('<li />').html(this);
        $ul.append($li);
      });

      if (items.length > 4) {
        $ul.addClass('bottom-menu');
      }

      var htm = $ul.GetOuterHtml();
      return htm;
    },
  });
  $.fn.extend({
    ToHtmlListItems: function (listName) {
      var $this = $(this);
      $.GetItems(listName, function (data, status, xhr) {
        var items = data.d.results;
        if (!items.length) {
          return;
        }

        var parentItems = $.grep(items, function (item) {
          return !item.Parent;
        }).map(function (item) {
          var sb = '';
          sb += $.ToHtmlStr(item);

          var parentName = item.Title;
          var items = $.grep(data.d.results, function (d, i) {
            return (d.Parent == parentName);
          }).map(function (childItem) {
            return $.ToHtmlStr(childItem);
          });

          sb += $.ToHtmlList(items);

          return sb;
        });

        var html = $.ToHtmlList(parentItems);

        $this.html(html);
      }, function (xhr, status, error) {
        alert(xhr.status + ": " + xhr.statusText);
      });
    },
  });
})(jQuery);

_spBodyOnLoadFunctions.push(jQuery.Init);
