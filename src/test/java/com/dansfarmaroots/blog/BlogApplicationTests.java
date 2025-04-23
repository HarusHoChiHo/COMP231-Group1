package com.dansfarmaroots.blog;

import com.dansfarmaroots.blog.blog.Blog;
import com.dansfarmaroots.blog.comment.Comment;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = BlogApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BlogApplicationTests {

    @Autowired
    private static MockMvc mvc;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private static String token;
    private static String newId;

    @Test
    @Order(0)
    void getAllBlogs() throws Exception {
        mockMvc.perform(
                       MockMvcRequestBuilders
                               .get("/api/blogs")
                               .accept(MediaType.APPLICATION_JSON)
                               .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$[0].id").value("674a1e3ccf24c37710d228c4"));

    }

    @Test
    @Order(1)
    void getBlog() throws Exception {
        //TODO: get blog testing (By id)
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blogs/674a1e3ccf24c37710d228c4")
                                              .accept(MediaType.APPLICATION_JSON)
                                              .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.title").value("The launch of the Ginseng Energy Drink"));
    }

    @Test
    @Order(2)
    void createBlog() throws Exception {
        //TODO: create blog testing

        Blog blog = new Blog();
        blog.setTitle("Unit Test");
        blog.setContent("{ops:[{insert:\"Unit Test\"}]");
        blog.setPublishDate(Date.from(LocalDateTime.now()
                                                   .toInstant(ZoneOffset.UTC)));
        blog.setAuthorName("admin");

        String result = mockMvc.perform(MockMvcRequestBuilders.post("/api/blogs")
                                                              .contentType(MediaType.APPLICATION_JSON)
                                                              .accept(MediaType.APPLICATION_JSON)
                                                              .header("Authorization", String.format("Bearer %s", token))
                                                              .content(objectMapper.writeValueAsString(blog)))
                               .andExpect(status().isCreated())
                               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                               .andExpect(jsonPath("$.id").isNotEmpty())
                               .andReturn()
                               .getResponse()
                               .getContentAsString();

        newId = objectMapper.readValue(result, Blog.class)
                            .getId();
    }

    @Test
    @Order(3)
    void updateBlog() throws Exception {
        //TODO: update blog testing
        Blog blog = new Blog();
        blog.setId(newId);
        blog.setTitle("Unit Test");
        blog.setContent("{ops:[{insert:\"Unit Test Updated\"}]");
        blog.setPublishDate(Date.from(LocalDateTime.now()
                                                   .toInstant(ZoneOffset.UTC)));
        blog.setAuthorName("admin");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/blogs/update")
                                              .contentType(MediaType.APPLICATION_JSON)
                                              .accept(MediaType.APPLICATION_JSON)
                                              .header("Authorization", String.format("Bearer %s", token))
                                              .content(objectMapper.writeValueAsString(blog)))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.id").value(newId));
    }

    @Test
    @Order(4)
    void deleteBlog() throws Exception {
        //TODO: delete blog testing

        Blog blog = new Blog();
        blog.setId(newId);

        String result = mockMvc.perform(MockMvcRequestBuilders.delete("/api/blogs/" + newId)
                                                              .contentType(MediaType.APPLICATION_JSON)
                                                              .accept(MediaType.APPLICATION_JSON)
                                                              .header("Authorization", String.format("Bearer %s", token)))
                               .andExpect(status().isOk())
                               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                               .andReturn()
                               .getResponse()
                               .getContentAsString();
        Assertions.assertEquals("1", result);
    }

    @Test
    @Order(5)
    void getAllComments() throws Exception {
        //TODO: get all comments testing

        String content = mockMvc.perform(MockMvcRequestBuilders.get("/api/comments/674416990e97722a4bf3d330")
                                                               .contentType(MediaType.APPLICATION_JSON)
                                                               .accept(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                                .andExpect(jsonPath("$[0].blogId").value("674416990e97722a4bf3d330"))
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        List comments = objectMapper.readValue(content, objectMapper.getTypeFactory()
                                                                    .constructCollectionType(List.class, Comment.class));

        Assertions.assertEquals(12, comments.stream()
                                            .count());
    }

    @Test
    @Order(6)
    void createComment() throws Exception {
        //TODO: create comment testing

        Comment comment = new Comment();
        comment.setContent("Unit Testing");
        comment.setPublishDate(Date.from(LocalDateTime.now()
                                                      .toInstant(ZoneOffset.UTC)));
        comment.setBlogId("674416990e97722a4bf3d330");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/comments")
                                              .contentType(MediaType.APPLICATION_JSON)
                                              .accept(MediaType.APPLICATION_JSON)
                                              .content(objectMapper.writeValueAsString(comment)))
               .andExpectAll(status().isCreated(),
                       content().contentType(MediaType.APPLICATION_JSON),
                       jsonPath("$.id").isNotEmpty(),
                       jsonPath("$.content").value(comment.getContent())
               );
    }

    @BeforeEach
    void login() throws Exception {
        //TODO: login testing
        JSONObject jo = new JSONObject();
        jo.put("username", "admin");
        jo.put("password", "admin");
        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                                                               .contentType(MediaType.APPLICATION_JSON)
                                                               .content(jo.toString()))
                                .andExpect(jsonPath("$.token").isString())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();
        JSONObject jsonObject = new JSONObject(content);
        token = jsonObject.getString("token");
    }
}
