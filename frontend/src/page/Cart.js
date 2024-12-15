import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address:"",
    productName: productCartItem.map((item) => item.name).join(", "),
  });

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const isFormValid =
    formDetails.fullName && formDetails.email && formDetails.mobileNumber && formDetails.address;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handlePayment = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all the required details.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      if (!res.ok) throw new Error("Failed to initiate payment");

      const data = await res.json();
      console.log("Order created:", data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handlePaymentVerify = (data) => {
    if (!window.Razorpay) {
      toast.error("Razorpay is not loaded. Please try again later.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Your Store Name",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              amount: totalPrice,
              ...formDetails,
            }),
          });

          if (!res.ok) throw new Error("Verification failed");

          const verifyData = await res.json();
          toast.success(verifyData.message || "Payment verified successfully");
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Payment verification failed. Please contact support.");
        }
      },
      theme: { color: "#5f63b8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
  {productCartItem[0] ? (
    <div className="my-4 flex flex-col md:flex-row gap-6">
      {/* Display Cart Items */}
      <div className="w-full md:w-2/3">
        {productCartItem.map((el) => (
          <CartProduct
            key={el._id}
            id={el._id}
            name={el.name}
            image={el.image}
            category={el.category}
            qty={el.qty}
            total={el.total}
            price={el.price}
          />
        ))}
      </div>

      {/* Total Summary & Payment */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold bg-blue-500 text-white p-3 rounded-md">
          Summary
        </h2>

        <div className="flex justify-between items-center border-b py-3 text-lg">
          <p>Total Qty:</p>
          <p className="font-semibold">{totalQty}</p>
        </div>

        <div className="flex justify-between items-center border-b py-3 text-lg">
          <p>Total Price:</p>
          <p className="font-semibold text-red-500">
            ₹ {totalPrice}
          </p>
        </div>

        {/* Payment Form */}
        <div className="mt-4 space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formDetails.fullName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formDetails.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formDetails.mobileNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="tel"
            name="address"
            placeholder="Full address"
            value={formDetails.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          className="bg-red-500 w-full py-3 text-lg font-bold text-white rounded-md mt-4 hover:bg-red-600 transition duration-300"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  ) : (
    <div className="my-8 text-center">
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        className="w-64 mx-auto mb-4"
      />
      <p className="text-lg font-semibold text-gray-600">No Items In Cart</p>
    </div>
  )}
</div>

      </div>
    </>
  );
};

export default Cart;
