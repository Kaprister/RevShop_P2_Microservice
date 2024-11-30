package com.rev;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Index {

	@GetMapping
	public String main() {
		return "index";
	}
	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/admin")
	public String adminPage() {
		return "admin/dashboard";
	}

	@GetMapping("/admin/categories")
	public String getCategoryPage() {
		return "admin/category";
	}

	@GetMapping("/admin/addProduct")
	public String addProductPage() {
		return "admin/addProduct";
	}

	@GetMapping("/admin/products")
	public String allProducts(){
		return "admin/product";
	}

	@GetMapping("/admin/orders")
	public String allOrders(){
		return "admin/orders";
	}
	
	// user side
	@GetMapping("/cart")
	public String getCart() {
		return "cart";
	}



	@GetMapping("/home")
	public String homePage() {
		return "admin/dashboard";
	}

	@GetMapping("/home/shop")
	public String shopPage() {
		return "admin/category";
	}

	@GetMapping("/home/product")
	public String productPage() {
		return "admin/addProduct";
	}

	@GetMapping("/home/orders")
	public String allUserOrders(){
		return "admin/product";
	}

	@GetMapping("/home/profile")
	public String userProfile(){
		return "admin/orders";
	}

	// user side
	@GetMapping("home/cart")
	public String getAllCart() {
		return "cart";
	}
}
