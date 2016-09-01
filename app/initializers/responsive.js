import Ember from 'ember';
import injectMedia from 'ember-responsive/initializers/responsive';
import ENV from '../config/environment';

export default {
  name: 'responsive',
  initialize: function(){
    let application = arguments[1] || arguments[0];
    let attName = Ember.get(ENV, 'responsive.mediaAttributeName') || 'media';
    injectMedia(attName, application);
  }
};
