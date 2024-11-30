<jsp:include page="./components/header.jsp" />
<style>
.order__table-wrapper {
    border: 1px solid #ccc; 
    margin: 10px 0;
}

.order__table-container {
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden; 
}

.order__table {
    width: 100%;
    border-collapse: collapse;
}

.order__summary {
    width: 100%;
    border-top: 1px solid #ccc; 
}

.order__table th, .order__table td, .order__summary td {
    padding: 10px;
    text-align: left;
}

</style>
<!--=============== MAIN ===============-->
<main class="main">
	<!--=============== BREADCRUMB ===============-->
	<section class="breadcrumb">
		<ul class="breadcrumb__list flex container">
			<li><a href="/" class="breadcrumb__link">Home</a></li>
			<li><span class="breadcrumb__link">></span></li>
			<li><a href="/cart" class="breadcrumb__link">Shop</a></li>
			<li><span class="breadcrumb__link">></span></li>
			<li><span class="breadcrumb__link">Checkout</span></li>
		</ul>
	</section>

	<!--=============== CHECKOUT ===============-->
	<section class="checkout section--lg">
		<div class="checkout__container container grid">
			<div class="checkout__group">
				<h3 class="section__title">Billing Details</h3>
				<form class="form grid">
					<input type="text" placeholder="Name" class="form__input" /> <input
						type="text" placeholder="Address" class="form__input" /> <input
						type="text" placeholder="City" class="form__input" /> <input
						type="text" placeholder="Country" class="form__input" /> <input
						type="text" placeholder="Postcode" class="form__input" /> <input
						type="text" placeholder="Phone" class="form__input" /> <input
						type="email" placeholder="Email" class="form__input" />
					<h3 class="checkout__title">Additional Information</h3>
					<textarea name="" placeholder="order note"
						class="form__input textarea"></textarea>
				</form>
			</div>
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
								<td colspan="2"><span class="table__price">Free
										Shipping</span></td>
							</tr>
							<tr>
								<td><span class="order__subtitle">Total</span></td>
								<td colspan="2"><span class="order__grand-total">$0.00</span></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="payment__methods">
					<h3 class="checkout__title payment__title">Payment</h3>
					<div class="payment__option flex">
						<input type="radio" name="radio" id="l1" checked
							class="payment__input" /> <label for="l1" class="payment__label">Direct
							Bank Transfer</label>
					</div>
					<div class="payment__option flex">
						<input type="radio" name="radio" id="l2" class="payment__input" />
						<label for="l2" class="payment__label">Check Payment</label>
					</div>
					<div class="payment__option flex">
						<input type="radio" name="radio" id="l3" class="payment__input" />
						<label for="l3" class="payment__label">Paypal</label>
					</div>
				</div>
				<button class="btn btn--md">Place Order</button>
			</div>
		</div>
	</section>

	<!--=============== NEWSLETTER ===============-->
	<section class="newsletter section">
		<div class="newsletter__container container grid">
			<h3 class="newsletter__title flex">
				<img src="./assets/img/icon-email.svg" alt=""
					class="newsletter__icon" /> Sign in to Newsletter
			</h3>
			<p class="newsletter__description">...and receive $25 coupon for
				first shopping.</p>
			<form action="" class="newsletter__form">
				<input type="text" placeholder="Enter Your Email"
					class="newsletter__input" />
				<button type="submit" class="newsletter__btn">Subscribe</button>
			</form>
		</div>
	</section>
</main>

<!--=============== FOOTER ===============-->
<footer>
	<jsp:include page="./components/footer.jsp" />
</footer>
<!--=============== SWIPER JS ===============-->
<script
	src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!--=============== MAIN JS ===============-->
<script src="assets/js/main.js"></script>
<script src="./js/checkout.js"></script>
</body>
</html>
