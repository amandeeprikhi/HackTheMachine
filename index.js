/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

// Skill ID
const APP_ID = 'amzn1.ask.skill.e847c4ff-78a0-425c-8c24-79e0e803d587';

// Just a string constant
const ask_message = "What would you like to do?";

var testing;

// Defining all the handlers here
const handlers = {
    'LaunchRequest': function () {
      // attributes that act as session storage
        this.attributes.store = {
            'strings':{
              'welcomeOption': 'Check deal of the day. Or should I tell you about the products that we offer?',
            },
            'dealOfDay':{
              'speakOuput': 'Okay. Today\'s deal is $25 off on S Buds wireless bluetooth earbuds. Do you want to Buy it?',
              'dealProductName': 'SoftWidget S Buds Wireless Bluetooth Earbuds',
              'dealProductDesc': 'SoftWidget S Buds Wireless Bluetooth Earbuds + Charging Case Black, IP55 SweatResistance, Bluetooth 5.0 Connection  and 3 EQ Sound Settings.'
            },
            'products':{
                'Product1':{
                    'name': 'SoftWidget Ultra Charge Bluetooth Speaker',
                    'desc': 'SoftWidget Ultra Charge Bluetooth Speaker comes with Loud Stereo Sound, Rich Bass, 24-HourPlaytime, 66 ft Bluetooth Range, Built-in Mic. Perfect Portable WirelessSpeaker for iPhone, Samsung and More'
                },
                'Product2':{
                    'name': 'SoftWidget S Buds Wireless Bluetooth Earbuds',
                    'desc': 'SoftWidget S Buds Wireless Bluetooth Earbuds + Charging Case Black, IP55 SweatResistance, Bluetooth 5.0 Connection  and 3 EQ Sound Settings'
                },
                'Product3':{
                    'name': 'SoftWidget Wake-Up Light with Alarm Clock',
                    'desc': 'This product doesn\'t have a description.'
                }
            },
            'buyflow':0,
            'dealbuy':0
        };
        this.attributes.cart={
          
        };
        // .listen() makes for a continous dialogue
        let i = '';
        let attrLentgh = Object.keys(this.attributes.store.products).length;
        let testingLoop = this.attributes.store.products;
        for(let key in testingLoop){
          if(testingLoop.hasOwnProperty(key)){
            i = i + " " + testingLoop[key].name;
          }
        }
        let welcomeOption = this.attributes.store.strings.welcomeOption;
        this.response.speak("Welcome to Soft Widget Alpha store. What would you like to do? " + welcomeOption).listen(ask_message);
        this.emit(':responseReady');
    },
    'DealIntent': function(){
        let speakOuput = this.attributes.store.dealOfDay.speakOuput;
        this.response.speak(speakOuput).listen("Testing");
        this.attributes.store.dealbuy++;
        this.emit(':responseReady');
    },
    'ProductIntent': function(){
      // Below is how we use the attributes
        this.response.speak("All of the available products are: " + this.attributes.store.products.Product1.name +". The "+ this.attributes.store.products.Product1.desc).listen("Testing");
        this.emit(':responseReady');
    },
    'CartIntent': function(){
      // Below is how we use the attributes
        this.response.speak("You are in Cart Intent").listen("Testing");
        this.emit(':responseReady');
    },
    'BuyIntent': function(){
        testing = this.event.request.intent.slots.buySlot.value;
        this.attributes.store.buyflow = 1;
        this.response.speak("Do you want to buy " + testing + "?").listen("Testing");
        this.emit(':responseReady');
    },
    'ConfirmIntent': function(){
        let dealbuy = this.attributes.store.dealbuy;
        let test = this.attributes.store.buyflow;
        let input = this.event.request.intent.slots.confirmSlot.value;
        if(dealbuy == 1 && test == 0){
          if(input == 'yes'){
            this.response.speak("Alright, should I place an order for " + this.attributes.store.dealOfDay.dealProductName).listen("Testing");
            this.attributes.store.dealbuy++;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        if(dealbuy == 2){
          if(input == 'yes'){
            this.response.speak("Alright, should I finalize your order for " + this.attributes.store.dealOfDay.dealProductName + ", with a total cost of $10?").listen("Testing");
            this.attributes.store.dealbuy++;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        if(dealbuy == 3){
          if(input == 'yes'){
            this.response.speak("Alright, an order has been placed for " + this.attributes.store.dealOfDay.dealProductName).listen("Testing");
            this.attributes.store.dealbuy = 0;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        if(test == 1 && dealbuy == 0){
          if(input == 'yes'){
            this.response.speak("Alright, how many would you like to buy?").listen("Testing");
            this.attributes.store.buyflow++;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        if(test == 2){
          if(input == 'yes'){
            this.response.speak("Alright, that would be 2 "+ testing +". Would you like to place the order or do you want to explore more?").listen("Testing");
            this.attributes.store.buyflow++;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        if(test == 3){
          if(input == 'yes'){
            this.response.speak("Order has been placed for 2 "+ testing +". We'll deliver it soon.").listen("Testing");
            this.attributes.store.buyflow++;
          }
          if(input == 'no'){
            this.response.speak("Alright, what else would you like to buy?").listen("Testing");
          }
        }
        this.emit(':responseReady');
    },
    'QuantityIntent': function(){
        let input = this.event.request.intent.slots.quantitySlot.value;
        this.response.speak("Do you want to buy " + input + " " + testing + "?").listen("Testing");
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // Add Table Here:
	// alexa.dynamoDBTableName = 'CodecademyFlashcards';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
