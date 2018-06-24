var cote = require('cote'),
    models = require('../models');

var userResponder = new cote.Responder({
    name: 'user responder',
    namespace: 'user',
    respondsTo: ['create']
});

var userPublisher = new cote.Publisher({
    name: 'user publisher',
    namespace: 'user',
    broadcasts: ['update', 'temp1-data', 'temp2-data', 'led1-changed', 'led2-changed']
});

userResponder.on('*', console.log);

userResponder.on('create', function (req, cb) {
    models.User.create({}, cb);

    updateUsers();
});

userResponder.on('list', function (req, cb) {
    var query = req.query || {};
    models.User.find(query, cb);
});

userResponder.on('get', function (req, cb) {
    models.User.get(req.id, cb);
});

function updateUsers() {
    models.User.find(function (err, users) {
        userPublisher.publish('update', users);
    });
}

///////////////////////////////////////////////////////////////////
let lastValTemp1 = 25;
let lastValTemp2 = 20;
let led1Status = true;
let led2Status = true;

// just for tests --> hysteresis
let oldTriggerTemp1 = 0; 
let oldTriggerTemp2 = 0;

function newData() {
    lastValTemp1 = lastValTemp1 + Math.round(Math.random() * 2) - 1;
    lastValTemp2 = lastValTemp2 + Math.round(Math.random() * 2) - 1;
    if (lastValTemp1 % 10 === 0 && lastValTemp1 !== oldTriggerTemp1) {
        oldTriggerTemp1 = lastValTemp1;
        led1Status = !led1Status;
        sendLed1Status();
    }
    if (lastValTemp2 % 10 === 0 && lastValTemp2 !== oldTriggerTemp2) {
        oldTriggerTemp2 = lastValTemp2;
        led2Status = !led2Status;
        sendLed2Status();
    }
    userPublisher.publish('temp1-data', { name: "Temperature", value: lastValTemp1, timestamp: new Date() });
    userPublisher.publish('temp2-data', { name: "Temperature", value: lastValTemp2, timestamp: new Date() });
}

setInterval(newData, 300);



function sendLed1Status() {
    userPublisher.publish('led1-changed', { name: "Light status changed", value: led1Status, timestamp: new Date() });
}
function sendLed2Status() {
    userPublisher.publish('led2-changed', { name: "Light status changed", value: led2Status, timestamp: new Date() });
}

setInterval(newData, 300);