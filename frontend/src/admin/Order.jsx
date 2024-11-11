import Table from "../components/common/Table";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

// const fetchOrders = async () => {
//   return [
//     {
//       date: "2023-10-05",
//       orderId: "12345",
//       phone: 1234567890,
//       price: 100,
//       product: [
//         {
//           desc: "Sample product",
//           image: "sample.jpg",
//           name: "Product 1",
//           price: 100,
//           quantity: 1,
//           rating: 4.5,
//         },
//       ],
//       status: "Delivered",
//       username: "John Doe",
//     },
//   ];
// };

const fetchOrders = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8084/orders/user-order/${userId}`); // Replace with your order-service URL
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

const Orders = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const userId = userInfo.id;
  const [orderStore, setOrderStore] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders(userId);
      setOrderStore(ordersData);
    };
    getOrders();
  }, [userId]);

  console.log(orderStore);
  return (
    <div>
      <Table orders={orderStore} />
    </div>
  );
};

export default Orders;
