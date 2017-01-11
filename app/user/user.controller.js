/**
 * Created by blessonm on 1/10/2017.
 */
let mongoose = require('mongoose');
let User = require('./user.model');

let userController = {

    postUser: function (req, res) {
        let user = new User(req.body);
        user.save((err, body) => {
           if(err) {
               res.send(err);
           } else {
               res.json({message: 'User added!', user});
           }
        });
    },

    getUsers: function (req, res) {
        User.find({}, (err, users) => {
            if(err) {
                res.send(err);
            } else {
                res.json(users);
            }
        });
    },

    getUser: function (req, res) {
        User.findById(req.params.id, (err, user) => {
            if(err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    },

    deleteUser: function (req, res) {
        User.remove({_id: req.params.id}, (err, result) => {
            if(err) {
                res.send(err);
            } else {
                res.json({message: 'User deleted!'});
            }
        });
    },

    updateUser: function (req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
           if(err) {
               res.send(err);
           } else {
               res.json({message: 'User updated!', user});
           }
        });
    }
}

module.exports = userController;