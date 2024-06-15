import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../appwrite/product";
import { MdModeEdit } from "react-icons/md";
import NoData from "../../assets/noData.svg"
import { Button, Input, Loader } from "../index";
import ReactStarsRating from "react-awesome-stars-rating";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../../assets/empty.svg";

const AdminProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        setData({
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          stock: data.stock,
        });
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteProduct = async () => {
    const resp = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (resp) {
      try {
        const resp = await productService.deleteProduct(id);
        if (resp.status === 204) {
          navigate("/getAdminProducts");
        }
        console.log("Product deleted", resp);
      } catch (error) {
        console.log("Failed to delete product", error);
      }
    } else {
      return;
    }
  };
  const saveTheProductInfo = async () => {
    console.log(data);
    try {
      const response = await productService.updateProduct(data, id);
      setProduct(response);
      navigate(`/adminproduct/${id}`)
    } catch (error) {
      console.log("Failed to save product data", error);
    }
  };

  return (
    <>
      {product ? (
        <div className="flex flex-col w-4/5 h-full mt-10 mb-10">
          <div className="flex w-full flex-col gap-2 bg-nav-white rounded-2xl border-2 border-l-nav-color p-10 mb-5">
            {/* Product details */}
            <div className="md:flex w-full">
              {/* Image and basic info */}
              <div className="flex flex-col w-1/3">
                <div className="h-50 w-50 md:h-50 md:w-50 rounded-2xl border-2 border-gray">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl"
                  />
                </div>
                <div className="h-24 w-72 flex justify-between"></div>
              </div>
              {/* Description and price */}
              <div className="w-2/3 mx-auto md:px-20">
                <div className="top h-fit flex flex-col gap-2">
                  <div className="text-nav-color mt-2 text-l font-bold tracking-wide md:text-3xl sm:text-2xl">
                    {product.name}
                  </div>
                  <div className="h-8">
                    <p className="text-nav-active flex flex-row gap-2 text-center self-center font-bold text-sm">
                      <ReactStarsRating
                        isHalf
                        className="flex gap-1"
                        size={15}
                        value={product.rating}
                      />
                      ({product.rating} Ratings)
                    </p>
                  </div>
                  <hr className="border-t-2 border-black-heading" />
                </div>
                <div className="bottom min-h-36 py-5 text-lg">
                  <div className="price flex-col">
                    <div className="flex start gap-2">
                      <div className="money text-base font-bold text-logout-color">
                        MRP
                      </div>
                      <div className="money text-text-green text-base">
                        <b>Rs. {product.price}</b>
                      </div>
                    </div>
                    <div className="text-nav-active text-sm pl-1">
                      Inclusive of all taxes
                    </div>
                    <div className="pl-2 text-base text-black-heading mt-2">
                      {product.description}
                    </div>
                    <div className="text-text-green font-bold text-sm pl-1">
                      <p>Category : {product.category}</p>
                      <p>Stock : {product.stock === 0 ? (<p className="text-logout-color">Out Of Stock</p>) : product.stock}</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={deleteProduct}
                  className="bg-logout-color w-1/3 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
                >
                  Delete Product
                </Button>
              </div>
            </div>
            <hr className="border-t-2" />
            {/* Product details */}
            <div className="flex flex-col mt-4 p-5">
              <div className="mb-4 text-xl font-bold text-nav-color">
                Update Details
              </div>
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
              <div className="w-full text-right">
                <Button
                  width="flex justify-end"
                  className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
                  onClick={saveTheProductInfo}
                >
                  <MdModeEdit className="flex justify-center self-center" />
                  Update Details
                </Button>
              </div>
            </div>
            <hr className="border-t-2" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center gap-9 self-center">
          <img src={NoData} alt="Your Cart is Empty" width="300px" />
          {/* <h1
            className="text-xl text-black-heading font-bold tracking-widest m-3 cursor-pointer"
            onClick={() => navigate("/addproduct")}
          >
            Add Products
          </h1> */}
          <Button
            width="flex justify-end"
            className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
            onClick={() => navigate("/addproduct")}
          >
            <MdModeEdit className="flex justify-center self-center" />
            Add Products
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminProduct;
