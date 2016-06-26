/**
 * Created by mritzman on 6/26/16.
 */

requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery.min',
    'mapboxgl': 'lib/mapbox-gl'
  },
  waitSeconds: 20
});

requirejs(['jquery', 'mapboxgl'], function ($, mapboxgl) {
  "use strict";

  function createApp() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXJpdHptYW4iLCJhIjoiY2lwdzRldWl3MHdiNmhjbnI1Y3liZ2hnOSJ9.9hNx4tlqZ2xJN-5mSgrkeQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-105.001811, 39.912784], // start at Digital Globe Headquarters
      zoom: 16 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.Navigation());

    map.on('mousemove', function (e) {
      $("#info").html(
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
          JSON.stringify(e.point) + '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
          JSON.stringify(e.lngLat));
    });
  }

  (function () {
    createApp();
  }());
});
