package com.qlicue.gumba.user;

import com.github.javafaker.Faker;
import com.qlicue.gumba.exception.BadRequestException;
import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

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

        Faker f = new Faker();
        user.setAvatar("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ user.getName().substring(0,1).toUpperCase(Locale.ROOT));
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());

        userRepository.save(user);
    }

    public User getUser(Long userId) {
        //find the user by id
        User user = userRepository.findById(userId).orElseThrow(() ->
                new NotFoundException("User\twith\tid\t" + userId + "\tdoes\tnot\texists"));


        return user;

    }

    public void deleteUser(Long userId) {
         if(!userRepository.existsById(userId)){
             throw new NotFoundException("User\twith\tid\t" + userId+ "\tdoes\tnot\texists");
         }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId, User userParams) {
        //find the question by id
        User user = userRepository.findById(userId).orElseThrow(() ->
                new NotFoundException("User\twith\tid\t" + userId + "\tdoes\tnot\texists"));

        //update name
        if(userParams.getName() !=null && userParams.getName().length() >0 && !Objects.equals(user.getName(),userParams.getName())){
            user.setName(userParams.getName());
            Faker f = new Faker();
            user.setAvatar("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ user.getName().substring(0,1).toUpperCase(Locale.ROOT));

        }

        //update nickname
        if(userParams.getNickname() !=null && userParams.getNickname().length() >0 && !Objects.equals(user.getNickname(),userParams.getNickname())) user.setNickname(userParams.getNickname());

        //update phone
        if(userParams.getPhone() !=null && userParams.getPhone().length() >0 && !Objects.equals(user.getPhone(),userParams.getPhone())) user.setPhone(userParams.getPhone());

        //update address
        if(userParams.getAddress() !=null && userParams.getAddress().length() >0 && !Objects.equals(user.getAddress(),userParams.getAddress())) user.setAddress(userParams.getAddress());


        //update email
        if(userParams.getEmail() !=null && userParams.getEmail().length() >0 && !Objects.equals(user.getEmail(),userParams.getEmail())){
          Optional<User> userOptional   =userRepository.findUserByEmail(userParams.getEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email taken");
        }
        user.setEmail(userParams.getEmail());
        }

        //update gender
        if(userParams.getGender() !=null  && !Objects.equals(user.getGender(),userParams.getGender())) user.setGender(userParams.getGender());


        //update dob
        if(userParams.getDob() !=null   && !Objects.equals(user.getDob(),userParams.getDob())) user.setDob(userParams.getDob());

        //update avatar
        if(userParams.getAvatar() !=null   && !Objects.equals(user.getAvatar(),userParams.getAvatar())) user.setAvatar(userParams.getAvatar());



    }


}
