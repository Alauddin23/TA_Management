"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProfessorSchema = new mongoose_1.default.Schema({
    professor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    faculty: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }
}, {
    timestamps: true
});
const Professor = mongoose_1.default.model("Professor", ProfessorSchema);
exports.default = Professor;
