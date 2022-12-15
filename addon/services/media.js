import Ember from 'ember';
import { run } from '@ember/runloop';
import Service from '@ember/service';
import { classify, dasherize } from '@ember/string';
// import nullMatchMedia from '../null-match-media';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

/**
 * Handles detecting and responding to media queries.
 *
 * **Adding media query matchers**
 *
 * The first step to using the class is to add media queries that you
 * want it to listen to. Each media query has a name that you can
 * use to reference it by.
 *
 * ```javascript
 * media.match('mobile', '(max-width: 767px)');
 * media.match('desktop', '(min-width: 768px)');
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
 * media.match('mobile', '(max-width: 767px)');
 * media.match('desktop', '(min-width: 768px)');
 *
 * // There are convenient "isser" properties defined...
 * if (media.isMobile) {
 *   console.log('mobile!');
 * }
 *
 * // As well as access to the matchMedia API...
 * if (media.desktop.matches) {
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
 * media.match('desktop', 'all');
 * media.match('mobile', 'all');
 *
 * console.log(media.matches);
 * // => ['desktop', 'mobile'];
 * ```
 *
 * This class can also return that list as a string of dasherized class names,
 * which is useful for placing on your app's rootElement. By default, these
 * class names are prefixed with `media-`, so as not to clash with any other
 * classes your app might use.
 *
 * ```javascript
 * media.match('mobile', '(min-width: 0px)');
 * media.match('desktop', '(min-width: 0px)');
 * media.classNames();
 * // => 'media-desktop media-mobile'
 * ```
 *
 * @module ember-responsive
 * @namespace Ember.Responsive
 * @class Media
 * @extends Ember.Service
 */
export default class MediaService extends Service.extend(Evented) {
  // Ember only sets Ember.testing when tests are starting
  // eslint-disable-next-line ember/no-ember-testing-in-module-scope
  _mocked = Ember.testing;
  _mockedBreakpoint = 'desktop';

  /**
   * If the matchMedia API is not available, this will be `false`, and
   * the service will not respond to calls.
   *
   * @property enabled
   * @type boolean
   */
  get enabled() {
    return !!window?.matchMedia;
  }

  /**
   * @property _matches
   * @type TrackedArray<string>
   * @private
   */
  _matches = new TrackedArray([]);

  /**
   * A TrackedArray of matching matchers.
   *
   * @property matches
   * @type TrackedArray<string>
   */
  get matches() {
    if (this._matches.length) {
      return this._matches;
    }
    return Ember.testing && this._mocked ? [this._mockedBreakpoint] : [];
  }
  set matches(value) {
    this._matches = value;
  }

  /**
   * A hash of listeners indexed by their matcher's names
   *
   * @property
   * @type Record<string, MediaQueryListEvent>
   */
  listeners = {};

  /**
   * A hash of matchers by breakpoint name
   *
   * @property
   * @type Record<string, MediaQueryList>
   */
  matchers = {};

  /**
   * The matcher to use for testing media queries.
   *
   * @property matcher
   * @type Window['matchMedia'] | undefined
   * @default Window['matchMedia']
   * @private
   */
  mql = window?.matchMedia;

  /**
   * Initialize service based on the breakpoints config
   */
  constructor() {
    super(...arguments);

    const breakpoints = getOwner(this).lookup('breakpoints:main');

    if (!breakpoints || !this.enabled) {
      return;
    }

    Object.keys(breakpoints).forEach((name) => {
      const getterName = `is${classify(name)}`;

      Object.defineProperties(this, {
        [getterName]: new TrackedObject({
          get() {
            return this.matches.indexOf(name) > -1;
          }
        }),
        [name]: new TrackedObject({
          get() {
            return this[getterName];
          }
        })
      });

      this.match(name, breakpoints[name]);
    });
  }

  /**
   * A string composed of all the matching matchers' names, turned into
   * friendly, dasherized class-names that are prefixed with `media-`.
   *
   * @property classNames
   * @type string
   */
  get classNames() {
    return this.matches.map((match) => `media-${dasherize(match)}`).join(' ');
  }

  _triggerMediaChanged() {
    this.trigger('mediaChanged', {});
  }

  _triggerEvent() {
    run(this, this._triggerMediaChanged);
  }

  /**
   * Adds a new matcher to the list.
   *
   * After this method is called, you will be able to access the result
   * of the matcher as a property on this object.
   *
   * **Adding a new matcher**
   *
   * ```javascript
   * media.match('all', 'all');
   * media.all;
   *   // => instanceof window.matchMedia
   * media.all.matches;
   *   // => true
   * ```
   *
   * @param string name The name of the matcher
   * @param string query The media query to match against
   * @method match
   */
  match(name, query) {
    // see https://github.com/ember-cli/eslint-plugin-ember/pull/272
    if ((Ember.testing && this._mocked) || !this.enabled) {
      return;
    }

    const mql = this.mql,
      matcher = mql(query);

    const listener = (matcher) => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.matchers[name] = matcher;

      if (matcher.matches) {
        this.matches = TrackedArray.from(new Set([...this.matches, name]));
      } else {
        this.matches = TrackedArray.from(
          new Set(this.matches.filter((key) => key !== name))
        );
      }

      if (this.listeners[name] !== matcher) {
        this._triggerEvent();
      }
    };

    this.listeners[name] = listener;

    if (typeof matcher.addEventListener === 'function') {
      matcher.addEventListener('change', (matcher) => {
        run(null, listener, matcher);
      });
    } else if (typeof matcher.addListener === 'function') {
      matcher.addListener((matcher) => {
        run(null, listener, matcher);
      });
    }

    listener(matcher);
  }
}
