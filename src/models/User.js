// userModel.js
const db = require("../../config/db_con");

function getAllUsers() {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query("SELECT * FROM users", (error, results) => {
      connection.end();

      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function createUser(userName, userPassword, userMsisdn, userEmail, userType) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "INSERT INTO users (user_name, user_password, user_msisdn, user_email, user_type) VALUES (?, ?, ?, ?, ?)",
      [userName, userPassword, userMsisdn, userEmail, userType],
      (error, result) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ id: result.insertId });
        }
      }
    );
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId],
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve(results.length === 0 ? null : results[0]);
        }
      }
    );
  });
}

function updateUser(
  userId,
  userName,
  userPassword,
  userMsisdn,
  userEmail,
  userType
) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "UPDATE users SET user_name = ?, user_password = ?, user_msisdn = ?, user_email = ?, user_type = ? WHERE user_id = ?",
      [userName, userPassword, userMsisdn, userEmail, userType, userId],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ id: userId });
        }
      }
    );
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "DELETE FROM users WHERE user_id = ?",
      [userId],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ id: userId });
        }
      }
    );
  });
}

function getUsersByType(userType) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "SELECT * FROM users WHERE user_type = ?",
      [userType],
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByType,
};
