import Ember from 'ember';
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
export default Ember.Object.extend({

  /**
  * A set of matching matchers.
  *
  * @property  matches
  * @type      Ember.NativeArray
  * @default   Ember.NativeArray
  */
  matches: Ember.computed(function() {
    return Ember.A();
  }),

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
  classNames: Ember.computed('matches.[]', function() {
    var dasherize = Ember.String.dasherize;
    return this.get('matches').map(function(name) {
      return 'media-' + dasherize(name);
    }).join(' ');
  }),

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
