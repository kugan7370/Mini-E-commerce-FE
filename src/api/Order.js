import {
  otherRequest,
  privateRequest,
  publicRequest,
} from "../services/AxiosInstance";

const getOrders = async (URL = "/order") => {
  try {
    const url = URL;
    const method = "GET";

    const order = await privateRequest(url, method);
    return order.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

const getOrder = async (orderId) => {
  try {
    const url = `/order/${orderId}`;
    const method = "GET";
    const order = await privateRequest(url, method);
    return order.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

const addOrder = async (order) => {
  try {
    const url = "/order/create";
    const method = "POST";
    const newOrder = await privateRequest(url, method, order);
    return newOrder;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

const getUserOrder = async (userId) => {
  try {
    const url = `/order/user/${userId}`;
    const method = "GET";
    const order = await privateRequest(url, method);
    return order.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export { getOrders, getOrder, addOrder, getUserOrder };
