import { module, test } from 'qunit';
import { visit, find, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setBreakpoint } from 'ember-responsive/test-support';

module('Acceptance | acceptance helpers', function(hooks) {
  setupApplicationTest(hooks);

  test('changing breakpoints', async function(assert) {
    await visit('/');

    waitFor('.view.active');

    setBreakpoint('jumbo');

    assert.equal(find('.view.active').textContent.trim(), 'Jumbo View!');

    setBreakpoint('desktop');

    assert.equal(find('.view.active').textContent.trim(), 'Desktop View!');

    setBreakpoint('tablet');

    assert.equal(find('.view.active').textContent.trim(), 'Tablet View!');

    assert.throws(() => {
      setBreakpoint('unknown');
    });
  });
});
