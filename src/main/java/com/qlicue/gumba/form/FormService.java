package com.qlicue.gumba.form;


import com.qlicue.gumba.exception.NotFoundException;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.question.QuestionRepository;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.survey.SurveyRepository;
import com.qlicue.gumba.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class FormService {
    private final FormRepository formRepository;
    private  final QuestionRepository questionRepository;
    private  final SurveyRepository surveyRepository;
    public List<Form> getAllForms() {

        return formRepository.findAll();
    }

    public void addForm(Form form,  Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId ).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        form.setCreatedAt(LocalDate.now());
        form.setUpdatedAt(LocalDate.now());
        form.setSurvey(survey);

        //save the form
        formRepository.save(form);
    }

    public void deleteForm(Long formId) {
        if (!formRepository.existsById(formId)) {
            throw new NotFoundException("Form\twith\tid\t" + formId + "\tdoes\tnot\texists");
        }
        formRepository.deleteById(formId);
    }

    @Transactional
    public void updateForm(Long formId, String title ) {
        Form form = formRepository.findById(formId).orElseThrow(() ->
                new NotFoundException("Form\twith\tid\t" + formId + "\tdoes\tnot\texists"));


//        if (title != null && title.length() > 0 && !Objects.equals(form.getTitle(), title)) {
//            form.setTitle(title);
//        }


    }

    public List<Form> getSurveyForms(Long surveyId) {
        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        return   formRepository.findBySurvey(survey, Sort.by("id"));
    }
}
