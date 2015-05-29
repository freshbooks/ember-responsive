/* global sinon */
import Ember from 'ember';
import Media from 'ember-responsive/media';
import { module, test } from 'qunit';
module('media');

test('matchers can be added dynamically', function(assert) {
  var subject = Media.create();
  subject.match('all', 'not all');

  assert.equal(false, subject.get('all.matches'));
});

test('matchers have a corresponding isser', function(assert) {
  var subject = Media.create();
  subject.match('mobile', 'not all');

  assert.equal(false, subject.get('isMobile'));
});

test('matches property returns matching matchers', function(assert) {
  var subject = Media.create();
  subject.match('mobile', 'all');
  subject.match('all', 'all');
  subject.match('none', 'not all');

  assert.deepEqual(['mobile', 'all'], subject.get('matches').toArray());
});

test('classNames property returns matching matchers as classes', function(assert) {
  var subject = Media.create();
  subject.match('mobileDevice', 'all');
  subject.match('all', 'all');
  subject.match('none', 'not all');

  assert.equal('media-mobile-device media-all', subject.get('classNames'));
});

test('classNames is correctly bound to the matches property', function(assert) {
  var subject = Media.create();

  subject.match('one', 'all');
  assert.equal('media-one', subject.get('classNames'));

  subject.match('two', 'all');
  assert.equal('media-one media-two', subject.get('classNames'));

  subject.match('one', 'none');
  assert.equal('media-two', subject.get('classNames'));
});

test('matcher\'s isser property notifies upon change', function(assert) {
  var listener, matcher, name = 'somethingUnique',
    subject = Media.create(),
    observer = sinon.spy();

  subject.addObserver('is'+Ember.String.classify(name), this, observer);
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

  assert.equal(
    3,
    observer.callCount,
    'Expected 3 calls to an observer, '+observer.callCount+' were called instead'
  );
});
