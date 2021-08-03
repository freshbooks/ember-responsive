# Changelog

### [4.0.2]
- BUGFIX: CP's are not firing on tracked media props ([#350](https://github.com/freshbooks/ember-responsive/pull/350) @rreckonerr)

### [4.0.1]
- Make test support setBreakpoint IE11 compatible ([#303](https://github.com/freshbooks/ember-responsive/pull/303) @raido)

### [4.0.0]
- Use Tracked based services on Match ([#286](https://github.com/freshbooks/ember-responsive/pull/286) @snewcomer)
- Breaking Change:  Bump Node 10

### [3.0.5]
- Update dependencies ([#153](https://github.com/freshbooks/ember-responsive/pull/153) @k-fish)

### [3.0.4]
- Update dependencies ([#151](https://github.com/freshbooks/ember-responsive/pull/151) @danielchanja)
- Update dependencies ([#150](https://github.com/freshbooks/ember-responsive/pull/150) @danielchanja)

### [3.0.3]
- Move ember-cli-babel back to 6.6 ([#148](https://github.com/freshbooks/ember-responsive/pull/148) @calvin-fb)

### [3.0.2]
- Update the package dependencies to address security vulnerabilities. ([#changes](https://github.com/freshbooks/ember-responsive/commit/d8ec195e453051d2d5910d8e0fe29fc949fc692a) @danielchanja)

### [3.0.1]
- Fixed init not calling super, which breaks for Ember 3.11 ([#145](https://github.com/freshbooks/ember-responsive/pull/145) @ryanto)

### [3.0.0]
- Breaking Change: All test helpers now use the same import: `import { setBreakpoint } from 'ember-responsive/test-support';`. See README for examples. (#124)
- Breaking Change: Make auto-injection an opt-in (#124)
- Breaking Change: The media helper now needs to be passed a breakpoint as a string. `{{media.isDesktop}} -> {{media
  'isDesktop'}}`. (#126, #128)
- Breaking Change: You have to update to using the new testing api for tests to work properly. https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md

### [2.0.8]
- Use new testing api (#122 @cibernox)

### [2.0.7]
- Added safeguard to fail on jQuery usage (#120 @cibernox)

### [2.0.6]
- Update ember-cli (#119 @k-fish)

### [2.0.5]
- Fix breakpoint coherency to match breakpoint widths across the addon. Existing addons with a generated breakpoints.js
  should not be affected, re-generating or generating for the first time will use the new breakpoints.
  ([#107](https://github.com/freshbooks/ember-responsive/pull/107) @telmaantunes)
  ([#106](https://github.com/freshbooks/ember-responsive/pull/106) @AndreJoaquim)

### [2.0.4]
- Update dependencies ([#98](https://github.com/freshbooks/ember-responsive/pull/98) @calvinlough)

### [2.0.3]
- Update ember-cli-babel and remove some unneeded packages ([#97](https://github.com/freshbooks/ember-responsive/pull/97) @calvinlough)

### [2.0.2]
- Fix: Add more floating room for ember-getowner-polyfill dependency ([#91](https://github.com/freshbooks/ember-responsive/pull/91) @kturney)

### [2.0.1]
- Fix: update ember-getowner-polyfill to remove deprecation ([#86](https://github.com/freshbooks/ember-responsive/pull/86) @kellyselden)
- Fix: Remove deprecated Ember.K ([#89](https://github.com/freshbooks/ember-responsive/pull/89) @cibernox)

### [2.0.0]
- Breaking Change: Initializer is now generated instead of included. Run `ember g ember-responsive` to generate the required file. ([#83](https://github.com/freshbooks/ember-responsive/pull/83))

### [1.2.10]
- Fixed: Initializer breaking change, re-add initializer before 2.0 ([#82](https://github.com/freshbooks/ember-responsive/pull/82))

### [1.2.9]
- No changes

### [1.2.8]
- Changed: Expose automatic injection as a generated file ([#78](https://github.com/freshbooks/ember-responsive/pull/78))
- Fixed: Ember-try scenarios ([#78](https://github.com/freshbooks/ember-responsive/pull/78))

### 1.2.7

- Fix setting on a destroyed element (#67 @Gaurav0)

### 1.2.6

- New test helpers (#65 @blimmer)
- ES6 syntax (#63 @blimmer)

### 1.2.4
- Support fastboot (#56 @tomdale)
- Remove use of private method `lookupFactory` (#57 @poteto)
- fix ember 2.3 deprecations (#53 @minichate)

### 1.2.3
- fix compatibility with older versions of ember (#47 @alexbaizeau)

### 1.2.2
- fix deprecation warnings (#46 @alexbaizeau)

### 1.2.1
- update addon via ember-init (@elwayman02)

### 1.2.0
- Adds `breakpoints.js` to addon. (#40, thanks @elwayman02)

### 1.1.1
- Fixes support for Ember 2.1 beta (#37, thanks @jasonmit)
- Upgrade addon to use Ember 1.13.10
- Updates Travis CI config and testing to use matrix

### 1.1.0
- Upgrade to ember-cli 0.2.3

### 1.0.2
- Stop using function prototype extensions

### 1.0.1
- Better Readme
- Passing build
### 1.0.0

- CHANGE: ember-cli addon
- BREAKING CHANGE: Breakpoints are now defined in app/breakpoints.js

[1.2.8]: https://github.com/freshbooks/ember-responsive/compare/v1.2.7...v1.2.8
[1.2.9]: https://github.com/freshbooks/ember-responsive/compare/v1.2.8...v1.2.9
[1.2.10]: https://github.com/freshbooks/ember-responsive/compare/v1.2.9...v1.2.10
[2.0.0]: https://github.com/freshbooks/ember-responsive/compare/v1.2.10...v2.0.0
[2.0.1]: https://github.com/freshbooks/ember-responsive/compare/v2.0.0...v2.0.1
[2.0.2]: https://github.com/freshbooks/ember-responsive/compare/v2.0.1...v2.0.2
[2.0.3]: https://github.com/freshbooks/ember-responsive/compare/v2.0.2...v2.0.3
[2.0.4]: https://github.com/freshbooks/ember-responsive/compare/v2.0.3...v2.0.4
[2.0.5]: https://github.com/freshbooks/ember-responsive/compare/v2.0.4...v2.0.5
