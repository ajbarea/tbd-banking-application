package com.tbd.bank_backend.services;



import com.tbd.bank_backend.models.User;
import com.tbd.bank_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

        @Autowired
        private UserRepository userRepository;

        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        public Optional<User> getUserById(String userName) {
            return userRepository.findById(userName);
        }

        public User registerUser(User newUser) {
            return userRepository.save(newUser);
        }

        public boolean userExists(String userName) {
            return userRepository.existsById(userName);
        }

}
