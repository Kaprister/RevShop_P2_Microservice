<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!--=============== FLATICON ===============-->
    <link
      rel="stylesheet"
      href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-straight/css/uicons-regular-straight.css"
    />

    <!--=============== SWIPER CSS ===============-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />

    <!--=============== CSS ===============-->
    <link rel="stylesheet" href="./css/style.css" />

    <title>Ecommerce Website</title>
  </head>
  <body>
   <header>
   <jsp:include page="./components/header.jsp"></jsp:include>
   </header>

    <!--=============== MAIN ===============-->
    <main class="main">
      <!--=============== BREADCRUMB ===============-->
      <section class="breadcrumb">
        <ul class="breadcrumb__list flex container">
          <li><a href="/" class="breadcrumb__link">Home</a></li>
          <li><span class="breadcrumb__link"></span>></li>
          <li><span class="breadcrumb__link">Cart</span></li>
        </ul>
      </section>

      <!--=============== CART ===============-->
      <section class="cart section--lg container">
        <div class="table__container">
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Rename</th>
              </tr>
            </thead>
            <tbody>
                         
            </tbody>
          </table>
        </div>

        <div class="cart__actions">
          <!-- <a href="#" class="btn flex btn__md">
            <i class="fi-rs-shuffle"></i> Update Cart
          </a> -->
          
          <a href="product.jsp" class="btn flex btn__md">
            <i class="fi-rs-shopping-bag"></i> Continue Shopping
          </a>
        </div>

        <div class="divider">
          <i class="fi fi-rs-fingerprint"></i>
        </div>

        <div class="cart__group grid">
          <div>
            <div class="cart__shippinp">
              <h3 class="section__title">Calculate Shipping</h3>
              <form action="" class="form grid">
                <input
                  type="text"
                  class="form__input"
                  placeholder="State / Country"
                />
                <div class="form__group grid">
                  <input type="text" class="form__input" placeholder="City" />
                  <input
                    type="text"
                    class="form__input"
                    placeholder="PostCode"
                  />
                </div>
                <div class="form__btn">
                  <button class="btn flex btn--sm">
                    <i class="fi-rs-shuffle"></i> Update
                  </button>
                </div>
              </form>
            </div>
            <div class="cart__coupon">
              <h3 class="section__title">Apply Coupon</h3>
              <form action="" class="coupon__form form grid">
                <div class="form__group grid">
                  <input
                    type="text"
                    class="form__input"
                    placeholder="Coupons not added.."
                  />
                  <div class="form__btn">
                    <button class="btn flex btn--sm">
                      <i class="fi-rs-label"></i> Aplly
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="cart__total">
            <h3 class="section__title">Cart Totals</h3>
            <table class="cart__total-table">
                <tr>
                  <td><span class="cart__total-title">Cart Subtotal</span></td>
                  <td><span class="cart__total-price"></span></td>
                </tr>
                
            </table>
            <a href="checkout.html" class="btn flex btn--md">
              <i class="fi fi-rs-box-alt"></i> Proceed To Checkout
            </a>
          </div>
        </div>
      </section>

      <!--=============== NEWSLETTER ===============-->
      <section class="newsletter section">
        <div class="newsletter__container container grid">
          <h3 class="newsletter__title flex">
            <img
              src="./assets/img/icon-email.svg"
              alt=""
              class="newsletter__icon"
            />
            Sign in to Newsletter
          </h3>
          <p class="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form action="" class="newsletter__form">
            <input
              type="text"
              placeholder="Enter Your Email"
              class="newsletter__input"
            />
            <button type="submit" class="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>

    <!--=============== FOOTER ===============-->
    <jsp:include page="./components/footer.jsp"></jsp:include>
    <!--=============== SWIPER JS ===============-->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!--=============== MAIN JS ===============-->
    <script src="./js/cart.js"></script>
  </body>
</html>
