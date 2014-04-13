/**
 * Handles detecting and responding to media queries.
 *
 * The constructor takes a list of matchers, which are named media queries
 * that you can access on the created object. Take a look:
 *
 * @example
 *   r = Ember.Responsive.create({
 *     matchers: {
 *       all: 'all',
 *     }
 *   });
 *
 *   r.get('all.matches');
 *   // => true
 *
 * You can also declare matchers dynamically, which is useful for overriding
 * matchers at test time. For example, testing mobile can be easily mocked out:
 *
 * @example
 *   r = Ember.Responsive.create();
 *   r.match('mobile', 'all');
 *   r.get('mobile.matches');
 *   // => true
 *
 * @class  Ember.Responsive
 */
Ember.Responsive = Ember.Object.extend({
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
   *  responsive = Ember.Responsive.create();
   *  responsive.match('all', 'all');
   *  responsive.get('all');
   *    // => instanceof window.matchMedia
   *  responsive.get('all.matches');
   *    // => true
   *
   * @method  match
   */
  match: function(name, query) {
    var matcher = this.get('mql')(query),
        _this = this,
        listener;

    listener = function(matcher) {
      _this.set(name, matcher);
    };

    matcher.addListener(listener);
    listener(matcher);
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
  }.observes('matchers').on('init')
});
