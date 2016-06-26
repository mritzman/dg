define([], function () {
  "use strict";

  var StringUtil = (function () {

    var StringUtil = function () {

      this.format = function (str, items) {
        var regexp;

        if (items && items instanceof Array && str) {
          for (var i = 0; i < items.length; i++) {
            regexp = new RegExp('\\{' + i + '\\}', 'gi');
            str = str.replace(regexp, items[i]);
          }
        } else {
          regexp = new RegExp('\\{0\\}', 'gi');
          str = str.replace(regexp, items);
        }

        return str;
      };

    };

    return new StringUtil();
  }());

  return StringUtil;
});

