// const DB_CONSTANTS = require("../../config/dbConstants");
const studentService = require("../services/student.service");
const courseController = {};
const _ = require("underscore");
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const fs = require('fs');

courseController.readCourseList= async (req, res)=>{
    try{
        let courseList = await studentService.getCourseList();
        return courseList;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}

courseController.getCourseByProgram = async(req, res)=>{
    const program = req.params.program;
    console.log('programmm', program)
    try{
        let courseList = await studentService.getCourseByProgram(program);
        return courseList;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);

    }
}


module.exports = courseController;
