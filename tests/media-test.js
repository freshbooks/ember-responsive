module('test');

test('Ember.Media exists', function() {
  ok(Ember.Media);
});

test('matchers can be set at construction', function() {
  var subject = Ember.Media.create({
    matchers: { all: 'all' }
  });

  equal(true, subject.get('all.matches'));
});

test('matchers can be added dynamically', function() {
  var subject = Ember.Media.create();
  subject.match('all', 'not all');

  equal(false, subject.get('all.matches'));
});
