import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-1 ">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className="flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounder-l">
          <img className="W-5 H-5" src={assets.add_icon} />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounder-l">
          <img className="W-5 H-5" src={assets.order_icon} />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounder-l">
          <img className="W-5 H-5" src={assets.order_icon} />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          to="/change-password"
          className="flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounder-l">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <p className="hidden md:block">Change Password</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
