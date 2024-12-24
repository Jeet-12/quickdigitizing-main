import React, { useEffect, useState } from "react";
import { SectionTitle } from "../../components";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data
  const demoOrders = [
    {
      id: nanoid(),
      userId: "1",
      createdAt: "2023-10-01T12:00:00Z",
      subtotal: 150,
      cartItems: [
        {
          title: "Product 1",
          image: "example.com/image1.jpg",
          selectedSize: "M",
          amount: 2,
          price: 50,
        },
        {
          title: "Product 2",
          image: "example.com/image2.jpg",
          selectedSize: "L",
          amount: 1,
          price: 50,
        },
      ],
    },
    {
      id: nanoid(),
      userId: "1",
      createdAt: "2023-10-05T12:00:00Z",
      subtotal: 100,
      cartItems: [
        {
          title: "Product 3",
          image: "example.com/image3.jpg",
          selectedSize: "S",
          amount: 1,
          price: 100,
        },
      ],
    },
    {
      id: nanoid(),
      userId: "1",
      createdAt: "2023-10-10T12:00:00Z",
      subtotal: 200,
      cartItems: [
        {
          title: "Product 4",
          image: "example.com/image4.jpg",
          selectedSize: "XL",
          amount: 2,
          price: 100,
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    setOrders(demoOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg p-8">
          <SectionTitle title="Order History" path="Home | Order History" />

          {orders.length === 0 ? (
            <NoOrders />
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

const NoOrders = () => (
  <div className="text-center">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      No orders in your history
    </h1>
    <Link
      to="/shop"
      className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition"
    >
      Start Shopping
    </Link>
  </div>
);

const OrderList = ({ orders }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {orders.map((order) => (
      <OrderCard key={order.id} order={order} />
    ))}
  </div>
);

const OrderCard = ({ order }) => {
  const calculateTotal = (subtotal) => subtotal + 50 + subtotal * 0.2;

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
      </div>
      <div className="space-y-4">
        {order.cartItems.map((item, index) => (
          <div key={nanoid()} className="flex items-center space-x-4">
            <img
              src={`https://${item.image}`}
              alt={item.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">
                Size: {item.selectedSize}, Qty: {item.amount}
              </p>
              <p className="text-sm text-gray-600">
                ${(item.price * item.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 mt-4 space-y-2">
        <p className="text-sm text-gray-600">Subtotal: ${order.subtotal}</p>
        <p className="text-sm text-gray-600">Shipping: $50</p>
        <p className="text-sm text-gray-600">
          Tax (20%): ${(order.subtotal * 0.2).toFixed(2)}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Total: ${calculateTotal(order.subtotal).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;
