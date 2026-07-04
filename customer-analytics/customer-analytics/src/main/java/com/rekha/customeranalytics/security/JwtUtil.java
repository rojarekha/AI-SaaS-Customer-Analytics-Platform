package com.rekha.customeranalytics.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY =
            "mySuperSecretKeyForJwtAuthentication12345678901234567890";

    // Generate JWT with username and role
    public String generateAccessToken(String username, String role){

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        )
                )
                .compact();
    }

public String generateRefreshToken(String username) {

    return Jwts.builder()
            .setSubject(username)
            .claim("type", "refresh")
            .setIssuedAt(new Date())
            .setExpiration(
                    new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7)
            ) // 7 days
            .signWith(
                    io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                            SECRET_KEY.getBytes()
                    )
            )
            .compact();
}

    // Extract username
    public String extractUsername(String token) {

        return getClaims(token).getSubject();
    }

    // Extract role
    public String extractRole(String token) {

        return getClaims(token).get("role", String.class);
    }

    // Common method
    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        )
                )
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate token
    public boolean validateToken(String token) {

        try {

            getClaims(token);

            return true;

        } catch (Exception e) {

             e.printStackTrace();

             return false;

        }
    }
}