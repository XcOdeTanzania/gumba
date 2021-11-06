package com.qlicue.gumba.survey;


import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class SurveyService {
    private  final SurveyRepository surveyRepository;

    public List<Survey> getAllSurveys(){

       return surveyRepository.findAll();
    }

    public void addSurvey(Survey survey) {
        //add dates
        survey.setCreatedAt(LocalDate.now());
        survey.setUpdatedAt(LocalDate.now());
        surveyRepository.save(survey);
    }

    public void deleteSurvey(Long surveyId) {
         if(!surveyRepository.existsById(surveyId)){
             throw new NotFoundException("Survey\twith\tid\t" + surveyId+ "\tdoes\tnot\texists");
         }
        surveyRepository.deleteById(surveyId);
    }
}
