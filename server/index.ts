import WebSocket = require("ws");
const webs = require('ws');
const mqtt = require('mqtt');
//WebSocket
const wss:WebSocket = new webs.Server({ port: 7071 });
wss.on('connection', onConnect);

//MQTT's client initialization
const client = mqtt.connect('mqtt://test.mosquitto.org');
const topic:string = 'topic/powerPercents';
let currentPercent:string = '50';

client.on('connect', () => {
    if (client.connected === true) {
        console.log('Connection established successfully')
        client.publish(topic, currentPercent);
    }
    client.subscribe(topic);
});
//error handling
client.on('error',(error) => {
    console.error(error);
    process.exit(1);
});

//Connect function wsClient
function onConnect(wsClient) {
    wsClient.send(currentPercent);
    wsClient.on('message', function(messageAsString) {
        currentPercent = JSON.parse(messageAsString).toString();
        client.publish('topic/powerPercents', currentPercent)
    })
    client.on('message', (topic, percent) => {
        wsClient.send(JSON.parse(percent));
    });
}