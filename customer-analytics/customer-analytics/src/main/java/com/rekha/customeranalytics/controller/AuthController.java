package com.rekha.customeranalytics.controller;

import com.rekha.customeranalytics.entity.User;
import com.rekha.customeranalytics.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.rekha.customeranalytics.dto.LoginResponse;
import com.rekha.customeranalytics.dto.RefreshTokenRequest;
import com.rekha.customeranalytics.dto.AccessTokenResponse;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        return authService.login(user);
    }
    @PostMapping("/refresh")
    public AccessTokenResponse refreshToken(
        @RequestBody RefreshTokenRequest request) {

    return authService.refreshToken(request);
}
}