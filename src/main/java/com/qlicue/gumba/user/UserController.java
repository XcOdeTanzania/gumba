package com.qlicue.gumba.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {


    @GetMapping
    public List<User> getAllUsers(){
        List<User> users = List.of(
                new User(1L,
                        "Maria",
                        "maria@qlicue.edu",
                        Gender.FEMALE),
                new User(2L,
                        "Ake",
                        "aleake@qlicue.edu",
                        Gender.MALE)
        );
        return  users;

    }


}
