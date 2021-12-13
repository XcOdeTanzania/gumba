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

    @GetMapping(path = "{questionId}")
    public List<Response> getSurveyResponses(@PathVariable("questionId") Long questionId ) {

        return responseService.getQuestionResponses(questionId);

    }

    @PostMapping(path="{userId}")
    public  void addResponse( @PathVariable("userId" ) Long userId, @Valid @RequestBody List<Response> responses){

        responseService.addResponse(responses, userId);
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
