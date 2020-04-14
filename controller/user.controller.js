const userData = require('../model/user.model');


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
        await userData.create(req.body);
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
