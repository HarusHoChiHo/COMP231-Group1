package com.dansfarmaroots.blog.blog;

import com.dansfarmaroots.blog.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "blogs")
public class Blog {
    // Getters and Setters
    @Id
    private String id;
    private String title;
    private String content;
    private Date publishDate;
    private String authorName;
}

