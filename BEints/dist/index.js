"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { log } from 'node:console';
const config_ds_1 = require("./config/config.ds");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('hello ts');
});
// middleware
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_routes_1.default);
(0, config_ds_1.DBconnect)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening on port http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.log("Failed to connect to database", err);
});
