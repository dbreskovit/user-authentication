"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const database_error_model_1 = __importDefault(require("../models/errors/database.error.model"));
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
function errorHandler(error, req, res, next) {
    if (error instanceof database_error_model_1.default) {
        res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else if (error instanceof forbidden_error_model_1.default) {
        res.sendStatus(http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    else {
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.default = errorHandler;
