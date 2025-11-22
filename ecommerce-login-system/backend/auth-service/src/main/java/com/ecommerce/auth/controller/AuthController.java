package com.ecommerce.auth.controller;

import com.ecommerce.auth.dto.AuthResponse;
import com.ecommerce.auth.dto.LoginRequest;
import com.ecommerce.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(authService.googleLogin(payload.get("token")));
    }

    @PostMapping("/meta")
    public ResponseEntity<AuthResponse> metaLogin(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(authService.metaLogin(payload.get("token")));
    }

    @PostMapping("/phone/otp")
    public ResponseEntity<String> requestOtp(@RequestBody Map<String, String> payload) {
        authService.requestOtp(payload.get("phoneNumber"));
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/phone/verify")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(authService.verifyOtp(payload.get("phoneNumber"), payload.get("otp")));
    }
}
