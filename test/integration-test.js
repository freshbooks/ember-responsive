var App;

module('Ember.Responsive', {
  setup: function() {
    App = Ember.Application.extend();
  }
});

test('App can configure media', function() {
  App.responsive({
    media: {
      all: 'all'
    }
  });

  equal(App.responsive.media.get('isAll'), true);
});

asyncTest('App registers media in the container', function() {
  App.responsive({
    media: {
      all: 'all'
    }
  });

  App.create({
    ready: function() {
      ok(this.__container__.lookup('responsive:media'));
      start();
    }
  });
});
