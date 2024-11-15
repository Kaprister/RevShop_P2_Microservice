package com.revature.order.feigns;


import com.revature.order.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("AUTHENTICATION-SERVICE")
public interface AuthService {
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id);
}
