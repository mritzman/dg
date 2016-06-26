define(['mapboxgl', 'service/TileService', 'util/StringUtil', 'notify'], function (mapboxgl, TileService, StringUtil) {
  "use strict";

  var MapView = (function () {

    var MapView = function (cfg) {

      var parent;
      var container;
      var infoContainer;
      var map;

      function setupEvents() {
        map.on('mousemove', function (e) {
          var html = e.lngLat.lat.toFixed(6) + ", " + e.lngLat.lng.toFixed(6);
          infoContainer.html(html);
        });

        map.on('click', function (e) {
          var lat = e.lngLat.lat.toFixed(6);
          var lng = e.lngLat.lng.toFixed(6);
          $.notify("Loading tile at " + lat + ", " + lng + "...", "info");

          // add some loader somewhere
          TileService.loadTile(e.lngLat.lat, e.lngLat.lng).done(function (data, textStatus, jqXHR) {
            $.notify("Downloaded tile at " + lat + ", " + lng + ", now adding tile to map", "success");
            // load the tile onto the map

            /*
             var sourceObj = new mapboxgl.ImageSource({
             url: StringUtil.format(TileService.url, [e.lngLat.lat, e.lngLat.lng]),
             coordinates: [
             [-76.54335737228394, 39.18579907229748],
             [-76.52803659439087, 39.1838364847587],
             [-76.5295386314392, 39.17683392507606],
             [-76.54520273208618, 39.17876344106642]
             ]
             });
             map.addSource('some id', sourceObj); // add
             */
          }).fail(function () {
            $.notify("Unable to load tile at " + lat + ", " + lng, "error");
          });
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
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [-105.001811, 39.912784], // start at Digital Globe Headquarters
          zoom: 16 // starting zoom
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

