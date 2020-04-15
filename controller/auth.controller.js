const userData = require('../model/user.model');

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

    if(user[0]['password'] !== password){
        res.render('auth/login',{
            errors:[
                'Wrong password.'
            ]
        });
        return;
    }

    res.cookie('userId', user[0]['id'],{
        signed: true
    });
    res.redirect('/user')
}