package com.qlicue.gumba.vote;

import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.answer.AnswerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/answers")
public class VoteController {
    private final AnswerService answerService;


    @GetMapping
    public List<Answer> getAllAnswers() {

        return answerService.getAllAnswers();

    }

    @GetMapping(path = "{questionId}")
    public List<Answer> getQuestionAnswers(@PathVariable("questionId") Long questionId ) {

        return answerService.getQuestionAnswers(questionId);

    }

    @PostMapping(path="{questionId}")
    public  void addAnswer(@PathVariable("questionId") Long questionId, @Valid @RequestBody Answer answer){

        answerService.addAnswer(answer,questionId);
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
