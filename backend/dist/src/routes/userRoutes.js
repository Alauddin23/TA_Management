"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.route("/:id").get(userController_1.getUserByID);
router.route("/").get(userController_1.getAllUsers);
router.route("/register").post(userController_1.register);
router.route("/login").post(userController_1.login);
router.route("/upload").post(upload.single("csvFile"), userController_1.registerUsersFromFile);
router.route("/rate").post(userController_1.rate);
router.route("/comment").post(userController_1.comment);
router.route("/:id").delete(userController_1.deleteUser);
exports.default = router;
