var request = require("request");
var queryString = require("query-string");

const fixerLatestURL = "http://api.fixer.io/latest?";
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
  }
}

function getURLForLatest(fromCurrency=defaultCurrency){
  let parsed = queryString.parse();
  parsed.base = fromCurrency;
  let paramString = queryString.stringify(parsed);
  let url =  fixerLatestURL+paramString;
  return url;
}
