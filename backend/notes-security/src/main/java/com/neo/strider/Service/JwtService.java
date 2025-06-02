package com.neo.strider.Service;


import com.neo.strider.Config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class JwtService {

      private final JwtProperties jwtProperties;

      private SecretKey getKey(){
            byte[] keyBytes= Decoders.BASE64.decode(jwtProperties.getSecretKey());
            return Keys.hmacShaKeyFor(keyBytes);
      }

      public String generateToken(String user) {
            Map<String, Object> claims = new HashMap<>();

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(user)
                    .setIssuer("Strider")
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                    .signWith(getKey())
                    .compact();
      }

      public String extractName(String token) {
            return extractClaims(token, Claims::getSubject);
      }

      private <T> T extractClaims(String token, Function<Claims,T> claimResolver) {
            Claims claims=extractClaims(token);
            return claimResolver.apply(claims);
      }

      private Claims extractClaims(String token) {
            return Jwts
                    .parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
      }

      public boolean isTokenValid(String token, UserDetails userDetails) {
            final String username = extractName(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
      }

      private boolean isTokenExpired(String token) {
            return extractExpiration(token).before(new Date());
      }

      private Date extractExpiration(String token) {
            return extractClaims(token,Claims::getExpiration);
      }
}