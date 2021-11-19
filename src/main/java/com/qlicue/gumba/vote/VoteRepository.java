package com.qlicue.gumba.vote;
import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.question.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByQuestion(Question question, Sort sort);
}
