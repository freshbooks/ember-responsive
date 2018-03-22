import { classify } from '@ember/string';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const mediaRules = {
  mobile:  '(max-width: 767px)',
  jumbo:   '(min-width: 1201px)'
};

module('Unit | Service | media', function(hooks) {
  setupTest(hooks);

  test('it matches on init', function(assert) {
    const subject = this.owner.factoryFor('service:media').create({
      breakpoints: mediaRules,
      match: sinon.stub()
    });

    assert.ok(subject.match.withArgs('mobile','(max-width: 767px)').calledOnce);
    assert.ok(subject.match.withArgs('jumbo','(min-width: 1201px)').calledOnce);
  });

  test('matchers can be added dynamically', function(assert) {
    var subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules });
    subject.match('all', 'not all');

    assert.equal(subject.get('all.matches'), false);
  });

  test('matchers have a corresponding isser', function(assert) {
    var subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules });
    subject.match('mobile', 'not all');

    assert.equal(subject.get('isMobile'), false);
  });

  test('matches property returns matching matchers', function(assert) {
    var subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules });
    subject.match('mobile', 'all');
    subject.match('all', 'all');
    subject.match('none', 'not all');

    assert.deepEqual(subject.get('matches').toArray(), ['mobile', 'all']);
  });

  test('classNames property returns matching matchers as classes', function(assert) {
    var subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules });
    subject.match('mobileDevice', 'all');
    subject.match('all', 'all');
    subject.match('none', 'not all');

    assert.equal(subject.get('classNames'), 'media-mobile-device media-all');
  });

  test('classNames is correctly bound to the matches property', function(assert) {
    var subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules });

    subject.match('one', 'all');
    assert.equal(subject.get('classNames'), 'media-one');

    subject.match('two', 'all');
    assert.equal(subject.get('classNames'), 'media-one media-two');

    subject.match('one', 'none');
    assert.equal(subject.get('classNames'), 'media-two');
  });

  test('matcher\'s isser property notifies upon change', function(assert) {
    var listener, matcher, name = 'somethingUnique',
      subject = this.owner.factoryFor('service:media').create({ breakpoints: mediaRules }),
      observer = sinon.spy();

    subject.addObserver('is'+classify(name), this, observer);
    //First call
    subject.match(name, 'query');

    listener = subject.get('listeners')[name];

    matcher = {}; // Dummy MediaQueryList
    matcher.matches = true;
    //Second call
    listener(matcher);

    matcher.matches = false;
    //Third call
    listener(matcher);

    assert.equal(
      observer.callCount,
      3,
      'Expected 3 calls to an observer, '+observer.callCount+' were called instead'
    );
  });
});

