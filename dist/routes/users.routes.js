"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const usersRoute = (0, express_1.Router)();
usersRoute.get("/users", async (req, res, next) => {
    const users = await user_repository_1.default.findAllUsers();
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
usersRoute.get("/users/:uuid", async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = await user_repository_1.default.findUserByUuid(uuid);
        res.status(http_status_codes_1.StatusCodes.OK).send({ user });
    }
    catch (error) {
        next(error);
    }
});
usersRoute.post("/users", async (req, res, next) => {
    const newUser = req.body;
    const uuid = await user_repository_1.default.createUser(newUser);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(uuid);
});
usersRoute.put("/users/:uuid", async (req, res, next) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    await user_repository_1.default.updateUser(modifiedUser);
    res.status(http_status_codes_1.StatusCodes.OK).send();
});
usersRoute.delete("/users/:uuid", (req, res, next) => {
    const uuid = req.params.uuid;
    user_repository_1.default.deleteUser(uuid);
    res.sendStatus(http_status_codes_1.StatusCodes.OK);
});
exports.default = usersRoute;
