import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import productService from "../../appwrite/product";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import {
  addToCart,
  updateQty,
  removeFromCart,
} from "../../store/cart/cartSlice";
import { Button, Input, Loader } from "../index";
import Man from "../../assets/man.png";
import ReactStarsRating from "react-awesome-stars-rating";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [qty, setQty] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  console.log(user);
  const [reviewDataByUser, setReviewDataByUser] = useState({
    comment: "",
    rating: null,
  });
  const [addingComment, setAddingComment] = useState(false);

  const fetchProductData = useCallback(async () => {
    try {
      const data = await productService.getProductById(id);
      console.log(data)
      const reviewData = await productService.getProductByReviewId(id);
      setProduct(data);
      setReviews(reviewData.slice(-2));
    } catch (error) {
      console.error("Failed to fetch product data", error);
    }
  }, [id]);

  useEffect(() => {
    // const fetchProductData = async () => {
    //   try {
    //     const data = await productService.getProductById(id);
    //     const reviewData = await productService.getProductByReviewId(id);
    //     setProduct(data);
    //     setReviews(reviewData.slice(reviewData.length - 2, reviewData.length));
    //   } catch (error) {
    //     console.error("Failed to fetch product data", error);
    //   }
    // };

    fetchProductData();
  }, [fetchProductData, addingComment]);

  useEffect(() => {
    if (product) {
      const itemInCart = cart.find((item) => item.product._id === product._id);
      setIsInCart(Boolean(itemInCart));
      setQty(itemInCart ? itemInCart.qty : 0);
    }
  }, [cart, product, addingComment]);

  const handleAddToCart = () => {
    setIsInCart(true);
    dispatch(addToCart({ qty: 1, product }));
  };

  const handleIncrement = () => {
    const newQty = qty + 1;
    if (newQty > product.stock) {
      setQty(product.stock);
      dispatch(updateQty({ id: product._id, qty: product.stock }));
      return;
    }
    setQty(newQty);
    dispatch(updateQty({ id: product._id, qty: newQty }));
  };

  const handleDecrement = () => {
    const newQty = qty - 1;
    if (newQty > 0) {
      setQty(newQty);
      dispatch(updateQty({ id: product._id, qty: newQty }));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewDataByUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddingAComment = async () => {
    try {
      await productService.addReview(reviewDataByUser, id);
      setAddingComment(false);
      const reviewData = await productService.getProductByReviewId(id);
      setReviews(reviewData.slice(reviewData.length - 2, reviewData.length));
    } catch (error) {
      console.error("Failed to add review", error);
    }
  };

  const deleteReview = async (reviewId, productId) => {
    try {
      const resp = await productService.deleteProductReview(
        productId,
        reviewId
      );
      fetchProductData();
    } catch (error) {
      console.log(error);
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
              <div className="flex flex-col w-full md:w-1/3">
                <div className="h-50 w-50 md:h-50 md:w-50 rounded-2xl border-2 border-gray flex justify-center self-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl"
                  />
                </div>
              </div>
              {/* Description and price */}
              <div className=" w-4/5 mt-5 md:mt-0 md:w-2/3 mx-auto md:px-20">
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
                  </div>
                </div>
                {!isInCart ? (
                  product.stock > 0 && (
                    <Button
                      onClick={handleAddToCart}
                      className="bg-button-color w-1/3 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
                    >
                      ADD TO CART
                    </Button>
                  )
                ) : (
                  <div className="flex flex-row w-2/3 lg:w-1/2 xl:w-1/3 justify-center self-center bg-button-color text-nav-white font-semibold px-3 py-1 rounded-xl gap-2">
                    <p
                      className="text-2xl cursor-pointer"
                      onClick={handleDecrement}
                    >
                      -
                    </p>
                    <p className="flex justify-center self-center">
                      Qty: {qty}
                    </p>
                    <p
                      className="text-2xl cursor-pointer"
                      onClick={handleIncrement}
                    >
                      +
                    </p>
                  </div>
                )}
              </div>
            </div>
            <hr className="border-t-2 mt-3" />
            {/* Product details */}
            <div className="flex flex-col mt-4 p-5">
              <div className="mb-4 text-xl font-bold text-nav-color">
                Product Details
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-1 sm:gap-5 justify-center self-center p-4">
                <div className=" w-full sm:w-1/2">
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">Name</div>
                    <div className="text-text-green text-sm font-medium">
                      {product.name}
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">Category</div>
                    <div className="text-text-green text-sm font-medium">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">Left Stock</div>
                    <div className="text-text-green text-sm font-medium">
                      {product.stock === 0 ? (
                        <p className="text-logout-color">Out Of Stock</p>
                      ) : (
                        product.stock
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">Price</div>
                    <div className="text-text-green text-sm font-medium">
                      {product.price}
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">Rating</div>
                    <div className="text-text-green text-sm font-medium">
                      {product.rating}
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pr-2 pl-2">
                    <div className="text-nav-color font-medium">
                      No. Of Reviews
                    </div>
                    <div className="text-text-green text-sm font-medium">
                      {product.numReviews}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t-2" />
            {/* Reviews */}
            <div className="flex flex-col p-5">
              <div className="mb-4 text-xl font-bold text-nav-color">
                Ratings & Reviews
              </div>

              {reviews &&
                reviews.map((review) => (
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
                        {review.user}
                        { isAuthenticated && review.user === user._id && (
                          <p
                            onClick={() =>
                              deleteReview(review._id, product._id)
                            }
                            className="cursor-pointer font-bold text-logout-color text-base"
                          >
                            {" "}
                            <MdDeleteOutline />
                          </p>
                        )}
                      </div>
                      <hr />
                    </div>
                  </div>
                ))}
              {addingComment && (
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex justify-between">
                    <div className="flex gap-1 text-black-heading text-base font-bold">
                      <img width="30" height="30" src={Man} alt="user" />
                      {capitalizeName(user.fullname)}
                    </div>
                  </div>
                  <div className="text-nav-active text-sm pl-4 flex flex-col gap-2">
                    <Input
                      type="text"
                      name="comment"
                      value={reviewDataByUser.comment}
                      placeholder="Add your Comment"
                      className="text-sm font-medium text-heading-color border-b border-text-heading"
                      onChange={handleChange}
                    />
                    <Input
                      type="Number"
                      name="rating"
                      value={reviewDataByUser.rating}
                      placeholder="Add your Rating"
                      className="text-sm font-medium text-heading-color border-b border-text-heading"
                      onChange={handleChange}
                    />
                    {addingComment && (
                      <div className="flex gap-2 w-full">
                        <Button
                          width="flex justify-end w-full"
                          onClick={onAddingAComment}
                          className="bg-button-color w-3/4 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
                        >
                          Submit
                        </Button>
                        <Button
                          width="flex justify-end w-full"
                          onClick={() => setAddingComment(false)}
                          className="bg-button-color w-3/4 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <hr className="border-t-2" />
            {/* Review form */}
            <div>
              {!addingComment && isAuthenticated && (
                <Button
                  width="flex justify-end"
                  onClick={() => setAddingComment(true)}
                  className="bg-button-color w-1/2 sm:w-1/4 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
                >
                  Add a Review
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center self-center gap-10 w-full">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Product;
