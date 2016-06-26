define([ 'jquery' ], function($) {
  "use strict";

  var TileService = (function() {

    var TileService = function() {

      this.loadTile = function(lat, lng) {
        return $.ajax({
          url: "http://mapperdev.tomnod.com/chip_api/chip/lat/" + lat + "/lng/" + lng
        });
      };

    };

    return new TileService();
  }());

  return TileService;
});
