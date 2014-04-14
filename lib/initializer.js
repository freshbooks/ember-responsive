(function(Ember) {
 /**
  * An initializer that sets up `Ember.Responsive`.
  *
  * Refer to {{#crossLink "Ember.Application.responsive"}}{{/crossLink}}
  * for examples of how to configure this library before the initializer
  * before it's run by Ember.
  *
  * @static
  * @constructor
  * @module            ember-responsive
  * @namespace         Ember.Application
  * @class             initializer
  * @param   {object}  matchers  A hash of media queries to test.
  * @return  {object}            An Ember initializer.
  */
  Ember.Application.initializer({
     /**
      * @property  name
      * @type      string
      * @default   responsive
      */
    name: 'responsive',

     /**
      * @method  initialize
      * @param   Ember.Container   container
      * @param   Ember.Application app
      */
    initialize: function(container, app) {
      var responsive = app.constructor.responsive;

      if (responsive.media) {
        app.register('responsive:media', responsive.media, { instantiate: false });
        app.inject('controller', 'media', 'responsive:media');
        app.inject('component', 'media', 'responsive:media');
        app.inject('route', 'media', 'responsive:media');
        app.inject('view', 'media', 'responsive:media');
      }
    }
  });
})(window.Ember);
