import { module, test } from 'qunit';
import { visit, find, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Acceptance | acceptance helpers', function (hooks) {
  setupApplicationTest(hooks);

  test('changing breakpoints', async function (assert) {
    assert.expect(4);

    await visit('/');
    waitFor('.view.active');

    ['jumbo', 'desktop', 'tablet'].forEach((breakpoint) => {
      setBreakpoint(breakpoint);

      assert.strictEqual(
        find('.view.active').textContent.trim(),
        `${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)} View!`
      );
    });

    assert.throws(() => {
      setBreakpoint('foo');
    });
  });
});
