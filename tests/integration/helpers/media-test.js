import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Integration | Helper | media', function(hooks) {
  setupRenderingTest(hooks);

  test('it proxies to the media service', async function(assert) {
    await render(hbs`{{#if (media 'isDesktop')}}Is desktop{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'Is desktop');

    await render(hbs`{{#if (media 'isTablet')}}Is tablet{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`{{media 'classNames'}}`);
    assert.equal(this.element.textContent.trim(), 'media-desktop');
  });

  test('it proxies to the media service without issers', async function(assert) {
    await render(hbs`{{#if (media 'desktop')}}Is desktop{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'Is desktop');

    await render(hbs`{{#if (media 'tablet')}}Is tablet{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it recomputes when breakpoints change', async function(assert) {
    await render(hbs`
      {{#if (media 'isDesktop')}}Is desktop{{/if}}
      {{#if (media 'isTablet')}}Is tablet{{/if}}
      {{#if (media 'isMobile')}}Is mobile{{/if}}
    `);
    assert.equal(this.element.textContent.trim(), 'Is desktop');

    setBreakpoint('tablet');

    assert.equal(this.element.textContent.trim(), 'Is tablet');

    setBreakpoint('mobile');

    assert.equal(this.element.textContent.trim(), 'Is mobile');
  });
});
