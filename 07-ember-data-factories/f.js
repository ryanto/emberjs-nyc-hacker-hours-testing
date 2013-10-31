window.F = function(context, f) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function() {
    var additionalArgs = Array.prototype.slice.call(arguments, 0),
        func = (typeof f == "string" ? context[f] : f);
    return func.apply(context, args.concat(additionalArgs));
  };
};
