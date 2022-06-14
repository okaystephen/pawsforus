const { check } = require('express-validator');
// const Student = require('../models/StudentModel.js');
// const Counselor = require('../models/UserModel.js');
// const mongoose = require('mongoose');

const user_authValidator = {
    registerValidation: function () {
        var validation = [
            check('user_name')
                .trim()
                .notEmpty()
                .withMessage('Name is required.')
                .escape(),
            check('user_email')
                .trim()
                .notEmpty()
                .withMessage('Email is required.')
                .bail()
                .isEmail().withMessage("Please input a valid email")
                .escape(),
            check('user_pass')
                .trim()
                .notEmpty()
                .withMessage('Password is required.')
                .escape(),
        ]

        return validation
    },
}

module.exports = user_authValidator;
