App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', { path: '/' });
  this.resource('post', { path: '/:post_id' });
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({
  simulateRemoteResponse: true,
  latency: 50
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string')
});

App.Post.FIXTURES = [{
  id: "1",
  title: "Test Post",
  body: "This is a test post..."
},{
  id: "any-string-works",
  title: "Fixture Fixture",
  body: "Fixture fixture fixture, fixture fixture."
}];

App.PostsController = Ember.ArrayController.extend({
  selectedPost: null // Post
});

App.PostController = Ember.ObjectController.extend({
  needs: 'posts'.w(),

  selectedPost: Ember.computed.alias('controllers.posts.selectedPost'),

  isSelected: function() {
    return this.get('model') === this.get('selectedPost');
  }.property('selectedPost', 'model')
});

App.PostsRoute = Ember.Route.extend({
  actions: {
    selectPost: function(post) {
      this.controller.set('selectedPost', post);
    }
  },

  model: function() {
    return this.store.find('post');
  }
});
