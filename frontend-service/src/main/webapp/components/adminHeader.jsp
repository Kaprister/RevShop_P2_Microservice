<%@ page session="true" %> <!-- Ensure session is enabled -->
 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


<!--=============== CSS ===============-->

<!-- <link rel="stylesheet" href="../css/style.css" /> -->
<link rel="stylesheet" href="../css/header.css" />
<link rel="stylesheet" href="../css/footer.css" />

<title>Ecommerce Website</title>
</head>
<body>
	<!--=============== HEADER ===============-->
	<header class="header">
		<div class="header__top">
			<div class="header__container container">
				<div class="header__contact">
					<span>(+01) - 2345 - 6789</span> <span>Our location</span>
				</div>
				<p class="header__alert-news">Super Values Deals - Save more
					coupons</p>
				<div>
					<%-- <% 
					   // Check if a session attribute "user" exists
					   if (session != null)
					   { 
					%> --%>
						<!-- Show Logout -->
						<p><%=session.getAttribute("user") %>
						<a href="../logout.jsp" class="header__top-action">Logout</a>
					<%-- <% 
					   } else { 
					%> --%>
						<!-- Show Login / Sign Up -->
						<a href="../login.jsp" class="header__top-action">Log In /</a>
						<a href="../register.jsp" class="header__top-action">Sign Up</a>
					<%-- <% 
					   } 
					%> --%>
				</div>

			</div>
		</div>

		<nav class="nav container">
			<a href="index.jsp" class="nav__logo"> <img class="nav__logo-img"
				src="../img/logo.svg" alt="website logo" />
			</a>
			<div class="nav__menu" id="nav-menu">
				<ul class="nav__list">
					<li class="nav__item"><a href="../admin/dashboard.jsp" class="nav__link">Dashboard</a>
					</li>
					<li class="nav__item"><a href="order.jsp" class="nav__link">Orders</a>
					</li>
					<li class="nav__item"><a href="accounts.jsp" class="nav__link">Transactions</a></li>
					<li class="nav__item"><a href="/admin/products" class="nav__link">Products</a>
					</li>
					<li class="nav__item"><a href="/admin/categories" class="nav__link">Category</a></li>
					<li class="nav__item"><a href="/admin/addProduct" class="nav__link">Add Product</a></li>
					<!-- <li class="nav__item"><a href="login-register.jsp"
						class="nav__link">Login</a></li> -->
				</ul>
				<div class="header__search">
					<!-- <input type="text" placeholder="Search For Items..."
						class="form__input" /> -->
					<!-- <button class="search__btn">
						<img src="../img/search.png" alt="search icon" />
					</button> -->
				</div>
			</div>
		</nav>
	</header>
</body>