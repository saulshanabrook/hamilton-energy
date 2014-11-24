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

function findWhereOrAdd(list, properties) {
  return _.findWhere(list, properties) || list[list.push(properties) - 1];
}

function prettyJoinList(list) {
  var output = "";

  for (var index = 0; index < list.length; index++) {
    var last = index == list.length - 1;
    var secondToLast = index == list.length - 2;

    output += list[index];

    if (list.length > 2 && !last && !secondToLast) {
      output += ',';
    }

    if (list.length > 1) {
      output += ' ';
    }

    if (list.length > 1 && secondToLast) {
      output += 'and ';
    }

  }
  return output;
}
