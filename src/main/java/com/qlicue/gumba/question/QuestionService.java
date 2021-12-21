package com.qlicue.gumba.question;


import com.qlicue.gumba.event.EntityCreatedEvent;
import com.qlicue.gumba.exception.NotFoundException;

import com.qlicue.gumba.section.Section;
import com.qlicue.gumba.section.SectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
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
    private  final SectionRepository sectionRepository;
    private ApplicationEventPublisher applicationEventPublisher;


    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    public List<Question> getSectionQuestions(Long sectionId) {
        //find the question by id
        Section section = sectionRepository.findById(sectionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + sectionId + "\tdoes\tnot\texists"));

        return   questionRepository .findBySection(section, Sort.by("id"));
    }

    public Question addQuestion(Question question) {

        //find the section by id
        Section section = sectionRepository.findById(question.getSectionId()).orElseThrow(() ->
                new NotFoundException("Section\twith\tid\t" + question.getSectionId() + "\tdoes\tnot\texists"));

        //add dates
        question.setCreatedAt(LocalDate.now());
        question.setUpdatedAt(LocalDate.now());


        //add section to question
        question.setSection(section);


        questionRepository.save(question);

        //publish question created event
         publishQuestionCreatedEvent(question);

        return question;
    }

    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists");
        }
        questionRepository.deleteById(questionId);
    }

    @Transactional
    public void updateQuestion(Long questionId, Question questionParams) {
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + questionId + "\tdoes\tnot\texists"));


        if (questionParams.getTitle() != null && questionParams.getTitle().length() > 0 && !Objects.equals(question.getTitle(), questionParams.getTitle())) {
            question.setTitle(questionParams.getTitle());
        }

        if ( questionParams.getType() != null && !Objects.equals(question.getType(), questionParams.getType())) {
            question.setType(questionParams.getType());
        }

        if (!Objects.equals(question.isRequired(), questionParams.isRequired())) {
            question.setRequired(questionParams.isRequired());
        }

        if (!Objects.equals(question.isHasSkips(), questionParams.isHasSkips())) {
            question.setHasSkips(questionParams.isHasSkips());
        }
    }

    //events

    void publishQuestionCreatedEvent(final Question question) {
        EntityCreatedEvent entityCreatedEvent = new EntityCreatedEvent(this, question);
        applicationEventPublisher.publishEvent(entityCreatedEvent);
    }
}
