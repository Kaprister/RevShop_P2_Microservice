package com.revature.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revature.cart.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	List<Cart> findByUserId(Long userId);

	@Query("SELECT SUM(ci.quantity * ci.price) FROM Cart c " + "JOIN c.cartItems ci " + "WHERE c.userId = :userId")
	Double calculateTotalAmountByUserId(@Param("userId") Long userId);

}
