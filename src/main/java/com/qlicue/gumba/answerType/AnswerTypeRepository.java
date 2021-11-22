package com.qlicue.gumba.answerType;
import com.qlicue.gumba.question.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerTypeRepository extends JpaRepository<AnswerType
        , Long> {

    List<AnswerType> findByQuestion(Question question, Sort sort);
}
