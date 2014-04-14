/**
 * A helper method to initialize `Ember.Responsive`.
 *
 * This is the main entry point to `Ember.Responsive`, and all it does
 * is take care of returning an initializer that you can use when
 * spinning up your Ember app. Simply pass a list of "matchers"—named
 * media queries that you want your app to respond to—and you'll be
 * able to interact with them in your controllers, components, and
 * templates.
 *
 * **Initializing Ember.Responsive**
 *
 * ```javascript
 * var App = Ember.Application.create();
 *
 * // Declare the initializer with the breakpoints that we care about.
 * App.initialize(Ember.Responsive.init({
 *   mobile:  '(max-width: 768px)',
 *   tablet:  '(min-width: 769px) and (max-width: 992px)',
 *   desktop: '(min-width: 993px) and (max-width: 1200px)',
 *   jumbo:   '(min-width: 1201px)',
 * });
 * ```
 *
 * **Accessing the media property**
 *
 * The media instance the initializer creates is available to all
 * controllers and components, so it's just a `get()` away.
 *
 * ```javascript
 * this.get('media.isMobile');
 * ```
 *
 * It's also, by extension, available in your templates.
 *
 * ```handlebars
 * \{{#if media.isDesktop}}
 *    This is a desktop!
 * \{{/if}}
 * ```
 *
 * Under the hood, this is simply passing your matchers along to a
 * new {{#crossLink "Ember.Responsive.Media"}}{{/crossLink}}
 * instance and injecting that instance into all of your controllers
 * and components.
 *
 * @static
 * @constructor
 * @module            ember-responsive
 * @namespace         Ember.Responsive
 * @class             init
 * @param   {object}  matchers  A hash of media queries to test.
 * @return  {object}            An Ember initializer.
 */
Ember.Responsive.init = function(matchers) {
  return {
    /**
     * @property  name
     * @type      string
     * @default   responsive
     */
    name: 'responsive',

    /**
     * @method  initialize
     * @param   Ember.Container   container
     * @param   Ember.Application app
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
