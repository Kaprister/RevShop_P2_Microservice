import { useEffect, useState } from 'react';
import Head from '../components/common/Head';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Mock data to replace supabase fetching
      const data = [
        {
          transactionId: "12345",
          username: "John Doe",
          phone: "1234567890",
          price: 150.5,
          date: "2023-10-05",
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
          status: "delivered",
        },
      ];

      if (!data) {
        console.error('Error fetching transactions');
        setError('Failed to fetch transactions.');
      } else {
        console.log('Fetched transactions:', data);
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
      <Head h2="Transactions" />
      {error && <p className="text-red-500 text-center mb-4 mt-6">{error}</p>}
      <table className="table w-full text-left bg-white rounded-lg shadow-md mt-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Username</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Price</th>
            <th className="p-3">Date</th>
            <th className="p-3">Product</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId} className="border-gray-200">
              <td className="p-3">{transaction.transactionId}</td>
              <td className="p-3">{transaction.username}</td>
              <td className="p-3">{transaction.phone}</td>
              <td className="p-3">₹{transaction.price.toFixed(2)}</td>
              <td className="p-3">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="p-3 flex items-center space-x-2">
                {transaction.product.length > 0 ? (
                  <>
                    <img
                      src={transaction.product[0].image}
                      alt={transaction.product[0].name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{transaction.product[0].name}</p>
                      <p>₹{transaction.product[0].price.toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <p>No Product</p>
                )}
              </td>
              <td className="p-3 capitalize">
                {transaction.status === "pending" ? (
                  <span className='bg-myyellow p-2 font-semibold rounded-md text-mywhite'>{transaction.status}</span>
                ) : (
                  <span className='bg-mygreen p-2 rounded-md text-mywhite font-semibold'>{transaction.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
