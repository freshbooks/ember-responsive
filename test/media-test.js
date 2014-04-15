module('Ember.Responsive.Media');

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

test('matches property returns matching matchers', function() {
  var subject = Ember.Responsive.Media.create();
  subject.match('mobile', 'all');
  subject.match('all', 'all');
  subject.match('none', 'not all');

  deepEqual(['mobile', 'all'], subject.get('matches').toArray());
});

test('classNames property returns matching matchers as classes', function() {
  var subject = Ember.Responsive.Media.create();
  subject.match('mobileDevice', 'all');
  subject.match('all', 'all');
  subject.match('none', 'not all');

  equal('media-mobile-device media-all', subject.get('classNames'));
});
