package com.dansfarmaroots.blog.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return new ResponseEntity<>(blogService.getAllBlogs(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable String id) {
        return new ResponseEntity<>(blogService.getBlogById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        return new ResponseEntity<>(blogService.createBlog(blog), HttpStatus.CREATED);
    }

    @PostMapping(path = "update")
    public ResponseEntity<Blog> updateBlog(@RequestBody Blog blog) {
        return new ResponseEntity<>(blogService.updateBlog(blog), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Long> removeBlog(@PathVariable String id) {
        return new ResponseEntity<>(blogService.removeBlog(id), HttpStatus.OK);
    }
}
