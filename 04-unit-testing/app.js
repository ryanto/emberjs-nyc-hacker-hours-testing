App = Ember.Application.create();

App.Router.map(function() {
  this.resource('people', { path: "/" });
});

App.PeopleRoute = Ember.Route.extend({
  model: function() {
    return [
      { first: "Kevin", last: "Durant" },
      { first: "Lebron", last: "James" },
      { first: "James", last: "Harden" }
    ];
  }
});

App.PersonController = Ember.ObjectController.extend({
  name: function() {
    return this.get('first') + " " + this.get('last');
  }.property('first', 'last'),

  hasName: Ember.computed.and('first', 'last')
});
