const express = require("express");
const router = express.Router();
var studentController = require('../controllers/studentController');
var courseController = require('../controllers/courseController');

// var middlewares = require('../helpers/middleware');

router.get('/getStudentsList', async  (req, res, next)=> {
  try{
    const studentsData =  await studentController.getStudentsList(req, res);
    res.status(200).json({data: studentsData});
  }catch(error){
      next(error);
  }
  
})

router.get('/getCourseList', async  (req, res, next)=> {
  try{
    const courseData =  await courseController.readCourseList(req, res);
    res.status(200).json({data: courseData});
  }catch(error){
      next(error);
  }
  
})

router.get('/getStudent/:id', async  (req, res, next)=> {
  try{
    const student =  await studentController.getStudentById(req, res);
    res.status(200).json({data: student});
  }catch(error){
      next(error);
  }
  
})

router.get('/course/:program', async  (req, res, next)=> {
  try{
    const courseList =  await courseController.getCourseByProgram(req, res);
    res.status(200).json({data: courseList});
  }catch(error){
      next(error);
  }
})

router.post('/student/cart/:studentId', async(req, res, next)=>{
  try{
    const courseList =  await studentController.updateStudentSavedCourses(req, res);
    res.status(200).json({data: courseList, message: 'Cart Saved'});
  }catch(error){
      next(error);
  }
})

router.put('/students/:id/cart/save', async (req, res, next)=>{
  try{
    const courseList =  await studentController.updateStudentsConfirmedCourses(req, res);
    res.status(200).json({data: courseList, message:'Confirmed'});
  }catch(error){
      next(error);
  }
})
module.exports = router;