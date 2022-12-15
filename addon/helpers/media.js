import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Media extends Helper {
  @service media;

  constructor() {
    super(...arguments);
    this.media.on('mediaChanged', () => this.recompute());
  }

  compute = ([prop]) => this.media[prop];
}
