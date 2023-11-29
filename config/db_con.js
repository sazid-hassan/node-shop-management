const mysql = require("mysql");

const db_con = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dummy_app",
  });
};

module.exports = db_con;
