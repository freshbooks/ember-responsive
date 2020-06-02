import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';

const mediaRules = {
  mobile:  '(max-width: 767px)',
  jumbo:   '(min-width: 1201px)'
};

module('Unit | Service | media', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    this.owner.register('breakpoints:main', mediaRules, { instantiate: false });
    setBreakpoint('auto');
  });

  test('matchers can be added dynamically', function(assert) {
    let subject = this.owner.lookup('service:media');
    subject.match('all', 'not all');

    assert.equal(subject.get('matchers.all.matches'), false);
  });

  test('matchers have a corresponding isser', function(assert) {
    let subject = this.owner.lookup('service:media');

    subject.match('mobile', 'not all');

    assert.equal(subject.get('isMobile'), false);
  });

  test('matches property returns matching matchers', function(assert) {
    let subject = this.owner.lookup('service:media');

    subject.match('mobile', 'all');
    subject.match('all', 'all');
    subject.match('none', 'not all');

    assert.deepEqual(subject.get('matches'), ['mobile', 'all']);
  });

  test('classNames property returns matching matchers as classes', function(assert) {
    let subject = this.owner.lookup('service:media');

    subject.match('mobileDevice', 'all');
    subject.match('all', 'all');
    subject.match('none', 'not all');

    assert.equal(subject.get('classNames'), 'media-mobile-device media-all');
  });

  test('classNames is correctly bound to the matches property', function(assert) {
    let subject = this.owner.lookup('service:media');

    subject.match('one', 'all');

    assert.equal(subject.get('classNames'), 'media-one');

    subject.match('two', 'all');

    assert.equal(subject.get('classNames'), 'media-one media-two');

    subject.match('one', 'none');

    assert.equal(subject.get('classNames'), 'media-two');
  });

  test('matches removes duplicates', function(assert) {
    let subject = this.owner.lookup('service:media');

    subject.match('mobile', 'all');
    subject.match('mobile', 'all');
    subject.match('none', 'not all');

    assert.deepEqual(subject.get('matches'), ['mobile']);
  });
});

