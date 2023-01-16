import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";

class userRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT uuid, username
      FROM application_user
      `;
    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findUserByUuid(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
      `;
      const { rows } = await db.query<User>(query, [uuid]);
      const [user] = rows;
      return user;
    } catch (error) {
      throw new DatabaseError("Error in query by ID", error);
    }
  }

  async findUserByUuidAndPassword(
    uuid: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
      SELECT uuid, username
      FROM application_user
      where uuid = $1 and password = crypt($2, 'my_salt')
      `;

      const { rows } = await db.query<User>(query, [uuid, password]);
      const [user] = rows;
      return !user ? null : user;
    } catch (error) {
      throw new DatabaseError("Error in query in username and password", error);
    }
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2, 'my_salt')
        `;
      const values = [username, password];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError(
        "Erro na consulta por username e password",
        error
      );
    }
  }

  async createUser(user: User): Promise<string> {
    const query = `
      INSERT INTO application_user (username, password)
      VALUES ($1, crypt($2, 'my_salt'))
      RETURNING uuid, username
      `;
    const { rows } = await db.query<{ uuid: string }>(query, [
      user.username,
      user.password,
    ]);
    const [newUser] = rows;
    return newUser.uuid;
  }

  async updateUser(user: User): Promise<void> {
    const script = `
      UPDATE application_user
      SET
      username = $1,
      password = crypt($2, 'my_salt')
      WHERE uuid = $3
      `;

    await db.query(script, [user.username, user.password, user.uuid]);
  }

  async deleteUser(uuid: string): Promise<void> {
    const script = `
      DELETE FROM application_user
      WHERE uuid = $1
      `;
    await db.query(script, [uuid]);
  }
}

export default new userRepository();
