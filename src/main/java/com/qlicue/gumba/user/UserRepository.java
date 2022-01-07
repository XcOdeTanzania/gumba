package com.qlicue.gumba.user;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Page<User> findByEmailContains(String email, Pageable pageable);
    Page<User> findAllByEmail(String email, Pageable pageable);
    Page<User> findAllByEmailContainsAndEmail(String email, String auth, Pageable pageable);

    Boolean existsByEmail(String email);
}
//import com.qlicue.gumba.survey.Survey;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserRepository  extends JpaRepository<User, Long> {
//
//    @Query("" +
//            "SELECT CASE WHEN COUNT(u) > 0 THEN " +
//            "TRUE ELSE FALSE END " +
//            "FROM User u " +
//            "WHERE u.email = ?1"
//    )
//    Boolean selectExistsEmail(String email);
//
//    @Query("SELECT u FROM User u LEFT JOIN FETCH u.responses" )
//    List<User> findAll();
//
//    @Query("SELECT u FROM User u WHERE u.email = ?1")
//    Optional<User> findUserByEmail(String email);
//}
