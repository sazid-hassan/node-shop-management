// categoryController.js
const categoryModel = require("../models/Category");
const { successResponse, errorResponse } = require("../utils/response");

async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(successResponse(categories));
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching categories", error));
  }
}

async function createCategory(req, res) {
  const { category_name, category_entry_date } = req.body;

  try {
    const result = await categoryModel.createCategory(
      category_name,
      category_entry_date
    );
    res.json(
      successResponse({ id: result.insertId }, "Category created successfully")
    );
  } catch (error) {
    res.status(500).json(errorResponse("Error creating category", error));
  }
}

async function getCategoryById(req, res) {
  const category_id = req.params.id;

  try {
    const category = await categoryModel.getCategoryById(category_id);

    if (!category) {
      res.status(404).json(errorResponse("Category not found"));
    } else {
      res.json(successResponse(category));
    }
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching category", error));
  }
}

async function updateCategory(req, res) {
  const category_id = req.params.id;
  const { category_name, category_entry_date } = req.body;

  try {
    const result = await categoryModel.updateCategory(
      category_id,
      category_name,
      category_entry_date
    );
    res.json(successResponse(result, "Category updated successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Error updating category", error));
  }
}

async function deleteCategory(req, res) {
  const category_id = req.params.id;

  try {
    const result = await categoryModel.deleteCategory(category_id);
    res.json(successResponse(result, "Category deleted successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Error deleting category", error));
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
