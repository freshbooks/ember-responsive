import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class MediaHelper extends Helper {
  @service() media;

  constructor() {
    super(...arguments);

    this.media.on('mediaChanged', () => {
      this.recompute();
    });
  }

  compute([prop]) {
    return get(this, `media.${prop}`);
  }
}
