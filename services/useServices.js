import { apiServices } from "./apiServices";

export default function useServices() {
  const { GET, POST } = apiServices();

  async function registerAccount(params) {
    try {
      const res = await POST("api/v1/signup", params);
      return res;
    } catch (e) {
      console.error("Error register account: ", e);
      throw e;
    }
  }

  async function loginAccount(params) {
    try {
      const res = await POST("api/v1/login", params);
      return res;
    } catch (e) {
      console.error("Error register account: ", e);
      throw e;
    }
  }

  async function logoutAccount(params) {
    try {
      const res = await POST("api/v1/logout", params);
      return res;
    } catch (e) {
      console.error("Error logout account: ", e);
      throw e;
    }
  }

  async function postOrder(params) {
    try{
      const res = await POST("api/v1/order", params);
      return res;
    }catch(e) {
      console.error("Error post order: ", e);
      throw e;
    }
  }

  async function getUserInfo(params) {
    try {
      const res = await GET("api/v1/user", params);
      return res.data;
    } catch (e) {
      console.error("Error get user info: ", e);
      throw e;
    }
  }

  async function getProducts(params, page = 1) {
    try {
      const res = await GET(`api/v1/products?page=${page}`, params);
      return res.data;
    } catch (e) {
      console.error("Error login account: ", e);
      throw e;
    }
  }

  async function getOrders(params) {
    try{
      const res = await GET("api/v1/orders", params);
      return res.data;
    }catch(e) {
      console.error("Error get orders: ", e);
      throw e;
    }
  }

  return {
    registerAccount,
    loginAccount,
    logoutAccount,
    postOrder,
    getOrders,
    getUserInfo,
    getProducts,
  };
}
