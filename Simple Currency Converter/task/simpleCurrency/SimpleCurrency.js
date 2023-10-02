const Currency = require("./enums/Currency")
const Modes = require("./enums/Modes")
const input = require("sync-input");

class SimpleCurrency {
        toCurrency;
        fromCurrency;
        amount;
        mode;
    start() {
        console.log("Welcome to Currency Converter!");
        console.log("1 USD equals 1 USD");
        console.log("1 USD equals 113.5 JPY");
        console.log("1 USD equals 0.89 EUR");
        console.log("1 USD equals 74.36 RUB");
        console.log("1 USD equals 0.75 GBP");
        while (true) {
            console.log("What do you want to do?")
            console.log("1-Convert currencies 2-Exit program")
            const mode = input();

            if (mode === Modes["1"]) {
                this.convertFromInput();
            } else if (mode === Modes["2"]) {
                console.log("Have a nice day!")
                process.exit();
            }
            console.log("Unknown input")
        }
    }

    convertFromInput() {
        console.log("What do you want to convert?");
        let inputCurrency = input("From: ");
        while (!this.validateCurrency(inputCurrency)) {
            inputCurrency = input("From: ");
        }
        this.fromCurrency = inputCurrency.toLowerCase();

        let inputCurrency2 = input("To: ");
        while (!this.validateCurrency(inputCurrency2)) {
            inputCurrency2 = input("From: ");
        }
        this.toCurrency = inputCurrency2.toLowerCase();

        let inputAmount = input("Amount: ");
        while(!this.validateAmount(inputAmount)) {
            inputAmount = input("Amount: ");
        }
        this.amount = Number(inputAmount);

        const result = this.convert();
        console.log(`Result: ${this.amount} ${this.fromCurrency.toUpperCase()} equals ${result} ${this.toCurrency.toUpperCase()}`);
    }


    convert() {
        const total = this.amount * Currency[this.fromCurrency.toLowerCase()].value;
        const result = total / Currency[this.toCurrency.toLowerCase()].value
        const resultInPrecision = result.toFixed(4).split(".")
        const digitPart = resultInPrecision[0];
        let decimalPart = resultInPrecision[1];
        decimalPart = decimalPart ? decimalPart.substring(0,4) : "0000";
        return digitPart + "." + decimalPart;
    }

    validateCurrency(input) {
        const currencies = Object.keys(Currency).map(key => Currency[key].name);
        if (!currencies.includes(input.toLowerCase())) {
            console.log("Unknown currency");
            return false;
        }
        return true;
    }

    validateAmount(input) {
        const result = Number(input);
        if (isNaN(input)) {
            console.log("The amount has to be a number");
            return false;
        }
        if (Number(input) < 1) {
            console.log("The amount cannot be less than 1");
            return false
        }
        return true
    }
}

module.exports = SimpleCurrency;