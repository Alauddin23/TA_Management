"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const profRoutes_1 = __importDefault(require("./routes/profRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Basic express setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_config_1.default)();
app.use("/api/users", userRoutes_1.default);
app.use("/api/prof", profRoutes_1.default);
app.use("/api/course", courseRoutes_1.default);
app.listen(port, () => {
    console.log('Backend is running on port: ' + port);
});
