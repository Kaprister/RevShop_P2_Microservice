//package com.example.auth_service.security;
//
//import io.jsonwebtoken.*;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.spec.SecretKeySpec;
//import java.util.Date;
//import java.nio.charset.StandardCharsets;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import java.security.Key;
//
//@Component
//public class JwtUtil {
//
//    private String secretKey =   "6LeY2hf3JHDX6IyAm60cRGWhvJx+LjUQ9QVRH6A6Giw="; // Use a secure, complex secret key for production
//    private long expirationTime = 1000 * 60 * 60 * 10;  // 10 hour expiration time
//
//
//    private Key getSigningKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//
//    // Generate a JWT token
//    public String generateToken(String username, String role) {
//        return Jwts.builder()
//                .setSubject(username)
//                .claim("roles", role)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    // Extract the username (subject) from the JWT token
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // Extract expiration date from the JWT token
//    public Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    // Extract a specific claim from the JWT token (e.g., username)
//    public <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.resolve(claims);
//    }
//
//    // Parse the token to extract claims
//    private Claims extractAllClaims(String token) {
//        SecretKeySpec key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
//        return Jwts.parserBuilder()
////                .setSigningKey(key)  // Use the signing key
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJws(token)  // Parse the JWT
//                .getBody();  // Extract the claims
//    }
//
//    // Check if the token has expired
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    // Validate the JWT token
//    public boolean validateToken(String token, String username) {
//        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
//    }
//
//    // Functional interface to handle claims extraction
//    @FunctionalInterface
//    public interface ClaimsResolver<T> {
//        T resolve(Claims claims);
//    }
//}


package com.example.auth_service.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "6LeY2hf3JHDX6IyAm60cRGWhvJx+LjUQ9QVRH6A6Giw="; // Use a secure key
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }
}
