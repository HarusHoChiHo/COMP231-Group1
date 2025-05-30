package com.dansfarmaroots.blog.comment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private static final Logger log = LoggerFactory.getLogger(CommentController.class);
    @Autowired
    private CommentService commentService;

    @GetMapping(path = "/{blogId}")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable String blogId) {
        return new ResponseEntity<>(commentService.getCommentsByBlogId(blogId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return new ResponseEntity<>(commentService.createComment(comment), HttpStatus.CREATED);
    }
}
