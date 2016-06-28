define(['mapboxgl', 'service/TileService', 'util/EventBus', 'jquery', 'notify'], function (mapboxgl, TileService, Vent, $) {
  "use strict";

  var MapView = (function () {

    var MapView = function (cfg) {

      var parent;
      var container;
      var infoContainer;
      var map;

      function addImageToMap(lat, lng, url) {
        var id = lat + "_" + lng;
        var srcId = id + "_Source";
        var overlayId = id+ "_Overlay";
        var halfChipSize = 0.00199;

        // lng west is less, east is more
        // lat north is more, south is less
        // var sourceObj = new mapboxgl.ImageSource();
        map.addSource(srcId, new mapboxgl.ImageSource({
          url: url,
          type: 'image',
          coordinates: [
            //top left: lng, lat
            [lng - halfChipSize, lat + halfChipSize],
            //top right lng, lat
            [lng + halfChipSize, lat + halfChipSize],
            //bottom right: lng, lat
            [lng + halfChipSize, lat - halfChipSize],
            //bottom left: lng, lat
            [lng - halfChipSize, lat - halfChipSize]
          ]
        }));

        try {
          map.addLayer({
            "id": overlayId,
            "source": srcId,
            "type": "raster"
          });
        } catch(err) {
          console.error(err);
        }
      }

      function downloadTile(lat, lng) {
        TileService.loadTile(lat, lng).done(function (data, textStatus, jqXHR) {
          $.notify("Downloaded imagery at " + lat + ", " + lng + ", now adding tile to map", {
            className: "success"
          });
          // add the new tile to the map
        }).fail(function () {
          $.notify("Unable to load imagery at " + lat + ", " + lng, {
            className: "error"
          });
        });
      }

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
          } catch (err) {
            // IE11 doesn't like the line above
          }

          addImageToMap(e.lngLat.lat, e.lngLat.lng, imageUrl);
          // downloadTile(e.lngLat.lat, e.lngLat.lng);
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

