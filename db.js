require("dotenv").config();
const mysql = require("mysql2");

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

class Database {
  init() {
    let config = {
      host: "localhost",
      database: "rest-api",
      user: DB_USER,
      password: DB_PASSWORD,
    };

    this.connection = mysql.createConnection(config);

    return this;
  }

  query(...args) {
    return new Promise((resolve, reject) => {
      this.connection.query(...args, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

module.exports = new Database().init();
