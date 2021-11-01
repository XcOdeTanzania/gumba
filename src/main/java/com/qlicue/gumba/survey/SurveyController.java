package com.qlicue.gumba.survey;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/surveys")
public class SurveyController {
    private final SurveyService surveyService;


    @GetMapping
    public List<Survey> getAllSurveys() {

        return surveyService.getAllSurveys();

    }

    @PostMapping
    public  void addSurvey( @Valid @RequestBody Survey survey){

        surveyService.addSurvey(survey);
    }


    @DeleteMapping(path="{surveyId}")
    public  void deleteSurvey(@PathVariable("surveyId")   Long surveyId){
        surveyService.deleteSurvey(surveyId);
    }


}
