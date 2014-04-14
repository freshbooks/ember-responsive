(function(Ember) {
  /**
  * The main namespace for `Ember.Responsive`.
  *
  * @module  ember-responsive
  * @main    ember-responsive
  */
  Ember.Responsive = {};

 /**
  * This is the main entry point to `Ember.Responsive`, and all it does
  * is take care of configuring this library to your specifications before
  * spinning up your Ember app.
  *
  * **Setting media for your application**
  *
  * Presently, you can easily configure your application's breakpoints
  * using media queries.
  *
  * ```javascript
  * var App = Ember.Application.extend();
  *
  * // Declare the media that we care about.
  * App.responsive({
  *   media: {
  *     mobile:  '(max-width: 768px)',
  *     tablet:  '(min-width: 769px) and (max-width: 992px)',
  *     desktop: '(min-width: 993px) and (max-width: 1200px)',
  *     jumbo:   '(min-width: 1201px)',
  *   }
  * });
  * ```
  *
  * After you've gone through this process, you'll be able to access
  * the media queries in a few different places of your application:
  *
  *   - All controllers, under the name `media`.
  *   - All components, under the name `media`.
  *   - All views, under the name `media`.
  *   - All routes, under the name `media`.
  *   - In the container, under the name `responsive:media`.
  *
  * **Binding media classes to your application view**
  *
  * `Ember.Responsive` makes it very easy to bind the active media queries as
  * class names on your app view (or any view, for that matter). This helps you
  * avoid having to duplicate media queries in your CSS and Ember code, and
  * makes writing responsive CSS much simpler.
  *
  * ```javascript
  * App.ApplicationView = Ember.View.extend({
  *   classNameBindings: ['media.classNames']
  * });
  * ```
  *
  * **Referencing media queries in your app**
  *
  * `Ember.Responsive` also allows access to its API in controllers, components,
  * routes, and views, making it dead simple to only perform certain types of
  * work for certain devices.
  *
  * ```javascript
  * App.PostsRoute = Ember.Router.extend({
  *   model: function() {
  *     if (this.get('media.isMobile')) {
  *       // Return a smaller, less data-hungry result
  *     }
  *   }
  * });
  * ```
  *
  * **Referencing media queries in your templates**
  *
  * Since media queries are available in your controllers, components,
  * and views, they'll also be accessible in your templates.
  *
  * ```handlebars
  * \{{#if media.isMobile}}
  *    Mobile view!
  * \{{/if}}
  * ```
  *
  * **Mocking a particular media type in test**
  *
  * It's very easy to fake a particular view when testing as well. This
  * is useful when you want to be able to test different behaviours
  * for different types of devices.
  *
  * If you're writing an integration test, you'll probably want to mock
  * out the media type at the application level.
  *
  * ```javascript
  * App.responsive({
  *   media: {
  *     mobile: 'all' // The 'all' media query will always match
  *   }
  * });
  * ```
  *
  * But in unit tests, you can simply override the property that you're
  * referencing.
  *
  * ```javascript
  * controller.set('media.isMobile', true);
  * ```
  *
  * Refer to the {{#crossLink "Ember.Responsive.Media"}}{{/crossLink}}
  * documentation for more examples of how to interact with the
  * aforementioned `media` object.
  *
  * @static
  * @module            ember-responsive
  * @namespace         Ember.Application
  * @class             responsive
  * @param   {object}  config
  */
  Ember.Application.reopenClass({
    responsive: function(config) {
      var media = config.media;

      if (!this.responsive.media) {
        this.responsive.media = Ember.Responsive.Media.create();
      }

      if (media) {
        for (var name in media) {
          if (media.hasOwnProperty(name)) {
            this.responsive.media.match(name, media[name]);
          }
        }
      }

      return this;
    }
  });
})(window.Ember);
