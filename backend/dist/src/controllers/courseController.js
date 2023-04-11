"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.addCourses = exports.registerCourseFromFile = exports.getAllCourses = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const csv_string_1 = require("csv-string");
// @Desc Get all Courses
// @Route /api/course
// @Method GET
exports.getAllCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield Course_1.default.find({});
    res.status(200).json({ courses });
}));
// @Desc Save multiple courses
// @Route /api/course/upload
// @Method POST
exports.registerCourseFromFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = req.file;
    if (csv) {
        const fileContent = (0, csv_string_1.parse)(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const instructorEmail = record[5];
            let courseInstructor = yield User_1.default.findOne({ instructorEmail }).select("-password");
            if (!courseInstructor) {
                res.status(404);
                console.log("Instructor not found in the database! Skipping row.");
            }
            else {
                const course = new Course_1.default({
                    courseName: record[0],
                    courseDesc: record[1],
                    term: record[2],
                    year: record[3],
                    courseNumber: record[4],
                    courseInstructor: courseInstructor
                });
                course.save(); // can be made concurrent
            }
        }
    }
    else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
}));
// @Desc Add Courses
// @Route /api/course/add
// @Method POST
exports.addCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, courseDesc, term, year, courseNumber, instructorEmail, courseResp, courseRooms, courseTimes, wishlist } = req.body;
    let courseInstructor = yield User_1.default.findOne({ email: instructorEmail });
    console.log(courseInstructor);
    if (!courseInstructor) {
        res.status(404);
        throw new Error("Instructor not found in the database! Add user and continue.");
    }
    const course = new Course_1.default({ courseName, courseDesc, term, year, courseNumber, courseInstructor, courseResp, courseRooms, courseTimes, wishlist });
    yield course.save();
    res.status(201).json({
        id: course._id,
        courseRooms:course.courseRooms,
        courseTimes:course.courseTimes,
        courseResp:course.courseResp,
        courseName: course.courseName,
        courseDesc: course.courseDesc,
        term: course.term,
        year: course.year,
        courseNumber: course.courseNumber,
        courseInstructor: course.courseInstructor,
        wishlist: course.wishlist
    });
}));
// @Desc Delete Course
// @Route /api/course/:id
// @Method DELETE
exports.deleteCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let course = yield Course_1.default.findOne({ _id: req.params.id });
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    yield Course_1.default.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({});
}));

exports.addta= (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, taEmail } = req.body;
    let currCourse = yield Course_1.default.findOne({courseName: courseName});
    let ta = yield User_1.default.findOne({email: taEmail});
    let course = yield Course_1.default.findOneAndUpdate({ courseName }, {courseTAs: [...currCourse.courseTAs,ta] });
    if (!course) {
        res.status(404);
        throw new Error("User not found");
    }
    res.send(course);
}));

exports.removeta= (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, taEmail } = req.body;
    let currCourse = yield Course_1.default.findOne({courseName: courseName});
    const newTAs = currCourse.courseTAs.filter(i => i.email!=taEmail)
    let course = yield Course_1.default.findOneAndUpdate({ courseName }, {courseTAs: newTAs });
    if (!course) {
        res.status(404);
        throw new Error("User not found");
    }
    res.send(course);
}));

exports.getCourseByID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_1.default.findById({ _id: req.params.id });
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    res.status(200).json({
        course
    });
}));