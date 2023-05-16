const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// # # # #  Json Web Token & Cookies  # # # #
const generateToken = (id, isAdmin) =>{
    return jwt.sign( {id, isAdmin}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
const createSendToken = (user, statusCode, res) => {
    const token = generateToken(user._id, user.isAdmin);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('token', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};


// # # # #  Register User  # # # #

exports.registerUser = asyncHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
})

// # # # #  Log in User  # # # #

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        res.status(400)
        return next(new Error('Please provide email and password!'));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(400)
        return next(new Error('Incorrect email or password'));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
})

// # # # #  Log Out User  # # # #
exports.logOutUser = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
})

// # # # #  Get Me  # # # #
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.status(200).json({ user })
    }else {
        res.status(400)
        throw new Error('User not found');
    }
})

// # # # #  Status Login  # # # #
exports.statusLogin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified){
        return res.json(true)
    }
    return res.json(false)
})








