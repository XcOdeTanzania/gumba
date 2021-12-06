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

    @GetMapping(path = "{sectionId}")
    public List<Question> getSectionQuestions(@PathVariable("sectionId") Long sectionId ) {

        return questionService.getSectionQuestions(sectionId);

    }

    @PostMapping(path="{sectionId}")
    public  void addQuestion(@PathVariable("sectionId") Long sectionId, @Valid @RequestBody Question question){

        questionService.addQuestion(question,sectionId);
    }

    @PutMapping(path = "{questionId}")
    public void updateQuestion(@PathVariable("questionId") Long questionId,
                               @Valid @RequestBody Question question
                               ){
        questionService.updateQuestion(questionId, question);
    }

    @DeleteMapping(path="{questionId}")
    public  void deleteQuestion(@PathVariable("questionId")   Long questionId){
        questionService.deleteQuestion(questionId);
    }


}
