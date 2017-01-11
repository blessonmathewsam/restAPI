/**
 * Created by blessonm on 1/10/2017.
 */
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./app/config/config');
let UserController = require('./app/user/user.controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Post a user
app.post('/user', UserController.postUser);

// Get all users
app.get('/user', UserController.getUsers);

// Get a user
app.get('/user/:id', UserController.getUser);

// Delete a uesr
app.delete('/user/:id', UserController.deleteUser);

// Update a user
app.put('/user/:id', UserController.updateUser);

app.listen(config.port, (err) => {
    if(err) throw err;
    console.log('Listening on port ' + config.port );
});

module.exports = app;