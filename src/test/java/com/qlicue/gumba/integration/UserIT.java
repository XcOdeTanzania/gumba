package com.qlicue.gumba.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import com.qlicue.gumba.user.Gender;
import com.qlicue.gumba.user.User;
import com.qlicue.gumba.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.StringUtils;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class UserIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private final Faker faker = new Faker();

    @Test
    void addUser() throws Exception {
        //given
        String name = String.format("%s %s",
                faker.name().firstName(),
                faker.name().lastName());
        User user = new User(
                name,
                String.format("%s@gumba.com",   StringUtils.trimAllWhitespace(name.trim().toLowerCase())),
                Gender.MALE);
        //when
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)));
        //then
        resultActions.andExpect(status().isOk());
        List<User> users = userRepository.findAll();
        assertThat(users)
                .usingElementComparatorIgnoringFields("id")
                .contains(user);
    }

    @Test
    void canDeleteUser() throws Exception {
        // given
        String name = String.format(
                "%s %s",
                faker.name().firstName(),
                faker.name().lastName()
        );

        String email = String.format("%s@gumba.com",
                StringUtils.trimAllWhitespace(name.trim().toLowerCase()));

        User user = new User(
                name,
                email,
                Gender.FEMALE
        );

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        MvcResult getUsersResult = mockMvc.perform(get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getUsersResult
                .getResponse()
                .getContentAsString();

        List<User> users = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );

        long id = users.stream()
                .filter(s -> s.getEmail().equals(user.getEmail()))
                .map(User::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "user with email: " + email + " not found"));

        // when
        ResultActions resultActions = mockMvc
                .perform(delete("/api/v1/users/" + id));

        // then
        resultActions.andExpect(status().isOk());
        boolean exists = userRepository.existsById(id);
        assertThat(exists).isFalse();
    }
    
}
