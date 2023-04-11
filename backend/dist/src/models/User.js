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
exports.UserTypes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
var UserTypes;
(function (UserTypes) {
    UserTypes["Student"] = "stud";
    UserTypes["Professor"] = "prof";
    UserTypes["TA"] = "ta";
    UserTypes["Admin"] = "admin";
    UserTypes["Sysop"] = "sysop";
})(UserTypes = exports.UserTypes || (exports.UserTypes = {}));
const UserSchema = new mongoose_1.default.Schema({

    rating:{
        type:Number, 
        required:false
    },

    comments:{
        type:Array,
        required:false
    },

    studentID:{
        type:String, 
        required:false
    },

    semester:{
        type:String, 
        required:false
    },
    coursesRegistered:{
        type:Array,
        required:false
    },

    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (enteredPassword) {
    const user = this;
    return bcrypt_1.default.compareSync(enteredPassword, user.password);
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
