import axios from "axios";
import Cookies from "js-cookie";
import conf from "../conf/conf.js";

export class PaymentService {
  constructor() {}

  async getStripeApiKey() {
    try {
      const response = await axios.get(`${conf.backendUrl}/api/v1/payment/key`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;
