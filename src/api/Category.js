import {
  otherRequest,
  privateRequest,
  publicRequest,
} from "../services/AxiosInstance";

const getCategories = async (URL = "/category") => {
  try {
    const url = URL;
    const method = "GET";

    const category = await publicRequest(url, method);
    return category.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

const getCategory = async (categoryId) => {
  try {
    const url = `/category/${categoryId}`;
    const method = "GET";
    const category = await publicRequest(url, method);
    return category.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

const addCategory = async (category) => {
  try {
    const url = "/category/create";
    const method = "POST";
    const newCategory = await otherRequest(url, method, category);
    return newCategory;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

const updateCategory = async (categoryId, category) => {
  try {
    const url = `/category/${categoryId}`;
    const method = "PUT";
    const updatedCategory = await otherRequest(url, method, category);
    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const url = `/category/${categoryId}`;
    const method = "DELETE";
    const deletedCategory = await privateRequest(url, method);
    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
