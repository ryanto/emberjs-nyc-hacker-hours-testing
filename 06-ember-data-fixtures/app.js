App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', { path: '/' }, function() {
    this.route('add');
  });
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

App.PostsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostsAddRoute = Ember.Route.extend({
  actions: {
    save: function() {
      this.controller.get('model')
        .save()
        .then(F(this, 'transitionTo', 'post'));
    }
  },

  model: function() {
    return this.store.createRecord('post');
  }
});
