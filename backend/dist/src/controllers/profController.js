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
exports.addProfs = exports.registerProfFromFile = exports.getAllProfs = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Professor_1 = __importDefault(require("../models/Professor"));
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const csv_string_1 = require("csv-string");
// @Desc Get all Profs
// @Route /api/prof
// @Method GET
exports.getAllProfs = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profs = yield Professor_1.default.find({});
    res.status(200).json({
        profs
    });
}));
// @Desc Save multiple profs
// @Route /api/prof/upload
// @Method POST
exports.registerProfFromFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = req.file;
    if (csv) {
        const fileContent = (0, csv_string_1.parse)(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const professorEmail = record[0];
            const courseNumber = record[3];
            let instructor = yield User_1.default.findOne({ professorEmail }).select("-password");
            let course = yield Course_1.default.findOne({ courseNumber });
            if (!instructor || !course) {
                res.status(404);
                console.log("Instructor or course not found in the database! Skipping row.");
            }
            else {
                const prof = new Professor_1.default({
                    professor: instructor,
                    faculty: record[1],
                    department: record[2],
                    course: course
                });
                yield prof.save();
            }
        }
    }
    else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
}));

exports.addProfs = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { professorEmail, faculty, department, courseNumber } = req.body;
    let instructor = yield User_1.default.findOne({ professorEmail }).select("-password");
    if (!instructor) {
        res.status(404);
        throw new Error("Instructor not found in the database! Add user and continue.");
    }
    let course = yield Course_1.default.findOne({ courseNumber });
    if (!course) {
        res.status(404);
        throw new Error("Course not found in the database! Add course and continue.");
    }
    const prof = new Professor_1.default({
        professor: instructor,
        faculty: faculty,
        department: department,
        course: course
    });
    yield prof.save();
    res.status(201).json({
        id: prof._id,
        instructor: prof.professor,
        faculty: prof.faculty,
        term: prof.department,
        course: prof.course,
    });
}));
