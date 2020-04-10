const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    phoneNumber: String
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;