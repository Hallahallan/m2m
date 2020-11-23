const User = require('../models/boat');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://mqtt.eclipse.org');

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var boatState = ''
var connected = false

client.on('connect', () => {
    client.subscribe('boatMcBoatFace/coordinates')
    client.subscribe('boatMcBoatFace/state')
})

client.on('message', (topic, message) => {
    switch (topic) {
        case 'garage/coordinates':
            return handleBoatCoordinates(message)
        case 'garage/state':
            return handleBoatState(message)
    }
    console.log('No handler for topic %s', topic)
})

function handleBoatCoordinates (message) {
    console.log('boat connected status %s', message)
    connected = (message.toString() === 'true')
}

function handleBoatState (message) {
    boatState = message
    console.log('boat state update to %s', message)
}

function openBoatDoor () {
    // can only open door if we're connected to mqtt and door isn't already open
    if (connected && boatState !== 'open') {
        // Ask the door to open
        client.publish('boat/open', 'true')
    }
}

function closeBoatDoor () {
    // can only close door if we're connected to mqtt and door isn't already closed
    if (connected && boat !== 'closed') {
        // Ask the door to close
        client.publish('boat/close', 'true')
    }
}

