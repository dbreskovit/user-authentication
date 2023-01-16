"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").config();
const connectionString = process.env.DB_URL;
const db = new pg_1.Pool({ connectionString });
exports.default = db;
