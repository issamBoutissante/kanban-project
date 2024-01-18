package com.kanban.apigateway.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class FirebaseAuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        try {
            String authToken = extractAuthTokenFromRequest(exchange);
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);
            // Optional: You can add additional validation or
            // user details extraction from decodedToken if needed

            // Proceed with the chain if token is valid
            return chain.filter(exchange);
        } catch (FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Firebase Authentication Failed", e);
        }
    }

    private String extractAuthTokenFromRequest(ServerWebExchange exchange) {
        // Extract the token from the Authorization header
        // Assumes the token is in the format: "Bearer [token]"
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or invalid");
        }
    }

    @Override
    public int getOrder() {
        // Define the order here
        return -1; // Example: High precedence
    }
}
