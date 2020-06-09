const db = require("../db");

class User {
  static async findAll() {
    return db.query("SELECT * FROM users");
  }

  static async findOne(id) {
    return db.query("SELECT * FROM users WHERE id=?", [id]);
  }
}

module.exports = User;
