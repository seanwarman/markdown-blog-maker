# Mediator
Have objects vary independiently from one another by using a common object to proxy through.

## Code

```js
const StockOffer = {
  stockShares: 0,
  stockSymbol: '',
  collegueCode: 0,
  init: function(numOfShares, stock, collCode) {
    this.stockShares = numOfShares;
    this.stock = stock;
    this.collegueCode = collCode;
  },

  getStockShares() {return this.stockShares},
  getStockSymbol() {return this.stockSymbol},
  getCollCode() {return this.collegueCode}
}

const Colleges = {
  mediator: {},
  collegueCode: 0,
  init: function(newMediator) {
    this.mediator = Object.create(newMediator);
  },
  saleOffer: function(stock, shares) {
    this.mediator.saleOffer(stock, shares, this.collegueCode);
  },
  buyOffer: function(stock, shares) {
    this.mediator.buyOffer(stock, shares, this.collegueCode);
  },
  setCollCode(collCode) {this.collegueCode = collCode}
}

const GormanSlacks = {
  init: function(newMediator) {
    this.mediator = Object.create(newMediator);
    console.log('Gorman slacks signed up for a new exchange');
  }
}
const JTPoorman = {
  init: function(newMediator) {
    this.mediator = Object.create(newMediator);
    console.log('JTPoorman signed up for a new exchange');
  }
}

const Mediator = {
  _collegues: [],
  _stockSellOffers: [],
  _stockBuyOffers: [],
  collegueCodes: 0,
  addCollegue: function(newCollegue) {
    this._collegues.push(newCollegue);
    this.collegueCodes++;
    newCollegue.setCollCode(this.collegueCodes);
  },
  saleOffer: function(stock, chares, collCode) {
    let stockSold = false;
    this._stockBuyOffers.forEach( item => {
      if()
    })
  },
  buyOffer: function(stock, chares, collCode) {
    
  },
}

```
