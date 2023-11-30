// productModel.js
const db = require("../../config/db_con");

function getAllProducts() {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query("SELECT * FROM products", (error, results) => {
      connection.end();

      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function createProduct(
  categoryId,
  productName,
  productPrice,
  productQuantity,
  productBrand
) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "INSERT INTO products (category_id, product_name, product_price, product_quantity, product_brand) VALUES (?, ?, ?, ?, ?)",
      [categoryId, productName, productPrice, productQuantity, productBrand],
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

function getProductById(productId) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "SELECT * FROM products WHERE product_id = ?",
      [productId],
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

function updateProduct(
  productId,
  categoryId,
  productName,
  productPrice,
  productQuantity,
  productBrand
) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "UPDATE products SET category_id = ?, product_name = ?, product_price = ?, product_quantity = ?, product_brand = ? WHERE product_id = ?",
      [
        categoryId,
        productName,
        productPrice,
        productQuantity,
        productBrand,
        productId,
      ],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ id: productId });
        }
      }
    );
  });
}

function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    const connection = db();

    connection.query(
      "DELETE FROM products WHERE product_id = ?",
      [productId],
      (error) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve({ id: productId });
        }
      }
    );
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
