//package com.qlicue.gumba.user;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//
//@DataJpaTest
//class UserRepositoryTest {
//
//    @Autowired
//    private  UserRepository underTest;
//
//    @AfterEach
//    void tearDown() {
//        underTest.deleteAll();
//    }
//
//    @Test
//    void selectExistsEmail() {
//        //Given
//
//        String email = "kalrobbynson@gmail.com";
//        User user = new User(
//                "Robbyn Dismas",
//                email,
//                Gender.MALE);
//
//        underTest.save(user);
//
//        //When
//        boolean expected= underTest.selectExistsEmail(email);
//        //Then
//         assertThat(expected).isTrue();
//
//    }
//
//
//    @Test
//    void selectEmailDoesNotExist() {
//        //Given
//
//        String email = "kalrobbynson@gmail.com";
//
//
//        //When
//        boolean expected= underTest.selectExistsEmail(email);
//        //Then
//        assertThat(expected).isFalse();
//
//    }
//}