package com.qlicue.gumba.user;

import com.qlicue.gumba.resource.ResponseHandler;
import com.qlicue.gumba.survey.Survey;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;


    @GetMapping
    public ResponseEntity<Object> getAllUsers() {

        try {
            List<User> result = userService.getAllUsers();
            return ResponseHandler.generateResponse("Successfully retrieved users!", HttpStatus.OK, result, result.size());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null, 0);
        }

    }

    @GetMapping(path="{userId}")
    public  User getUser(@PathVariable("userId")   Long userId) {

        return userService.getUser(userId);
    }


    @PostMapping
    public  void addUser( @Valid @RequestBody User user){

        userService.addUser(user);
    }


    @DeleteMapping(path="{userId}")
    public  void deleteUser(@PathVariable("userId")   Long userId){
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
     public void updateUser(@PathVariable("userId")   Long userId,
                            @RequestBody User user )
       {
        userService.updateUser(userId, user);
       }

}
