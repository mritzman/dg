define([ 'jquery', 'util/StringUtil' ], function($, StringUtil) {
  "use strict";

  var TileService = (function() {

    var TileService = function() {

      var url = "http://mapperdev.tomnod.com/chip_api/chip/lat/{0}/lng/{1}";

      this.getTileUrl = function(lat, lng) {
        return StringUtil.format(url, [lat, lng]);
      };

      this.loadTile = function(lat, lng) {
        return $.ajax({
          url: this.getTileUrl(lat, lng),
          crossDomain: true,
        });
      };

    };

    return new TileService();
  }());

  return TileService;
});
