import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0);
  const { cartItems } = useContext(ShopContext);
  useEffect(() => {
    const fetchCartAmount = async () => {
      const amount = await getCartAmount();
      setCartAmount(amount);
      console.log("amount", amount);
    };
    fetchCartAmount();
  }, [cartItems]);
  return (
    <div className="w-full ">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Sub total</p>
          <p>
            {currency}
            {cartAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>shipping fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {cartAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
