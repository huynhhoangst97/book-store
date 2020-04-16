const userData = require('../model/user.model');
const bcrypt = require('bcrypt');

module.exports.index = async (req, res) => {
    const items = await userData.find()
    res.render('./user/index', {
        users: items
    });
};

module.exports.create = (req, res) => {
    res.render('user/create');
};

module.exports.postCreate = async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const numberPhone = parseInt(req.body.phoneNumber);
    const email = req.body.email;
    const password = req.body.password;
    let userPass = '';

    let errors = [];

    const stringExistUser = await userData.find({email: email})

    if(stringExistUser != '') {
        res.render('user/create', {
            errors: ['email is exist']
        });
        return;
    }
    
    if (/\d/.test(name)) {
        errors.push('The name has no number');
    }

    if(isNaN(numberPhone)) {
        errors.push('Number phone is wrong');
    };

    if(errors.toString() != '') {
        res.render('user/create', {
            errors: errors
        });
        return;
    } else {
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(password, salt, async (err, passHash) =>{
                if (err) throw err;
                await userData.create({
                    email: email,
                    age: age,
                    numberPhone: req.body.numberPhone,
                    password: passHash,
                    name: name
                });
            });
        });
        
        console.log('Create user successfully');
        res.redirect('/user');
    }
}

module.exports.remove = async (req, res) => {
    res.render('user/remove');
};

module.exports.postRemove = async (req, res) => {
    const email = req.body.email
    const pass = req.body.password;

    const user = await userData.find({email: email});
    
    if (user == '') {
        res.render('user/remove',{
            values: req.body,
            errors: ['The user is not exist']
        });
        return;
    }

    if(user[0]['password'] != pass) {
        res.render('user/remove',{
            values: req.body.password,
            errors: ['Password is wrong!!!']
        });
        return;
    }

    await userData.deleteOne({email: req.body.email});
    console.log('Delete complete');
    res.redirect('/user');
}
