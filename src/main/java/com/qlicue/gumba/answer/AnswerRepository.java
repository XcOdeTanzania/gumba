package com.qlicue.gumba.answer;
import com.qlicue.gumba.question.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer
        , Long> {

    @Query("select a from Answer a LEFT join fetch a.skip")
    List<Answer> findByQuestion(Question question, Sort sort);

    @Query("select a from Answer a LEFT join fetch a.skip")
    List<Answer> findAll();

}
