define(['util/EventBus', 'jquery', 'notify'], function (Vent) {
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

      function hideImageView() {
        container.fadeOut(400, function() {
          img.hide();
        });
      }

      function setupEvents() {
        container.on("click", function() {
          hideImageView();
        });

        Vent.on(Vent.MAP_CLICKED, function(imageUrl) {
          console.log("Map clicked, loading image " + imageUrl);
          img.attr("src", imageUrl + "?" + (new Date()).getTime());
          container.fadeIn();
        });

        img.on("load", function() {
          // if container has been hidden by a click then
          // we don't want to show the img we tried to load
          // anymore
          if(container.is(":visible")) {
            fitImgToWindow();
            img.show();
          }
        });

        img.on("error", function() {
          hideImageView();

          $.notify("Failed to loading imagery at " + img.attr("src") + "...", {
            className: 'error'
          });
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

