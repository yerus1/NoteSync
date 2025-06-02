package com.neo.strider.Controller;

import com.neo.strider.DTO.AuthenticationRequest;
import com.neo.strider.DTO.RegisterRequest;
import com.neo.strider.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> Authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.Authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }
}
