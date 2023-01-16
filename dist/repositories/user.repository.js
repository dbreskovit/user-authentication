"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_model_1 = __importDefault(require("../models/errors/database.error.model"));
class userRepository {
    async findAllUsers() {
        const query = `
      SELECT uuid, username
      FROM application_user
      `;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findUserByUuid(uuid) {
        try {
            const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
      `;
            const { rows } = await db_1.default.query(query, [uuid]);
            const [user] = rows;
            return user;
        }
        catch (error) {
            throw new database_error_model_1.default("Error in query by ID", error);
        }
    }
    async findUserByUuidAndPassword(uuid, password) {
        try {
            const query = `
      SELECT uuid, username
      FROM application_user
      where uuid = $1 and password = crypt($2, 'my_salt')
      `;
            const { rows } = await db_1.default.query(query, [uuid, password]);
            const [user] = rows;
            return !user ? null : user;
        }
        catch (error) {
            throw new database_error_model_1.default("Error in query in username and password", error);
        }
    }
    async findByUsernameAndPassword(username, password) {
        try {
            const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2, 'my_salt')
        `;
            const values = [username, password];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return user || null;
        }
        catch (error) {
            throw new database_error_model_1.default("Erro na consulta por username e password", error);
        }
    }
    async createUser(user) {
        const query = `
      INSERT INTO application_user (username, password)
      VALUES ($1, crypt($2, 'my_salt'))
      RETURNING uuid, username
      `;
        const { rows } = await db_1.default.query(query, [
            user.username,
            user.password,
        ]);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async updateUser(user) {
        const script = `
      UPDATE application_user
      SET
      username = $1,
      password = crypt($2, 'my_salt')
      WHERE uuid = $3
      `;
        await db_1.default.query(script, [user.username, user.password, user.uuid]);
    }
    async deleteUser(uuid) {
        const script = `
      DELETE FROM application_user
      WHERE uuid = $1
      `;
        await db_1.default.query(script, [uuid]);
    }
}
exports.default = new userRepository();
