var climateServices = angular.module('climateServices', ['climateConstants']);

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

climateServices.factory('energyMixRenewable', ['energyMixNY',
  function(energyMixNY) {
    return normalizeValues(_.pick(energyMixNY, 'solar', 'hydro', 'wind', 'solar', 'biomass'));
}]);

climateServices.service('energyOptionsWithComposition', ['energyComposition', 'energyOptions', 'energyMixNY', 'energyMixRenewable', 'emmissions',
  function energyOptionsWithCompositionService(energyComposition, energyOptions, energyMixNY, energyMixRenewable, emmissions) {
    this.normalMix = energyMixNY;
    this.renewableMix = energyMixRenewable;
    this.compositions = energyComposition;
    this.emmissions = emmissions;

    this.setComposition = function(composition, option) {
      option.mix = composition.mix;
    };

    this.setEnergyComposition = _.bind(function(composition) {
      // find what energy providers that this rule composition applies to
      var whereApplied = _.where(this.options, composition.selector);
      if (whereApplied.length === 0) {
        console.log("this compsition didnt find any options to be used with", composition);
      }
      // set the mix for each of those
      _.each(whereApplied, _.partial(this.setComposition, composition));
    }, this);

    this.addNormalizedMix = _.bind(function(option) {
      // first start the normalized mix with just the original mix
      option.normalizedMix = option.mix ? _.clone(option.mix) : {};

      // then replace all of the unkown sources with the `normalMix`
      var unknownPercent = 1 - sum(_.values(option.normalizedMix));
      addValueFromTo(multiplyValuesBy(this.normalMix, unknownPercent), option.normalizedMix);

      // then replace the `renewable` energy with `renewableMix`
      var renewablePercent = option.normalizedMix.renewable;
      if (renewablePercent !== undefined) {
        addValueFromTo(multiplyValuesBy(this.renewableMix, renewablePercent), option.normalizedMix);
        delete option.normalizedMix.renewable;
      }

    }, this);

    this.addEmmissions = _.bind(function(option) {
      option.emmissions = 0;
      for (var source in option.normalizedMix) {
         option.emmissions += this.emmissions[source] * option.normalizedMix[source];
      }

    }, this);

    this.getOptions = energyOptions.then(_.bind(function(options) {
      this.options = options;
      _.each(this.compositions, this.setEnergyComposition);
      _.each(this.options, this.addNormalizedMix);
      _.each(this.options, this.addEmmissions);
      return this.options;
    }, this));
  }
]);
