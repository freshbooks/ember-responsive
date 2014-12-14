import initializer from 'dummy/initializers/responsive';
module('Unit initializer');

test('initialize', function() {


  var container = {
    lookupFactory: sinon.stub().returns({})
  };

  var app = {
    register: sinon.stub(),
    inject: sinon.stub()
  };

  initializer.initialize(container, app);

  ok(container.lookupFactory.calledWith('breakpoints:main'), 'looked up breakpoints');

  ok(app.register.calledWith('responsive:media'), 'Media registered');
  ok(app.inject.withArgs('controller', 'media', 'responsive:media').calledOnce);
  ok(app.inject.withArgs('route', 'media', 'responsive:media').calledOnce);
  ok(app.inject.withArgs('component', 'media', 'responsive:media').calledOnce);
  ok(app.inject.withArgs('view', 'media', 'responsive:media').calledOnce);
});
