const express = require('express');
const router = express.Router();
const controller = require('../controller/admin.controller');
const adminAuthMiddleware = require('../middleware/adminAuth.middleware');

router.get('/', adminAuthMiddleware.requireAuth, controller.index);

router.get('/create', adminAuthMiddleware.requireAuth, controller.create);
router.post('/create', adminAuthMiddleware.requireAuth, controller.postCreate);

router.get('/remove', adminAuthMiddleware.requireAuth, controller.remove);
router.post('/remove', adminAuthMiddleware.requireAuth, controller.postRemove);

router.get('/login', controller.login)
router.post('/login', controller.postLogin)

module.exports = router
