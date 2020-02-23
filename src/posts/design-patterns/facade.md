# Facade

How to implement logic that is obscured from the user's interface, or
behind the scenes.

Facade is an object that integrates many interfaces in order to make
their combined use simpler.

Say we had a bank account system with many different objects handling
the functionality of a user's account. There might be an object to
check the user's security code, another one to check their account
number, another to check their funds etc.

We can create a **Facade** to pull in all these complex objects into
one simple interface by having parameters for each one then accessing
them from within.

```js
const BankAccountFacade = {
  _accountNumber: 0,
  _securityCode: 0,
  _acctChecker: null,
  _codeChecker: null,
  _fundChecker: null,

  init(accountNum, securityCode) {
    console.log('Welcome to ABC Bank');
    this._accountNumber = accountNum;
    this._securityCode = securityCode;

    this._acctChecker = Object.create(AccountNumberCheck);
    this._codeChecker = Object.create(SecurityCodeCheck);
    this._fundChecker = Object.create(FundsCheck);
  },
  // ...
}
```

Once we initialise the *BankAccountFacade* we can make more generalised
methods for the detailed functionality that the external objects 
provide.

```js
// ...
const BankAccountFacade = {
  withdrawCash(cashToGet) {
    if(
      this._acctChecker.accountActive(this.getAccountNumber()) &&
      this._codeChecker.accountActive(this.getSecurityCode()) &&
      this._fundChecker.haveEnoughMoney(cashToGet)
    ) {
      this._fundChecker.withdrawCash(cashToGet);
      console.log('Transaction Complete! \n');
    } else {
      console.log('Transaction Failed\n');
    }
  },
  // ...
}
```

## Code

```js
const AccountNumberCheck = {
  _accountNumber: 12345678,
  getAccountNumber() {
    return this._accountNumber;
  },
  accountActive(accountNumToCheck) {
    if(accountNumToCheck === this.getAccountNumber()) {
      return true;
    } else {
      return false;
    }
  }
}

const SecurityCodeCheck = {
  _securityCode: 1234,
  getSecurityCode() {
    return this._securityCode;
  },
  accountActive(securityNumToCheck) {
    if(securityNumToCheck === this.getSecurityCode()) {
      return true;
    } else {
      return false;
    }
  }
}

const FundsCheck = {
  _cashInAccount: 1000.00,
  getCashInAccount() {
    return this._cashInAccount;
  },
  decreaseCashInAccount(cashWithdrawn) {
    this._cashInAccount -= cashWithdrawn;
  },
  increaseCashInAccount(cashDeposited) {
    this._cashInAccount += cashDeposited;
  },
  haveEnoughMoney(cashToWithdraw) {
    if(cashToWithdraw > this.getCashInAccount()) {
      console.log('Error: You don\'t have enough money');
      console.log('Current balance: ' + this.getCashInAccount());
      return false;
    } else {
      return true;
    }
  },
  withdrawCash(cash) {
    this.decreaseCashInAccount(cash);
    console.log('Withdrawal Complete: Current balance is: ' + this.getCashInAccount());
  },
  makeDeposit(cash) {
    this.increaseCashInAccount(cash);
    console.log('Cash deposited!');
    console.log('Current balance is ' + this.getCashInAccount());
  }
}

const BankAccountFacade = {
  _accountNumber: 0,
  _securityCode: 0,
  _acctChecker: null,
  _codeChecker: null,
  _fundChecker: null,

  init(accountNum, securityCode) {
    console.log('Welcome to ABC Bank');
    this._accountNumber = accountNum;
    this._securityCode = securityCode;

    this._acctChecker = Object.create(AccountNumberCheck);
    this._codeChecker = Object.create(SecurityCodeCheck);
    this._fundChecker = Object.create(FundsCheck);
  },
  getAccountNumber() {
    return this._accountNumber;
  },
  getSecurityCode() {
    return this._securityCode;
  },
  withdrawCash(cashToGet) {
    if(
      this._acctChecker.accountActive(this.getAccountNumber()) &&
      this._codeChecker.accountActive(this.getSecurityCode()) &&
      this._fundChecker.haveEnoughMoney(cashToGet)
    ) {
      this._fundChecker.withdrawCash(cashToGet);
      console.log('Transaction Complete! \n');
    } else {
      console.log('Transaction Failed\n');
    }
  },
  depositCash(cash) {
    if(
      this._acctChecker.accountActive(this.getAccountNumber()) &&
      this._codeChecker.accountActive(this.getSecurityCode())
    ) {
      this._fundChecker.makeDeposit(cash);
      console.log('Transaction Complete!')
    } else {
      console.log('Incorrect details.');
    }
  }
}

// The BankAccountFacade can have many complicated functions while
// offering just two simple methods to the user.

let accessingBank = Object.create(BankAccountFacade);
accessingBank.init(12345678, 1234);
accessingBank.withdrawCash(500.00);
accessingBank.withdrawCash(900.00);
accessingBank.depositCash(200.00);
```
