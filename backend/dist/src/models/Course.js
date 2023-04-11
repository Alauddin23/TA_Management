"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Term;
(function (Term) {
    Term["Fall"] = "fall";
    Term["Spring"] = "spring";
    Term["Summer"] = "summer";
})(Term || (Term = {}));
const CourseSchema = new mongoose_1.default.Schema({

    wishlist: {
        type:Array,
        required:false
    },

    courseTimes: {
        type: Array,
        requried:false
    },

    courseRooms: {
        type: Array,
        requried:false
    },

    courseResp: {
        type:String,
        required:false
    },

    courseName: {
        type: String,
        required: true,
    },
    courseDesc: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    courseNumber: {
        type: String,
        required: true,
    },
    courseInstructor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    courseTAs : {
        type: Array,
        required: false
    }

}, {
    timestamps: true
});
const Course = mongoose_1.default.model("Course", CourseSchema);
exports.default = Course;
