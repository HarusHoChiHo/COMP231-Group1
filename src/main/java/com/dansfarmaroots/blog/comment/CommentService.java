package com.dansfarmaroots.blog.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> getCommentsByBlogId(String blogId) {
        return commentRepository.findByBlogId(blogId, Sort.by("publishDate").descending()).orElseThrow();
    }

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

}
