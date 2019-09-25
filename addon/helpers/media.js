import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Helper.extend({
  init() {
    this._super(...arguments);
    this.get('media').on('mediaChanged', () => {
      this.recompute();
    });
  },

  media: service(),

  compute([prop]) {
    return get(this, `media.${prop}`);
  }
});
