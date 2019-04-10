const studentDao = require("../dao/student.dao");
const _ = require("underscore");
const DB_CONSTANTS = require('../../config/dbConstants');
const courseDao = require("../dao/course.dao");
const userDao = require("../dao/user.dao");
async function getStudentsList() {
    const studentsList = await studentDao.getStudentsList();
    return studentsList;
}

async function getStudentById(id) {
    const student = await studentDao.getStudentById(id);
    return student;
}

async function getCourseList() {
    const courseList = await courseDao.getCourseList();
    return courseList;
}

async function getCourseByProgram(program) {
    const query = {
        academicProgram: program,
        term: '2019 Winter'
    }
    const courseList = await courseDao.getCourseList(query);
    return courseList;
}

async function updateStudentSavedCourses(studentId, courses) {
    const query = {
        studentId: studentId
    };
    const update = {
        coursesSaved: courses
    };
    const student = await studentDao.updateStudentData(query, update);
    return student;
}

async function updateStudentsConfirmedCourses(studentId, courses) {
    const query = {
        studentId: studentId
    };
    const update = {
        coursesConfirmed: courses,
        coursesSaved: []
    };
    const student = await studentDao.updateStudentData(query, update);
    return student;
}

async function useraccountsActivate(userData, hash) {
    try {
        const query = {
            userName: userData.userName
        };
        const update = {
            password: hash,
            statusActivated: true,
            role: userData.role
        };
        const data = await userDao.updateUserData(query, update);
        return data;
    } catch (error) {
        throw error;
    }

}

async function userAccountsRegister(userData) {
    const data = {
        userName: userData.userName,
        fullName: userData.fullName,
        password: userData.password,
        role: userData.role,
        claims: []
    }
    const resp = await userDao.insertUser(data);
    return resp;

}

module.exports = {
    getStudentsList,
    getStudentById,
    getCourseList,
    getCourseByProgram,
    updateStudentSavedCourses,
    updateStudentsConfirmedCourses,
    useraccountsActivate,
    userAccountsRegister
};