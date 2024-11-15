import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../components/common/Head';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/payments');
        const data = response.data;

        if (!data) {
          console.error('Error fetching transactions');
          setError('Failed to fetch transactions.');
        } else {
          console.log('Fetched transactions:', data);
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions.');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
      <Head h1= "Online" h2="Transactions" />
      {error && <p className="text-red-500 text-center mb-4 mt-6">{error}</p>}
      <table className="table w-full text-left bg-white rounded-lg shadow-md mt-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Payment ID</th>
            {/* <th className="p-3">Payment Link</th> */}
            <th className="p-3">User ID</th>
            <th className="p-3">Total Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-gray-200">
              <td className="p-3">{transaction.id}</td>
              <td className="p-3">{transaction.orderId}</td>
              <td className="p-3">{transaction.paymentId}</td>
              {/* <td className="p-3">
                <a href={transaction.paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {transaction.paymentLink}
                </a>
              </td> */}
              <td className="p-3">{transaction.userId}</td>
              <td className="p-3">₹{transaction.totalAmount.toFixed(2)}</td>
              <td className="p-3 capitalize">
                {transaction.status === "INITIATED" ? (
                  <span className='bg-yellow-500 p-2 font-semibold rounded-md text-white'>{transaction.status}</span>
                ) : (
                  <span className='bg-green-500 p-2 rounded-md text-white font-semibold'>{transaction.status}</span>
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