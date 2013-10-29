App.rootElement = '#qunit-fixture';
App.setupForTesting();

Ember.Test.registerAsyncHelper('assertExists', function(app, selector, times) {
  if (!times) {
    times = 1;
  }

  var element = find(selector);
  equal(element.length, times, "found " + selector + " " + times + " times.");
});

module("Test Fixtures", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

test("should see a listing of all the posts", function() {
  visit("/");

  assertExists("a.post:contains('Test Post')");
});

test("should see a post once I click the link", function() {
  visit("/");

  click("a.post:first");

  assertExists("h1:contains('Test Post')");
});

test("should be able to create a new post", function() {
  visit("/add");

  fillIn("input.title", "A title");
  fillIn("textarea.body", "Body of the post");

  click("input.save");

  assertExists("h1:contains('A title')");
});
