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
    fakehr.start();
    App.reset();
    App.injectTestHelpers();
  },
  teardown: function() {
    fakehr.reset();
  }
});

test("should see a listing of all the posts", function() {
  visit("/");

  httpRespond("get", "/posts", {
    posts: [
      { id: 1, title: 'Test Post', body: 'Testing' },
      { id: 2, title: 'asdf', body: '...' }
    ]
  });

  assertExists("a.post:contains('Test Post')");
});

test("should see a post once I click the link", function() {
  visit("/");

  httpRespond("get", "/posts", {
    posts: [
      { id: 1, title: 'Test Post', body: 'Testing' }
    ]
  });

  click("a.post:first");

  assertExists("h1:contains('Test Post')");
});

test("should see a posts comments when viewing the post", function() {
  visit("/1");

  httpRespond("get", "/posts/1", {
    post: {
      id: 1, title: 'Test Post', body: 'Testing', comments: [1]
    },
    comments: [
      { id: 1, body: 'test comment' }
    ]
  });

  assertExists("p.comment:contains('test comment')");
});

test("should be able to create a new post", function() {
  visit("/add");

  fillIn("input.title", "A title");
  fillIn("textarea.body", "Body of the post");

  click("input.save")
    .httpRespond("post", "/posts", {
      post: {
        id: 2, title: "A title", body: "Body of the post"
      }
    })
   .httpRespond("get", "/posts", {
      posts: [
        { id: 1, title: 'Test Post', body: 'Testing' },
        { id: 2, title: "A title", body: "Body of the post" }
      ]
    });

  assertExists("h1:contains('A title')");

  ok(true);
});
