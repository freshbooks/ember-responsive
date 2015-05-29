import Ember from 'ember';
import Media from 'ember-responsive/media';
export function initialize(container, application) {
  var media = Media.create();
  if (!Ember.Application.instanceInitializer) {
    var breakpoints = container.lookupFactory('breakpoints:main');
    if (breakpoints) {
      for (var name in breakpoints) {
        if (breakpoints.hasOwnProperty(name)) {
          media.match(name, breakpoints[name]);
        }
      }
    } else {
      Ember.warn('Breakpoints not found they should be defined in app/breakpoints.js');
    }
  }
  application.register('responsive:media', media, { instantiate: false });
  application.inject('controller', 'media', 'responsive:media');
  application.inject('component', 'media', 'responsive:media');
  application.inject('route', 'media', 'responsive:media');
  application.inject('view', 'media', 'responsive:media');
}

export default {
  name: 'responsive',
  initialize: initialize
};
