<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Success</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes pop-in {
            0% {
                transform: scale(0.5);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        .pop-in {
            animation: pop-in 0.4s ease-out;
        }
    </style>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen">
    <section class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div class="text-center">
            <!-- Animated Icon -->
            <div class="flex justify-center mb-6">
                <div class="pop-in flex items-center justify-center bg-green-500 text-white rounded-full w-16 h-16">
                    <i class="fas fa-check text-3xl"></i>
                </div>
            </div>
            <!-- Success Message -->
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p class="text-gray-600 mb-4">Your product will be delivered within <span class="font-medium text-gray-800">7 days</span>.</p>
            <!-- Navigation Buttons -->
            <div class="flex justify-center space-x-4 mt-6">
                <a href="${pageContext.request.contextPath}/"
                   class="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition focus:ring focus:ring-blue-300">
                   Home
                </a>
                <a href="${pageContext.request.contextPath}/user/user-orders"
                   class="px-6 py-2 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 transition focus:ring focus:ring-gray-300">
                   Your Orders
                </a>
            </div>
        </div>
    </section>
</body>
</html>
