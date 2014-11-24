var climateControllers = angular.module('climateControllers', ['climateServices', "highcharts-ng", 'angular-underscore/filters', 'climateFilters']);

climateControllers.controller('EnergyProvidersCtrl', ['$scope', 'energyOptionsWithComposition', 'optionKeys', 'getDeathDifference', '$filter',
  function($scope, energyOptionsWithComposition, optionKeys, getDeathDifference, $filter) {

    energyOptionsWithComposition.getOptions.then(function(options) {
      _.each(options, function(option) {
        if (_.str.include(option.provider, "incumbent")) {
          $scope.incumbent = option;
        }

        var seriesDefault = {
          name: option.pricingScheme + " Pricing",
          visible: option.pricingScheme == "Fixed"
        };
        var series = findWhereOrAdd($scope.chartConfig.series, seriesDefault);
        var data = _.defaults(series, {
          data: []
        }).data;

        var point = {
          x: option.emmissions,
          y: option.price,
          option: option
        };
        data.push(point);
      });

    });

    function calculateTotalKWhTill2030() {
      var monthsTill2030 = moment('2030-01-01').diff(moment(), 'months', true);
      return $scope.monthlyUsage * monthsTill2030;
    }

    function caculateLifeDifference() {
      var emmissionsDifferenceInG = $scope.selected.emmissions - $scope.incumbent.emmissions;
      var emmissionsDifferenceInT = Qty.swiftConverter('g', 'tonne')(emmissionsDifferenceInG);
      var cTonsDifference = emmissionsDifferenceInT * calculateTotalKWhTill2030();
      return -getDeathDifference(cTonsDifference);
    }

    function caculatePriceDifference() {
      var priceDifference = $scope.incumbent.price - $scope.selected.price;
      return priceDifference * calculateTotalKWhTill2030();
    }

    function updateDifferences() {
      $scope.priceDifference = caculatePriceDifference();
      $scope.lifeDifference = caculateLifeDifference();
    }

    $scope.monthlyUsage = Math.round(8294 / 12, 0);
    $scope.$watch('monthlyUsage', function() {
        if ($scope.selected != null) {
            updateDifferences
        }
        });

    $scope.chartConfig = {
      //This is not a highcharts object. It just looks a little like one!
      options: {
        chart: {
          type: 'scatter'
        },
        legend: {
          enabled: true
        },
        tooltip: {
          enabled: true,
          pointFormat: '{point.option.provider}'

        },
        xAxis: {
          title: {
            text: optionKeys.emmissions
          }
        },
        yAxis: {
          title: {
            text: optionKeys.price
          }
        },
        title: {
          text: "Energy Provider Options"
        },
        plotOptions: {
          scatter: {
            allowPointSelect: true,
            point: {
              events: {
                click: function(event) {
                  $scope.selected = event.currentTarget.option;
                  updateDifferences();
                  $scope.$apply();
                }
              }
            }
          }
        }
      },
      series: []
    };



  }
]);

climateControllers.controller('InfoCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    $http.get('README.md').success(function(data) {
        $scope.readme = $sce.trustAsHtml(marked(data));
    });
}]);
