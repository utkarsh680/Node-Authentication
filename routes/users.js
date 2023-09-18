const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/user_controller');


router.get('/profile', usersControllers.profile);
router.get('/sign-up', usersControllers.signUp);
router.get('/sign-in', usersControllers.signIn);

router.post('/create', usersControllers.create);

router.post('/create-session', usersControllers.createSession);


module.exports = router;