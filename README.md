# forexify
Minimal package for Forex rates.

forexify uses [fixer.io](http://fixer.io/) internally.

*Fixer.io is a free JSON API for current and historical foreign exchange rates published by the European Central Bank.
The rates are updated daily around 4PM CET.*

### Usage

###### Async methods

forexify provides two async methods

* `convert(amount=1, fromCurrency="EUR", toCurrency="EUR", callback)`
```javascript
forexify.convert(5,'EUR','INR', function(err,data){
  console.log("5 EUR = "+data+" INR");
})
```
* `supportedCurrencies(callback)`
```javascript
forexify.supportedCurrencies(function(err,data){
  console.log("The following currencies are supported");
  console.log(data);
})
```


