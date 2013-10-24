App.rootElement = '#qunit-fixture';
App.setupForTesting();

module("Unit Testing", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
    controller = App.__container__.lookup('controller:person');
  },

  teardown: function() {
    controller = null;
  }
});

test("should display the name", function() {
  controller.set('model', { first: "ryan", last: "toronto" });
  equal(controller.get('name'), 'ryan toronto');
});

test("should not have a name", function() {
  // this is why we call App.reset
  ok(!controller.get('hasName'));
});
