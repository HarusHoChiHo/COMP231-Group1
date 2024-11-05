package com.dansfarmaroots.blog.user;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "blogs")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
}
