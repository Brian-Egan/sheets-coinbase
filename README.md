# Google Sheets -> Coinbase Price Lookup

##### V2 Functions
If included, the "sheet_functions.gs" file will add a menu to your spreadsheet, which when clicked will add a timer that allows your prices to auto-update every minute. After the initial setup, add "auto_update" as the final argument to all the functions listed below. They will update like magic!

e.g. `=getPrice("Ripple", auto_update)` or `=getPrices(auto_update)`

Also, added support for Ripple!

##### V1

This adds three functions to your Google Sheet - `=getPrice()`, `=getValue()`, and `=getPrices()`. 
   
- **getPrice** takes a cryptocurrency name or cell containing a crytocurrency and returns it's current price.
   
- **getValue** takes a cryptocurrency name, a quantity of that currency, and (optional) national currency and type ("buy"/"sell") and returns the value of that cryptocurrency.
   
- **getPrices** returns a grid containing the current buy and sell prices for 4 cryptocurrencies (Bitcoin, Bitcoin Cash, Ethereum, Litecoin). 

All prices update automatically with your spreadsheet (default is ~1 minute).

## How to install
1. Open a Google Sheet, and on the menu bar select **Tools** and then **Script Editor**.
2. A new script editor window opens. In this window, copy/paste the contents of `cryptos.gs`. 
3. Call `=getPrice()`, `=getValue()`, and `=getPrices()` in your sheet! See examples below.

## Usage and Examples

### getPrice()
`=getPrice(cryptocurrency, type, currency)`
- `cryptocurrency` can be either a cell reference containing the name, the name, or it's symbol abbreviation. (i.e. "ETH" for "Ethereum")
- `type` is "buy", "sell", or "spot"
- `currency` is a physical currency to convert. (i.e. "USD" for US. Dollars, "GPB" for British Pounds, etc..)

![Example](https://media.giphy.com/media/3ohc11hACQzdznSDKw/giphy.gif)


### getValue()
`=getValue(cryptocurrency, amount, currency, type)`
- `cryptocurrency` can be either a cell reference containing the name, the name, or it's symbol abbreviation. (i.e. "ETH" for "Ethereum")
- `amount` is the quantity of that crypt you want to convert.
- `type` is "buy", "sell", or "spot"
- `currency` is a physical currency to convert. (i.e. "USD" for US. Dollars, "GPB" for British Pounds, etc..)

![Example](https://media.giphy.com/media/xULW8lDLCoYeUhPaZq/giphy.gif)


### getPrices()
`=getPrices()`
Returns a grid with current prices for 4 cryptocurrencies.

![Example](https://media.giphy.com/media/l49JNr1bqtEZ0qcYU/giphy.gif)



Questions? Comments? Ask me!
