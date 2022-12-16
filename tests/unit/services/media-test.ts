import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';
import Service, { inject as service } from '@ember/service';
import sinon from 'sinon';
import type MediaService from 'ember-responsive/services/media';
import type { TestContext } from '@ember/test-helpers';

const mediaRules = {
  mobile: '(max-width: 767px)',
  jumbo: '(min-width: 1201px)'
};

interface LocalCtx extends TestContext {
  subject: MediaService & { [key in keyof typeof mediaRules]: boolean | undefined };
}

module('Unit | Service | media', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach<LocalCtx>(function () {
    this.owner.register('breakpoints:main', mediaRules, { instantiate: false });
    setBreakpoint('auto');
    this.subject = this.owner.lookup('service:media') as MediaService;
  });

  test<LocalCtx>('matchers can be added dynamically', function (assert) {
    this.subject.match('all', 'not all');

    assert.false(this.subject.matchers?.['all']?.matches);
  });

  test<LocalCtx>('matchers have a corresponding isser', function (assert) {
    this.subject.match('mobile', 'not all');

    assert.false(this.subject.isMobile);
  });

  test<LocalCtx>('matches property returns matching matchers', function (assert) {
    this.subject.match('mobile', 'all');
    this.subject.match('all', 'all');
    this.subject.match('none', 'not all');

    assert.deepEqual(this.subject.matches, ['mobile', 'all']);
  });

  test<LocalCtx>('classNames property returns matching matchers as classes', function (assert) {
    this.subject.match('mobileDevice', 'all');
    this.subject.match('all', 'all');
    this.subject.match('none', 'not all');

    assert.strictEqual(
      this.subject.classNames,
      'media-mobile-device media-all'
    );
  });

  test<LocalCtx>('classNames is correctly bound to the matches property', function (assert) {
    this.subject.match('one', 'all');

    assert.strictEqual(this.subject.classNames, 'media-one');

    this.subject.match('two', 'all');

    assert.strictEqual(this.subject.classNames, 'media-one media-two');

    this.subject.match('one', 'none');

    assert.strictEqual(this.subject.classNames, 'media-two');
  });

  test<LocalCtx>('matches removes duplicates', function (assert) {
    this.subject.match('mobile', 'all');
    this.subject.match('mobile', 'all');
    this.subject.match('none', 'not all');

    assert.deepEqual(this.subject.matches, ['mobile']);
  });

  test<LocalCtx>('addEventListener is preferred if available', function (assert) {
    assert.expect(3);

    const addEventListener = sinon.stub().returns({}),
      addListener = sinon.stub().returns({});

    this.subject._mocked = false;
    this.subject.mql = () => ({
      addEventListener,
      addListener
    } as unknown as MediaQueryList);
    this.subject.match('mobile', 'all');

    assert.true(addEventListener.calledOnce);
    assert.true(addListener.notCalled);

    this.subject.mql = () => ({
      addListener
    } as unknown as MediaQueryList);
    this.subject.match('mobile', 'all');

    assert.true(addListener.calledOnce);
  });

  test<LocalCtx>('computed properties recompute according to the media', async function (assert) {
    class TestComputedPropertiesService extends Service {
      @service media!: MediaService;

      get isMobile() {
        return this.media.isMobile;
      }
    }
    this.owner.register('service:test-cp', TestComputedPropertiesService);

    let subject = this.owner.lookup('service:media') as MediaService;
    let serviceWithCps = this.owner.lookup('service:test-cp') as TestComputedPropertiesService;

    subject.match('mobile', 'all');

    assert.true(serviceWithCps.isMobile);
    assert.true(subject.isMobile);

    subject.match('mobile', 'not all');

    assert.false(serviceWithCps.isMobile);
    assert.false(subject.isMobile);
  });

  test<LocalCtx>('on breakpoint change, there arent unnecessary re-renders', async function (assert) {
    const TriggerSpy = sinon.spy(this.subject, '_triggerMediaChanged');
    assert.equal(TriggerSpy.callCount, 0);

    this.subject.match('mobile', 'all');
    assert.equal(TriggerSpy.callCount, 1);

    this.subject.match('desktop', 'all');
    assert.equal(TriggerSpy.callCount, 2);
  });

  test<LocalCtx>('can use either classic get() syntax or standard prop access', function (assert) {
    this.subject.match('mobile', 'all');

    assert.true(this.subject.get('isMobile'));
    assert.true(this.subject.isMobile);

    this.subject.match('mobile', 'not all');

    assert.false(this.subject.get('isMobile'));
    assert.false(this.subject.isMobile);
  });
});
