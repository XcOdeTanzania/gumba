package com.qlicue.gumba.user;

import com.qlicue.gumba.exception.BadRequestException;
import com.qlicue.gumba.exception.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    private UserService underTest;

    @BeforeEach
    void setUp() {
        underTest = new UserService(userRepository);
    }


    @Test
    void getAllUsers() {
        //When
        underTest.getAllUsers();

        //then
        verify(userRepository).findAll();
    }

    @Test
    void addUser() {
        //Given

        User user = new User(
                "Robbyn Dismas",
                "xcode",
                "+255715785672",
                "1234 dar",

                 "a@b.com",
                Gender.MALE,
                LocalDate.now(),
                LocalDate.now(),
                LocalDate.now(),
                "tahgs");

        //When
        underTest.addUser(user);

        //then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);
    }


    @Test
    void throwsWhenEmailIsTaken() {
        //Given

        String email = "kalrobbynson@gmail.com";
        User user = new User(
                "Robbyn Dismas",
                "xcode",
                "+255715785672",
                "1234 dar",

                email,
                Gender.MALE,
                LocalDate.now(),
                LocalDate.now(),
                LocalDate.now(),
                "tahgs");

        given(userRepository.selectExistsEmail(user.getEmail())).willReturn(true);

        //When
        //Then
        assertThatThrownBy(() -> underTest.addUser(user))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email\t" + user.getEmail() + "\ttaken");

        verify(userRepository, never()).save(any());
    }


    @Test
    void deleteUser() {

        // given
        long id = 10;
        given(userRepository.existsById(id))
                .willReturn(true);
        // when
        underTest.deleteUser(id);

        // then
        verify(userRepository).deleteById(id);


    }

    @Test
    void willThrowWhenDeleteStudentNotFound() {
        // given
        long id = 10;
        given(userRepository.existsById(id))
                .willReturn(false);
        // when
        // then
        assertThatThrownBy(() -> underTest.deleteUser(id))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining("User\twith\tid\t" + id+ "\tdoes\tnot\texists");

        verify(userRepository, never()).deleteById(any());
    }
}