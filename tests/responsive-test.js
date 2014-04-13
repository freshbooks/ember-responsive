module('Ember.Responsive', {
  setup: function() {
    this.App = {
      register: sinon.spy(),
      inject: sinon.spy(),
    };
  }
});

test('initializer has an appropriate name', function() {
  equal('responsive', Ember.Responsive().name);
});

test('initializer passes on the matchers', function() {
  var subject = Ember.Responsive({
    all: 'all',
    none: 'not all',
  });

  subject.initialize(null, this.App);
  ok(this.App.Media instanceof Ember.Responsive.Media);
});

test('initializer registers the media instance', function() {
  var subject = Ember.Responsive();
  subject.initialize(null, this.App);

  ok(this.App.register.calledWith('responsive:media', this.App.Media, { initialize: false }));
  ok(this.App.inject.calledWith('controller', 'media', 'responsive:media'));
  ok(this.App.inject.calledWith('component', 'media', 'responsive:media'));
});
