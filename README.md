# Google Sheets -> Coinbase Price Lookup

This adds three functions to your Google Sheet - `=getPrice()`, `=getValue()`, and `=getPrices()`. 
   
- **getPrice** takes a cryptocurrency name or cell containing a crytocurrency and returns it's current price.
- **getValue** takes a cryptocurrency name, a quantity of that currency, and (optional) national currency and type ("buy"/"sell") and returns the value of that cryptocurrency.
- **getPrices** returns a grid containing the current buy and sell prices for 4 cryptocurrencies (Bitcoin, Bitcoin Cash, Ethereum, Litecoin). 


## How to install
1. Open a Google Sheet, and on the menu bar select **Tools** and then **Script Editor**.
2. A new script editor window opens. In this window, copy/paste the contents of `cryptos.gs`. 
3. Call `=getPrice()`, `=getValue()`, and `=getPrices()` in your sheet! See examples below.

## Examples
_Insert images and write-up here_



