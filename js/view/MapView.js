define(['mapboxgl', 'service/TileService', 'util/EventBus', 'jquery', 'notify'], function (mapboxgl, TileService, Vent, $) {
  "use strict";

  var MapView = (function () {

    var MapView = function (cfg) {

      var parent;
      var container;
      var infoContainer;
      var map;

      function setupEvents() {
        map.on('mousemove', function (e) {
          var html = "Latitude: " + e.lngLat.lat.toFixed(6) + ", Longitude:" + e.lngLat.lng.toFixed(6);
          infoContainer.html(html);
        });

        map.on('click', function (e) {
          var lat = e.lngLat.lat.toFixed(6);
          var lng = e.lngLat.lng.toFixed(6);
          var imageUrl = TileService.getTileUrl(e.lngLat.lat, e.lngLat.lng);

          try {
            $.notify("Loading imagery at " + lat + ", " + lng + "...", {
              className: 'info'
            });
          } catch(err) {
            // IE11 doesn't like the line above
          }

          var sourceObj = new mapboxgl.ImageSource({
            url: imageUrl,
            coordinates: [
              //top left: lng, lat
              [-76.54335737228394, 39.18579907229748],
              //top right lng, lat
              [-76.52803659439087, 39.1838364847587],
              //bottom right: lng, lat
              [-76.5295386314392, 39.17683392507606],
              //bottom left: lng, lat
              [-76.54520273208618, 39.17876344106642]
            ]
          });

          map.addSource(lat + "_" + lng + 'Tile', sourceObj); // add

          TileService.loadTile(e.lngLat.lat, e.lngLat.lng).done(function (data, textStatus, jqXHR) {
            $.notify("Downloaded imagery at " + lat + ", " + lng + ", now adding tile to map", {
              className: "success"
            });
            // add the new tile to the map
          }).fail(function () {
            // $.notify("Unable to load imagery at " + lat + ", " + lng, {
            //   className: "error"
            // });
          });

          Vent.trigger(Vent.MAP_CLICKED, imageUrl);
        });
      }

      (function () {
        parent = $(cfg.parent);
        container = $('<div id="map"></div>');
        infoContainer = $('<div id="info"></div>');
        parent.append(container);
        parent.append(infoContainer);

        mapboxgl.accessToken = 'pk.eyJ1IjoibXJpdHptYW4iLCJhIjoiY2lwdzRldWl3MHdiNmhjbnI1Y3liZ2hnOSJ9.9hNx4tlqZ2xJN-5mSgrkeQ';
        map = new mapboxgl.Map({
          container: "map",
          style: cfg.style,
          center: cfg.center,
          zoom: cfg.zoom
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.Navigation());
        setupEvents();
      }());
    };

    return MapView;
  }());

  return MapView;
});

