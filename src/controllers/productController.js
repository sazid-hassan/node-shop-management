// productController.js
const productModel = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/response");

async function getAllProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(successResponse(products));
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching products", error));
  }
}

async function createProduct(req, res) {
  const {
    categoryId,
    productName,
    productPrice,
    productQuantity,
    productBrand,
  } = req.body;

  try {
    const result = await productModel.createProduct(
      categoryId,
      productName,
      productPrice,
      productQuantity,
      productBrand
    );
    res.json(
      successResponse({ id: result.insertId }, "Product created successfully")
    );
  } catch (error) {
    res.status(500).json(errorResponse("Error creating product", error));
  }
}

async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const product = await productModel.getProductById(productId);

    if (!product) {
      res.status(404).json(errorResponse("Product not found"));
    } else {
      res.json(successResponse(product));
    }
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching product", error));
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id;
  const {
    categoryId,
    productName,
    productPrice,
    productQuantity,
    productBrand,
  } = req.body;

  try {
    const result = await productModel.updateProduct(
      productId,
      categoryId,
      productName,
      productPrice,
      productQuantity,
      productBrand
    );
    res.json(successResponse(result, "Product updated successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Error updating product", error));
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const result = await productModel.deleteProduct(productId);
    res.json(successResponse(result, "Product deleted successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Error deleting product", error));
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
