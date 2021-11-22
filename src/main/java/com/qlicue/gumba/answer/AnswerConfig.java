//package com.qlicue.gumba.answer;
//
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Configuration
//public class AnswerConfig {
//    @Bean
//    CommandLineRunner commandLineAnswerRunner(AnswerRepository repository ) {
//        return args -> {
//
//         //   Survey survey1 = surveyRepository.getById(1L);
//
//          //  User user1 = userRepository.getById(1L);
//            Map<String, Object> map1 = new HashMap<>();
//            map1.put("ar01", "Intro to Map");
//            map1.put("ar02", "Some article");
//            map1.put("name", "Robbyn");
//            map1.put("sex", "Male");
//            map1.put("age", "12");
//
//            Answer answer1 = new Answer( );
////            answer1.setFormAttributes(map1);
////            answer1.setSurvey(survey1);
////            answer1.setUser(user1);
//            answer1.setCreatedAt(LocalDate.now());
//            answer1.setUpdatedAt(LocalDate.now());
//
//
////            repository.saveAll(List.of(answer1, answer1));
//        };
//    }
//}
