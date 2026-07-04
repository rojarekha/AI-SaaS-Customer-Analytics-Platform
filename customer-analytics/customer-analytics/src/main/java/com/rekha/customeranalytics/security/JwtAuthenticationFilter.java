package com.rekha.customeranalytics.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("========== JWT FILTER ==========");
        System.out.println("URL : " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header : " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Bearer token NOT FOUND");
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);

        System.out.println("JWT : " + jwt);

        if (jwtUtil.validateToken(jwt)) {

            System.out.println("Token VALID");

            String username = jwtUtil.extractUsername(jwt);

String role = jwtUtil.extractRole(jwt);

UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(
                username,
                null,
                Collections.singletonList(
                        new SimpleGrantedAuthority(role)
                )
        );

SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication SET");
        } else {

            System.out.println("Token INVALID");
        }

        filterChain.doFilter(request, response);

        System.out.println("===============================");
    }
}