"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webs = require('ws');
var mqtt = require('mqtt');
//WebSocket
var wss = new webs.Server({ port: 7071 });
wss.on('connection', onConnect);
//MQTT's client initialization
var client = mqtt.connect('mqtt://test.mosquitto.org');
var topic = 'topic/powerPercents';
var currentPercent = '50';
client.on('connect', function () {
    if (client.connected === true) {
        console.log('Connection established successfully');
        client.publish(topic, currentPercent);
    }
    client.subscribe(topic);
});
//error handling
client.on('error', function (error) {
    console.error(error);
    process.exit(1);
});
//Connect function wsClient
function onConnect(wsClient) {
    wsClient.send(currentPercent);
    wsClient.on('message', function (messageAsString) {
        currentPercent = JSON.parse(messageAsString).toString();
        client.publish('topic/powerPercents', currentPercent);
    });
    client.on('message', function (topic, percent) {
        wsClient.send(JSON.parse(percent));
    });
}
