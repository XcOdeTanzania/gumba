package com.qlicue.gumba.user;

import com.qlicue.gumba.exception.BadRequestException;
import com.qlicue.gumba.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.EntityGraph;
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
        Boolean existsEmail = userRepository.selectExistsEmail(user.getEmail());
        if(existsEmail){
            throw new BadRequestException("Email\t" + user.getEmail() + "\ttaken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
         if(!userRepository.existsById(userId)){
             throw new NotFoundException("User\twith\tid\t" + userId+ "\tdoes\tnot\texists");
         }
        userRepository.deleteById(userId);
    }
}
