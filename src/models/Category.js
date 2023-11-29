// categoryModel.js
const db = require("../../config/db_con");

function getAllCategories() {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query("SELECT * FROM category", (error, results) => {
      connection.end();

      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function createCategory(categoryName, categoryEntryDate) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "INSERT INTO category (category_name, category_entry_date) VALUES (?, ?)",
      [categoryName, categoryEntryDate],
      (error, result) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ category_id: result.insertId });
        }
      }
    );
  });
}

function getCategoryById(category_id) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "SELECT * FROM category WHERE category_id = ?",
      [category_id],
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

function updateCategory(category_id, categoryName, categoryEntryDate) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "UPDATE category SET category_name = ?, category_entry_date = ? WHERE category_id = ?",
      [categoryName, categoryEntryDate, category_id],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ category_id: category_id });
        }
      }
    );
  });
}

function deleteCategory(category_id) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "DELETE FROM category WHERE category_id = ?",
      [category_id],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ category_id: category_id });
        }
      }
    );
  });
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
