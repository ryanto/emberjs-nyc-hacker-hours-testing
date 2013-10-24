test("should be an ember applicaiton", function() {
  equal(
    App.constructor, Ember.Application,
    'App is an Ember App!'
  );
});

test("should add two numbers togeather", function() {
  var answer = App.add(1, 2);
  equal(answer, 3);
});

