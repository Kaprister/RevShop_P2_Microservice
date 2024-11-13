package com.example.auth_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.auth_service.models.Role;
import com.example.auth_service.models.User;
import com.example.auth_service.repository.UserRepository;


@Service
public class UserService {
		
    @Autowired
    private UserRepository userRepository;
    
 // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setPhone(userDetails.getPhone());
            user.setRole(userDetails.getRole());
            user.setPassword(userDetails.getPassword());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    // Delete user
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

	public Long getUserIdByUsername(String username) {
	    User user = userRepository.findByUsername(username);
	    return user != null ? user.getId() : null;
	}
	
	public Role getRoleByUsername(String username) {
	    User user = userRepository.findByUsername(username);
	    return user != null ? user.getRole() : null;
	}
	public String getEmailByUsername(String username) {
	    User user = userRepository.findByUsername(username);
	    return user != null ? user.getEmail() : null;
	}

}
