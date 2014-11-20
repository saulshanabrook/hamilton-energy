var climateControllers = angular.module('climateControllers', ['climateServices', 'datatables']);

climateControllers.controller('EnergyProvidersCtrl', ['$scope', 'energyOptionsWithComposition', 'DTOptionsBuilder', 'DTColumnBuilder',
  function($scope, energyOptionsWithComposition, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            return energyOptionsWithComposition.getOptions;
        }).withPaginationType('full_numbers');

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('provider').withTitle('Provider Name'),
        DTColumnBuilder.newColumn('price').withTitle('Price ($/kwh)'),
        DTColumnBuilder.newColumn('emmissions').withTitle('Emmissions gCO2eq/kWh)'),
        DTColumnBuilder.newColumn('green').withTitle('"Green?"'),
        DTColumnBuilder.newColumn('pricingScheme').withTitle('Pricing Scheme'),
        DTColumnBuilder.newColumn('minTerm').withTitle('Minimum Term'),
        DTColumnBuilder.newColumn('cancellationFee').withTitle('Cancellation Fee'),
        DTColumnBuilder.newColumn('comments').withTitle('Comments'),
        DTColumnBuilder.newColumn('url').withTitle('Link'),
    ];
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
