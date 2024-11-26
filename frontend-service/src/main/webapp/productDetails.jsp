<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Details</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/productDetails.css">
</head>
<body>
	<jsp:include page="./components/header.jsp"/>
    <!--=============== DETAILS ===============-->
    <section class="details section--lg">
        <div class="details__container container grid">
            <div class="details__group">
                <img id="product-img" src="" alt="" class="details__img" />
                <div class="details__small-images grid">
<!--                     <img id="small-img-1" src="" alt="" class="details__small-img" />
 -->                </div>
            </div>
            <div class="details__group">
                <h3 id="product-title" class="details__title"></h3>
                <p id="product-brand" class="details__brand">Brand: <span></span></p>
                <div class="details__price flex">
                    <span id="product-price" class="new__price"></span>
                    <span id="product-old-price" class="old__price"></span>
                    <span id="product-save" class="save__price"></span>
                </div>
                <p id="product-description" class="short__description"></p>
                <ul class="products__list">
                    <li class="list__item flex">
                        <i class="fi-rs-crown"></i> 1 Year Warranty
                    </li>
                    <li class="list__item flex">
                        <i class="fi-rs-refresh"></i> 30 Days Return Policy
                    </li>
                    <li class="list__item flex">
                        <i class="fi-rs-credit-card"></i> Cash on Delivery
                    </li>
                </ul>
                <div class="details__color flex">
                    <span class="details__color-title">Color</span>
                    <ul class="color__list" id="color-list">
                        <!-- Color options will be dynamically added here -->
                    </ul>
                </div>
                <div class="details__size flex">
                    <span class="details__size-title">Size</span>
                    <ul class="size__list" id="size-list">
                        <!-- Size options will be dynamically added here -->
                    </ul>
                </div>
                <div class="details__action">
                    <input type="number" class="quantity" value="1" />
                    <a href="#" class="btn btn--sm" id="add-to-cart-btn">Add To Cart</a>
                    <a href="#" class="details__action-btn">
                        <i class="fi fi-rs-heart"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!--=============== DETAILS TAB ===============-->
    <section class="details__tab container">
        <div class="detail__tabs">
            <span class="detail__tab active-tab" data-target="#info">Additional Info</span>
            <span class="detail__tab" data-target="#reviews">Reviews(3)</span>
        </div>
        <div class="details__tabs-content">
            <div class="details__tab-content active-tab" content id="info">
                <table class="info__table" id="product-info-table">
                    <!-- Product additional info will be dynamically added here -->
                </table>
            </div>
            <div class="details__tab-content" content id="reviews">
                <!-- Review section (static) -->
            </div>
        </div>
    </section>

    <script src="./js/productDetails.js"></script>
</body>
</html>
