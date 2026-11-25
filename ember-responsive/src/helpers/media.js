import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class Media extends Helper {
  @service media;

  compute = ([prop]) => this.media[prop];
  constructor() {
    super(...arguments);
    this.media.on('mediaChanged', () => this.recompute());
  }
}
