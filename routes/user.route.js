const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);

router.get('/remove', controller.remove);
router.post('/remove', controller.postRemove);

module.exports = router
