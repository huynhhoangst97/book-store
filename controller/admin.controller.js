const adminData = require('../model/admin.model');
const userData = require('../model/user.model');
const bcrypt = require('bcrypt');

/*******************************
        require Login
 ******************************/

module.exports.login = (req, res) => {
    res.render('admin/login')
};

module.exports.postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const admin = await adminData.find({username: username});
    
    if(!admin[0]) {
        res.render('admin/login',{
            errors:[
                'Admin does not exist'
            ]
        });
        return;
    }

    const match = await bcrypt.compare(password, admin[0]['password']);

    if (!match) {
        res.render('admin/login', {
            errors:[
                'Wrong password.'
            ]
        });
        return;
    }

    res.cookie('userId', admin[0]['id'],{
        signed: true
    });

    res.redirect('/admin')
}

/*******************************
        Dashboard
 ******************************/

module.exports.index = async (req, res) => {
    const items = await userData.find()
    res.render('./admin/index', {
        users: items
    });
};

/*******************************
        Create User
 ******************************/

module.exports.create = (req, res) => {
    res.render('admin/create');
};

module.exports.postCreate = async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const numberPhone = parseInt(req.body.numberPhone);
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];

    const stringExistUser = await userData.find({email: email})

    if(stringExistUser != '') {
        res.render('admin/create', {
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
        res.render('admin/create', {
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
        res.redirect('/admin');
    }
}

/*******************************
        Remove User
 ******************************/

module.exports.remove = async (req, res) => {
    res.render('admin/remove');
};

module.exports.postRemove = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const admin = await adminData.find({username: username});
    const user = await userData.find({email: email});
    
    if (user == '') {
        res.render('admin/remove',{
            values: req.body,
            errors: ['The user is not exist']
        });
        return;
    }

    if (admin == '') {
        res.render('admin/remove',{
            values: req.body,
            errors: ['The admin is not exist']
        });
        return;
    }
    
    const match = await bcrypt.compare(password, admin[0]['password']);

    if (!match) {
        res.render('admin/remove',{
            values: req.body.password,
            errors: ['Password is wrong!!!']
        });
        return;
    }

    await userData.deleteOne({email: req.body.email});
    console.log('Delete complete');
    res.redirect('/admin');
}