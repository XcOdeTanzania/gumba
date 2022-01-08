package com.qlicue.gumba.user;

import com.qlicue.gumba.errors.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.HashSet;


@RestController
@RequestMapping("api/v1/users")
@Slf4j
@Validated
class UserController {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    UserController(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    Page<User> all(@PageableDefault(size = Integer.MAX_VALUE) Pageable pageable, OAuth2Authentication authentication) {
        String auth = (String) authentication.getUserAuthentication().getPrincipal();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        if (role.equals(User.Role.USER.name())) {
            return repository.findAllByEmail(auth, pageable);
        }
        return repository.findAll(pageable);
    }

    @GetMapping("/search")
    Page<User> search(@RequestParam String email, Pageable pageable, OAuth2Authentication authentication) {
        String auth = (String) authentication.getUserAuthentication().getPrincipal();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        if (role.equals(User.Role.USER.name())) {
            return repository.findAllByEmailContainsAndEmail(email, auth, pageable);
        }
        return repository.findByEmailContains(email, pageable);
    }

    @GetMapping("/findByEmail")
    @PreAuthorize("!hasAuthority('USER') || (authentication.principal == #email)")
    User findByEmail(@RequestParam String email, OAuth2Authentication authentication) {
        return repository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException(User.class, "email", email));
    }

    @GetMapping("/{id}")
    @PostAuthorize("!hasAuthority('USER') || (returnObject != null && returnObject.email == authentication.principal)")
    User one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("!hasAuthority('USER') || (authentication.principal == @userRepository.findById(#id).orElse(new net.reliqs.gleeometer.users.User()).email)")
    void update(@PathVariable Long id, @Valid @RequestBody User res) {
        User u = repository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
        res.setPassword(u.getPassword());
        res.setGlee(u.getGlee());
        repository.save(res);
    }

    @PostMapping
    @PreAuthorize("!hasAuthority('USER')")
    User create(@Valid @RequestBody User res) {
        return repository.save(res);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("!hasAuthority('USER')")
    void delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException(User.class, "id", id.toString());
        }
    }

    @PutMapping("/{id}/changePassword")
    @PreAuthorize("!hasAuthority('USER') || (#oldPassword != null && !#oldPassword.isEmpty() && authentication.principal == @userRepository.findById(#id).orElse(new net.reliqs.gleeometer.users.User()).email)")
    void changePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User user = repository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
        if (oldPassword == null || oldPassword.isEmpty() || passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            repository.save(user);
        } else {
            throw new ConstraintViolationException("old password doesn't match", new HashSet<>());
        }
    }
}


//import com.qlicue.gumba.resource.ResponseHandler;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@AllArgsConstructor
//@RestController
//@RequestMapping(path = "api/v1/users")
//public class UserController {
//    private final UserService userService;
//
//
//    @GetMapping
//    public ResponseEntity<Object> getAllUsers() {
//
//        try {
//            List<User> result = userService.getAllUsers();
//            return ResponseHandler.generateResponse("Successfully retrieved users!", HttpStatus.OK, result, result.size());
//        } catch (Exception e) {
//            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null, 0);
//        }
//
//    }
//
//    @GetMapping(path="{userId}")
//    public  User getUser(@PathVariable("userId")   Long userId) {
//
//        return userService.getUser(userId);
//    }
//
//
//    @PostMapping
//    public  void addUser( @Valid @RequestBody User user){
//
//        userService.addUser(user);
//    }
//
//
//    @DeleteMapping(path="{userId}")
//    public  void deleteUser(@PathVariable("userId")   Long userId){
//        userService.deleteUser(userId);
//    }
//
//    @PutMapping(path = "{userId}")
//     public void updateUser(@PathVariable("userId")   Long userId,
//                            @RequestBody User user )
//       {
//        userService.updateUser(userId, user);
//       }
//
//}
