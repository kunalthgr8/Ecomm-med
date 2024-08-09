import axios from "axios";
import Cookies from "js-cookie";
import conf from "../conf/conf.js";


const bckndURL= "https://ecomm-med-bcknd.vercel.app";
export class OrderService {
  constructor() {}

  async addNewProduct(data) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/orders/newOrder`,
        {
          orderItems: data.orderItems,
          paymentInfo: data.paymentInfo,
          paidAt: data.paidAt,
          itemsPrice: data.itemsPrice,
          taxPrice: data.taxPrice,
          shippingPrice: data.shippingPrice,
          totalPrice: data.totalPrice,
          orderStatus: data.orderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMyOrders() {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(
        `${bckndURL}/api/v1/orders/myOrders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async payment(data) {
    try {
      console.log("Data in Order.js", data);
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/orders/payment`,
        {
          orderItems: data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response in Order.js", response);
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Error: URL not found in response.");
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
const orderService = new OrderService();
export default orderService;
