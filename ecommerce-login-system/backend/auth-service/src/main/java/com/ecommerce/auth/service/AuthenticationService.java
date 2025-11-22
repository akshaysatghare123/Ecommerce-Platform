package com.ecommerce.auth.service;

import com.ecommerce.auth.dto.AuthResponse;
import com.ecommerce.auth.dto.LoginRequest;
import com.ecommerce.auth.model.AuthProvider;
import com.ecommerce.auth.model.User;
import com.ecommerce.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .message("Login successful")
                .userEmail(user.getEmail())
                .build();
    }

    public AuthResponse googleLogin(String token) {
        // Verify Google token (Mock implementation)
        // In real app, use GoogleIdTokenVerifier
        String email = "user@gmail.com"; // Extracted from token

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> registerSocialUser(email, AuthProvider.GOOGLE));

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .message("Google Login successful")
                .userEmail(user.getEmail())
                .build();
    }

    public AuthResponse metaLogin(String token) {
        // Verify Meta token (Mock implementation)
        String email = "user@facebook.com";

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> registerSocialUser(email, AuthProvider.FACEBOOK));

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .message("Meta Login successful")
                .userEmail(user.getEmail())
                .build();
    }

    public void requestOtp(String phoneNumber) {
        // Send OTP via SMS gateway (Mock)
        System.out.println("Sending OTP to " + phoneNumber);
    }

    public AuthResponse verifyOtp(String phoneNumber, String otp) {
        // Verify OTP (Mock)
        if (!"123456".equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseGet(() -> registerPhoneUser(phoneNumber));

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .message("Phone Login successful")
                .userEmail(user.getEmail()) // Might be null for phone users initially
                .build();
    }

    private User registerSocialUser(String email, AuthProvider provider) {
        User user = User.builder()
                .email(email)
                .provider(provider)
                .enabled(true)
                .build();
        return userRepository.save(user);
    }

    private User registerPhoneUser(String phoneNumber) {
        User user = User.builder()
                .phoneNumber(phoneNumber)
                .provider(AuthProvider.PHONE)
                .enabled(true)
                .build();
        return userRepository.save(user);
    }
}
