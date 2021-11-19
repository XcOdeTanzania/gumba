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

    @PutMapping(path = "{questionId}")
    public void updateQuestion(@PathVariable("questionId") Long questionId,
                               @RequestParam(required = false) String title,
                               @RequestParam(required= false) QuestionType type,
                               @RequestParam(required = false) boolean isRequired
                               ){
        questionService.updateQuestion(questionId, title,type,isRequired);
    }

    @DeleteMapping(path="{questionId}")
    public  void deleteQuestion(@PathVariable("questionId")   Long questionId){
        questionService.deleteQuestion(questionId);
    }


}