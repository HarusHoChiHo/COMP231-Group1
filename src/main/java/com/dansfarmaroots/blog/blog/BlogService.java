package com.dansfarmaroots.blog.blog;


import com.dansfarmaroots.blog.user.User;
import com.dansfarmaroots.blog.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;

    public List<BlogWithoutContent> getAllBlogs() {
        return blogRepository.findAllByOrderByPublishDateDesc();
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
