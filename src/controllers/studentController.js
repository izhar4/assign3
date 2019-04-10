// const DB_CONSTANTS = require("../../config/dbConstants");
const studentService = require("../services/student.service");
const studentController = {};
const _ = require("underscore");
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const fs = require('fs');
const bcrypt = require('bcryptjs');

studentController.getStudentsList = async (req, res) => {
    try {
        const studentList = await studentService.getStudentsList();
        return studentList;
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.getStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await studentService.getStudentById(id);
        return student;
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.updateStudentSavedCourses = async (req, res) => {
    const studentId = req.params.studentId;
    const courses = req.body.courses;
    try {
        const student = await studentService.updateStudentSavedCourses(studentId, courses);
        return student;
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.updateStudentsConfirmedCourses = async (req, res) => {
    const studentId = req.params.id;
    const courses = req.body.courses;
    try {
        const student = await studentService.updateStudentsConfirmedCourses(studentId, courses);
        return student;
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.useraccountsActivate = async (req, res) => {
    const userData = req.body.userData;
    if (userData.password != userData.passwordConfirm) {
        return {
            message: "Passwords do not match"
        };
    }
    // Generate a "salt" value
    var salt = bcrypt.genSaltSync(10);
    // Hash the result
    var hash = bcrypt.hashSync(userData.password, salt);
    try {
        const resp = await studentService.useraccountsActivate(userData, hash);
        if (resp) {
            return {
                message: "User account was activated"
            };
        }
        return {
            message: "User account activation - not found"
        };
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
}

studentController.userAccountsRegister = async (req, res) => {
    const userData = req.body.userData;
    console.log('datatattatata controler', userData)
    if (userData.password != userData.passwordConfirm) {
        return {
            message: "Passwords do not match"
        };
    }

    // Generate a "salt" value
    var salt = bcrypt.genSaltSync(10);
    // Hash the result
    var hash = bcrypt.hashSync(userData.password, salt);

    // Update the incoming data
    userData.password = hash;
    try {
        const resp = await studentService.userAccountsRegister(userData);
        if (resp) {
            return {
                message: "User account was created"
            };
        }
        return {
            message: "User account activation - not found"
        };
    } catch (error) {
        if(error.code === 11000){
            throw new CustomError('User account creation - cannot create; user already exists')
        }
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
}

module.exports = studentController;