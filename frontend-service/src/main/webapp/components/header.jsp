<%@ page session="true" %> <!-- Ensure session is enabled -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, initial-scale=1">

<!--=============== FLATICON ===============-->
<link rel="stylesheet"
    href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-straight/css/uicons-regular-straight.css" />

<!--=============== SWIPER CSS ===============-->
<link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<!--=============== CSS ===============-->
<link rel="stylesheet" href="./css/style.css" />
<link rel="stylesheet" href="./css/header.css" />
<link rel="stylesheet" href="./css/footer.css" />

<title>RevShop</title>


</head>
<body>
    <!--=============== HEADER ===============-->
    <header class="header">
        <div class="header__top">
            <div class="header__container container">
                <div class="header__contact">
                    <span>(+01) - 2345 - 6789</span> <span>Our location</span>
                </div>
                <p class="header__alert-news">Super Values Deals - Save more coupons</p>
                <div class="header__top-action"></div>
            </div>
        </div>

        <nav class="nav container">
            <a href="/" class="nav__logo">
				<img style="width: 15%; height: auto;" class="nav__logo-img" src="../img/logo.png" alt="website logo" />
            </a>
            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item"><a href="index.jsp" class="nav__link">Home</a></li>
                    <li class="nav__item"><a href="product.jsp" class="nav__link">Explore</a></li>
                    <li class="nav__item"><a href="categories.jsp" class="nav__link">Collections</a></li>
                </ul>
                <div class="header__search">
                    <input type="text" placeholder="Search For Items..." class="form__input" />
                    <button class="search__btn">
                        <img src="./img/search.png" alt="search icon" />
                    </button>
                </div>
            </div>
            <div class="header__user-actions">
                <a href="wishlist.jsp" class="header__action-btn" title="Wishlist">
                    <img src="./img/icon-heart.svg" alt="" /> <span class="count">3</span>
                </a>
                <a href="/cart" class="header__action-btn" title="Cart">
                    <img src="./img/icon-cart.svg" alt="" />
                    <span id="cart-count" class="count">0</span>
                </a>
            </div>
        </nav>
    </header>

    <script type="text/javascript" src="./js/header.js"></script>
    <script type="text/javascript" src="./js/main.js"></script>
</body>
</html>
