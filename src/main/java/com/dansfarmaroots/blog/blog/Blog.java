package com.dansfarmaroots.blog.blog;

import com.dansfarmaroots.blog.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "blogs")
public class Blog {
    // Getters and Setters
    @Id
    private String id;
    private String title;
    private String content;
    @DBRef
    private User author;

    @Override
    public String toString() {
        return "Blog{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author=" + author +
                '}';
    }
}
