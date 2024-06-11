import axios from "axios";

export class ProductService {
  constructor() {}

  async getProducts(){
    try {
      const response = await axios.get("http://localhost:8000/api/v1/products/products");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
}
const productService = new ProductService();
export default productService;
