/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

// Skill ID
const APP_ID = 'amzn1.ask.skill.dff0f2da-547a-49d2-b1b9-946ead0bcea8';

// Just a string constant
const ask_message = "What would you like to do?";

var buyItem;
var buyItemValue;
var checkoutFlow = 0;

// Defining all the handlers here
const handlers = {
    'LaunchRequest': function () {
        if (this.attributes.cart.items != ".") {
            this.emit('CheckoutIntent');
        }
        else {
            let welcomeOption = this.attributes.store.strings.welcomeOption;
            this.response.speak("Welcome to Soft Widget Alpha store. " + welcomeOption).listen(ask_message);
        }
        this.emit(':responseReady');
    },
    'DealIntent': function () {
        let speakOuput = this.attributes.store.dealOfDay.speakOuput;
        this.response.speak(speakOuput).listen("Would you like to continue?");
        this.attributes.store.dealbuy++;
        buyItem = this.attributes.store.products.Product2.name;
        buyItemValue = this.attributes.store.products.Product2.price;
        this.emit(':responseReady');
    },
    'SpeakerIntent': function () {
        this.attributes.store.buyflow = 1;
        this.response.speak(this.attributes.store.products.Product1.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product1.name);
        buyItem = this.attributes.store.products.Product1.name;
        buyItemValue = this.attributes.store.products.Product1.price;
        this.emit(':responseReady');
    },
    'EarbudsIntent': function () {
        this.attributes.store.buyflow = 1;
        this.response.speak(this.attributes.store.products.Product2.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product2.name);
        buyItem = this.attributes.store.products.Product2.name;
        buyItemValue = this.attributes.store.products.Product2.price;
        this.emit(':responseReady');
    },
    'AlarmClockIntent': function () {
        this.attributes.store.buyflow = 1;
        this.response.speak(this.attributes.store.products.Product3.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product3.name);
        buyItem = this.attributes.store.products.Product3.name;
        buyItemValue = this.attributes.store.products.Product3.price;
        this.emit(':responseReady');
    },
    'ProductIntent': function () {
        // Below is how we use the attributes
        let productString = '';
        for (let key in this.attributes.store.products) {
            if (this.attributes.store.products.hasOwnProperty(key)) {
                productString += " " + this.attributes.store.products[key].number + ":" + " " + this.attributes.store.products[key].name;
            }
        }
        this.response.speak("Available products are: " + productString + ". Which item are you interested in?").listen("Please let me know your choice.");
        this.emit(':responseReady');
    },
    'BuyIntent': function () {
        buyItem = this.event.request.intent.slots.buySlot.value;
        if (buyItem == 'speaker') {
            this.attributes.store.buyflow = 1;
            this.response.speak(this.attributes.store.products.Product1.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product1.name);
            buyItem = this.attributes.store.products.Product1.name;
            buyItemValue = this.attributes.store.products.Product1.price;
            this.emit(':responseReady');
        }
        else if (buyItem == 'earbuds') {
            this.attributes.store.buyflow = 1;
            this.response.speak(this.attributes.store.products.Product2.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product2.name);
            buyItem = this.attributes.store.products.Product2.name;
            buyItemValue = this.attributes.store.products.Product2.price;
            this.emit(':responseReady');
        }
        else if (buyItem == 'clock') {
            this.attributes.store.buyflow = 1;
            this.response.speak(this.attributes.store.products.Product3.desc + ". Do you want to buy it?").listen("Can you please confirm that you want to buy " + this.attributes.store.products.Product3.name);
            buyItem = this.attributes.store.products.Product3.name;
            buyItemValue = this.attributes.store.products.Product3.price;
            this.emit(':responseReady');
        }
        else {
            this.response.speak("I'm afraid we don't sell those. You can take a look at our product's catalogue to find what you're looking for.").listen("Should I show you all the products that we offer?");
            this.emit(':responseReady');
        }
    },
    'ConfirmIntent': function () {
        let dealbuy = this.attributes.store.dealbuy;
        let buyFlowStep = this.attributes.store.buyflow;
        let input = this.event.request.intent.slots.confirmSlot.value;
        if (dealbuy == 1 && buyFlowStep == 0 && checkoutFlow == 0) {
            if (input == 'yes') {
                this.response.speak("Alright, should I place " + this.attributes.store.dealOfDay.dealProductName + " in your cart.").listen("Please confirm.");
                this.attributes.store.dealbuy = 0;
                this.attributes.store.buyflow = 1;
            }
            if (input == 'no') {
                this.response.speak("Alright, what else would you like to buy?").listen("Please confirm.");
            }
        }
        if (buyFlowStep == 1 && dealbuy == 0 && checkoutFlow == 0) {
            if (input == 'yes') {
                this.response.speak("Alright, " + buyItem + " has been added to your cart. Do you want to buy something else or you want to checkout?").listen("Please let me know your choice.");
                this.attributes.cart.items += ". " + buyItem;
                this.attributes.cart.value += buyItemValue;
                this.attributes.store.buyflow = 0;
            }
            if (input == 'no') {
                this.response.speak("Alright, what else would you like to buy?").listen("Would you like to browse our product's catalogue?");
            }
        }


        if (this.attributes.store.checkoutFlow == 1 && dealbuy == 0 && buyFlowStep == 0) {
            if (input == 'yes') {
                this.response.speak("Order complete, we'll send a confirmation by e-mail").listen("Anything else I can help you with?");
                checkoutFlow = 0;
                this.attributes.cart.items = ".";
                this.attributes.cart.value = 0;
                // this.emit(':saveState', true);
            }
            if (input == 'no') {
                this.response.speak("Alright, what else would you like to buy?").listen("Would you like to browse our product's catalogue?");
                checkoutFlow = 0;
            }
        }
        this.emit(':responseReady');
    },
    'CheckoutIntent': function () {
        this.response.speak("Your cart contains " + this.attributes.cart.items + ". The order total is $" + this.attributes.cart.value + ". Would you like to place the order?").listen("Please confirm your order?");
        this.attributes.store.checkoutFlow = 1;
        this.attributes.store.buyflow = 0;
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        this.response.speak("Thank you for shopping at Soft Widget Alpha Store.");
        this.emit(':saveState', true);
    },
    'ClearIntent': function () {
        this.response.speak("Your cart has been cleared. What would you like to do next?").listen("Please let me know what would you want to do?");
        this.attributes.cart.items = ".";
        this.attributes.cart.value = 0;
        this.attributes.store.buyflow = 0;
        this.attributes.store.checkoutFlow = 0;
        this.attributes.store.dealbuy = 0;
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':saveState', true);
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // Add Table Here:
    alexa.dynamoDBTableName = 'AlphaStore';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
