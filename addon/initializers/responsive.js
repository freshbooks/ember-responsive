/**
 * Ember responsive initializer,
 *
 * Injects the media service in all controllers route components and views
 */
export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('controller', 'media', 'service:media');
  application.inject('component', 'media', 'service:media');
  application.inject('route', 'media', 'service:media');
  application.inject('view', 'media', 'service:media');
}

export default {
  name: 'responsive',
  initialize: initialize
};
