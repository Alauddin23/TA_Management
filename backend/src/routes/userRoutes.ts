import express from 'express';
import {rateU, register, login, getAllUsers, getUserByID, registerUsersFromFile} from '../controllers/userController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/:id").get(getUserByID);
router.route("/").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload").post(upload.single("csvFile"), registerUsersFromFile);
//function to rate the user
router.route("/rate").post(rateU);

export default router;