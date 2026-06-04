import React from "react";
import { useSelector } from "react-redux";
import { selectCartAmount } from "../store/shopSlice";
import Title from "./Title";

const CartTotal = () => {
  const currency = useSelector((state) => state.shop.currency);
  const delivery_fee = useSelector((state) => state.shop.delivery_fee);
  const cartAmount = useSelector(selectCartAmount);
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
