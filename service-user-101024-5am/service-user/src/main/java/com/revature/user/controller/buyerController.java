package com.revature.user.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
@Controller
public class buyerController {
	
	 @GetMapping("/buyerPage")
	    public String showAllProductsPage(Model model) {
	        // URL to fetch products from the product service
	        String productUrl = "http://localhost:8082/products";

	        // Use RestTemplate to fetch the product data from the external API
	        RestTemplate restTemplate = new RestTemplate();
	        ResponseEntity<List> response = restTemplate.getForEntity(productUrl, List.class);

	        // Pass the products to the JSP view
	        model.addAttribute("products", response.getBody());

	        return "buyer/buyerPage"; // Corresponds to allProduct.jsp
	    }
	 


	 @GetMapping("/addToCart")
	    public String showAddToCartPage() {
	        return "buyer/addToCart";  // Corresponds to the new addToCart.jsp
	    }
	 
	 @GetMapping("/cartPage")
	    public String showCartPage() {
	        return "buyer/cartPage";  // This corresponds to cartPage.jsp
	    }

	 
	 
	 @GetMapping("/buyerAllProduct")
	    public String viewProductsPage() {
	        return "buyer/buyerProduct";  // This returns the JSP page
	    }
	 
//	 @GetMapping("/wishlist")
//	    public String viewWishlist() {
//	        // Return the view for the wishlist page
//	        return "buyer/wishlist";  // Corresponds to wishlist.jsp
//	    }
	 
	 @GetMapping("/processPayment")
		public String viewPaymentPage(@RequestParam("totalPrice") double totalPrice, Model model) {
		    model.addAttribute("totalPrice", totalPrice);
		    return "buyer/paymentForm";  // Return the JSP page
		}

		
		
		@PostMapping("/successPayment")
	    public String successPayment() {
	        return "buyer/successPayment";  // This returns the JSP page
	    }
		
		 @GetMapping("/orders")
		    public String viewOrders() {
		        return "buyer/orders";  // The JSP page for orders should be in /WEB-INF/views/buyer/orders.jsp
		    }
}
