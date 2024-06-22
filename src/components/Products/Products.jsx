// Products.jsx
import React, { useEffect } from "react";
import { Card, Filter, Loader } from "../index";
import {
  fetchProducts,
  selectFilteredProducts,
  STATUSES,
} from "../../store/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row  md:flex-nowrap w-full h-full mt-10">
      <div className=" w-full  sm:w-1/4  md:w-1/4 ml-5 xl:w-1/5">
        <Filter />
      </div>
      <div className=" w-full sm:w-3/4 xl:w-4/5 flex flex-wrap gap-2 ml-0 mr-0 md:m-10">
        <div className="w-full">
          {status === STATUSES.LOADING && (
            <div className="flex justify-center self-center w-full">
              <Loader />
            </div>
          )}
          {status === STATUSES.ERROR && (
            <div className="flex justify-center self-center w-full">
              <h1>Something went wrong! Please try again later.</h1>
            </div>
          )}
          {status === STATUSES.IDLE && (
            <div className="flex flex-row flex-wrap justify-center self-center gap-5 md:gap-10 w-full">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-[200px] h-[250px] md:w-[230px] md:h-[285px] shadow-xl"
                >
                  <Card
                    prod={product}
                    className="border-2 shadow-xl border-nav-color hover:border-text-green cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
