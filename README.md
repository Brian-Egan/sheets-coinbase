# Google Sheets -> Coinbase Price Lookup

This adds three functions to your Google Sheet - `=getPrice()`, `=getValue()`, and `=getPrices()`. 
   
- **getPrice** takes a cryptocurrency name or cell containing a crytocurrency and returns it's current price.
- **getValue** takes a cryptocurrency name, a quantity of that currency, and (optional) national currency and type ("buy"/"sell") and returns the value of that cryptocurrency.
- **getPrices** returns a grid containing the current buy and sell prices for 4 cryptocurrencies (Bitcoin, Bitcoin Cash, Ethereum, Litecoin). 

All prices update automatically with your spreadsheet (default is ~1 minute).

## How to install
1. Open a Google Sheet, and on the menu bar select **Tools** and then **Script Editor**.
2. A new script editor window opens. In this window, copy/paste the contents of `cryptos.gs`. 
3. Call `=getPrice()`, `=getValue()`, and `=getPrices()` in your sheet! See examples below.

## Examples

### getPrice()
_Cryptocurrency name can be either a cell reference containing the name, the name, or it's symbol abbreviation._
![Example](https://media.giphy.com/media/3ohc11hACQzdznSDKw/giphy.gif)

### getValue()
Cryptocurrency name can be either a cell reference containing the name, the name, or it's symbol abbreviation.
![Example](https://media.giphy.com/media/xULW8lDLCoYeUhPaZq/giphy.gif)


### getPrices()
Returns a grid with current prices for 4 cryptocurrencies.
![Example](https://media.giphy.com/media/l49JNr1bqtEZ0qcYU/giphy.gif)

Questions? Comments? Ask me!
