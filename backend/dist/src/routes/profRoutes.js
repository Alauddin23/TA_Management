"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profController_1 = require("../controllers/profController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.route("/").get(profController_1.getAllProfs);
router.route("/add").post(profController_1.addProfs);
router.route("/upload").post(upload.single("csvFile"), profController_1.registerProfFromFile);
exports.default = router;
