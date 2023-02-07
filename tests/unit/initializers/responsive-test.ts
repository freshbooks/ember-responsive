/* global sinon */
import initializer from 'ember-responsive/initializers/responsive';
import { module, test } from 'qunit';
import sinon from 'sinon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var application = [] as any;

module('ResponsiveInitializer', function () {
  test('it works', function (assert) {
    application.registerOptionsForType = sinon.stub();
    initializer.initialize(application);

    assert.ok(
      application.registerOptionsForType.withArgs('breakpoints', {
        instantiate: false
      }).calledOnce
    );
  });
});
