package com.qlicue.gumba.response;
import com.qlicue.gumba.question.Question;

import com.qlicue.gumba.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {

    @Query("select r from Response r LEFT join fetch r.question ")
    List<Response> findByQuestion(Question question, Sort sort);

    @Query("select r from Response r LEFT join fetch r.user")
    List<Response> findByUser(User user, Sort sort);
}
