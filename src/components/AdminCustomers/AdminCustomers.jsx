import React, { useEffect, useState } from "react";
import productService from "../../appwrite/product";
import Empty from "../../assets/empty.svg";
import Man from "../../assets/man.png";
import ReactStarsRating from "react-awesome-stars-rating";
import { MdDeleteOutline } from "react-icons/md";

function AdminCustomers() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await productService.getAdminProducts();
      setProducts(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const deleteReview = async (reviewId, productId) => {
    try {
      const resp = await productService.deleteProductReview(
        productId,
        reviewId
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center self-center">
          <img src={Empty} alt="Your Cart is Empty" width="300px" />
          <h1 className="text-xl text-black-heading font-bold tracking-widest m-3">
            No Products!! Start adding products now!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-5 self-center justify-center m-auto w-3/4 mt-10">
          {products.map((product) => (
            <div className="w-full m-5">
              <div className="text-nav-color font-bold text-xl tracking-wider">
                {product.name}
              </div>
              <div className="bg-nav-white rounded-lg m-3">
                {product.reviews.map((review) => (
                  <div key={review._id} className="flex flex-col gap-2 p-4">
                    <div className="flex justify-between">
                      <div className="flex gap-1 text-black-heading text-base font-bold">
                        <img width="30" height="30" src={Man} alt="user" />
                        {capitalizeName(review.name)}
                      </div>
                      <div className="text-nav-active text-base font-bold flex flex-row gap-2 text-center self-center">
                        <ReactStarsRating
                          isHalf
                          className="flex gap-1"
                          size={15}
                          value={review.rating}
                        />
                      </div>
                    </div>
                    <div className="text-nav-active text-sm pl-4">
                      <div className="flex justify-between">
                        {review.comment}
                        {/* {review.user} */}
                        {
                          <p
                            onClick={() =>
                              deleteReview(review._id, product._id)
                            }
                            className="cursor-pointer font-bold text-logout-color text-base"
                          >
                            {" "}
                            <MdDeleteOutline />
                          </p>
                        }
                      </div>
                      <hr />
                    </div>
                  </div>
                ))}
                {product.reviews.length === 0 && (
                  <>
                    <div className="flex flex-col gap-2 p-4">
                      <div className=" text-nav-active">No Reviews</div>
                      <div className=" text-text-green">
                        Number of Buyers: {product.customers}
                      </div>
                      <div className=" text-text-green">
                        Total Profit: {product.totalProfit}
                      </div>
                      <div></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AdminCustomers;
