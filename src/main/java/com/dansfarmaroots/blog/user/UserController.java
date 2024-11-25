package com.dansfarmaroots.blog.user;

import com.dansfarmaroots.blog.config.JwtRequestFilter;
import com.dansfarmaroots.blog.config.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.awt.SystemColor.info;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        logger.info("request: {}", request);
        LoginResponse response = new LoginResponse();
        try{
            UserDetails details = userService.login(request);
            String jwt = jwtUtil.generateToken(details.getUsername());
            response.setToken(jwt);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            response.setError(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(){
        userService.createUser("admin", "admin");
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
