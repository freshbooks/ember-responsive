/* global sinon */
import Ember from 'ember';
import initializer from '../../../initializers/responsive';
import instanceInitializer from '../../../instance-initializers/responsive';
import { module, test } from 'qunit';

var container, application, media;

module('ResponsiveInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      media = container.lookupFactory('responsive:media');
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {

  container._lookupFactory =  container.lookupFactory;
  container.lookupFactory =  sinon.stub().returns({});
  application.register =  sinon.stub();
  application.inject =  sinon.stub();

  initializer.initialize(container, application);

  if (Ember.Application.instanceInitializer) {
    assert.ok(!container.lookupFactory.calledWith('breakpoints:main'), 'skipped looking up breakpoints');
  } else {
    assert.ok(container.lookupFactory.calledWith('breakpoints:main'), 'looked up breakpoints');
  }


  assert.ok(application.register.calledWith('responsive:media'), 'Media registered');
  assert.ok(application.inject.withArgs('controller', 'media', 'responsive:media').calledOnce);
  assert.ok(application.inject.withArgs('route', 'media', 'responsive:media').calledOnce);
  assert.ok(application.inject.withArgs('component', 'media', 'responsive:media').calledOnce);
  assert.ok(application.inject.withArgs('view', 'media', 'responsive:media').calledOnce);
});
