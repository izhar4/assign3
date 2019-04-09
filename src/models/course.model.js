const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    courseId: {
	    type: Number,
    },
    term: {
        type: String
    },
    academicProgram:{
        type: String
    },
    prerequisite:{
        type: [String]
    },
    courseCode: {
        type: String
    },
    section: {
        type: String
    },
    level: {
        type: Number
    },
    termSectionId: {
        type: Number
    } ,
    enrolCapacity:{
        type: Number
    },
    enrolTotal: {
        type: Number
    },
    roomCapacity: {
        type: Number
    },
    room:{
        type: String
    },
    classStart:{
        type: String
    },
    classEnd:{
        type: String
    },
    classMon: {
        type: String
    },
    classTue:{
        type: String
    },
    classWed:{
        type:String
    },
    classThu: {
        type: String
    },
    classFri: {
        type: String
    },
    dateStart:{type: String},
    dateEnd: {type: String},
    professor:{type: String}
});

module.exports = mongoose.model("courses", courseSchema);
