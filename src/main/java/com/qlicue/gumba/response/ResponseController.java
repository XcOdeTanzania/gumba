package com.qlicue.gumba.response;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/responses")
public class ResponseController {
    private final ResponseService responseService;


    @GetMapping
    public List<Response> getAllResponses() {

        return responseService.getAllResponses();

    }

    @GetMapping(path = "{surveyId}")
    public List<Response> getSurveyResponses(@PathVariable("surveyId") Long surveyId ) {

        return responseService.getSurveyResponses(surveyId);

    }

    @PostMapping(path="{surveyId}/{userId}")
    public  void addResponse(@PathVariable("surveyId" ) Long surveyId,@PathVariable("userId" ) Long userId, @Valid @RequestBody Response response){

        responseService.addResponse(response,surveyId, userId);
    }

    @PutMapping(path = "{responseId}")
    public void updateResponse(@PathVariable("responseId") Long responseId,
                               @RequestParam(required = false) String title
                               ){
        responseService.updateResponse(responseId, title );
    }

    @DeleteMapping(path="{responseId}")
    public  void deleteResponse(@PathVariable("responseId")   Long responseId){
        responseService.deleteResponse(responseId);
    }


}
