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

(function(Ember) {
 /**
  * An initializer that sets up `Ember.Responsive`.
  *
  * Refer to {{#crossLink "Ember.Application.responsive"}}{{/crossLink}}
  * for examples of how to configure this library before the initializer
  * before it's run by Ember.
  *
  * @static
  * @constructor
  * @module            ember-responsive
  * @namespace         Ember.Application
  * @class             initializer
  * @param   {object}  matchers  A hash of media queries to test.
  * @return  {object}            An Ember initializer.
  */
  Ember.Application.initializer({
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
      var responsive = app.constructor.responsive;

      if (responsive.media) {
        app.register('responsive:media', responsive.media, { instantiate: false });
        app.inject('controller', 'media', 'responsive:media');
        app.inject('component', 'media', 'responsive:media');
        app.inject('route', 'media', 'responsive:media');
        app.inject('view', 'media', 'responsive:media');
      }
    }
  });
})(window.Ember);

(function(Ember) {
 /**
  * Handles detecting and responding to media queries.
  *
  * Generally speaking, you won't ever need to create an instance of this class
  * yourself, since `Ember.Responsive` takes care of creating and configuring it
  * for you. However, it is important to document how to interact with this
  * class—which can become important during test time in particular. With that
  * said, let's take a look at how to work with it.
  *
  * **Adding media query matchers**
  *
  * The first step to using the class is to add media queries that you
  * want it to listen to. Each media query has a name that you can
  * use to reference it by.
  *
  * ```javascript
  * media = Ember.Responsive.Media.create();
  * media.match('mobile', '(max-width: 768px)');
  * media.match('desktop', '(min-width: 769px)');
  * ```
  *
  * **Testing the media query matchers**
  *
  * Now that you've added a few matchers, you can access those media queries as
  * if they were properties on your object. The nice thing is that whenever the
  * media queries change, this class will automatically update the relevant
  * properties (and so will the rest of your application, thanks to the power
  * of two-way data-binding).
  *
  * ```javascript
  * media = Ember.Responsive.Media.create();
  * media.match('mobile', '(max-width: 768px)');
  * media.match('desktop', '(min-width: 769px)');
  *
  * // There are convenient "isser" properties defined...
  * if (media.get('isMobile')) {
  *   console.log('mobile!');
  * }
  *
  * // As well as access to the matchMedia API...
  * if (media.get('desktop.matches')) {
  *   console.log('desktop!');
  * }
  * ```
  *
  * **Retrieving a list of matching media queries**
  *
  * It's also nice to be able to see which media queries are matching, since
  * some applications might have many matches at the same time.
  *
  * ```javascript
  * media = Ember.Responsive.Media.create();
  * media.match('desktop', 'all');
  * media.match('mobile', 'all');
  *
  * console.log(media.get('matches'));
  * // => Ember.Set(['desktop', 'mobile']);
  * ```
  *
  * This class can also return that list as a string of dasherized class names,
  * which is useful for placing on your app's rootElement. By default, these
  * class names are prefixed with `media-`, so as not to clash with any other
  * classes your app might use.
  *
  * ```javascript
  * App.ApplicationView = Ember.View.extend({
  *   classNameBindings: ['media.classNames']
  * });
  * ```
  *
  * @module    ember-responsive
  * @namespace Ember.Responsive
  * @class     Media
  * @extends   Ember.Object
  */
  Ember.Responsive.Media = Ember.Object.extend({
   /**
    * A set of matching matchers.
    *
    * @property  matches
    * @type      Ember.NativeArray
    * @default   Ember.NativeArray
    */
    matches: function() {
      return Ember.A();
    }.property(),

    /**
     * A hash of listeners indexed by their matcher's names
     *
     * @property
     * @type Object
     */
    listeners: {},

   /**
    * The matcher to use for testing media queries.
    *
    * @property  matcher
    * @type      matchMedia
    * @default   window.matchMedia
    * @private
    */
    mql: window.matchMedia,

   /**
    * A string composed of all the matching matchers' names, turned into
    * friendly, dasherized class-names that are prefixed with `media-`.
    *
    * @property  classNames
    * @type      string
    */
    classNames: function() {
      var dasherize = Ember.String.dasherize;
      return this.get('matches').map(function(name) {
        return 'media-' + dasherize(name);
      }).join(' ');
    }.property('matches.[]'),

   /**
    * Adds a new matcher to the list.
    *
    * After this method is called, you will be able to access the result
    * of the matcher as a property on this object.
    *
    * **Adding a new matcher**
    *
    * ```javascript
    * media = Ember.Responsive.Media.create();
    * media.match('all', 'all');
    * media.get('all');
    *   // => instanceof window.matchMedia
    * media.get('all.matches');
    *   // => true
    * ```
    *
    * @param   string  name   The name of the matcher
    * @param   string  query  The media query to match against
    * @method  match
    */
    match: function(name, query) {
      var classify = Ember.String.classify,
          matcher = (this.get('mql') || window.matchMedia)(query),
          isser = 'is' + classify(name),
          _this = this;

      function listener(matcher) {
        _this.set(name, matcher);
        _this.set(isser, matcher.matches);

        if (matcher.matches) {
          _this.get('matches').addObject(name);
        } else {
          _this.get('matches').removeObject(name);
        }
      }
      this.get('listeners')[name] = listener;

      if (matcher.addListener) {
        matcher.addListener(function(matcher){
          Ember.run(null, listener, matcher);
        });
      }
      listener(matcher);
    }
  });
})(window.Ember);
