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

test('classNames is correctly bound to the matches property', function() {
  var subject = Ember.Responsive.Media.create();

  subject.match('one', 'all');
  equal('media-one', subject.get('classNames'));

  subject.match('two', 'all');
  equal('media-one media-two', subject.get('classNames'));

  subject.match('one', 'none');
  equal('media-two', subject.get('classNames'));
});

test('matcher\'s isser property notifies upon change', function() {
  var listener, matcher, name = 'somethingUnique',
    subject = Ember.Responsive.Media.create(),
    observer = sinon.spy();

  subject.addObserver('is'+name.classify(), this, observer);
  //First call
  subject.match(name, 'query');

  listener = subject.get('listeners')[name];

  matcher = {}; // Dummy MediaQueryList
  matcher.matches = true;
  //Second call
  listener(matcher);

  matcher.matches = false;
  //Third call
  listener(matcher);

  equal(
    3,
    observer.callCount,
    'Expected 3 calls to an observer, '+observer.callCount+' were called instead'
  );
});
