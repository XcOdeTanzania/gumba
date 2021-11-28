package com.qlicue.gumba.survey;


import com.github.javafaker.Faker;
import com.qlicue.gumba.exception.NotFoundException;

import com.qlicue.gumba.user.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@AllArgsConstructor
@Service
public class SurveyService {
    private  final SurveyRepository surveyRepository;

    public List<Survey> getAllSurveys(){

       return surveyRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public void addSurvey(Survey survey) {

        //add meta
        survey.setMetaTitle(survey.getTitle() + "Survey");
        survey.setSlug(survey.getTitle().toLowerCase(Locale.ROOT).replace(' ','_'));

        //add image

        Faker f = new Faker();
        survey.setImage("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ survey.getTitle().substring(0,1).toUpperCase(Locale.ROOT));


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

    public Survey getSurvey(Long surveyId) {

        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));


        return survey;
    }

    @Transactional 
    public void updateSurvey(Long surveyId, Survey surveyParams) {

        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        //update title
        if(surveyParams.getTitle() !=null && surveyParams.getTitle().length() >0 && !Objects.equals(survey.getTitle(),surveyParams.getTitle())){
            survey.setTitle(surveyParams.getTitle());
            survey.setMetaTitle(surveyParams.getTitle() + "Survey");
            survey.setSlug(surveyParams.getTitle().toLowerCase(Locale.ROOT).replace(' ','_'));

            Faker f = new Faker();
            survey.setImage("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ survey.getTitle().substring(0,1).toUpperCase(Locale.ROOT));

        }

        //update summary
        if(surveyParams.getSummary() !=null && surveyParams.getSummary().length() >0 && !Objects.equals(survey.getSummary(),surveyParams.getSummary())) survey.setSummary(surveyParams.getSummary());

        //update description
        if(surveyParams.getDescription() !=null && surveyParams.getDescription().length() >0 && !Objects.equals(survey.getDescription(),surveyParams.getDescription())) survey.setDescription(surveyParams.getDescription());

        //update publishedAt
        if(surveyParams.getPublishedAt() !=null  && !Objects.equals(survey.getPublishedAt(),surveyParams.getPublishedAt())) survey.setPublishedAt(surveyParams.getPublishedAt());

        //update startAt
        if(surveyParams.getStartsAt() !=null  && !Objects.equals(survey.getStartsAt(),surveyParams.getStartsAt())) survey.setStartsAt(surveyParams.getStartsAt());

        //update EndAt
        if(surveyParams.getEndsAt() !=null  && !Objects.equals(survey.getEndsAt(),surveyParams.getEndsAt())) survey.setEndsAt(surveyParams.getEndsAt());

        //update accessibility
        if(surveyParams.getAccessibility() !=null   && !Objects.equals(survey.getAccessibility(),surveyParams.getAccessibility())) survey.setAccessibility(surveyParams.getAccessibility());


        //update publish
        if((surveyParams.isPublish() || !surveyParams.isPublish()) && !Objects.equals(survey.isPublish(),surveyParams.isPublish())) survey.setPublish(surveyParams.isPublish());


    }
}
