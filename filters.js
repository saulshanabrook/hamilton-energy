var climateFilters = angular.module('climateFilters', []);

climateFilters.filter('prettyMix', ['$filter', function($filter) {
  function mixAsStrings(mix) {
    var output = [];
    for (var energy in mix) {
      var percent = $filter('number')(mix[energy], 2);
      if (percent > 0) {
        output.push(percent * 100 + '% ' + energy);
      }
    }
    return output;
  }

  return function(mix) {
    return prettyJoinList(mixAsStrings(mix));
  };
}]);


climateFilters.filter('abs', [function() {
  return function(num) {
    return Math.abs(num);
  };
}]);
