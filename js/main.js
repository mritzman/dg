/**
 * Created by mritzman on 6/26/16.
 */

requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery.min',
    'mapboxgl': 'lib/mapbox-gl',
    'notify': 'lib/notify.min'
  },
  waitSeconds: 20,
  shim: {
    'notify': {
      deps: ['jquery']
    }
  }
});

requirejs(['jquery', 'view/MapView', 'notify'], function ($, MapView) {
  "use strict";

  function createApp() {
    $.notify.defaults({
      globalPosition: 'top left',
      showDuration: 200
    });

    var body = $("body");
    var mapView = new MapView({
      parent: body
    });

    setTimeout(function() {
      $.notify("Click/tap the map to load satellite imagery at that location.", {
        autoHide: false,
        className: 'info',
        showDuration: 1000,
        hideDuration: 500
      });
    }, 1000);
  }

  (function () {
    createApp();
  }());
});
