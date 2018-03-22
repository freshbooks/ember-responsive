/* global sinon */
import initializer from 'ember-responsive/initializers/responsive';
import { module, test } from 'qunit';

var application = [];

module('ResponsiveInitializer', function(hooks) {
  test('it works', function(assert) {
    application.registerOptionsForType = sinon.stub();
    initializer.initialize(application);

    assert.ok(application.registerOptionsForType.withArgs('breakpoints', { instantiate: false }).calledOnce);
  });
});
