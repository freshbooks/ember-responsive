/**
 * Ember responsive initializer,
 *
 * Injects the media service in all controllers route components and views
 */

export default function injectMedia(mediaTagName, application) {
  application.inject('controller', mediaTagName, `service:media`);
  application.inject('component', mediaTagName, `service:media`);
  application.inject('route', mediaTagName, `service:media`);
  application.inject('view', mediaTagName, `service:media`);
}
