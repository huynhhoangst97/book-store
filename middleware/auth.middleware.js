const userData = require('../model/user.model');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    };
    
    const user = await userData.find({id: req.signedCookies.userID});
    
    if(!user[0]) {
        res.redirect('auth/login');
        return;
    };

    next();
}