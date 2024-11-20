package com.dansfarmaroots.blog.user;

import com.dansfarmaroots.blog.config.JwtRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByUsername(String username) throws Exception {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new Exception("User not found"));
        return null;
    }

    public void createUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public UserDetails login(User inputUser) throws UsernameNotFoundException {
        logger.info("inputUser: " + inputUser);
        User user = userRepository.findByUsername(inputUser.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(!passwordEncoder.matches(inputUser.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("username: " + username);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
