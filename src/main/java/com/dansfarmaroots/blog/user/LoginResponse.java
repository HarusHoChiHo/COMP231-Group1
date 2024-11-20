package com.dansfarmaroots.blog.user;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String error;
}
