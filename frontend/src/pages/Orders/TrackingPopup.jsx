/* eslint-disable no-unused-vars */
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import "./Tracking.css";

const TrackingPopup = ({ order, onClose }) => {
  const statuses = [
    "PENDING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELED",
    "RETURNED",
    "REFUNDED",
  ];

  // Get index of current status for progress tracking
  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>

        <div className="flex items-center space-y-2 flex-col">
          {statuses.map((status, index) => (
            <div
              key={status}
              className={`relative flex items-center ${
                index <= currentStatusIndex ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  index <= currentStatusIndex ? "bg-green-500" : "bg-gray-300"
                } text-white font-semibold transition-all duration-300`}
              >
                {index + 1}
              </div>
              <span className="ml-4 font-medium">{status.replace('_', ' ')}</span>
              {index < statuses.length - 1 && (
                <div className="w-1 h-8 bg-gray-300 ml-4" />
              )}
            </div>
          ))}
        </div>

        <BootstrapButton
          variant="secondary"
          className="mt-8"
          onClick={onClose}
        >
          Close
        </BootstrapButton>
      </div>
    </div>
  );
};

export default TrackingPopup;
