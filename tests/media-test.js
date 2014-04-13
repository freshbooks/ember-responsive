module('Ember.Responsive.Media');

test('matchers can be set at construction', function() {
  var subject = Ember.Responsive.Media.create({
    matchers: { all: 'all' }
  });

  equal(true, subject.get('all.matches'));
});

test('matchers can be added dynamically', function() {
  var subject = Ember.Responsive.Media.create();
  subject.match('all', 'not all');

  equal(false, subject.get('all.matches'));
});

test('matchers have a corresponding isser', function() {
  var subject = Ember.Responsive.Media.create();
  subject.match('mobile', 'not all');

  equal(false, subject.get('isMobile'));
});
