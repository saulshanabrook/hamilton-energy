var climateConstants = angular.module('climateConstants', []);


climateConstants.constant('energyComposition', [{
  'selector': {
    'provider': 'Agway Energy Services, Inc.'
  },
  'mix': {
    'wind': 0.4,
    'hydro': 0.3,
    'lfg': 0.3
  }
}, {
  'selector': {
    'provider': 'Ambit New York, LLC',
    'green': true
  },
  'mix': {
    'wind': 0.15,
    'biomass': 0.85
  }
}, {
  'selector': {
    'provider': 'Energy Cooperative of America, Inc. d/b/a Energy Cooperative of New York',
    'green': true
  },
  'mix': {
    'renewable': 1
  }
}, {
  'selector': {
    'provider': 'Entrust Energy',
    'green': true
  },
  'mix': {
    'renewable': 1
  }
}, {
  'selector': {
    'provider': 'Ethical Electric dba Clean Energy Option'
  },
  'mix': {
    'wind': 1
  }
}, {
  'selector': {
    'provider': 'Family Energy, Inc.',
    'green': true
  },
  'mix': {
    'offset': 1
  }
}, {
  'selector': {
    'provider': 'Green Mountain Energy Company'
  },
  'mix': {
    'wind': 1
  }
}, {
  'selector': {
    'provider': 'IDT Energy, Inc.',
    'green': true
  },
  'mix': {
    'hydro': 1
  }
}, {
  'selector': {
    'provider': 'New York Gas & Electric'
  },
  'mix': {
    'offset': 0.5
  }
}, {
  'selector': {
    'provider': 'Kiwi Energy NY LLC',
    'green': true
  },
  'mix': {
    'renewable': 1
  }
}, {
  'selector': {
    'provider': 'Kiwi Energy NY LLC',
    'comments': '100% nationally sourced renewable energy. Monthly variable supply rate that could be different, including higher or lower than the Utility rate. Due to the nature of monthly variable pricing your actual price will be lower than the price displayed. Contact our call centre for the price today.'
  },
  'mix': {
    'renewable': 1
  }
}, {
  'selector': {
    'provider': 'North American Power & Gas, LLC',
    'green': true
  },
  'mix': {
    'renewable': 1
  }
}, {
  'selector': {
    'provider': 'North American Power & Gas, LLC',
    'green': false
  },
  'mix': {
    'renewable': 0.25
  }
}, {
  'selector': {
    'provider': 'Viridian Energy NY, LLC'
  },
  'mix': {
    'wind': 0.5
  }
}, {
  'selector': {
    'provider': 'XOOM Energy New York, LLC',
    'green': true
  },
  'mix': {
    'renewable': 0.5
  }
}]);
