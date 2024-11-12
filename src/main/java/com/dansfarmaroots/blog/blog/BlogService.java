package com.dansfarmaroots.blog.blog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public Blog updateBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public long removeBlog(String id) {
        return blogRepository.removeById(id);
    }

    public Blog getBlogById(String id) {
        return blogRepository.findById(id)
                             .orElseThrow();
    }
}
