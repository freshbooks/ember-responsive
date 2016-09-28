import Ember from 'ember';
import config from '../config/environment';

const { deprecate } = Ember;
const AUTO_INJECTION_DEPRECATION_MESSAGE = '[ember-responsive] Future versions of ember-responsive will no longer inject the media service automatically. Instead you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';

/**
 * Ember responsive initializer
 *
 * Deprecated. Supports auto injecting media service app-wide.
 */
export function initialize(application) {
  const { emberResponsiveDefaults: { autoInject }} = config;
  const shouldShowDeprecation = !autoInject;

  deprecate(AUTO_INJECTION_DEPRECATION_MESSAGE, shouldShowDeprecation, {
    id: 'ember-responsive.deprecate-auto-injection',
    until: '2.0.0'
  });

  if (autoInject) {
    application.inject('controller', 'media', 'service:media');
    application.inject('component', 'media', 'service:media');
    application.inject('route', 'media', 'service:media');
    application.inject('view', 'media', 'service:media');
  }
}

export default {
  name: 'responsive',
  initialize
};
