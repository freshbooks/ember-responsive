import { initialize } from 'ember-responsive/initializers/responsive';
import { module, test } from 'qunit';
import sinon from 'sinon';

var application = [];

module('ResponsiveInitializer', function () {
  test('it works', function (assert) {
    application.registerOptionsForType = sinon.stub();
    initialize(application);

    assert.ok(
      application.registerOptionsForType.withArgs('breakpoints', {
        instantiate: false,
      }).calledOnce,
    );
  });
});
