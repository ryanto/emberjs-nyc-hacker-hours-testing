App = Ember.Application.create();

App.Router.map(function() {
  this.route('timeout');
  this.route('ajax');
});

App.TimeoutRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run.later(resolve, 1000);
    });
  }
});

App.AjaxRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax('testing.json', {
        success: function() { Ember.run(resolve); }
      });
    });
  }
});
