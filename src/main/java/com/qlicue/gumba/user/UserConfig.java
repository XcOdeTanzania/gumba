package com.qlicue.gumba.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
         User mariam = new User(
                 "Mariam Kate",
                 "maria@gmail.com",
                 Gender.FEMALE
         ) ;

            User robin = new User(
                    "Robin Kalimwenjuma",
                    "kalimwenjuma@gmail.com",
                    Gender.MALE
            ) ;

            repository.saveAll(List.of(mariam,robin));
        };
    }
}
