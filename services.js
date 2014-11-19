var climateServices = angular.module('climateServices', []);

climateServices.service('energyHTTP', ['$http', '$q',
  function energyHTTPProvider($http, $q) {
    this.postURL = 'http://www.newyorkpowertochoose.com/ptc_find_handler.cfm';
    this.postData = {
      'zip_code': '13346',
      'commodity': 'electric',
      'offer_type': 'Fixed',
      'service_class': 'Residential'
    };
    this.getHTML = function() {
      // POST with form data in angularjs http://stackoverflow.com/a/14868725/907060
      return $http({
        method: "post",
        url: 'https://cors-anywhere.herokuapp.com/' + this.postURL,
        data: this.postData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      });
    };
  }
]);


climateServices.factory('energyOptions', ['energyHTTP',
  function energyOptionsFactory(energyHTTP) {
    return energyHTTP.getHTML().then(function(response) {
      var table = $(response.data.replace(/<img[^>]*>/g, '<img>')).find('#offers_listing > table > tbody');

      function ParseException(error, response) {
        this.error = error;
        this.response = response;
      }

      if (table.length === 0) {
        swal({
          title: "Can't access NY Power Website",
          text: "check console log for response details",
          type: "error"
        });
        throw new ParseException("ny power website isnt parsed right", response);
      }
      var energyOptions = [];
      var provider;

      function processHeader(elem) {
        var str = elem.find('td').text();
        provider = _.clean(_.strLeft(str, "Fixed Rate"));
      }

      function processRow(elem) {
        var moreInfoLink = elem.find('a');
        var pricingScheme = _.str.include(moreInfoLink.text(), 'Variable') ? 'Variable' : 'Fixed';
        var greenSpot = elem.find('td:nth-child(4)');
        energyOptions.push({
          provider: provider,
          url: moreInfoLink.attr('href'),
          pricingScheme: pricingScheme,
          price: parseFloat(_.clean(_(_(moreInfoLink.text()).strRight(pricingScheme)).strLeft("kwh"))),
          green: greenSpot.has('img').length !== 0,
          minTerm: _.clean(elem.find('td:nth-child(5)').text()),
          cancellationFee: _.clean(elem.find('td:nth-child(6)').text()),
          comments: _.clean(elem.find('td:nth-child(8)').text())
        });
      }

      table.children().each(function() {
        switch ($(this).attr('class')) {
          case "tableRowEscoTitle":
            processHeader($(this));
            break;
          case "tableRow1":
            processRow($(this));
            break;
          case "tableRow0":
            processRow($(this));
            break;
          default:
            break;
        }
      });
      return energyOptions;
    });
  }
]);

climateServices.constant('energyComposition', [{
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

climateServices.service('energyOptionsWithComposition', ['energyComposition', 'energyOptions',
  function energyOptionsWithCompositionService(energyComposition, energyOptions) {
    this.options;
    this.normalMix = {
      'coal': 1
    };
    this.renewableMix = {
      'magic': 1
    };
    this.compositions = energyComposition;
    this.setComposition = function(composition, option) {
      option.mix = composition.mix;
    };
    this.setEnergyComposition = _.bind(function(composition) {
      var whereApplied = _.where(this.options, composition.selector);
      if (whereApplied.length === 0) {
        console.log("this compsition didnt find any options to be used with", composition);
      }
      _.each(whereApplied, _.partial(this.setComposition, composition));
    }, this);
    this.addNormalizedMix = _.bind(function(option) {
      // if it is normal energy, use all normal mix
      if (!_.has(option, "mix")) {
        option.normalizedMix = this.normalMix;
      } else { // else use the mix given as a base and gill in
        option.normalizedMix = this.mix;
        // first change any leftover to normalMix
        var sum = function(l) {
          return _.reduce(l, function(memo, num) {
            return memo + num;
          }, 0);
        };

        var accountedForPercent = sum(_.values(option.mix));
        var addedNormalPercent = 1 - accountedForPercent;

        for (var energySource in this.normalMix) {
          option.normalizedMix[energySource] = option.normalizedMix[energySource] || 0;
          option.normalizedMix[energySource] += this.normalMix[energySource] * addedNormalPercent;
        }
        // then change any "renewable" to `renewableMix`
        var renewablePercent = option.normalizedMix.renewable || 0;
        for (energySource in this.renewableMix) {
          option.normalizedMix[energySource] = option.normalizedMix[energySource] || 0;
          option.normalizedMix[energySource] += this.renewableMix[energySource] * renewablePercent;
        }

      }
    }, this);
    this.getOptions = energyOptions.then(_.bind(function(options) {
      this.options = options;
      _.each(this.compositions, this.setEnergyComposition);
      _.each(this.options, this.addNormalizedMix);

      return this.options;
    }, this));

  }
]);
