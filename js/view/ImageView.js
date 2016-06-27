define(['util/EventBus'], function (Vent) {
  "use strict";

  var ImageView = (function () {

    var ImageView = function (cfg) {

      var parent;
      var container;
      var img;

      function fitImgToWindow() {
        var tileSize = 556;
        var borderSize = 10; // 10 pixels for border
        var maxTileSize = tileSize - borderSize*2;

        if($(window).width() < maxTileSize) {
          maxTileSize = $(window).width() - borderSize*2;
        } else if($(window).height() < maxTileSize) {
          maxTileSize = $(window).height() - borderSize*2;
        }

        img.attr("width", maxTileSize);
        img.attr("height", maxTileSize);
      }

      function setupEvents() {
        container.on("click", function() {
          container.hide();
          img.hide();
        });

        Vent.on(Vent.MAP_CLICKED, function(imageUrl) {
          console.log("Map clicked, loading image " + imageUrl);
          img.attr("src", imageUrl + "?" + (new Date()).getTime());
          container.show();
        });

        img.on("load", function() {
          if(container.is(":visible")) {
            fitImgToWindow();
            img.show();
          }
        });

        $(window).on("resize", function() {
          fitImgToWindow();
        });
      }

      (function () {
        parent = $(cfg.parent);
        img = $('<img />');
        container = $('<div id="imageContainer"><span class="verticalMiddleHelper" /></div>');
        parent.append(container.append(img));
        setupEvents();
      }());
    };

    return ImageView;
  }());

  return ImageView;
});

