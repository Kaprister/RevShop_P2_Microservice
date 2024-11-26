console.log("in script: cart.js");
document.addEventListener('DOMContentLoaded',()=>{
	const user = localStorage.getItem("user");
	const userId =  JSON.parse(user).userId;
	console.log(userId);
	if(userId){
		fetchCartData(userId);
	}
	else{
		debugger;
		window.location.href="login.jsp";
	}
	
});
	function fetchCartData(userId){
		fetch(`http://localhost:8087/cart/user/${userId}`)
		.then(response => response.json())
		.then(data => {
			console.log("cart data fetched: ",Object.keys(data).length)
			populateCartDetails(data);
		})
		.catch(error=>{
			console.error("Error fetching product details:",error)
		});
	}
	function populateCartDetails(data){
		//const cartItems = data[0].cartItems[0].image;
		for(const item of data){
				console.log(item.cartItems[0]);
			}
			// document.getElementById("table__img").src = data.cartItems.image;
			// document.getElementsByClassName("table__title").textContent = data.cartItems.productName;
		// console.log(data[0].id)
		
	}