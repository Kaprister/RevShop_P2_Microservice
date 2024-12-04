<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:include page="./components/header.jsp" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Wishlist</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="">

    <section class="p-6 flex justify-center items-center flex-col">
        <header class="text-center mb-6">
            <h1 class="text-4xl font-bold">Your</h1>
            <h2 class="text-2xl font-semibold">WishList</h2>
        </header>

        <div id="loading" class="flex justify-center items-center h-64">
            <p class="text-gray-500 text-xl">Loading your wishlist...</p>
        </div>

        <div id="error" class="hidden flex justify-center items-center h-64">
            <p class="text-red-500 text-xl font-semibold"></p>
        </div>

        <div id="no-products" class="hidden flex flex-col items-center mt-16">
            <h2 class="text-2xl font-semibold text-gray-800">No Liked Products Found</h2>
            <p class="text-gray-600 mt-2">Explore our products and add your favorites to your wishlist!</p>
        </div>

        <div id="products" class="hidden  mt-10 grid justify-center content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <!-- Product cards will be dynamically injected here -->
        </div>
    </section>

    <jsp:include page="./components/footer.jsp" />

    <script src="./js/wishlist.js"></script>
</body>
</html>