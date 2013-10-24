App.rootElement = '#qunit-fixture';
App.setupForTesting();

module("Wait Helper", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

Ember.Test.registerHelper('container', function(app) {
  return app.__container__;
});

// All async helpers are built off wait(). Then next helper
// won't run until wait has resolved. The following directly invoke
// the wait helper to show what is polls for.
//
// note that wait().then = andThen

test("should wait for any timers to finish", function() {
  var check = setInterval(function() {
    console.log('Has timers: ' + Ember.run.hasScheduledTimers());
  }, 1);

  visit("/timeout");

  wait().then(function() {
    console.log('Done Waiting');
    clearInterval(check);
    ok(true);
  });
});

test("should wait for any ajax to finish", function() {
  var ajaxRunning;
  var check = setInterval(function() {
    console.log('Ajax Running: ' + ajaxRunning);
  }, 1);

  $(document).ajaxStart(function() {
    ajaxRunning = true;
  });

  $(document).ajaxStop(function() {
    ajaxRunning = false;
  });

  visit("/ajax");

  wait().then(function() {
    console.log('Done Waiting');
    clearInterval(check);
    ok(true);
  });

});

test("should wait for any custom helpers", function() {
  Ember.FEATURES["ember-testing-wait-hooks"] = true;

  Ember.Test.registerWaiter(function() {
    return !$.isAnimating;
  });

  var animate = function(elm) {
    $.isAnimating = true;
    $(elm).animate({ opacity: 0 }, 1000, function() {
      $(elm).animate({ opacity: 1 }, 1000, function() {
        $.isAnimating = false;
      });
    });
  };

  animate($('body'));

  wait().then(function() {
    console.log('done animating');
    ok(true);
  });
});
