// This calls the Coinbase API too frequently. I should store the values in a hidden VARIABLES sheet with timestamp. Call if older than 60 seconds or so. Allow users to customize the refresh time.


// ------
// CONSTANTS
// ------

SS = SpreadsheetApp.getActiveSpreadsheet();
SHEET = SS.getActiveSheet();

CURRS = {
  "bitcoin": "BTC",
  "ethereum": "ETH",
  "litecoin": "LTC",
  "bitcoin_cash": "BCH"
}

SYMBOLS = Object.keys(CURRS).map(function(c) { return CURRS[c].toLowerCase()});

NAMES = {
  "bitcoin": "Bitcoin",
  "ethereum": "Ethereum",
  "litecoin": "Litecoin",
  "bitcoin_cash": "Bitcoin Cash"
}

// ------
// SPREADSHEET FUNCTIONS
// ------


// Returns a 5 row grid (including header) with the latest buy/sell prices for each currency. Auto-updates with your spreadsheet settings (default is ~1 minute).
// Currency is optional and defaults to US Dollar ("USD")
function getPrices(currency) {
  resp = [["Crypto", "Sell Price", "Buy Price"]];
  for (c in CURRS) {
   resp.push(priceRow(c, currency)); 
  };
  return resp;              
}

// Returns a 1-dimensional array with the currency name, it's sell price, and it's buy price. 
function priceRow(crypto, currency) {
  var buy_price = getPrice(crypto, "buy", currency);
  var sell_price = getPrice(crypto, "sell", currency);
  var arr = [NAMES[crypto], sell_price, buy_price];
  return arr;
}

// Given a crypto currency or it's abbreviation and the type ("buy", "sell", "spot") will return a decimal of that price. Currency is optional and defaults to US Dollars ("USD")
function getPrice(crypto, type, currency) {
  crypto = crypto || "Bitcoin";
  var symbol = getSymbol(crypto);
  type = type || "sell";
  currency = (currency || "USD").toUpperCase();
  var url = "https://api.coinbase.com/v2/prices/" + symbol + "-" + currency + "/" + type;
  var price = getFromApi(url);
  return parseFloat(price);
}

// Calculates the current monetary value of a given amount of a given cryptocurrency. Type ("buy"/"sell" - detaults to sell) and currency (defaults to "USD" - US Dollar) are optional.
function getValue(crypto, amount, currency, type) {
  return parseFloat((getPrice(crypto, type, currency) * amount));
}


// ------
// HELPER FUNCTIONS
// ------

// Fetches the given Coinbase API URL, parses the response and returns it. 
function getFromApi(url) {
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response);
  var price = data.data.amount;
  return price;
}

// Provided a full cryptocurrency name ("Bitcoin Cash", "Ethereum", etc..) translates that into a lower-cased symbol which can be used on the API.                  
function getSymbol(crypto) {
 var  lc_crypto = crypto.toLowerCase().replace(" ","_");
  if (SYMBOLS.indexOf(lc_crypto) >= 0) {
    currency = lc_crypto;
  } else {
    currency = CURRS[lc_crypto].toLowerCase();
  }
  return currency;
}