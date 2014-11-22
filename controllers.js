var climateControllers = angular.module('climateControllers', ['climateServices', 'datatables', "highcharts-ng"]);

climateControllers.controller('EnergyProvidersCtrl', ['$scope', 'energyOptionsWithComposition', 'DTOptionsBuilder', 'DTColumnBuilder', 'optionKeys',
  function($scope, energyOptionsWithComposition, DTOptionsBuilder, DTColumnBuilder, optionKeys) {
    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      return energyOptionsWithComposition.getOptions;
    }).withPaginationType('full_numbers');

    $scope.dtColumns = _.map(optionKeys, function(value, key) {
      return DTColumnBuilder.newColumn(key).withTitle(value);
    });

    energyOptionsWithComposition.getOptions.then(function(options) {
      _.each(options, function(option) {
        option.x = option.emmissions;
        option.y = option.price;
      });
      $scope.chartConfig.series.push({
        data: options
      });

    });

    $scope.chartConfig = {
      //This is not a highcharts object. It just looks a little like one!
      options: {
        chart: {
          type: 'scatter'
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          useHTML: true,
          formatter: function() {
            var t = '<table>';
            for (var value in optionKeys) {
              t += '<tr>';
              t += '<td>' + optionKeys[value] + '</td>';
              t += '<td style="text-align: right">' + this.point[value] + '</td>';
              t += '</tr>';
            }

            t += '</table>';
            return t;
          }
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
            allowPointSelect: true
          }
        }
      },
      series: []
    };

  }
]);

climateControllers.controller('DeathCtrl', ['$scope',
  function($scope) {
    var deathsPerYear = 250 * 1000;
    var numberYears = 2050 - 2030;
    var deathsFromWarming = numberYears * deathsPerYear;

    var giga = Math.pow(10, 9);
    var totalCTons = 500 * giga;

    var deathsPerCTon = deathsFromWarming / totalCTons;
    $scope.lessDeathsFromCTonSaved = function() {
      return deathsPerCTon * $scope.cTonsSaved;
    };
  }
]);
