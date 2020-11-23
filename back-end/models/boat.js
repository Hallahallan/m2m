const mongoose = require('mongoose');
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://mqtt.eclipse.org')

const Schema = mongoose.Schema;

var state = 'closed';

//Do i need this?
const BoatSchema = new Schema(
    {
        id: Schema.Types.ObjectID,
        name: {type: String, required: true, max: 100},
        status: {type: Boolean, required: true},
        coordinates: {type: String, required: true},
        state:{type: String, required: true}
    }
);

client.on('connect', () => {
    client.on('connect', () => {
        //Kan jeg sende med open og close her? eller burde jeg heller sende med strings av statusen og skifte accordingly?
        client.subscribe('boatMcBoatFace/open')
        client.subscribe('boatMcBoatFace/close')

        // Inform controllers that boat is connected
        client.publish('garage/connected', 'true')
        sendStateUpdate()
    })
})

function sendStateUpdate () {
    console.log('sending state %s', state)
    client.publish('boatMcBoatFace/subscribe', state)
}

client.on('message', (topic, message) => {
    console.log('received message %s %s', topic, message)
    switch (topic) {
        case 'boat/open':
            return handleOpenRequest(message)
        case 'boat/close':
            return handleCloseRequest(message)
    }
})

// added to controller.js
function openBoat () {
    // can only open door if we're connected to mqtt and door isn't already open
    if (connected && boatState !== 'open') {
        // Ask the door to open
        client.publish('garage/open', 'true')
    }
}

function closeBoat () {
    // can only close door if we're connected to mqtt and door isn't already closed
    if (connected && boatState !== 'closed') {
        // Ask the door to close
        client.publish('garage/close', 'true')
    }
}

//--- For Demo Purposes Only ----//

// simulate opening garage door
setTimeout(() => {
    console.log('open door')
    openBoat()
}, 5000)

// simulate closing garage door
setTimeout(() => {
    console.log('close door')
    closeBoat()
}, 20000)

function handleOpenRequest (message) {
    if (state !== 'open' && state !== 'opening') {
        console.log('opening boat door')
        state = 'opening'
        sendStateUpdate()

        // simulate door open after 5 seconds (would be listening to hardware)
        setTimeout(() => {
            state = 'open'
            sendStateUpdate()
        }, 5000)
    }
}

function handleCloseRequest (message) {
    if (state !== 'closed' && state !== 'closing') {
        state = 'closing'
        sendStateUpdate()

        // simulate door closed after 5 seconds (would be listening to hardware)
        setTimeout(() => {
            state = 'closed'
            sendStateUpdate()
        }, 5000)
    }
}

/*
 * Want to notify controller that garage is disconnected before shutting down
 */
function handleAppExit (options, err) {
    if (err) {
        console.log(err.stack)
    }

    if (options.cleanup) {
        client.publish('boat/connected', 'false')
    }

    if (options.exit) {
        process.exit()
    }
}

/*
 * Handle the different ways an application can shutdown
 */
process.on('exit', handleAppExit.bind(null, {
    cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
    exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
    exit: true
}))

//Export model
module.exports = mongoose.model('Boat', BoatSchema);