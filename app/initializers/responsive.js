import Media from 'ember-responsive/media';

/**
 * An initializer that sets up `ember-responsive`.
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
 */
export default {
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
    var breakpoints = container.lookupFactory('breakpoints:main');
    var media = Media.create();
    if (breakpoints) {
      for (var name in breakpoints) {
        if (breakpoints.hasOwnProperty(name)) {
          media.match(name, breakpoints[name]);
        }
      }
    } else {
      Ember.warn('Breakpoints not found they should be defined in app/breakpoints.js');
    }

    app.register('responsive:media', media, { instantiate: false });
    app.inject('controller', 'media', 'responsive:media');
    app.inject('component', 'media', 'responsive:media');
    app.inject('route', 'media', 'responsive:media');
    app.inject('view', 'media', 'responsive:media');
  }
};
