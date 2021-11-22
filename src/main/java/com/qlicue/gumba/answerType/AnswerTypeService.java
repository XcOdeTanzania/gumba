package com.qlicue.gumba.answerType;


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
public class AnswerTypeService {
    private final AnswerTypeRepository answerTypeRepository ;
    private  final QuestionRepository questionRepository;
    public List<AnswerType> getAllAnswerTypes() {

        return answerTypeRepository.findAll();
    }

    public void addAnswerType(AnswerType answerType, Long questionId) {

        //find the question by id
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists"));

        //add dates
        answerType.setCreatedAt(LocalDate.now());
        answerType.setUpdatedAt(LocalDate.now());

        //add question to answerType
        answerType.setQuestion(question);

        //save the answer type
        answerTypeRepository.save(answerType);
    }

    public void deleteAnswerType(Long answerTypeId) {
        if (!answerTypeRepository.existsById(answerTypeId)) {
            throw new NotFoundException("AnswerType\twith\tid\t" + answerTypeId + "\tdoes\tnot\texists");
        }
        answerTypeRepository.deleteById(answerTypeId);
    }

    @Transactional
    public void updateAnswerType(Long answerTypeId, String title ) {
        AnswerType answerType = answerTypeRepository.findById(answerTypeId).orElseThrow(() ->
                new NotFoundException("AnswerType\twith\tid\t" + answerTypeId + "\tdoes\tnot\texists"));


        if (title != null && title.length() > 0 && !Objects.equals(answerType.getTitle(), title)) {
            answerType.setTitle(title);
        }


    }

    public List<AnswerType> getQuestionAnswerTypes(Long questionId) {
        //find the question by id
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists"));

        return   answerTypeRepository.findByQuestion(question, Sort.by("id"));
    }
}
