import axios from "axios";
import Cookies from "js-cookie";

export class PaymentService {
  constructor() {}

  async getStripeApiKey() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/payment/key"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;
