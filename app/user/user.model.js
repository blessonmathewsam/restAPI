/**
 * Created by blessonm on 1/10/2017.
 */
let mongoose = require('mongoose');
let config = require('./../config/config');
mongoose.connect(config.db);

let UserSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    dob: Date,
    city: String,
    interests: []
});

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
