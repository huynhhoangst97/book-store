const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/create', authMiddleware.requireAuth, controller.create);
router.post('/create', authMiddleware.requireAuth, controller.postCreate);

router.get('/remove', authMiddleware.requireAuth, controller.remove);
router.post('/remove', authMiddleware.requireAuth, controller.postRemove);

module.exports = router
