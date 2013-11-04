App.rootElement = '#qunit-fixture';
App.setupForTesting();

Ember.Test.registerHelper('getContainer', function(app) {
  return app.__container__;
});

module("Using the existing container", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

// no mocking of the container

test("Testing selectedPost without mocking", function() {
  var container = getContainer(),
      postsController = container.lookup('controller:posts'),
      postController = container.lookup('controller:post'),
      post = {};

  postController.set('model', post);

  // it should not be selected
  ok(!postController.get('isSelected'), 'post is not selected');

  // now select it
  postsController.set('selectedPost', post);

  // it should be selected
  ok(postController.get('isSelected'), 'post is selected');
});

// mock the container

module("Mocking the container");

test("Testing selectedPost with a mock container", function() {
  var container = new Ember.Container(),
      postsController,
      postController,
      post = {};

  container.register('controller:posts', Ember.Object.extend());

  postsController = container.lookup('controller:posts'); // instantiate
  postController = App.PostController.create({ container: container });
  postController.set('model', post);

  // it should not be selected
  ok(!postController.get('isSelected'), 'post is not selected');

  // now select it
  postsController.set('selectedPost', post);

  // it should be selected
  ok(postController.get('isSelected'), 'post is selected');
});


// mocking a store

test("App.PostsRoute model should find posts", function() {
  var container = new Ember.Container(),
      route,
      fakeStore = {
        find: function() {
          return [{}, {}, {}];
        }
      };

  route = App.PostsRoute.create();
  route.store = fakeStore;

  equal(route.model().length, 3, 'should find 3 posts');
});

