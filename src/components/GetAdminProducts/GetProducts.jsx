import React, { useEffect, useState, useCallback } from "react";
import productService from "../../appwrite/product.js";
import AdminCard from "./AdminCards.jsx";
import { Loader } from "../index.js";

function GetAdminProducts() {
  const [products, setProducts] = useState([]);

  const getAllAdminProducts = useCallback(async () => {
    try {
      const response = await productService.getAdminProducts();
      setProducts(response);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getAllAdminProducts();
  }, [getAllAdminProducts]);

  return (
    <div className="w-4/5 flex flex-col mt-5 gap-5">
      <h1 className="font-bold text-xl tracking-wider text-nav-color">All Products ({products.length})</h1>
      <div className="flex flex-col justify-center self-center w-full lg:w-4/5">
        {products.length > 0 ? (
          products.map((product) => <AdminCard product={product} />)
        ) : (
          <div className="flex justify-center self-center gap-10 w-full">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default GetAdminProducts;
