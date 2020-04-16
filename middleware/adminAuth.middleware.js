const userData = require('../model/admin.model');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/admin/login');
        return;
    };
    
    const user = await userData.find({id: req.signedCookies.userID});
    
    if(!user[0]) {
        res.redirect('admin/login');
        return;
    };

    next();
}