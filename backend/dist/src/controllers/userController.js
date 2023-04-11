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
exports.deleteUser = exports.login = exports.register = exports.getUserByID = exports.registerUsersFromFile = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const csv_string_1 = require("csv-string");
// @Desc Get all users
// @Route /api/users
// @Method GET
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}).select("-password");
    res.status(200).json({
        users
    });
}));
// @Desc Save multiple users
// @Route /api/users/upload
// @Method POST
exports.registerUsersFromFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = req.file;
    if (csv) {
        const fileContent = (0, csv_string_1.parse)(csv.buffer.toString('utf-8'));
        for (let record of fileContent) {
            const user = new User_1.default({
                firstName: record[0],
                lastName: record[1],
                email: record[2],
                password: record[3],
                userType: record[4].split("/")
            });
            user.save(); // can be made concurrent
        }
    }
    else {
        res.status(500);
        throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
}));
// @Desc Get User by ID
// @Route /api/users/:id
// @Method GET
exports.getUserByID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById({ _id: req.params.id }).select("-password");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        user
    });
}));
// @Desc Register User
// @Route /api/users/register
// @Method POST
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, userType, username,coursesRegistered, semester, studentID, comments, rating } = req.body;
    const user = new User_1.default({ firstName, lastName, email, password, userType, username, coursesRegistered, semester, studentID, comments, rating });
    yield user.save();
    res.status(201).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        userType: user.userType,
        username:user.username,
        coursesRegistered: user.coursesRegistered,
        semester: user.semester,
        studentID: user.studentID,
        comments: user.comments,
        rating: user.rating,
        token: (0, generateToken_1.default)(user._id)
    });
}));
// @Desc Login user
// @Route /api/users/login
// @Method POST
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (yield user.comparePassword(password)) {
        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userType: user.userType,
            token: (0, generateToken_1.default)(user._id)
        });
    }
    else {
        res.status(401);
        throw new Error("Email or password incorrect");
    }
}));
// @Desc Delete user by ID
// @Route /api/users/:id
// @Method DELETE
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ _id: req.params.id });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    yield User_1.default.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({});
}));


// @Route /api/users/rate
// @Method POST

exports.rate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newRating, prevRating } = req.body;
    let user = yield User_1.default.findOneAndUpdate({ username }, {rating: ((newRating + prevRating)/2).toFixed(2) });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.send(user);
}));


// @Route /api/users/comment
// @Method POST

exports.comment= (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newComment, prevComments } = req.body;
    let user = yield User_1.default.findOneAndUpdate({ username }, {comments: [...prevComments, newComment] });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.send(user);
}));