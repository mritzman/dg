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

requirejs(['jquery', 'view/MapView'], function ($, MapView) {
  "use strict";

  function createApp() {
    var body = $("body");
    new MapView({
      parent: body
    });
  }

  (function () {
    createApp();
  }());
});
