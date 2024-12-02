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
	
	// user side
	@GetMapping("/cart")
	public String getCart() {
		return "cart";
	}
}
