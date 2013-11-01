App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', { path: '/' }, function() {
    this.route('add');
  });
  this.resource('post', { path: '/:post_id' });
});


App.ApplicationAdapter = DS.RESTAdapter;

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  comments: DS.hasMany('comment')
});

App.Comment = DS.Model.extend({
  body: DS.attr('string'),
  post: DS.belongsTo('post')
});

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
