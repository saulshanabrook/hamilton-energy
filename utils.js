function sum(l) {
  return _.reduce(l, function(memo, num) {
    return memo + num;
  }, 0);
}

function multiplyValuesBy(initObject, multiplier) {
  var newObj = _.clone(initObject);
  return _.object(_.map(newObj, function(value, key) {
    return [key, value * multiplier];
  }));
}

function addValueFromTo(src, dest) {
  _.each(src, function(value, key) {
    dest[key] = (dest[key] || 0) + value;
  });
}

function normalizeValues(obj) {
  var total = sum(_.values(obj));
  _.each(obj, function(value, key) {
    obj[key] /= total;
  });
  return obj;
}
