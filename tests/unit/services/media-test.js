import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';
import Service, { inject as service } from '@ember/service';
import sinon from 'sinon';

const mediaRules = {
  mobile: '(max-width: 767px)',
  jumbo: '(min-width: 1201px)'
};

module('Unit | Service | media', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('breakpoints:main', mediaRules, { instantiate: false });
    setBreakpoint('auto');
    this.subject = this.owner.lookup('service:media');
  });

  test('matchers can be added dynamically', function (assert) {
    this.subject.match('all', 'not all');

    assert.false(this.subject.matchers.all.matches);
  });

  test('matchers have a corresponding isser', function (assert) {
    this.subject.match('mobile', 'not all');

    assert.false(this.subject.isMobile);
  });

  test('matches property returns matching matchers', function (assert) {
    this.subject.match('mobile', 'all');
    this.subject.match('all', 'all');
    this.subject.match('none', 'not all');

    assert.deepEqual(this.subject.matches, ['mobile', 'all']);
  });

  test('classNames property returns matching matchers as classes', function (assert) {
    this.subject.match('mobileDevice', 'all');
    this.subject.match('all', 'all');
    this.subject.match('none', 'not all');

    assert.strictEqual(
      this.subject.classNames,
      'media-mobile-device media-all'
    );
  });

  test('classNames is correctly bound to the matches property', function (assert) {
    this.subject.match('one', 'all');

    assert.strictEqual(this.subject.classNames, 'media-one');

    this.subject.match('two', 'all');

    assert.strictEqual(this.subject.classNames, 'media-one media-two');

    this.subject.match('one', 'none');

    assert.strictEqual(this.subject.classNames, 'media-two');
  });

  test('matches removes duplicates', function (assert) {
    this.subject.match('mobile', 'all');
    this.subject.match('mobile', 'all');
    this.subject.match('none', 'not all');

    assert.deepEqual(this.subject.matches, ['mobile']);
  });

  test('addEventListener is preferred if available', function (assert) {
    assert.expect(3);

    const addEventListener = sinon.stub().returns(),
      addListener = sinon.stub().returns();

    this.subject._mocked = false;
    this.subject.mql = () => ({
      addEventListener,
      addListener
    });
    this.subject.match('mobile', 'all');

    assert.true(addEventListener.calledOnce);
    assert.true(addListener.notCalled);

    this.subject.mql = () => ({
      addListener
    });
    this.subject.match('mobile', 'all');

    assert.true(addListener.calledOnce);
  });

  test('computed properties recompute according to the media', async function (assert) {
    class TestComputedPropertiesService extends Service {
      @service media;

      get isMobile() {
        return this.media.isMobile;
      }
    }
    this.owner.register('service:test-cp', TestComputedPropertiesService);

    let subject = this.owner.lookup('service:media');
    let serviceWithCps = this.owner.lookup('service:test-cp');

    subject.match('mobile', 'all');

    assert.true(serviceWithCps.isMobile);
    assert.true(subject.isMobile);

    subject.match('mobile', 'not all');

    assert.false(serviceWithCps.isMobile);
    assert.false(subject.isMobile);
  });

  test('can use either classic get() syntax or standard prop access', function (assert) {
    this.subject.match('mobile', 'all');

    assert.true(this.subject.get('isMobile'));
    assert.true(this.subject.isMobile);

    this.subject.match('mobile', 'not all');

    assert.false(this.subject.get('isMobile'));
    assert.false(this.subject.isMobile);
  });
});
