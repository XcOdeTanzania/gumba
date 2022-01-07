package com.qlicue.gumba.excel;

import com.qlicue.gumba.exception.NotFoundException;
import com.qlicue.gumba.form.model.FormData;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.survey.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ExcelService {

    private final  SurveyRepository surveyRepository ;

    public ByteArrayInputStream downloadAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        ByteArrayInputStream in = ExcelHelper.surveysToExcel(surveys);
        return in;
    }


    public ByteArrayInputStream downloadSurveyResponse(Long surveyId, List<FormData> formData) {
        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        ByteArrayInputStream in = ExcelHelper.individualSurveyResponseToExcel(survey, formData );
        return in;
    }

}
