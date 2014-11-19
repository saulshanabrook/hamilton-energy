var climateApp = angular.module('climateApp', [
  'climateControllers',
  'climateServices',
  'highcharts-ng'
]);

climateApp.run(function() {
// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true
});
