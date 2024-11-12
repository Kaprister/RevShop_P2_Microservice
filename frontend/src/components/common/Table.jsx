import { useState } from "react";
import { Link } from "react-router-dom";
import Head from "../common/Head";
import Button from "../common/Button";

const Table = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPopthis, setShowPopthis] = useState(false);

  const totalPages = Math.ceil(orders.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowPopthis(true);
  };

  const handleClosePopthis = () => {
    setShowPopthis(false);
    setSelectedOrder(null);
  };

  const Popthis = ({ order, onClose }) => {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-mywhite bg-opacity-50"></div>
          <div className="relative p-8 rounded-lg shadow-lg w-1/2 bg-mywhite text-black">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-4 mr-4 text-xl"
            >
              &times;
            </button>
            <div className="mb-4 text-lg">
              <strong>Billing Address:</strong> {order.billingAddress}
            </div>
            <div className="mb-4 text-lg">
              <strong>Status:</strong> {order.status}
            </div>
            <div className="mb-4 text-lg">
              <strong>Total Amount:</strong> ${order.totalAmount}
            </div>
            <div className="mb-4 text-lg">
              <strong>User ID:</strong> {order.userId}
            </div>
            <div className="mb-4 text-lg">
              <strong>Order Type:</strong> {order.orderType}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
        <Head h2="Orders" />
      </div>
      <div className="pl-10 w-full max-w-6xl mx-auto mb-32">
        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table w-full max-w-full">
            <thead>
              <tr className="text-neutral">
                <th>ID</th>
                <th className="pl-10">Billing Address</th>
                <th className="pl-10">Status</th>
                <th className="pl-10">Total Amount</th>
                <th className="pl-10">User ID</th>
                <th className="pl-10">Order Type</th>
                <th className="pl-10">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}
                >
                  <td>{order.id}</td>
                  <td className="pl-10">{order.billingAddress}</td>
                  <td>
                    {" "}
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
                  <td className="pl-10">${order.totalAmount}</td>
                  <td className="pl-10">{order.userId}</td>
                  <td className="pl-10">{order.orderType}</td>
                  <td className="pl-10">
                    <Link to="#">
                      <Button
                        text="View"
                        color="mygreen"
                        hover="myyellow"
                        onClick={() => handleViewClick(order)}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-2 px-3 py-1 rounded-md text-sm focus:outline-none ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {showPopthis && selectedOrder && (
        <Popthis order={selectedOrder} onClose={handleClosePopthis} />
      )}
    </>
  );
};

export default Table;
