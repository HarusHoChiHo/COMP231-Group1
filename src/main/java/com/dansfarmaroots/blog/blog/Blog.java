package com.dansfarmaroots.blog.blog;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String title;
    private String content;
    private String author; // or a User object reference
    // Getters and Setters
}
