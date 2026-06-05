import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../store/shopSlice";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.shop.products);
  const cartItems = useSelector((state) => state.shop.cartItems);
  const delivery_fee = useSelector((state) => state.shop.delivery_fee);
  const token = useSelector((state) => state.shop.token);
  const backendUrl = useSelector((state) => state.shop.backendUrl);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "zipcode" || name === "phone") {
      value = value.replace(/\D/g, "");
    }
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.street.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.zipcode.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.phone.trim() !== "";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 1. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 2. Phone number validation (must be 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number (must be 10 digits)");
      return;
    }

    // 3. Zipcode validation (4 to 10 digits)
    const zipRegex = /^\d{4,10}$/;
    if (!zipRegex.test(formData.zipcode)) {
      toast.error("Please enter a valid zipcode (4-10 digits)");
      return;
    }

    try {
      let orderItems = [];
      for (const itemsId in cartItems) {
        for (const size in cartItems[itemsId]) {
          if (cartItems[itemsId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemsId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemsId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      // Calculate total amount
      let subTotal = 0;
      orderItems.forEach((item) => {
        subTotal += item.price * item.quantity;
      });
      const totalAmount = subTotal + delivery_fee;

      // Call Place Order API
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        { items: orderItems, amount: totalAmount, address: formData },
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(setCartItems({}));
        toast.success(response.data.message);
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]  "
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORNATION"}></Title>
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            required
          />
        </div>
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
        />
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="city name"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="state name"
            required
          />
        </div>
        <div className="flex gap-3 items-end w-full">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="zipcode">Zipcode</label>
            <input
              id="zipcode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              placeholder="zipcode "
              required
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="country name"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-500 font-medium" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phonenumber "
            required
          />
        </div>
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-black" : "bg-white"
                  }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${method === "razorpay" ? "bg-black" : "bg-white"
                  }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-black" : "bg-white"
                  }`}
              ></p>
              <p className="text-gray-800 text-sm font-medium mx-4 ">
                CASH ON DELIVERY
              </p>{" "}
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`bg-black text-white px-16 py-3 text-sm transition-all duration-300 ${!isFormValid
                  ? "opacity-50 cursor-not-allowed"
                  : "active:bg-gray-700 cursor-pointer"
                }`}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
