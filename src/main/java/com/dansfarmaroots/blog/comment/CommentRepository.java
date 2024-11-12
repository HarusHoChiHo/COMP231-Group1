package com.dansfarmaroots.blog.comment;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    Optional<List<Comment>> findByBlogId(String id, Sort sort);
}
