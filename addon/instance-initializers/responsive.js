import Ember from 'ember';

function lookupFactory(app, name) {
  if (app.resolveRegistration) {
    return app.resolveRegistration(name);
  }

  return app.container.lookupFactory(name);
}

export function initialize(app) {
  var media = lookupFactory(app, 'responsive:media');
  var breakpoints = lookupFactory(app, 'breakpoints:main');

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

export default {
  name: 'responsive',
  initialize: initialize
};
