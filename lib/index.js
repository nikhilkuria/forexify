var request = require("request");
var queryString = require("query-string");

const fixerBaseURL = "http://api.fixer.io/"
const fixerLatestURL = fixerBaseURL + "latest?";
const defaultCurrency = 'EUR';

module.exports={
  convert:function(amount=1, fromCurrency="EUR", toCurrency="EUR", callback){
    let url = getURLForLatest(fromCurrency);
    let conversionRate = 1;
    request(url, function(error,response,body){
      conversionRate = JSON.parse(body).rates[toCurrency];
      let convertedValue = amount * conversionRate;
      callback(null,convertedValue);
    });
  },
  supportedCurrencies:function(callback){
    let url = getURLForLatest();
    request(url, function(error,response,body){
      let currencies = Object.keys(JSON.parse(body).rates);
      currencies.push(defaultCurrency)
      currencies.sort();
      callback(null,currencies);
    })
  },
  historicalRates:function(baseCurrency="EUR", dayString, callback){
    let url = getURLForHistoricalRate(dayString);
    request(url, function(error,response,body){
      let historicalRates = new Array();
      let eurBasedHistoricalRates = JSON.parse(body).rates;
      eurBasedHistoricalRates["EUR"] = 1;
      if(typeof eurBasedHistoricalRates[baseCurrency] === undefined){
        callback(new Error("Unsupported currency used"), null);
      }

      let baseCurrencyValue = eurBasedHistoricalRates[baseCurrency];

      let currencies = Object.keys(eurBasedHistoricalRates);
      currencies.sort();

      for(let currency of currencies){
          let currencyVal = eurBasedHistoricalRates[currency];
          historicalRates[currency] =  (currencyVal/baseCurrencyValue).toFixed(2);
      }

      callback(null,historicalRates);
    })
  }
}

function getURLForLatest(fromCurrency=defaultCurrency){
  let parsed = queryString.parse();
  parsed.base = fromCurrency;
  let paramString = queryString.stringify(parsed);
  let url =  fixerLatestURL+paramString;
  return url;
}

function getURLForHistoricalRate(dayString){
  let url = fixerBaseURL+dayString;
  return url;
}
