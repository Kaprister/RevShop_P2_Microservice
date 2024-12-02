<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - RevShop</title>
</head>

<body>
    <!-- Header -->
    <header class="header">
       <jsp:include page="./components/header.jsp"/>
    </header>

    <!-- About Us Section -->
    <section class="about-us">
        <div class="container">
            <h1 class="about-us__title">About Us</h1>
            <div class="about-us__content">
                <div class="about-us__text">
                    <p>Welcome to RevShop! We are an online retailer dedicated to offering a wide variety of high-quality products at affordable prices. Our goal is to provide an excellent shopping experience to our customers by offering products across various categories such as clothing, electronics, home essentials, and more.</p>
                    
                    <p>At RevShop, we believe in offering great value for money while ensuring that all our products meet the highest standards. We are passionate about customer satisfaction and work hard to bring you the best deals with fast and reliable delivery services.</p>
                    
                    <p>Our mission is to become the leading online store, offering trendy, high-quality products for everyone. Whether you're looking for the latest fashion, gadgets, or home decor, we have something for you!</p>
                    
                    <p>Thank you for choosing RevShop. We hope you enjoy shopping with us!</p>
                </div>

                <div class="about-us__image">
                    <img src="path/to/your-image.jpg" alt="About Us Image">
                </div>
            </div>
        </div>
    </section>

    <!-- Our Team Section -->
    <section class="our-team">
        <div class="container">
            <h2 class="section-title">Meet Our Team</h2>
            <div class="team-members">
                <div class="team-member">
                    <img src="path/to/member1.jpg" alt="Team Member">
                    <h3>John Doe</h3>
                    <p>CEO & Founder</p>
                </div>
                <div class="team-member">
                    <img src="path/to/member2.jpg" alt="Team Member">
                    <h3>Jane Smith</h3>
                    <p>Lead Designer</p>
                </div>
                <div class="team-member">
                    <img src="path/to/member3.jpg" alt="Team Member">
                    <h3>Mark Johnson</h3>
                    <p>Marketing Head</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <jsp:include page="./components/footer.jsp"/>
    </footer>
</body>

</html>
