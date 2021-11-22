package com.qlicue.gumba.answer;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/answers")
public class AnswerController {
    private final AnswerService answerService;


    @GetMapping
    public List<Answer> getAllAnswers() {

        return answerService.getAllAnswers();

    }

    @GetMapping(path = "{surveyId}")
    public List<Answer> getSurveyAnswers(@PathVariable("surveyId") Long surveyId ) {

        return answerService.getSurveyAnswers(surveyId);

    }

    @PostMapping(path="{surveyId}/{userId}")
    public  void addAnswer(@PathVariable("surveyId" ) Long surveyId,@PathVariable("userId" ) Long userId, @Valid @RequestBody Answer answer){

        answerService.addAnswer(answer,surveyId, userId);
    }

    @PutMapping(path = "{answerId}")
    public void updateAnswer(@PathVariable("answerId") Long answerId,
                               @RequestParam(required = false) String title
                               ){
        answerService.updateAnswer(answerId, title );
    }

    @DeleteMapping(path="{answerId}")
    public  void deleteAnswer(@PathVariable("answerId")   Long answerId){
        answerService.deleteAnswer(answerId);
    }


}
