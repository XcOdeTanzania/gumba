package com.qlicue.gumba.question;


import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    public void addQuestion(Question question) {
        //add dates
        question.setCreatedAt(LocalDate.now());
        question.setUpdatedAt(LocalDate.now());
        questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists");
        }
        questionRepository.deleteById(questionId);
    }

    @Transactional
    public void updateQuestion(Long questionId, String title, QuestionType type, boolean isRequired) {
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists"));


        if (title != null && title.length() > 0 && !Objects.equals(question.getTitle(), title)) {
            question.setTitle(title);
        }

        if (type != null && !Objects.equals(question.getType(), type)) {
            question.setType(type);
        }

        if (!Objects.equals(question.getType(), isRequired)) {
            question.setRequired(isRequired);
        }
    }
}
