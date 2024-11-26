<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- External Styles -->
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-straight/css/uicons-regular-straight.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <!-- External JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    

    <title>Ecommerce Website - Shop</title>
  </head>
  <body>
    <jsp:include page="./components/header.jsp"></jsp:include>

    <main class="main">
      <!-- Breadcrumb -->
      <section class="breadcrumb">
        <ul class="breadcrumb__list container">
          <li><a href="index.jsp" class="breadcrumb__link">Home</a></li>
          <li><span>></span></li>
          <li><span class="breadcrumb__link">products</span></li>
        </ul>
      </section>

      <!-- Products Section -->
      <section class="products container">
        <p class="total__products">We found <span id="item-count">0</span> items for you!</p>
        <div class="products__container grid" id="products-container">
          <!-- Products will be loaded dynamically -->
        </div>
        <ul class="pagination" id="pagination">
          <!-- Pagination links will be dynamically created -->
        </ul>
      </section>

      <!-- Newsletter Section -->
      <section class="newsletter section">
        <div class="newsletter__container container grid">
          <h3 class="newsletter__title">
            <img src="./img/icon-email.svg" alt="" class="newsletter__icon" />
            Sign in to Newsletter
          </h3>
          <p class="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form class="newsletter__form">
            <input type="email" placeholder="Enter Your Email" class="newsletter__input" required />
            <button type="submit" class="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>

    <jsp:include page="./components/footer.jsp"></jsp:include>
    <script src="./js/product.js"></script>
  </body>
</html>
