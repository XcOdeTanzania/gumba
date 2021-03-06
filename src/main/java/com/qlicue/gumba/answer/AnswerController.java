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

    @GetMapping(path = "{questionId}")
    public List<Answer> getQuestionAnswers(@PathVariable("questionId") Long questionId ) {

        return answerService.getQuestionAnswers(questionId);

    }

    @PostMapping
    public  void addAnswer(@Valid @RequestBody Answer answer){

        answerService.addAnswer(answer);
    }

    @PutMapping(path = "{answerId}")
    public void updateAnswer(@PathVariable("answerId") Long answerId,
                              @RequestBody Answer answer
                               ){
        answerService.updateAnswer(answerId, answer );
    }

    @DeleteMapping(path="{answerId}")
    public  void deleteAnswer(@PathVariable("answerId")   Long answerId){
        answerService.deleteAnswer(answerId);
    }


}
