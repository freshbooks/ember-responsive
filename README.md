# ember-responsive [![Build Status](https://travis-ci.org/freshbooks/ember-responsive.svg?branch=master)](https://travis-ci.org/freshbooks/ember-responsive) [![Ember Observer Score](http://emberobserver.com/badges/ember-responsive.svg)](http://emberobserver.com/addons/ember-responsive)

ember-responsive is an ember-cli addon that give you a simple, Ember-aware way
of dealing with media queries.

All you need to do is tell it your application's breakpoints and it'll expose the rest for you.
[Here is an interactive demo](https://www.justinbull.ca/ember-responsive-demo/)

## Requirements

ember-responsive needs [window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia)
to function, which isn't available in all browsers. [Compatibility matrix](http://caniuse.com/#feat=matchmedia)

There is a polyfill by Paul Irish called [matchMedia.js](https://github.com/paulirish/matchMedia.js)
that will add support to older browsers

## Getting Started

This is an ember-cli addon so, so all you need to do is

`ember install ember-responsive`

After that, simply register the breakpoints that are pertinent to your application in `app/breakpoints.js`:

```js
export default {
  mobile:  '(max-width: 768px)',
  tablet:  '(min-width: 769px) and (max-width: 992px)',
  desktop: '(min-width: 993px) and (max-width: 1200px)',
  jumbo:   '(min-width: 1201px)'
};
```

This default config has already been provided for you. If you wish to change the values or add new ones,
simply create a new `app/breakpoints.js` in your project and export your chosen config.

You can then query those breakpoints in your controllers, components,
routes, and views:

```js
this.get('media.isMobile'); // => true
```

Obviously, these properties also propagate to templates:

```hbs
{{#if media.isDesktop}}
  Desktop view!
{{/if}}
```

You should also bind the list of active media queries to your app's
rootElement. This means you won't have to deal with complicated media
queries in CSS, instead simply use classes to style the different devices.

```js
App.ApplicationView = Ember.View.extend({
  classNameBindings: ['media.classNames']
});
```

## Testing Helpers
This project provides several testing helpers to assist in testing
content specific to different breakpoints.

### Acceptance Tests
This project provides an acceptance testing helper to assist in testing
content specific to different breakpoints.

To use the `setBreakpoint` helper in an acceptance test:

```javascript
test('example test', function(assert) {
  setBreakpoint('mobile');
  visit('/');

  andThen(function() {
    // assert something specific to mobile
  });
});
```

The default breakpoint for testing defaults to `desktop`. You can modify this
by changing `_defaultBreakpoint` in `tests/helpers/responsive.js`.

### Integration Tests
Since the entire application isn't spun up for an integration tests, the `setBreakpoint`
acceptance test helper won't work. In this case, you'll need to use the
`setBreakpointForIntegrationTest` helper.

To use the `setBreakpointForIntegrationTest` helper in an integration test:

```javascript
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setBreakpointForIntegrationTest } from 'your-app-name/tests/helpers/responsive';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('it renders', function(assert) {
  setBreakpointForIntegrationTest(this, 'mobile');
  this.render(hbs`{{foo-bar media=media}}`); // IMPORTANT: you must pass the media service

  // assert something specific to mobile
});
```

## Tests

To run the tests, after cloning do:

```sh
npm install
bower install
npm test
```

## License

This library is lovingly brought to you by the FreshBooks developers.
We've released it under the MIT license.
