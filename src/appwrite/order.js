import axios from "axios";
import Cookies from "js-cookie";

export class OrderService {
  constructor() {}

  async addNewProduct(data) {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log("OrderService :: addNewProduct :: accessToken", accessToken);
      console.log(data);
      console.log("OrderService :: addNewProduct :: data", data.orderItems);
      const response = await axios.post(
        "http://localhost:8000/api/v1/orders/newOrder",
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
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
const orderService = new OrderService();
export default orderService;
