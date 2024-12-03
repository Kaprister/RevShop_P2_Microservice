<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Page</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Header -->
    <jsp:include page="./components/header.jsp" />

    <main class="main mx-auto max-w-screen-xl px-4 pt-8 mx-24">
        <div class="flex justify-between items-center mt-6">
            <h1 class="text-3xl font-bold">Checkout</h1>
        </div>

        <div class="flex flex-col-reverse md:flex-row lg:flex-row pb-8 gap-6">
            <!-- Left Section -->
            <div class="w-full md:w-7/12 lg:w-3/4">
                <!-- Billing Address Section -->
                <h2 class="border-b-2 border-gray-300 pb-3 pt-4 text-xl font-bold">Billing Address</h2>
                <form id="checkoutForm" class="flex flex-col gap-5">
                    <textarea
                        id="billingAddress"
                        class="textarea textarea-bordered w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your billing address"
                    ></textarea>
                </form>

                <!-- Payment Option Section -->
                <h2 class="border-b-2 border-gray-300 pb-3 pt-4 text-xl font-bold mt-6">Payment Option</h2>
                <div class="flex gap-4 mt-4">
                    <label class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            class="radio radio-primary"
                        />
                        <span class="font-bold">Online Payment</span>
                    </label>
                    <label class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            class="radio radio-primary"
                        />
                        <span class="font-bold">Cash on Delivery</span>
                    </label>
                </div>

                <div class="flex justify-end gap-4 mt-8">
                    <a href="/cart" class="btn bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700">Back</a>
                    <button id="placeOrderBtn" type="button" class="btn bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600">Place Order</button>
                </div>
            </div>

            <!-- Right Section (Order Summary) -->
            <div class="checkout__group">
                <h3 class="section__title">Cart Totals</h3>
                <div class="order__table-wrapper">
                    <div class="order__table-container">
                        <table class="order__table">
                            <thead>
                                <tr>
                                    <th colspan="2">Products</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Cart items will be dynamically injected here -->
                            </tbody>
                        </table>
                    </div>

                    <table class="order__summary">
                        <tbody>
                            <tr>
                                <td><span class="order__subtitle">Subtotal</span></td>
                                <td colspan="2"><span class="table__price">$0.00</span></td>
                            </tr>
                            <tr>
                                <td><span class="order__subtitle">Shipping</span></td>
                                <td colspan="2"><span class="table__price">Free Shipping</span></td>
                            </tr>
                            <tr>
                                <td><span class="order__subtitle">Total</span></td>
                                <td colspan="2"><span class="order__grand-total">$0.00</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <jsp:include page="./components/footer.jsp" />
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="./js/checkout.js"></script>
    <script>
document.getElementById("placeOrderBtn").addEventListener("click", () => {
            const billingAddress = document.getElementById("billingAddress").value.trim();
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

            if (!billingAddress || !paymentMethod) {
                alert("Please complete the form before placing the order.");
                return;
            }

            if (paymentMethod === "online") {
                handleRazorpayPayment();
            } else {
                placeOrder({
                    billingAddress,
                    paymentMethod,
                });
            }
        });

    </script>

    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

</body>
</html>
