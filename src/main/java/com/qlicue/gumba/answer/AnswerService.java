package com.qlicue.gumba.answer;


import com.qlicue.gumba.exception.NotFoundException;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public List<Answer> getAllAnswers() {

        return answerRepository.findAll();
    }

    public void addAnswer(Answer answer) {
        //add dates
        answer.setCreatedAt(LocalDate.now());
        answer.setUpdatedAt(LocalDate.now());
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId) {
        if (!answerRepository.existsById(answerId)) {
            throw new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists");
        }
        answerRepository.deleteById(answerId);
    }

    @Transactional
    public void updateAnswer(Long answerId, String title ) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists"));


        if (title != null && title.length() > 0 && !Objects.equals(answer.getTitle(), title)) {
            answer.setTitle(title);
        }


    }
}
