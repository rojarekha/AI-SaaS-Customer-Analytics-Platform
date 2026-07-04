package com.rekha.customeranalytics.service;

import com.rekha.customeranalytics.entity.User;
import com.rekha.customeranalytics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rekha.customeranalytics.security.JwtUtil;
import com.rekha.customeranalytics.dto.LoginResponse;
import com.rekha.customeranalytics.dto.RefreshTokenRequest;
import com.rekha.customeranalytics.dto.AccessTokenResponse;

@Service
public class AuthService {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

public String register(User user) {

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    // Default role
    user.setRole("ROLE_USER");

    userRepository.save(user);

    return "User Registered Successfully";
}

public AccessTokenResponse refreshToken(RefreshTokenRequest request) {

    String refreshToken = request.getRefreshToken();

    if (!jwtUtil.validateToken(refreshToken)) {
        throw new RuntimeException("Invalid Refresh Token");
    }

    String username = jwtUtil.extractUsername(refreshToken);

    String role = jwtUtil.extractRole(refreshToken);

    String newAccessToken =
              jwtUtil.generateAccessToken(username, role);

    return new AccessTokenResponse(newAccessToken);
}

public LoginResponse login(User user) {

    User existingUser = userRepository.findByEmail(user.getEmail())
            .orElse(null);

    if (existingUser == null) {
        throw new RuntimeException("User not found");
    }

    if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
        throw new RuntimeException("Invalid Password");
    }

    String accessToken = jwtUtil.generateAccessToken(
            existingUser.getEmail(),
            existingUser.getRole()
    );

    String refreshToken = jwtUtil.generateRefreshToken(
            existingUser.getEmail()
    );

    return new LoginResponse(accessToken, refreshToken);
}
}