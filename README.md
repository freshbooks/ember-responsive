# ember-responsive

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

```
npm install --save ember-responsive
```

After that, simply register the breakpoints that are pertinent to 
your application in `app/breakpoints.js`:

```
export default {
  mobile:  '(max-width: 768px)',
  tablet:  '(min-width: 769px) and (max-width: 992px)',
  desktop: '(min-width: 993px) and (max-width: 1200px)',
  jumbo:   '(min-width: 1201px)',
}
```

You can then query those breakpoints in your controllers, components,
routes, and views:

```
this.get('media.isMobile'); // => true
```

Obviously, these properties also propagate to templates:

```
{{#if media.isDesktop}}
  Desktop view!
{{/if}}
```

You should also bind the list of active media queries to your app's
rootElement. This means you won't have to deal with complicated media
queries in CSS, instead simply use classes to style the different devices.

```
App.ApplicationView = Ember.View.extend({
  classNameBindings: ['media.classNames']
});
```

## Tests

To run the tests, after cloning do:

```
npm install
npm test
```

## License

This library is lovingly brought to you by the FreshBooks developers.
We've released it under the MIT license.

