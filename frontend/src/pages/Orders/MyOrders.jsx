/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import ReturnExchangePopup from "./ReturnExchangePopup";
import { Link, useNavigate } from "react-router-dom";
import Head from "../../components/common/Head";
import { Button as BootstrapButton } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnExchangeOrder, setReturnExchangeOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const userName = useSelector((state) => state.auth.userInfo.username);
  const {userInfo} = useSelector((state) => state.auth);
  const userId = userInfo.id;
  const navigate = useNavigate();

  const handleViewClick = (index) => {
    setOpenDropdown(index === openDropdown ? null : index);
  };

  const handleInvoiceClick = (order) => {
    setSelectedOrder(order);
    setOpenDropdown(null);
  };

  const handleReturnClick = (order) => {
    setReturnExchangeOrder(order);
    setOpenDropdown(null);
  };

  const handleBuyAgainClick = async (order) => {
    try {
      const products = order.orderLineItems.map((p) => ({
        name: p.name,
        image: p.image,
        price: p.price,
        quantity: p.quantity,
        desc: null, // Assuming desc is not available in API data
        ratings: 0, // Assuming ratings is not available in API data
        size: null, // Assuming size is not available in API data
      }));

      await addToCart(userName, products);
      navigate("/home/shop/cart");
    } catch (err) {
      console.error("Error adding items to the cart: ", err);
    }
  };

  const addToCart = async (userName, products) => {
    // You can use your existing logic here or modify based on your API.
  };

  const handleCancelClick = async (order) => {
    // Handle cancel logic here
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleCloseReturnExchangePopup = () => {
    setReturnExchangeOrder(null);
  };

  const handleReturnExchangeSubmit = (type, details) => {
    console.log(`${type} action submitted for order ${returnExchangeOrder?.orderId}: ${details}`);
  };

  // Fetch orders from the given API endpoint
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/orders/user-order/${userId}`
        );
        const fetchedOrders = response.data;
        

        // Map API response to the structure needed for the component
        const formattedOrders = fetchedOrders.map((order) => ({
          orderId: order.id.toString(),
          product: order.orderLineItems.map((item) => ({
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            desc: null, // Add additional data if needed
            ratings: 0, // Default ratings
            size: null, // Add additional data if needed
          })),
          price: order.totalAmount,
          date: new Date().toLocaleDateString(), // Assuming current date for now
          status: order.status,
          phone: null, // Add phone number if needed
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders: ", err);
      }
    };

    if (userName) fetchOrdersData();
  }, [userName]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };


  return (
    <>
      {orders.length > 0 ? (
        <>
          <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
            <Head h1="My" h2="Orders" />
          </div>

          <div className="w-2/3 mx-auto mb-32 mt-12">
            <div className="overflow-x-auto rounded-lg border border-base-300">
              <table className="table w-full">
                <thead>
                  <tr className="text-neutral">
                    <th>Order No.</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="pl-12">Action</th>
                  </tr>
                </thead>
                <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}>
                            <td>{truncateText(order.orderId, 10)}</td>
                            <td>
                                {/* Loop through the products for each order */}
                                {order.product.map((product, productIndex) => (
                                <div className=" font-medium" key={productIndex}>
                                    {product.name}
                                    <br />
                                    {/* Optionally display the quantity, if needed */}
                                    Quantity: {product.quantity}
                                </div>
                                ))}
                            </td>
                            <td>${order.price}</td>
                            <td>{order.date}</td>
                            <td>
                                <span
                                className={`badge ${
                                    order.status === "Paid"
                                    ? "badge-success badge-outline"
                                    : order.status === "Cancelled"
                                    ? "badge-error badge-outline"
                                    : "badge-warning badge-outline"
                                }`}
                                >
                                {order.status}
                                </span>
                            </td>
                            <td>
                                <div className="relative">
                                <BootstrapButton
                                    className="btn btn-secondary dropdown-toggle bg-mygreen hover-myyellow"
                                    type="button"
                                    id="dropdownMenuButton"
                                    aria-expanded="false"
                                    style={{ borderColor: "#ffffff" }}
                                    onClick={() => handleViewClick(index)}
                                >
                                    View
                                </BootstrapButton>
                                {openDropdown === index && (
                                    <ul
                                    className="dropdown-menu absolute right-0 mt-2 py-1 w-48 bg-mywhite border rounded shadow-md z-10"
                                    aria-labelledby="dropdownMenuButton"
                                    >
                                    <li>
                                        <Link to="#">
                                        <button
                                            className="dropdown-item w-full text-left px-4 py-2"
                                            onClick={() => handleInvoiceClick(order)}
                                        >
                                            Invoice
                                        </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                        <button
                                            className="dropdown-item w-full text-left px-4 py-2"
                                            onClick={() => handleReturnClick(order)}
                                        >
                                            Return/Exchange
                                        </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                        <button
                                            className="dropdown-item w-full text-left px-4 py-2"
                                            onClick={() => handleBuyAgainClick(order)}
                                        >
                                            Buy Again
                                        </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                        <button
                                            className="dropdown-item w-full text-left px-4 py-2"
                                            onClick={() => handleCancelClick(order)}
                                        >
                                            Cancel Order
                                        </button>
                                        </Link>
                                    </li>
                                    </ul>
                                )}
                                </div>
                            </td>
                            </tr>
                        ))}
                </tbody>

              </table>
            </div>
          </div>
          {selectedOrder && <Popup order={selectedOrder} onClose={handleClosePopup} />}
          {returnExchangeOrder && (
            <ReturnExchangePopup
              order={returnExchangeOrder}
              onClose={handleCloseReturnExchangePopup}
              onSubmit={handleReturnExchangeSubmit}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyOrders;
