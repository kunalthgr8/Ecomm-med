import React, { useState } from "react";
import { Input, Button } from "../index.js";
import { MdModeEdit } from "react-icons/md";
import productService from "../../appwrite/product.js";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const [data, setData] = useState({
    name: null,
    price: null,
    image: null,
    description: null,
    category: null,
    stock: null,
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveTheProductInfo = async () => {
    if (
      data.name === null ||
      data.price === null ||
      data.image === null ||
      data.description === null ||
      data.category === null ||
      data.stock === null
    ) {
      alert("Please fill all the fields");
    }
    try {
      const response = await productService.addProduct(data);
      if(response.name === data.name){
        navigate("/getAdminProducts");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-4/5 flex flex-col mt-5 gap-5">
      <h1 className="font-bold text-xl tracking-wider text-nav-color">Add Products</h1>
      <div className="flex flex-col w-4/5 mt-5 ml-10 justify-center bg-nav-white rounded-lg p-8 pb-4">
        <div className="w-full flex flex-col">
          <div className="flex flex-col w-full gap-3 mb-5">
            <h1 className="text-sm text-heading-color font-semibold">
              Add a new Product
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Name
                </p>
                <Input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Name"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Price
                </p>
                <Input
                  type="number"
                  name="price"
                  value={data.price}
                  placeholder="Product Price"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Image
                </p>
                <Input
                  type="text"
                  name="image"
                  value={data.image}
                  placeholder="Image URL"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Description
                </p>
                <Input
                  type="text"
                  name="description"
                  value={data.description}
                  placeholder="Product Description"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Category
                </p>
                <Input
                  type="text"
                  name="category"
                  value={data.category}
                  placeholder="Product Category"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  Product Stock
                </p>
                <Input
                  type="number"
                  name="stock"
                  value={data.stock}
                  placeholder="Product Stock"
                  className="text-sm font-medium text-heading-color border-b border-text-heading"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-right">
          <Button
            width="flex justify-end"
            className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
            onClick={saveTheProductInfo}
          >
            <MdModeEdit className="flex justify-center self-center" />
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
