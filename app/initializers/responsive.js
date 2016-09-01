import Ember from 'ember';
import ENV from '../config/environment';

export default {
  name: 'responsive',
  initialize: function(){
    let application = arguments[1] || arguments[0];
    let propertyName = Ember.get(ENV, 'responsive.propertyName') || 'media';
    application.inject('controller', propertyName, `service:media`);
    application.inject('component', propertyName, `service:media`);
    application.inject('route', propertyName, `service:media`);
    application.inject('view', propertyName, `service:media`);
  }
};
