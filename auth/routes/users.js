const express = require('express');

const router = express.Router();

const passport = require('passport');
const usersControllers = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersControllers.profile);
router.get('/sign-up', usersControllers.signUp);
router.get('/sign-in', usersControllers.signIn);

router.post('/create', usersControllers.create);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'},
), usersControllers.createSession);


router.get('/sign-out',usersControllers.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/oauth2callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersControllers.createSession);

router.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
router.get('/auth/github/callback', passport.authenticate(
    'github',
    { failureRedirect: '/' },
), usersControllers.createSession);

//reset passowr
router.post('/resetPassword', usersControllers.passwordReset);
router.get('/reset-password/:token', usersControllers.passwordResetLink);

router.post('/update-password/:token', usersControllers.updatePassword);


//forgot password 
router.post('/forgotPassword', usersControllers.forgetPassword);

router.get('/forgotPasswordRender', usersControllers.forgetPasswordRender);




module.exports = router;