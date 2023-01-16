"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const statusRoute = (0, express_1.Router)();
statusRoute.get("/status", (req, res, next) => {
    res.sendStatus(http_status_codes_1.StatusCodes.OK);
});
exports.default = statusRoute;
