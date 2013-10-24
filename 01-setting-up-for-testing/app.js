App = Ember.Application.create({
  rootElement: '#qunit-fixture'
});

App.setupForTesting();

App.add = function(a, b) {
  return a + b;
};
