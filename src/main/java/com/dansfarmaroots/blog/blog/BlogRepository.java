package com.dansfarmaroots.blog.blog;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogRepository extends MongoRepository<Blog, String> {
    // Custom query methods can be defined here
}
