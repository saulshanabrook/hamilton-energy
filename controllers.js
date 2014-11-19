var climateControllers = angular.module('climateControllers', ['climateServices']);

climateControllers.controller('EnergyProvidersCtrl', ['$scope', 'energyOptionsWithComposition',
  function($scope, energyOptionsWithComposition) {
    energyOptionsWithComposition.getOptions.then(function(options) {
      $scope.options = options;
    });
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
