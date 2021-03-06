package com.qlicue.gumba.answer;


import com.qlicue.gumba.exception.NotFoundException;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.question.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private  final QuestionRepository questionRepository;
    public List<Answer> getAllAnswers() {

        return answerRepository.findAll();
    }

    public void addAnswer(Answer answer) {

        //find the question by id
        Question question = questionRepository.findById(answer.getQuestionId()).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + answer.getQuestionId() + "\tdoes\tnot\texists"));

        //add dates
        answer.setCreatedAt(LocalDate.now());
        answer.setUpdatedAt(LocalDate.now());

        //add question to answer
        answer.setQuestion(question);

        //save the answer type
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId) {
        if (!answerRepository.existsById(answerId)) {
            throw new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists");
        }
        answerRepository.deleteById(answerId);
    }

    @Transactional
    public void updateAnswer(Long answerId, Answer answerParams ) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists"));


        if (answerParams.getTitle() != null && answerParams.getTitle().length() > 0 && !Objects.equals(answer.getTitle(), answerParams.getTitle())) {
            answer.setTitle(answerParams.getTitle());
        }


    }

    public List<Answer> getQuestionAnswers(Long questionId) {
        //find the question by id
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists"));

        return   answerRepository.findByQuestion(question, Sort.by("id"));
    }
}
