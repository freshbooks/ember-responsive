module('test');

test('Ember.Responsive exists', function() {
  ok(Ember.Responsive);
});

test('matchers can be set at construction', function() {
  var subject = Ember.Responsive.create({
    matchers: { all: 'all' }
  });

  equal(true, subject.get('all.matches'));
});

test('matchers can be added dynamically', function() {
  var subject = Ember.Responsive.create();
  subject.match('all', 'not all');

  equal(false, subject.get('all.matches'));
});
