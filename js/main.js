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
    'notify' : {
      deps : [ 'jquery' ]
    }
  }
});

requirejs(['jquery', 'view/MapView'], function ($, MapView) {
  "use strict";

  function createApp() {
    var body = $("body");
    var mapView = new MapView({
      parent: body
    });
  }

  (function () {
    createApp();
  }());
});
