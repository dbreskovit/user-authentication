"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_authentication_middleware_1 = __importDefault(require("./middleware/JWT-authentication.middleware"));
const error_handler_middleware_1 = __importDefault(require("./middleware/error-handler.middleware"));
const authorization_route_1 = __importDefault(require("./routes/authorization.route"));
const status_route_1 = __importDefault(require("./routes/status.route"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(status_route_1.default);
app.use(authorization_route_1.default);
app.use(JWT_authentication_middleware_1.default);
app.use(users_routes_1.default);
app.use(error_handler_middleware_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});
