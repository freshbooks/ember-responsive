import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from "htmlbars-inline-precompile";
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Test Helpers | setBreakpoint', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('breakpoints:main', {
      mobile: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 991px)',
      desktop: '(min-width: 992px) and (max-width: 1200px)'
    }, { instantiate: false });

    this.owner.register('component:dummy-component', Component.extend({
      media: service()
    }));
  });

  test('The default breakpoint in test is "desktop"', async function(assert) {
    let subject = this.owner.factoryFor('component:dummy-component').create();
    assert.equal(subject.get('media.isDesktop'), true);
    assert.equal(subject.get('media.isTablet'), false);
    assert.equal(subject.get('media.isMobile'), false);
    assert.equal(subject.get('media.classNames'), 'media-desktop');
  });

  test('if `setBreakpoint` is called with an unknown breakpoint name, it throws an error', function (assert) {
    assert.throws(function() {
      setBreakpoint('watch');
    }, 'Breakpoint "watch" is not defined in your breakpoints file');
  });

  test('`setBreakpoint` can change the media information', function(assert) {
    setBreakpoint('tablet');
    let subject = this.owner.factoryFor('component:dummy-component').create();
    assert.equal(subject.get('media.isDesktop'), false);
    assert.equal(subject.get('media.isTablet'), true);
    assert.equal(subject.get('media.isMobile'), false);
    assert.equal(subject.get('media.classNames'), 'media-tablet');
    assert.deepEqual(subject.get('media.matches'), ['tablet']);
  });

  test('`setBreakpoint` can be "awaited" to ensure the template has updated', async function(assert) {
    setBreakpoint("tablet");
    await this.render(hbs`
      <div id="dom-target">
        {{#if (media "isMobile")}}
          Mobile
        {{else if (media "isTablet")}}
          Tablet
        {{else}}
          Desktop
        {{/if}}
      </div>
    `);

    assert.dom('#dom-target').hasText('Tablet');
    await setBreakpoint('mobile');
    assert.dom('#dom-target').hasText('Mobile');
    await setBreakpoint('desktop');
    assert.dom('#dom-target').hasText('Desktop');
  });

  test('`setBreakpoint` can accept an array of breakpoints', async function(assert) {
    setBreakpoint(['mobile', 'tablet']);
    let subject = this.owner.factoryFor('component:dummy-component').create();

    assert.equal(subject.get('media.isDesktop'), false);
    assert.equal(subject.get('media.isTablet'), true);
    assert.equal(subject.get('media.isMobile'), true);
  });
});
