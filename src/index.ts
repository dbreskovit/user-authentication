import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.routes";

const app = express();

// Configurações da aplicação

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de rotas
app.use(statusRoute);
app.use(usersRoute);


// Configurações de erros
app.use(errorHandler);

// Inicia o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
