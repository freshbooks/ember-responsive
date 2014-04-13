/**
 * An initializer that sets up Ember.Responsive.
 *
 * This initializer will add listeners for the media queries that your
 * application needs to respond to. All controllers and components will be able
 * to access the result of those media queries using the "media" property.
 *
 * @example
 *   var App = Ember.Application.create();
 *
 *   // Declare the initializer with the breakpoints that we care about.
 *   App.initialize(Ember.Responsive({
 *     mobile:  '(max-width: 768px)',
 *     tablet:  '(min-width: 769px) and (max-width: 992px)',
 *     desktop: '(min-width: 993px) and (max-width: 1200px)',
 *     jumbo:   '(min-width: 1201px)',
 *   });
 *
 *   // In your controllers and components, you can now test those
 *   // media queries and dynamically respond to their changes.
 *   this.get('media.isMobile');
 *
 *   // And of course, this also applies to your templates.
 *   {{#if media.isMobile}}
 *      Mobile view!
 *   {{/endif}}
 */
Ember.Responsive = function(matchers) {
  return {
    /**
     * The name of this initializer.
     *
     * @property  name
     */
    name: 'responsive',

    /**
     * Initializer callback that adds the media query interface
     * to your Ember application.
     *
     * @method  initialize
     */
    initialize: function(container, app) {
      var media = Ember.Responsive.Media.create({
        matchers: matchers
      });

      app.register('responsive:media', media, { initialize: false });
      app.inject('controller', 'media', 'responsive:media');
      app.inject('component', 'media', 'responsive:media');
    }
  };
};
