define([ 'jquery', 'util/StringUtil' ], function($, StringUtil) {
  "use strict";

  var TileService = (function() {

    var TileService = function() {

      this.url = "http://mapperdev.tomnod.com/chip_api/chip/lat/{0}/lng/{1}";

      this.loadTile = function(lat, lng) {
        return $.ajax({
          url: StringUtil.format(this.url, [lat, lng]),
          crossDomain: true,
          dataType: 'jsonp'
        });
      };

    };

    return new TileService();
  }());

  return TileService;
});
