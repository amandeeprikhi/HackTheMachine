/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

// Skill ID
const APP_ID = 'amzn1.ask.skill.ed1ef414-a4fd-401f-88fe-2114ad553295';

// Just a string constant
const ask_message = "What would you like to do?";

var testing;

// Defining all the handlers here
const handlers = {
    'LaunchRequest': function () {
      // attributes that act as session storage
        this.attributes.store = {
            'products':{
                'P1':{
                    'name': 'SoftWidget Ultra Charge Bluetooth Speaker',
                    'desc': 'SoftWidgetUltra Charge Bluetooth Speaker comes with Loud Stereo Sound, Rich Bass, 24-HourPlaytime, 66 ft Bluetooth Range, Built-in Mic. Perfect Portable WirelessSpeaker for iPhone, Samsung and More'
                },
                'P2':{
                    'name': 'SoftWidget SBuds Wireless Bluetooth Earbuds',
                    'desc': 'SoftWidgetSBuds Wireless Bluetooth Earbuds + Charging Case Black, IP55 SweatResistance, Bluetooth 5.0 Connection  and 3 EQ Sound Settings'
                },
                'P3':{
                    'name': 'SoftWidget Wake-Up Light with Alarm Clock',
                    'desc': 'This product doesn\'t have a description.'
                }
            }
        };
        // .listen() makes for a continous dialogue
        this.response.speak("Welcome to Widget Soft online store. What would you like to do?").listen(ask_message);
        this.emit(':responseReady');
    },
    'DealIntent': function(){
      // This line enables the usage of slots.
        testing = this.event.request.intent.slots.testSlot.value;
        this.response.speak("you want" + testing).listen("Testing");
        this.emit(':responseReady');
    },
    'ProductIntent': function(){
      // Below is how we use the attributes
        this.response.speak("All of the available products are: " + this.attributes.store.products.P1.name +". The "+ this.attributes.store.products.P1.desc).listen("Testing");
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
