import axios from "axios";
import Cookies from "js-cookie";

export class ProductService {
  constructor() {}

  async getProducts() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/products"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/products/${id}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductByReviewId(id) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/products/reviews/${id}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async addReview(data, id) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `http://localhost:8000/api/v1/products/productReview/review/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}
const productService = new ProductService();
export default productService;
