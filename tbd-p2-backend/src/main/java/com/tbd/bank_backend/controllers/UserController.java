package com.tbd.bank_backend.controllers;

import com.tbd.bank_backend.dto.ResultResponse;
import com.tbd.bank_backend.models.User;
import com.tbd.bank_backend.repositories.UserRepository;
import com.tbd.bank_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService uServ;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return uServ.getAllUsers();
    }

    @GetMapping("/{userName}")
    public Optional<User> getUserById(@PathVariable("userName")String userName) {
        return uServ.getUserById(userName);
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (!uServ.userExists(newUser.getUsername())) {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            uServ.registerUser(newUser);
            return ResponseEntity.ok(new ResultResponse(true));
        }
        else {
            return ResponseEntity.status(HttpStatus.FOUND).body(new ResultResponse(false));
        }
    }

    @PutMapping("/{userName}")
    public ResponseEntity<?> UpdateUserDetails(@RequestBody User reqUser) {
        if (uServ.getUserById(reqUser.getUsername()).isPresent()) {
            User updateUser = uServ.getUserById(reqUser.getUsername()).get();
            updateUser.setFirstName(reqUser.getFirstName());
            updateUser.setLastName(reqUser.getLastName());
            updateUser.setEmail(reqUser.getEmail());
            uServ.registerUser(updateUser);
            return ResponseEntity.ok(new ResultResponse(true));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(new ResultResponse(false));
        }
    }

    @PutMapping("/{userName}/change-pswd")
    public ResponseEntity<?> UpdateUserPassword(@PathVariable("userName")String userName, @RequestBody String password) {
        if (uServ.getUserById(userName).isPresent()) {
            User updateUser = uServ.getUserById(userName).get();
            updateUser.setPassword(passwordEncoder.encode(password));
            uServ.registerUser(updateUser);
            return ResponseEntity.ok(new ResultResponse(true));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(new ResultResponse(false));
        }
    }

    @GetMapping(value = "/{userName}", params = {"validate=true"})
    public ResponseEntity<?> userExists(@PathVariable("userName")String userName) {
        return ResponseEntity.ok(new ResultResponse(uServ.userExists(userName)));
    }
}
