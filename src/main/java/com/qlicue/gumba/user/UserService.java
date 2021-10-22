package com.qlicue.gumba.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private  final  UserRepository userRepository;

    public List<User> getAllUsers(){

       return userRepository.findAll();
    }

    public void addUser(User user) {
        //check if the student is empty
        userRepository.save(user);
    }
}
