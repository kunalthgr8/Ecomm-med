import axios from "axios";
import Cookies from "js-cookie";
import conf from "../conf/conf.js";

const bckndURL= "https://ecomm-med-bcknd.vercel.app";

export class ProductService {
  constructor() {}

  async getProducts() {
    try {
      const response = await axios.get(
        `${bckndURL}/api/v1/products/products`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Products Fetching failed";
      throw new Error(errorMessage);
    }
  }

  async getProductById(id) {
    try {
      const response = await axios.get(
        `${bckndURL}/api/v1/products/products/${id}`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Product Fetching failed";
      throw new Error(errorMessage);
    }
  }

  async getProductByReviewId(id) {
    try {
      const response = await axios.get(
        `${bckndURL}/api/v1/products/products/reviews/${id}`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Product Review Fetching failed";
      throw new Error(errorMessage);
    }
  }

  async addReview(data, id) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/products/productReview/review/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Adding Review failed";
      throw new Error(errorMessage);
    }
  }

  async searchProducts(query) {
    try {
      const response = await axios.get(
        `${bckndURL}/api/v1/products/search?query=${query}`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Searching Product failed";
      throw new Error(errorMessage);
    }
  }

  async addProduct(data) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/products/createProduct`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Adding New Product failed";
      throw new Error(errorMessage);
    }
  }

  async getAllCategories() {
    try {
      const response = await axios.get(
        `${bckndURL}/api/v1/products/categories`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Fetching Category failed";
      throw new Error(errorMessage);
    }
  }

  async getAdminProducts() {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(
        `${bckndURL}/api/v1/products/adminProducts`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Get Admin Products failed";
      throw new Error(errorMessage);
    }
  }

  async updateProduct(data, id) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.put(
        `${bckndURL}/api/v1/products/productUpdate/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Update Product failed";
      throw new Error(errorMessage);
    }
  }

  async deleteProduct(id) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.delete(
        `${bckndURL}/api/v1/products/productDelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Deleting the product failed";
      throw new Error(errorMessage);
    }
  }

  async deleteProductReview(productId, reviewId) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.delete(
        `${bckndURL}/api/v1/products/productReviewDelete/${productId}/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Deleting the product review failed";
      throw new Error(errorMessage);
    }
  }
}
const productService = new ProductService();
export default productService;
