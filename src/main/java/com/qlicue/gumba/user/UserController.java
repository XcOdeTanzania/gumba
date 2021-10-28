package com.qlicue.gumba.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public  void addUser( @Valid @RequestBody User user){

        userService.addUser(user);
    }


    @DeleteMapping(path="{userId}")
    public  void deleteUser(@PathVariable("userId")   Long userId){
        userService.deleteUser(userId);
    }


}
