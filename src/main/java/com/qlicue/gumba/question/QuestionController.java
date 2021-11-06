package com.qlicue.gumba.question;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/questions")
public class QuestionController {
    private final QuestionService questionService;


    @GetMapping
    public List<Question> getAllQuestions() {

        return questionService.getAllQuestions();

    }

    @PostMapping
    public  void addQuestion( @Valid @RequestBody Question question){

        questionService.addQuestion(question);
    }


    @DeleteMapping(path="{questionId}")
    public  void deleteQuestion(@PathVariable("questionId")   Long questionId){
        questionService.deleteQuestion(questionId);
    }


}
