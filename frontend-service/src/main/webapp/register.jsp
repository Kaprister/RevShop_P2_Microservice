<!DOCTYPE html>
<html lang="en">

  <body>
    <!--=============== HEADER ===============-->
    <jsp:include page="./components/header.jsp"/>

    <!--=============== MAIN ===============-->
    <main class="main">
      <!--=============== BREADCRUMB ===============-->
      <section class="breadcrumb">
        <ul class="breadcrumb__list flex container">
          <li><a href="/" class="breadcrumb__link">Home</a></li>
          <li><span class="breadcrumb__link">></span></li>
          <li><span class="breadcrumb__link"> Register</span></li>
        </ul>
      </section>

      <!--=============== LOGIN-REGISTER ===============-->
      <section class="login-register section--lg">
        <div class="login-register__container container grid">
          <div class="login">
            <h3 class="section__title">Register</h3>
            <form class="form grid" id="signupForm">
                    <input type="email" id="email" name="email" class="form__input" required placeholder="Enter your email">
                    <div id="emailErrors" class="error"></div>
                    
                    <input type="text" id="username" name="username" class="form__input" placeholder="Enter your username">
                    <div id="usernameErrors" class="error"></div>
                    
                     <div>
                         <input type="text" id="firstname" class="form__input" name="firstname" placeholder="First name">
                         <div id="firstnameErrors" class="error"></div>
                     </div>
                     <div>
                         <input type="text" id="lastname" class="form__input" name="lastname" placeholder="Last name">
                         <div id="lastnameErrors" class="error"></div>
                     </div>
                 
                    <label for="role">Role</label>
                    <select id="role" name="role" class="form__input">
                        <option value="0">Buyer</option>
                        <option value="1">Seller</option>
                    </select>
                    <div id="roleErrors" class="error"></div>
                    
                    <input type="text" id="phone"  class="form__input" name="phone" placeholder="9546897889">
                    <div id="phoneErrors" class="error"></div>
                    
                    <div class="password-container">
                        <input type="password" id="password" class="form__input" name="password" placeholder="Enter password">
                        <i id="togglePassword" class="fas fa-eye"></i>
                    </div>
                    <div id="passwordErrors" class="error"></div>
                    
                    
              <div class="form__btn">
                <button type="submit" class="btn">Sign in</button>
              </div>
            </form>
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


	<jsp:include page="./components/footer.jsp"></jsp:include>
    <!--=============== SWIPER JS ===============-->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!--=============== MAIN JS ===============-->
    <script src="./js/main.js"></script>
    <script src="./js/register.js"></script>
  </body>
</html>
