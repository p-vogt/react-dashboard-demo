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
    broadcasts: ['update', 'new-data', 'led1-changed', 'led2-changed']
});

userResponder.on('*', console.log);

userResponder.on('create', function(req, cb) {
    models.User.create({}, cb);

    updateUsers();
});

userResponder.on('list', function(req, cb) {
    var query = req.query || {};
    models.User.find(query, cb);
});

userResponder.on('get', function(req, cb) {
    models.User.get(req.id, cb);
});

function updateUsers() {
    models.User.find(function(err, users) {
        userPublisher.publish('update', users);
    });
}

///////////////////////////////////////////////////////////////////
let lastValTemp1 = 25;
let lastValTemp2 = 20;
let led1Status = true;
let led2Status = true;

function newData() {
    lastValTemp1 = lastValTemp1 + Math.round(Math.random() * 2) - 1;
    lastValTemp2 = lastValTemp2 + Math.round(Math.random() * 2) - 1;
    if(lastValTemp1 % 5 === 0) {
        led1Status = !led1Status;
        sendLed1Status();
    }
    if(lastValTemp2 % 5 === 0) {
        led2Status = !led2Status;
        sendLed2Status();
    }
    userPublisher.publish('new-data', {name: "Temperature", temp1: lastValTemp1, temp2: lastValTemp2});
}

setInterval(newData, 300);



function sendLed1Status() {
    userPublisher.publish('led1-changed', {name: "LED status", status: led1Status});
}
function sendLed2Status() {
    userPublisher.publish('led2-changed', {name: "LED status", status: led2Status});
}

setInterval(newData, 300);