import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | media', function(hooks) {
  setupRenderingTest(hooks);

  test('it proxies to the media service', async function(assert) {
    await render(hbs`{{#if (media 'isDesktop')}}Is desktop{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'Is desktop');

    await render(hbs`{{#if (media 'isTablet')}}Is desktop{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`{{media 'classNames'}}`);
    assert.equal(this.element.textContent.trim(), 'media-desktop');
  });
});
