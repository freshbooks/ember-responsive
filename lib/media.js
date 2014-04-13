/**
 * Handles detecting and responding to media queries.
 *
 * The constructor takes a list of matchers, which are named media queries
 * that you can access on the created object. Take a look:
 *
 * @example
 *   m = Ember.Responsive.Media.create({
 *     matchers: {
 *       all: 'all',
 *     }
 *   });
 *
 *   m.get('all.matches');
 *   // => true
 *
 * You can also declare matchers dynamically, which is useful for overriding
 * matchers at test time. For example, testing mobile can be easily mocked out:
 *
 * @example
 *   m = Ember.Responsive.Media.create();
 *   m.match('mobile', 'all');
 *   m.get('mobile.matches');
 *   // => true
 *
 * @class  Ember.Responsive.Media
 */
Ember.Responsive.Media = Ember.Object.extend({
  /**
   * A list of media queries that we want to test for.
   *
   * @property  queries
   * @type      object
   */
  matchers: {},

  /**
   * The matcher to use for testing media queries.
   *
   * @property  matcher
   * @type      matchMedia
   */
  mql: window.matchMedia,

  /**
   * Adds a new matcher to the list.
   *
   * After this method is called, you will be able to access the result
   * of the matcher as a property on this object.
   *
   * @example
   *  media = Ember.Responsive.Media.create();
   *  media.match('all', 'all');
   *  media.get('all');
   *    // => instanceof window.matchMedia
   *  media.get('all.matches');
   *    // => true
   *
   * @method  match
   */
  match: function(name, query) {
    var matcher = this.get('mql')(query),
        isser = 'is' + name.classify(),
        _this = this;

    var listener = function(matcher) {
      _this.set(name, matcher);
    };

    matcher.addListener(listener);
    listener(matcher);

    // Define a corresponding "isser" which is prettier to look at and type
    Ember.defineProperty(this, isser, Ember.computed(function() {
      return this.get(name).matches;
    }).property(name));
  },

  /**
   * Initializes the matchers declared at construction.
   *
   * @method initMatchers
   * @event  init
   */
  initMatchers: function() {
    var matchers = this.get('matchers');

    for (var name in matchers) {
      if (matchers.hasOwnProperty(name)) {
        this.match(name, matchers[name]);
      }
    }
  }.observes('matchers').on('init'),
});
