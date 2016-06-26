define(['mapboxgl'], function(mapboxgl) {
  "use strict";

  var MapView = (function() {

    var MapView = function(cfg) {

      var parent;
      var container;
      var infoContainer;
      var map;

      function setupEvents() {
        map.on('mousemove', function (e) {
          infoContainer.html(
              // e.point is the x, y coordinates of the mousemove event relative
              // to the top-left corner of the map
              JSON.stringify(e.point) + '<br />' +
                // e.lngLat is the longitude, latitude geographical position of the event
              JSON.stringify(e.lngLat));
        });
      }

      (function() {
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

