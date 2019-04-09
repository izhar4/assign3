// const DB_CONSTANTS = require("../../config/dbConstants");
const studentService = require("../services/student.service");
const studentController = {};
const _ = require("underscore");
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const fs = require('fs');


// userController.findUser = async (req, res)=>{
//     try{
//         const userData = await userService.getUserByMailAndProvider(req.userData);
//         if(userData && Object.keys(userData).length){
//             return userData;
//         }else throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND ,404)
//     }catch(error){
//         throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
//     }
    
// }

studentController.getStudentsList= async (req, res)=>{
    try{
        const studentList = await studentService.getStudentsList();
        return studentList;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.getStudentById= async (req, res)=>{
    const id = req.params.id;
    try{
        const student = await studentService.getStudentById(id);
        return student;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.updateStudentSavedCourses = async(req, res)=>{
    const studentId = req.params.studentId;
    const courses = req.body.courses;
    try{
        const student = await studentService.updateStudentSavedCourses(studentId, courses);
        return student;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

studentController.updateStudentsConfirmedCourses = async(req, res)=>{
    const studentId = req.params.id;
    const courses = req.body.courses;
    try{
        const student = await studentService.updateStudentsConfirmedCourses(studentId, courses);
        return student;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    } 
}

module.exports = studentController;
