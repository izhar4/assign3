const BaseDao = require("./base.dao");
const StudentModel = require("../models/student.model");

const studentDao = new BaseDao(StudentModel);
// console.log('stuuu', await studentDao.findMany({}, {}))

async function getStudentsList(){
    const studentsList = await studentDao.findMany({}, {});
    return studentsList;
}

async function getStudentById(id){
    const student = await studentDao.findOne({studentId: id}, {});
    return student;
}

async function updateStudentData(query, update){
    const updatePayload = {$set : update }
    const student = await studentDao.findOneAndUpdate(query, updatePayload);
    return student;
}
// async function createUser(data) {
//     let query = { provider: data.provider, email: data.email }
//     let options = {new: true, upsert: true};
//     const userData = await userDao.findOneAndUpdate(query, data, options).exec();
//     return userData;
// }

// async function getUserData(query){
//     const projection = {};
//     const userData = await userDao.findOne(query, projection);
//     return userData;
// }

module.exports = {
    getStudentsList,
    getStudentById,
    updateStudentData
};