"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.route("/").get(courseController_1.getAllCourses);
router.route("/add").post(courseController_1.addCourses);
router.route("/:id").delete(courseController_1.deleteCourse);
router.route("/:id").get(courseController_1.getCourseByID);
router.route("/addta").post(courseController_1.addta);
router.route("/removeta").post(courseController_1.removeta);
router.route("/upload").post(upload.single("csvFile"), courseController_1.registerCourseFromFile);
exports.default = router;
