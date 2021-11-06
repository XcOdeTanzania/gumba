package com.qlicue.gumba.question;


import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class QuestionService {
    private  final QuestionRepository questionRepository;

    public List<Question> getAllQuestions(){

       return questionRepository.findAll();
    }

    public void addQuestion(Question question) {
        //add dates
        question.setCreatedAt(LocalDate.now());
        question.setUpdatedAt(LocalDate.now());
        questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId) {
         if(!questionRepository.existsById(questionId)){
             throw new NotFoundException("Question\twith\tid\t" + questionId+ "\tdoes\tnot\texists");
         }
        questionRepository.deleteById(questionId);
    }
}
