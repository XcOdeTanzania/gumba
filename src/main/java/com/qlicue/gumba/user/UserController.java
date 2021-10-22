package com.qlicue.gumba.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;


    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }

    @PostMapping
    public  void addUser(@RequestBody User user){
        userService.addUser(user);
    }


}
