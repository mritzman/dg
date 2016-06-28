/**
 * used from technique found at http://stackoverflow.com/questions/12822233/requirejs-backbone-views-depends-one-to-each-other
 */
define(['underscore', 'backbone'], function (_, Backbone) {
  "use strict";

  var EventBus = {
    MAP_CLICKED: "Map.clicked",
    MAP_LOADED: "Map.loaded"
  };
  _.extend(EventBus, Backbone.Events);
  return EventBus;
});