package com.qlicue.gumba.survey;


import com.qlicue.gumba.resource.ResponseHandler;
import com.qlicue.gumba.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/surveys")
public class SurveyController {
    private final SurveyService surveyService;


    @GetMapping
    public ResponseEntity<Object> getAllSurveys() {
        try {
            List<Survey> result = surveyService.getAllSurveys();
            return ResponseHandler.generateResponse("Successfully retrieved surveys!", HttpStatus.OK, result, result.size());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null, 0);
        }

    }

    @PostMapping
    public  void addSurvey( @Valid @RequestBody Survey survey){

        surveyService.addSurvey(survey);
    }


    @DeleteMapping(path="{surveyId}")
    public  void deleteSurvey(@PathVariable("surveyId")   Long surveyId){
        surveyService.deleteSurvey(surveyId);
    }

    @GetMapping(path="{surveyId}")
    public Survey getSurvey(@PathVariable("surveyId")   Long surveyId) {

        return surveyService.getSurvey(surveyId);
    }


    @PutMapping(path = "{surveyId}")
    public void updateSurvey(@PathVariable("surveyId")   Long surveyId,
                           @RequestBody Survey survey )
    {
        surveyService.updateSurvey(surveyId, survey);
    }
}
