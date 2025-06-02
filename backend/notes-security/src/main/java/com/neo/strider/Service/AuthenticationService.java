package com.neo.strider.Service;

import com.neo.strider.DTO.AuthenticationRequest;
import com.neo.strider.DTO.AuthenticationResponse;
import com.neo.strider.DTO.RegisterRequest;
import com.neo.strider.Entity.Users;
import com.neo.strider.Exception.InvalidCredentialsException;
import com.neo.strider.Exception.UserAlreadyExistsException;
import com.neo.strider.Repository.UsersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

    private final UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthenticationResponse Authenticate(AuthenticationRequest request){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid username or password");
        }

        var token=jwtService.generateToken(request.getUsername());
        return AuthenticationResponse.builder().accessToken(token).build();
    }



    public String register (RegisterRequest request){
        if(usersRepo.existsByUsername(request.getUsername()))
            throw new UserAlreadyExistsException("Username already taken!");
        var user = Users.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                        .build();
        usersRepo.save(user);
        return "Register done!";
    }

}
