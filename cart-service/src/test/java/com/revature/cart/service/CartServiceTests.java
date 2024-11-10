package com.revature.cart.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.reactive.function.client.WebClient;

import com.revature.cart.model.Cart;
import com.revature.cart.model.CartItem;
import com.revature.cart.repository.CartRepository;

import reactor.core.publisher.Mono;

@SpringBootTest
class CartServiceTests {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private WebClient.Builder webClientBuilder;

    @InjectMocks
    private CartService cartService;

    private Cart sampleCart;

    @BeforeEach
    void setUp() {
        sampleCart = new Cart();
        sampleCart.setUserId(1L);
        sampleCart.setCartItems(new ArrayList<>());
    }

    @Test
    void addCart_ShouldSaveCart() {
        when(cartRepository.save(sampleCart)).thenReturn(sampleCart);

        Cart result = cartService.addCart(sampleCart);

        assertEquals(sampleCart, result);
    }

    @Test
    void getCartByUserId_ShouldReturnUserCarts() {
        when(cartRepository.findByUserId(1L)).thenReturn(List.of(sampleCart));

        List<Cart> carts = cartService.getCartByUserId(1L);

        assertEquals(1, carts.size());
    }

    @Test
    void addItemToCart_ShouldAddItemToExistingCart() {
        CartItem item = new CartItem(1L, "Test Product", 2, 20.0, "image.png");
        when(cartRepository.findByUserId(1L)).thenReturn(List.of(sampleCart));
        when(cartRepository.save(any(Cart.class))).thenReturn(sampleCart);

        cartService.addItemToCart(1L, item);

        assertEquals(1, sampleCart.getCartItems().size());
    }

    @Test
    void getUserInfo_ShouldReturnUserInfo() {
        WebClient webClient = mock(WebClient.class);
        WebClient.RequestHeadersUriSpec request = mock(WebClient.RequestHeadersUriSpec.class);
        WebClient.ResponseSpec responseSpec = mock(WebClient.ResponseSpec.class);

        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(request);
        when(request.uri(anyString())).thenReturn(request);
        when(request.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(String.class)).thenReturn(Mono.just("User Info"));

        Mono<String> userInfo = cartService.getUserInfo(1L);

        assertEquals("User Info", userInfo.block());
    }
}
