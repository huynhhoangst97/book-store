const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    numberPhone: String,
    password: String
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;