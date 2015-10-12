/* global sinon */
import initializer from '../../../initializers/responsive';
import { module, test } from 'qunit';

var application = [];

module('ResponsiveInitializer');

test('it works', function(assert) {

  application.inject =  sinon.stub();
  initializer.initialize(application);


  assert.ok(application.inject.withArgs('controller', 'media', 'service:media').calledOnce);
  assert.ok(application.inject.withArgs('route', 'media', 'service:media').calledOnce);
  assert.ok(application.inject.withArgs('component', 'media', 'service:media').calledOnce);
  assert.ok(application.inject.withArgs('view', 'media', 'service:media').calledOnce);
});
