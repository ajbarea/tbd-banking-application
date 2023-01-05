package com.tbd.bank_backend.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

import com.tbd.bank_backend.models.User;

@Component public class JwtUtil {
    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour

    @Value("${app.jwt.secret}")
    private String SECRET_KEY;

    public String generateAccessToken(User user) {
        System.out.println(user);
        return Jwts.builder()
            .setSubject(String.format("%s,%s", user.getUsername(), user.getEmail()))
            .setIssuer("tbdbank")
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();

    }


    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT expired" + ex.getMessage());
        } catch (IllegalArgumentException ex) {
            System.out.println("Token is null, empty or only whitespace" + ex.getMessage());
        } catch (MalformedJwtException ex) {
            System.out.println("JWT is invalid" + ex);
        } catch (UnsupportedJwtException ex) {
            System.out.println("JWT is not supported" + ex);
        } catch (SignatureException ex) {
            System.out.println("Signature validation failed");
        }

        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}

