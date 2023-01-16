"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function jwtAuthenticationMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader)
            throw new Error("Authorization header is missing");
        const [authenticationType, token] = authorizationHeader.split(" ");
        if (authenticationType !== "Bearer" || !token)
            throw new forbidden_error_model_1.default("Invalid authentication type");
        const tokenPayload = jsonwebtoken_1.default.verify(token, "my_secret_key");
        if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
            throw new forbidden_error_model_1.default("Invalid token");
        }
        const uuid = tokenPayload.sub;
        const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = jwtAuthenticationMiddleware;
