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
  }

  (function () {
    createApp();
  }());
});
