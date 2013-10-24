App.rootElement = '#qunit-fixture';
App.setupForTesting();

// Simple helper
Ember.Test.registerHelper('equalThree', function(app, number) {
  equal(number, 3, 'number is three');
});

App.injectTestHelpers();

test("it should be three", function() {
  equalThree(3);
});

// Find element on page
Ember.Test.registerHelper('assertExists', function(app, selector, times) {
  if (!times) {
    times = 1;
  }

  andThen(function() {
    var element = find(selector);
    equal(element.length, times, "found " + selector + " " + times + " times.");
  });
});

module("Integration Tests", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

test("I should see all of the posts", function() {
  visit("/posts");

  assertExists(".post", 2);
});


// We can improve the assertExists

Ember.Test.registerAsyncHelper('betterAssertExists', function(app, selector, times) {
  if (!times) {
    times = 1;
  }

  var element = find(selector);
  equal(element.length, times, "found " + selector + " " + times + " times.");
});

test("I should still see all of the posts", function() {
  visit("/posts");

  betterAssertExists(".post", 2);
});

/*
 * Write some common helpers
 */

// 1) Assertions 
// Helpers to assert things in dom (text, elements, classes, etc)

Ember.Test.registerAsyncHelper('assertElementText', function() {
  // exercise for the reader...
});


// 2) Application State/Properties
// Helpers to find information and properties of the current application.

Ember.Test.registerHelper('container', function(app) {
  return app.__container__;
});

Ember.Test.registerAsyncHelper('currentRouteName', function() {
  // exercise for the reader...
});

