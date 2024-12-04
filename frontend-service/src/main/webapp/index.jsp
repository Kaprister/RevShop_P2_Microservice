<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<html>
<head>
<title>Home</title>

<!-- Swiper CSS -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<style>
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	overflow-x: hidden;
	scroll-behavior: smooth;
}
/* Container for the images */
.image-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
/* } */

/* Round shape for images */
.image-circle {
	margin:25px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}

/* Style the images inside the circles */
.image-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
	<jsp:include page="./components/header.jsp" />
	<div>
		<a href="product.jsp"> <img style="width: 100%; height: auto;"
			class="nav__logo-img" src="../img/hero-1.jpg" alt="website logo" />
		</a>
	</div>
	<!-- Swiper Gallery -->
	<div class="swiper">
		<div class="swiper-wrapper">
			<!-- Dynamic Images -->
			<div class="swiper-slide" onclick="scrollToSection('all-section')">
				<img src="./img/img-4.jpg" alt="#All">
			</div>
			<div class="swiper-slide" onclick="scrollToSection('mens-section')">
				<img src="./img/img-3.jpg" alt="#Mens">
			</div>
		</div>

		<!-- Navigation buttons -->
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>

		<!-- Pagination -->
		<div class="swiper-pagination"></div>
	</div>
	<!--
	<h2 class="my_header">featured categories</h2>
	<div class="image-container">
		<div class="image-circle" onclick="handleImageClick('men')">
			<img src="./img/male.jpg" alt="Men" />
		</div>
		<div class="image-circle" onclick="handleImageClick('women')">
			<img src="./img/female.jpg" alt="Women" />
		</div>
		<div class="image-circle" onclick="handleImageClick('kids')">
			<img src="./img/kids.jpg" alt="Kids" />
		</div>
	</div>
	-->

	<h2 class="my_header">featured categories</h2>
	<!-- Start Category Module -->
    <div class="container mx-auto my-5">
        <div class="text-center mb-8">
            <p class="text-3xl font-semibold">Category</p>
        </div>
        <div id="category-list" class="flex flex-wrap justify-center">
            <!-- Dynamic categories will load here -->
        </div>
    </div>

	
	
	<h2 class="my_header">featured products</h2>
	<section id="new_collections">
  <!-- Products Section -->
  <section class="products container">
    <div class="products__container grid" id="products-container">
      <!-- Products will be dynamically loaded -->
    </div>
    <button id="load-more" class="load-more-button">Load More</button>
  </section>
</section>


<section class="deals_section">
  <div class="deals__container container grid">
    <div class="deals__item">
      <div class="deals__group">
        <h3 class="deals__brand">Winter Sale</h3>
        <span class="deals__category">Up to 40% Off</span>
      </div>
      <h4 class="deals__title">Don't Miss Out on These Exclusive Deals!</h4>
      <div class="deals__price flex">
        <span class="new__price">Discounted Prices on All Products!</span>
      </div>
      <div class="deals__group">
        <p class="deals__countdown-text">Hurry Up! Offer Ends On December 31:</p>
        <div class="countdown" id="countdown">
          <div class="countdown__amount">
            <p class="countdown__period" id="days">00</p>
            <span class="unit">Days</span>
          </div>
          <div class="countdown__amount">
            <p class="countdown__period" id="hours">00</p>
            <span class="unit">Hours</span>
          </div>
          <div class="countdown__amount">
            <p class="countdown__period" id="minutes">00</p>
            <span class="unit">Mins</span>
          </div>
          <div class="countdown__amount">
            <p class="countdown__period" id="seconds">00</p>
            <span class="unit">Sec</span>
          </div>
        </div>
      </div>
      <div class="deals__btn">
        <a href="product.jsp" class="btn btn--md">Shop Now</a>
      </div>
    </div>
  </div>
</section>

   <!--=============== NEWSLETTER ===============-->
      <section class="newsletter section home__newsletter">
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

	<jsp:include page="./components/footer.jsp" />
		<script src="./js/index.js"></script>
	
	<!-- Swiper JS -->
	<script
		src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
	<script>
		const swiper = new Swiper('.swiper', {
			loop : true,
			autoplay : {
				delay : 3000,
			},
			pagination : {
				el : '.swiper-pagination',
				clickable : true,
			},
			navigation : {
				nextEl : '.swiper-button-next',
				prevEl : '.swiper-button-prev',
			},
		});

		// Function to scroll to the section
		function scrollToSection(sectionId) {
			const section = document.getElementById(sectionId);
			section.scrollIntoView({
				behavior : 'smooth'
			});
		}

	</script>
</body>
</html>
