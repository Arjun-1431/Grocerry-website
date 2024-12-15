import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  // Slicing the products for display
  const homeProductCartList = productData.slice(20, 25);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  // Scroll functions for the vegetable slider
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      {/* Top section */}
      <div className="md:flex gap-4 py-2">
        {/* Left Section */}
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt="Bike Delivery"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Seamless Online Experience: Our user-friendly platform is designed
            to enhance your shopping experience. With easy navigation, detailed
            product descriptions, and secure payment options, we aim to make
            your ordering process hassle-free and enjoyable.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        {/* Right Section */}


        {/* <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList.length > 0
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((_, index) => (
                <HomeCard key={index + "loading"} loading={"Loading..."} />
              ))}
        </div> */}
        {homeProductCartList.length > 0
  ? homeProductCartList.map((el) => {
      return (
        <div key={el._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
              src={el.image}
              alt={el.name}
              className="w-full h-48 object-cover" // Ensures the image fills the space consistently
            />
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold">{el.name}</h3>
              <p className="text-sm text-gray-500">{el.category}</p>
              <p className="text-xl font-bold text-red-500">₹ {el.price}</p>
            </div>
          </div>
        </div>
      );
    })
  : loadingArray.map((_, index) => (
      <HomeCard key={index + "loading"} loading={"Loading..."} />
    ))}










      </div>

      {/* Fresh Vegetables Section */}
      <div className="py-6">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables.length > 0
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((_, index) => (
                <CardFeature
                  loading="Loading..."
                  key={index + "cartLoading"}
                />
              ))}
        </div>
      </div>

      {/* All Products Section */}
      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
