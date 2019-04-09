const BaseDao = require("./base.dao");
const CourseModel = require("../models/course.model");

const courseDao = new BaseDao(CourseModel);

async function getCourseList(query={}){
    const courseList = await courseDao.findMany(query, {});
    return courseList;
}


module.exports = {
   getCourseList
};