import Table from "../components/common/Table";
import { useEffect, useState } from "react";

const fetchOrders = async () => {
  return [
    {
      date: "2023-10-05",
      orderId: "12345",
      phone: 1234567890,
      price: 100,
      product: [
        {
          desc: "Sample product",
          image: "sample.jpg",
          name: "Product 1",
          price: 100,
          quantity: 1,
          rating: 4.5,
        },
      ],
      status: "Delivered",
      username: "John Doe",
    },
  ];
};

const Orders = () => {
  const [orderStore, setOrderStore] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders();
      setOrderStore(ordersData);
    };
    getOrders();
  }, []);

  console.log(orderStore);
  return (
    <div>
      <Table orders={orderStore} />
    </div>
  );
};

export default Orders;
