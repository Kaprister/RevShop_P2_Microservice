<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex flex-col items-center p-4">
    <div class="container max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Orders</h2>

        <!-- Orders Table -->
        <div class="overflow-x-auto">
            <table class="table-auto w-full text-left border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-gray-100 text-gray-700">
                        <th class="border border-gray-200 px-4 py-2">ID</th>
                        <th class="border border-gray-200 px-4 py-2">Billing Address</th>
                        <th class="border border-gray-200 px-4 py-2">Status</th>
                        <th class="border border-gray-200 px-4 py-2">Total Amount</th>
                        <th class="border border-gray-200 px-4 py-2">User ID</th>
                        <th class="border border-gray-200 px-4 py-2">Order Type</th>
                        <th class="border border-gray-200 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody id="ordersTableBody"></tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div id="pagination" class="mt-4 flex justify-center"></div>


    </div>

    <!-- Order Details Modal -->
    <div id="orderModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">Order Details</h3>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                    &times;
                </button>
            </div>
            <div class="mt-4">
                <p><strong>Billing Address:</strong> <span id="modalBillingAddress" class="text-gray-700"></span></p>
                <p class="mt-2"><strong>Status:</strong>
                    <select id="modalStatus" class="border border-gray-300 rounded px-3 py-2 w-full mt-1">
                        <option value="PENDING">PENDING</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELED">CANCELED</option>
                        <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                        <option value="REFUNDED">REFUNDED</option>
                        <option value="SHIPPED">SHIPPED</option>
                    </select>
                </p>
                <p class="mt-2"><strong>Total Amount:</strong> $<span id="modalTotalAmount" class="text-gray-700"></span></p>
                <p class="mt-2"><strong>User ID:</strong> <span id="modalUserId" class="text-gray-700"></span></p>
                <p class="mt-2"><strong>Order Type:</strong> <span id="modalOrderType" class="text-gray-700"></span></p>
                <button
                    onclick="updateOrderStatus()"
                    class="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                    Update Status
                </button>
            </div>
        </div>
    </div>

    <script>
        let orders = [];
        let currentPage = 1;
        const pageSize = 10;

        // Fetch orders from the API
        async function fetchOrders() {
            try {
                const response = await fetch(http://localhost:8087/orders/user-order);
                const data = await response.json();
                orders = data;
                renderTable();
                renderPagination();
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }

        // Render orders in the table
        function renderTable() {
            const tableBody = document.getElementById("ordersTableBody");
            tableBody.innerHTML = "";
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = currentPage * pageSize;
            const displayedOrders = orders.slice(startIndex, endIndex);

            displayedOrders.forEach(order => {
                const row = document.createElement("tr");
                row.className = "hover:bg-gray-50";

                // Use JavaScript to determine the class for status
                let statusClass = "bg-yellow-500"; // Default to yellow
                if (order.status === "DELIVERED") statusClass = "bg-green-500";
                if (order.status === "CANCELED") statusClass = "bg-red-500";

                row.innerHTML =
                    <td class="border border-gray-200 px-4 py-2">${order.id}</td>
                    <td class="border border-gray-200 px-4 py-2">${order.billingAddress}</td>
                    <td class="border border-gray-200 px-4 py-2">
                        <span class="px-2 py-1 rounded text-white text-sm ${statusClass}">
                            ${order.status}
                        </span>
                    </td>
                    <td class="border border-gray-200 px-4 py-2">${order.totalAmount}</td>
                    <td class="border border-gray-200 px-4 py-2">${order.userId}</td>
                    <td class="border border-gray-200 px-4 py-2">${order.orderType}</td>
                    <td class="border border-gray-200 px-4 py-2">
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            onclick="viewOrder(${order.id})">
                            View
                        </button>
                    </td>
                ;
                tableBody.appendChild(row);
            });
        }

        // Render pagination
        function renderPagination() {
            const pagination = document.getElementById("pagination");
            pagination.innerHTML = "";
            const totalPages = Math.ceil(orders.length / pageSize);

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.className = px-4 py-2 mx-1 rounded border ;
                button.onclick = () => {
                    currentPage = i;
                    renderTable();
                };
                pagination.appendChild(button);
            }
        }

        // View order details
        async function viewOrder(orderId) {
            try {
                const response = await fetch(http://localhost:8084/orders/${orderId});
                const order = await response.json();

                document.getElementById("modalBillingAddress").textContent = order.billingAddress;
                document.getElementById("modalStatus").value = order.status;
                document.getElementById("modalTotalAmount").textContent = order.totalAmount;
                document.getElementById("modalUserId").textContent = order.userId;
                document.getElementById("modalOrderType").textContent = order.orderType;

                document.getElementById("orderModal").style.display = "flex";
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        }

        // Update order status
        async function updateOrderStatus() {
            const orderId = document.getElementById("modalUserId").textContent;
            const newStatus = document.getElementById("modalStatus").value;

            try {
                await fetch(http://localhost:8084/orders/${orderId}, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                });
                alert("Order status updated successfully!");
                fetchOrders();
                closeModal();
            } catch (error) {
                console.error("Error updating order status:", error);
            }
        }

        // Close modal
        function closeModal() {
            document.getElementById("orderModal").style.display = "none";
        }

        // Initial fetch
        fetchOrders();
    </script>
</body>
</html>