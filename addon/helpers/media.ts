import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import type MediaService from 'ember-responsive/services/media';

export default class Media extends Helper {
  @service media!: MediaService;

  constructor(properties?: object) {
    super(properties);
    this.media.on('mediaChanged', () => this.recompute());
  }

  compute = ([prop]: [string]) => this.media[prop];
}
