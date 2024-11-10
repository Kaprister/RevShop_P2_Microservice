/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Head from "../../components/common/Head";
import Button from "../../components/common/Button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function Checkout() {
    const { state } = useLocation();
    const directPurchase = state?.directPurchase;
    console.log("data from cart : " , state);
    

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [billingAddress, setBillingAddress] = useState("");
    const navigate = useNavigate();
    const userName = useSelector((state) => state.auth.userInfo.username);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userName) {
                // Fetch cart items from backend API here
            }
        };

        if (directPurchase) {
            setCartItems([directPurchase]);
            calculateTotal([directPurchase]);
        } else {
            fetchCartItems();
        }
    }, [userName, directPurchase]);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
        setTotal(totalAmount);
    };

    const handleBillingAddressChange = (e) => {
        setBillingAddress(e.target.value);
    };

    const placeOrder = async () => {
        if (!userName || cartItems.length === 0) return;

        const orderId = uuidv4();
        const orderData = {
            orderId,
            username: userName,
            phone: `1234567890`,
            price: total,
            date: new Date().toISOString(),
            status: 'Pending',
            product: cartItems,
            paymentMethod,
            billingAddress,
        };

        // Replace with API call using Axios in the future

        setIsModalOpen(true);
        setCartItems([]);
        setOrderId(orderId);
    };

    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12 flex justify-between items-center mt-6">
                <Head h1="Check" h2="out" />
            </div>
            <div className="mx-auto max-w-screen-xl px-4 flex pb-8 flex-col-reverse md:flex-row lg:flex-row">
                <div className="w-full md:w-7/12 lg:w-3/4 pe-0 md:pe-12 lg:pe-12">
                    
                    {/* Billing Address Section */}
                    <h2 className="border-b-2 border-[#c4c4c4] pb-3 pt-4 bg-grey-900 mb-2 text-xl font-bold">Billing Address</h2>
                    <form className="flex flex-col gap-5">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Enter your billing address"
                            onChange={handleBillingAddressChange}
                        ></textarea>
                    </form>

                    {/* Payment Option Section with Enhanced UI */}
                    <h2 className="border-b-2 border-[#c4c4c4] pb-3 pt-4 bg-grey-900 mb-2 text-xl font-bold">Payment Option</h2>
                    <div className="flex gap-4 mt-4">
                        <label className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                checked={paymentMethod === "online"}
                                onChange={() => setPaymentMethod("online")}
                                className="radio radio-primary"
                            />
                            <span className="font-bold">Online Payment</span>
                        </label>
                        <label className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                className="radio radio-primary"
                            />
                            <span className="font-bold">Cash on Delivery</span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <Button text="Back" color="myred" onClick={() => navigate('/home/shop/cart')} />
                        <Button text="Place Order" color="myyellow" onClick={placeOrder} />
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="w-full md:border-s-2 lg:border-s-2 border-[#c4c4c4] md:w-4/12 lg:w-1/4 ps-0 md:ps-8 lg:ps-8">
                    <h2 className="pb-3 pt-4 text-xl font-bold">ORDER SUMMARY</h2>
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.name}>
                                <div className="flex justify-between">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="font-medium">${item.price}</p>
                                </div>
                                <div className="flex justify-between">
                                    <span>Qty</span>
                                    <span>{item.quantity || 1}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sub-total</span>
                                    <span>${(item.price || 0) * (item.quantity || 1)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-[#c4c4c4] py-4">
                        <div className="flex justify-between py-3">
                            <span className="text-xl font-medium">Total</span>
                            <span className="text-xl font-bold">${total}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Congratulations!</h3>
                        <p>Your order has been placed successfully.</p>
                        <p>Order ID: {orderId}</p>
                        <div className="modal-action">
                            <Link to={'/home/shop'}>
                                <button onClick={() => setIsModalOpen(false)} className="btn bg-mygreen">Continue Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Checkout;
