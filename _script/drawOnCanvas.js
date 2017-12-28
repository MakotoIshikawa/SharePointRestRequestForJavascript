(function ($) {
  $.extend({
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
    GetItems: function (listName, done, fail) {
      var url = $.GetRequestUrlOfListItems(listName, {
        orderby: 'Z',
        top: 30,
      });
      $.ajax(url, {
        type: "GET",
        headers: {
          "accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "x-requestforceauthentication": true
        },
      }).done(function (data, status, xhr) {// 通信成功時の処理
        if (done)
          done(data, status, xhr);
      }).fail(function (xhr, status, error) {// 通信失敗時の処理
        if (fail)
          fail(xhr, status, error);
      });
    },
    GetRGB: function (red, green, blue, alpha) {
      var r = red ? red : 0;
      var g = green ? green : 0;
      var b = blue ? blue : 0;

      if (alpha) {
        var a = alpha;
        return String.format('rgba({0}, {1}, {2}, {3})', r, g, b, a);
      } else {
        return String.format('rgb({0}, {1}, {2})', r, g, b);
      }
    },
    DrawOnCanvas: function () {
      var listName = 'CanvasTable';
      $.GetItems(listName, function (data, status, xhr) {// 通信成功時の処理
        $.each(data.d.results, function () {
          $('canvas#Map_Canvas').drawRect({
            draggable: true,
            fillStyle: $.GetRGB(this.Red, this.Green, this.Blue, this.Alpha),
            x: this.X,
            y: this.Y,
            width: this.Width,
            height: this.Height,

            fromCenter: false
          });
        });
      }, function (xhr, status, error) {// 通信失敗時の処理
        alert(String.format('{0}: {1}', xhr.status, xhr.statusText));
      });
    },
  });
  $.fn.extend({
  });
})(jQuery);

_spBodyOnLoadFunctions.push(jQuery.DrawOnCanvas);
