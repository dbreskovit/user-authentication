import express from "express";
import jwtAuthenticationMiddleware from "./middleware/JWT-authentication.middleware";
import errorHandler from "./middleware/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.routes";

const app = express();

// Configurações da aplicação

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Configurações de erros
app.use(errorHandler);

// Inicia o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
