package com.qlicue.gumba.question;


import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.exception.NotFoundException;

import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.survey.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private  final SurveyRepository surveyRepository;

    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    public List<Question> getSurveyQuestions(Long surveyId) {
        //find the question by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        return   questionRepository .findBySurvey(survey, Sort.by("id"));
    }

    public void addQuestion(Question question, Long surveyId) {

        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        //add dates
        question.setCreatedAt(LocalDate.now());
        question.setUpdatedAt(LocalDate.now());

        //add survey to question
        question.setSurvey(survey);


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
