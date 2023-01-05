package com.tbd.bank_backend.controllers;

import com.tbd.bank_backend.dto.AuthRequest;
import com.tbd.bank_backend.dto.AuthResponse;
import com.tbd.bank_backend.util.JwtUtil;
import com.tbd.bank_backend.models.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            System.out.println(request.getUserName() + "    " + request.getPassword());
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUserName(), request.getPassword())
            );
            System.out.println(authentication);
            User user = (User) authentication.getPrincipal();
            System.out.println(user);
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getUsername(), accessToken);

            return ResponseEntity.ok().body(response);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("", ""));
        }
    }
}
