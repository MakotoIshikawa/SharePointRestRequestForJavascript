 (function () { 
   (window.jQuery || document.write('<script src="/sites/canvas/_script/jquery/jquery-2.1.4.min.js"></script>'));
 })();
 (function ($) {
   document.write('<script src="/sites/canvas/_script/jquery/jCanvas/jcanvas.min.js"></script>');

   $.extend({
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
  });
  $.fn.extend({
    DrawCanvasRect: function (item) {
      $(this).drawRect({
        draggable: true,
        fillStyle: $.GetRGB(item.Red, item.Green, item.Blue, item['Alpha.']),
        x: item.X,
        y: item.Y,
        width: item.Width,
        height: item.Height,

        fromCenter: false
      });
    }
  });
})(jQuery);

function RegisterCanvas() {
  var ctx = {};
  ctx.Templates = {};
  ctx.Templates.Header = '<h1>地図描画サンプル</h1><canvas width="960" height="640" id="Map_Canvas" class="map-canvas"></canvas>';
  ctx.Templates.Footer = '<hr/>';
  ctx.Templates.Item = function (ctx) {
    $('canvas#Map_Canvas').DrawCanvasRect(ctx.CurrentItem);
    return '';
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
}

RegisterModuleInit("/sites/canvas/_catalogs/masterpage/script/JSLink/drawCanvas.js", RegisterCanvas);
RegisterCanvas();
