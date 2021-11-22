package com.qlicue.gumba.answer;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("select a from Answer a LEFT join fetch a.survey ")
    List<Answer> findBySurvey(Survey survey, Sort sort);

    @Query("select a from Answer a LEFT join fetch a.user")
    List<Answer> findByUser(User user, Sort sort);
}
