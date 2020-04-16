const userData = require('../model/user.model');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login')
};

module.exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userData.find({email: email});
    if(!user[0]) {
        res.render('auth/login',{
            errors:[
                'User does not exist'
            ]
        });
        return;
    }

    const match = await bcrypt.compare(password, user[0]['password'])

    if (!match) {
        res.render('auth/login', {
            errors:[
                'Wrong password.'
            ]
        });
        return;
    }

    res.cookie('userId', user[0]['id'], {
        signed: true
    });
    res.redirect('/user')
}