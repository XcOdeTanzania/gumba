package com.qlicue.gumba.question;


import com.qlicue.gumba.exception.NotFoundException;

import com.qlicue.gumba.section.Section;
import com.qlicue.gumba.section.SectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private  final SectionRepository sectionRepository;

    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    public List<Question> getSectionQuestions(Long sectionId) {
        //find the question by id
        Section section = sectionRepository.findById(sectionId).orElseThrow(() ->
                new NotFoundException("Question\twith\tid\t" + sectionId + "\tdoes\tnot\texists"));

        return   questionRepository .findBySection(section, Sort.by("id"));
    }

    public void addQuestion(Question question, Long sectionId) {

        //find the section by id
        Section section = sectionRepository.findById(sectionId).orElseThrow(() ->
                new NotFoundException("Section\twith\tid\t" + sectionId + "\tdoes\tnot\texists"));

        //add dates
        question.setCreatedAt(LocalDate.now());
        question.setUpdatedAt(LocalDate.now());


        //add section to question
        question.setSection(section);


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
