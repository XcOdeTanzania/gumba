package com.qlicue.gumba.question;

import com.qlicue.gumba.survey.Survey;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySurvey(Survey survey, Sort sort);
}
