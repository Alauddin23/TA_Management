"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// base64 encoding of "comp307secrets"
// Put this in the env file
const generateToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, "Y29tcDMwN3NlY3JldHM=");
    return token;
};
exports.default = generateToken;
