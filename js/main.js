/**
 * Created by mritzman on 6/26/16.
 */

requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery.min',
    'underscore': 'lib/underscore-min',
    'backbone': 'lib/backbone-min',
    'mapboxgl': 'lib/mapbox-gl',
    'notify': 'lib/notify.min'
  },
  waitSeconds: 20,
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'notify': {
      deps: ['jquery']
    }
  }
});

requirejs(['jquery', 'view/MapView', 'view/ImageView', 'notify'], function ($, MapView, ImageView) {
  "use strict";

  function createApp() {
    $.notify.defaults({
      globalPosition: 'top left',
      showDuration: 200
    });

    var body = $("body");
    var mapView = new MapView({
      parent: body,
      style: 'mapbox://styles/mapbox/streets-v9',
//      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 16, // starting zoom
      center: [-105.001811, 39.912784] // start at Digital Globe Headquarters
    });

    var imageView = new ImageView({
      parent: body
    });

    setTimeout(function () {
      $.notify("Click/tap the map to load satellite imagery at that location.", {
        autoHide: false,
        className: 'info',
        showDuration: 2000,
        hideDuration: 500
      });
    }, 1000);
  }

  (function () {
    $(document).ready(function () {
      createApp();
    });
  }());
});
