import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.get(backendUrl + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchOrders();
        // If the updated order is currently selected, update its status in selectedOrder state too
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: e.target.value }));
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6">Customer Orders</h3>

      {/* Orders Grid/List */}
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr_1fr_1fr_1.2fr] gap-4 items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white text-sm text-gray-700"
          >
            {/* Customer & Date */}
            <div>
              <p className="font-bold text-gray-900">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Items: {order.items.length}
              </p>
            </div>

            {/* Address snippet */}
            <div>
              <p className="font-medium">{order.address.street}</p>
              <p className="text-xs text-gray-500">
                {order.address.city}, {order.address.state}, {order.address.zipcode}
              </p>
            </div>

            {/* Total price */}
            <p className="font-bold text-gray-900">
              Rs {order.amount}
            </p>

            {/* Status Select */}
            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="p-2 border border-gray-300 rounded font-semibold bg-gray-50 text-xs"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* View Details Button */}
            <button
              onClick={() => setSelectedOrder(order)}
              className="bg-black hover:bg-gray-800 text-white text-xs py-2 px-3 rounded transition-colors font-medium text-center"
            >
              View Products
            </button>
          </div>
        ))}
      </div>

      {/* Modal / Overlay for Order Details & Products */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  Order Details
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  ID: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              {/* Customer Info Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Customer Info</h5>
                  <p className="text-sm font-medium">
                    {selectedOrder.address.firstName} {selectedOrder.address.lastName}
                  </p>
                  <p className="text-sm text-gray-600">Email: {selectedOrder.address.email}</p>
                  <p className="text-sm text-gray-600">Phone: {selectedOrder.address.phone}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Delivery Address</h5>
                  <p className="text-sm text-gray-600">{selectedOrder.address.street}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.address.country}</p>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Products in Order</h5>
                <div className="flex flex-col gap-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg"
                    >
                      <img
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                        src={item.image[0]}
                        alt={item.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: <span className="font-bold text-gray-700">{item.size}</span> | Qty: <span className="font-bold text-gray-700">{item.quantity}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          Rs {item.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          Total: Rs {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Order Status:</span>
                <span className="text-sm font-bold px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                  {selectedOrder.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-5 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
