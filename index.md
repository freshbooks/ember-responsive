---
layout: default
---

<p class="lead">
  The goal of ember-responsive is to give you a simple, Ember-aware way of dealing with media queries. All you need to do is tell it your application's breakpoints and it'll expose the rest for you.
</p>

<p><a href="https://travis-ci.org/freshbooks/ember-responsive"><img src="https://travis-ci.org/freshbooks/ember-responsive.svg?branch=master" alt="Build Status" title="Build Status"></a></p>

<div class="row well ">
  <div class="col-sm-6">
    <a href="https://github.com/freshbooks/ember-responsive" role="button" class="btn btn-block btn-primary btn-lg">
      <span class="glyphicon glyphicon-heart"></span>
      Fork us on GitHub!
    </a>
  </div>
  <div class="col-sm-6">
    <a href="https://www.justinbull.ca/ember-responsive-demo/" role="button" class="use-tooltip btn btn-block btn-success btn-lg" data-toggle="tooltip" data-placement="top">
      <span class="glyphicon glyphicon-play-circle"></span>
      See a demo
    </a>
  </div>
</div>

# Requirements

ember-responsive needs `window.matchMedia()` to function, which isn't yet
available in all browsers:

[http://caniuse.com/#feat=matchmedia](http://caniuse.com/#feat=matchmedia)

There is a polyfill by Paul Irish called matchMedia.js that will add support
to older browsers:

[https://github.com/paulirish/matchMedia.js/](https://github.com/paulirish/matchMedia.js/)


# Getting Started

This is an ember-cli addon so, so all you need to do is

    $ npm install --save ember-responsive

After that, simply register the media queries that are pertinent to your
application in `app/breakpoints.js`:

{% highlight js %}
export default {
  mobile:  '(max-width: 768px)',
  tablet:  '(min-width: 769px) and (max-width: 992px)',
  desktop: '(min-width: 993px) and (max-width: 1200px)',
  jumbo:   '(min-width: 1201px)',
}
{% endhighlight %}

You can then query those breakpoints in your controllers, components,
routes, and views:

{% highlight js %}
this.get('media.isMobile'); // => true
{% endhighlight %}

Obviously, these properties also propagate to templates:

{% highlight handlebars %}{% raw %}
{{#if media.isDesktop}}
  Desktop view!
{{/if}}
{% endraw %}{% endhighlight %}

You should also bind the list of active media queries to your app's
`rootElement`. This means you won't have to deal with complicated media
queries in CSS—instead simply use classes to style the different devices.

{% highlight js %}
export default Ember.View.extend({
  classNameBindings: ['media.classNames']
});
{% endhighlight %}

# Tests

To run the tests, after cloning do:

{% highlight sh %}
$ npm install
$ npm test
{% endhighlight %}


# License

This library is lovingly brought to you by the FreshBooks developers.

We've released it under the MIT license.
