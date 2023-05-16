const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logOutUser);
router.get('/getMe/:id', userController.getMe);
router.get('/statusLogin', userController.statusLogin);

module.exports = router
