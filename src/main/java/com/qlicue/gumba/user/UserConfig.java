package com.qlicue.gumba.user;

import com.github.javafaker.Color;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {

            Faker f = new Faker();
           String name1 = "Mariam Kate";
            String name2 = "Robin Kalimwenjuma";
         User mariam = new User(
                 name1,
                 "maria maria",
                 "+255715123456",
                 "Sinza Madukani",
                 "maria@gmail.com",
                 Gender.FEMALE,
                 LocalDate.of(2001, Month.DECEMBER,17),
                 LocalDate.now(),
                 LocalDate.now(),

                 "http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ name1.substring(0,1)
         ) ;

            User robin = new User(
                    name2,
                    "x-code",
                    "+255715785672",
                    "Masaki Dar Es Salaam",
                    "kalimwenjuma@gmail.com",
                    Gender.MALE,
                    LocalDate.of(1999, Month.JANUARY,5),
                    LocalDate.now(),
                    LocalDate.now(),

                    "http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ name2.substring(0,1)
            ) ;

            repository.saveAll(List.of(mariam,robin));
        };
    }
}
