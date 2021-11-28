//package com.qlicue.gumba.survey;
//
//import com.github.javafaker.Faker;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Locale;
//
//@Configuration
//public class SurveyConfig {
//    @Bean
//    CommandLineRunner commandLineSurveyRunner(SurveyRepository  repository){
//        return args -> {
//
//            Faker f = new Faker();
//            String title1 = "Auntie Rafiki";
//            String title2 = "Nyumba ni Choo";
//
//            Survey survey1 = new Survey(
//                   "Auntie Rafiki" ,
//                  "Auntie Rafiki Survey",
//                    "auntie_rafiki",
//                    "Toffee chocolate cookie cake jelly chocolate gummies danish jelly-o. Tart cheesecake pudding chupa chups dessert tart. Chocolate bonbon apple pie candy chocolate fruitcake sugar plum. Marshmallow cupcake marzipan tiramisu tiramisu.",
//                    true,
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    "Marshmallow liquorice chocolate bar chocolate bar cupcake cotton candy tootsie roll halvah. Chocolate bar cookie sweet macaroon gummies. Halvah jelly marzipan gummi bears marzipan topping cupcake.",
//                    Accessibility.PUBLIC,
//
//                    "http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ title1.substring(0,1).toUpperCase(Locale.ROOT)
//
//
//            ) ;
//
//            Survey survey2 = new Survey(
//                    "Nyumba ni Choo" ,
//                    "Nymba ni choo  Survey",
//                    "nyumba_ni_choo",
//                    "Toffee chocolate cookie cake jelly chocolate gummies danish jelly-o. Tart cheesecake pudding chupa chups dessert tart. Chocolate bonbon apple pie candy chocolate fruitcake sugar plum. Marshmallow cupcake marzipan tiramisu tiramisu.",
//                    true,
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    LocalDate.now(),
//                    "Marshmallow liquorice chocolate bar chocolate bar cupcake cotton candy tootsie roll halvah. Chocolate bar cookie sweet macaroon gummies. Halvah jelly marzipan gummi bears marzipan topping cupcake.",
//                    Accessibility.PUBLIC,
//                    "http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ title2.substring(0,1).toUpperCase(Locale.ROOT)
//
//            ) ;
//
//
//
//            repository.saveAll(List.of(survey1,survey2));
//        };
//    }
//}
