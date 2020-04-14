const userData = require('../model/user.model');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.userId) {
        res.redirect('auth/login');
        return;
    };
    
    const user = await userData.find({id: req.cookies.userID});
    
    if(!user[0]) {
        res.redirect('auth/login');
        return;
    };

    next();
}