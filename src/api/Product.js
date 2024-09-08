import {
  otherRequest,
  privateRequest,
  publicRequest,
} from "../services/AxiosInstance";

const getProducts = async (URL = "/product") => {
  try {
    const url = URL;
    const method = "GET";

    const products = await publicRequest(url, method);
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getProduct = async (productId) => {
  try {
    const url = `/product/${productId}`;
    const method = "GET";
    const product = await publicRequest(url, method);
    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const addProduct = async (product) => {
  try {
    const url = "/product/create";
    const method = "POST";
    const newProduct = await otherRequest(url, method, product);
    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

const updateProduct = async (productId, product) => {
  try {
    const url = `/product/${productId}`;
    const method = "PUT";
    const updatedProduct = await otherRequest(url, method, product);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const url = `/product/${productId}`;
    const method = "DELETE";
    const deletedProduct = await privateRequest(url, method);
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
