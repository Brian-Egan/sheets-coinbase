// This calls the Coinbase API too frequently. I should store the values in a hidden VARIABLES sheet with timestamp. Call if older than 60 seconds or so. Allow users to customize the refresh time.

SS = SpreadsheetApp.getActiveSpreadsheet();
SHEET = SS.getActiveSheet();

CURRS = {
  "bitcoin": "BTC",
  "ethereum": "ETH",
  "litecoin": "LTC",
  "bitcoin_cash": "BCH",
  "ripple": "XRP"
}

SYMBOLS = Object.keys(CURRS).map(function(c) { return CURRS[c].toLowerCase()});

NAMES = {
  "bitcoin": "Bitcoin",
  "ethereum": "Ethereum",
  "litecoin": "Litecoin",
  "bitcoin_cash": "Bitcoin Cash",
  "ripple": "Ripple"
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
  // Removed passing cells as arguments and then setting prices directly into them. Instead returns an array which can be set on the sheet.
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
  if (symbol == "xrp") {
    // Ripple prices pulled from Bitsane's API
    var url = ("https://bitsane.com/api/public/ticker?pairs=" + symbol.toUpperCase() + "_" + currency);
//    return url;
  } else {
   // It's traded on Coinbase, 
    var url = "https://api.coinbase.com/v2/prices/" + symbol + "-" + currency + "/" + type;
  }
//  return symbol;
  var price = getFromApi(url, type);
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
function getFromApi(url, type) {
  type = type || null;
  var response = UrlFetchApp.fetch(url)
  var data = JSON.parse(response)
  if (url.indexOf("bitsane") >= 0) {
    switch(type) {
      case "buy":
        var field = "lowestAsk";
//        var price = data[url.substring(url.length-7,url.length + 1)]["lowestAsk"];
        break;
      case "sell":
        var field = "highestBid";
        break;
      case null:
        var field = "last";
        break;
    }
    var price =  data[url.substring(url.length-7,url.length + 1)][field];
  } else if (url.indexOf("coinbase") >= 0) {
    var price = data.data.amount;
  }
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


// ------
// MANUAL SCRIPT FUNCTIONS
// ------
// These should be called directly from the "Script Editor" (this) window. 


// Edit the cell addresses below, function will return cryptocurrency buy/sell prices to the specified cells.
function coinbase() {
  
  var currency = "SGD";

  var btc_sell_price_cell = 'A3'
  var btc_buy_price_cell = 'A4'

  var eth_sell_price_cell = 'A5'
  var eth_buy_price_cell = 'A6'

  var ltc_sell_price_cell = 'A7'
  var ltc_buy_price_cell = 'A8'

  price("BTC", btc_sell_price_cell, btc_buy_price_cell, currency)
  price("ETH", eth_sell_price_cell, eth_buy_price_cell, currency)
  price("LTC", ltc_sell_price_cell, ltc_buy_price_cell, currency)
}

// Fetches a crypto price and sets it's buy and sell values in the given cells.
function price(crypto, sell_cell, buy_cell, currency) {
  var sell_price = getPrice(crypto, "sell", currency);
  var buy_price = getPrice(crypto, "buy", currency);

  SHEET.getRange(sell_cell).setValue(sell_price)
  SHEET.getRange(buy_cell).setValue(buy_price)
}

