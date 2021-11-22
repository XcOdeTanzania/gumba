package com.qlicue.gumba.answerType;

import com.qlicue.gumba.answerType.AnswerType;
import com.qlicue.gumba.answerType.AnswerTypeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/answerTypes")
public class AnswerTypeController {
    private final AnswerTypeService answerTypeService;


    @GetMapping
    public List<AnswerType> getAllAnswerTypes() {

        return answerTypeService.getAllAnswerTypes();

    }

    @GetMapping(path = "{questionId}")
    public List<AnswerType> getQuestionAnswerTypes(@PathVariable("questionId") Long questionId ) {

        return answerTypeService.getQuestionAnswerTypes(questionId);

    }

    @PostMapping(path="{questionId}")
    public  void addAnswerType(@PathVariable("questionId") Long questionId, @Valid @RequestBody AnswerType answerType){

        answerTypeService.addAnswerType(answerType,questionId);
    }

    @PutMapping(path = "{answerTypeId}")
    public void updateAnswerType(@PathVariable("answerTypeId") Long answerTypeId,
                               @RequestParam(required = false) String title
                               ){
        answerTypeService.updateAnswerType(answerTypeId, title );
    }

    @DeleteMapping(path="{answerTypeId}")
    public  void deleteAnswerType(@PathVariable("answerTypeId")   Long answerTypeId){
        answerTypeService.deleteAnswerType(answerTypeId);
    }


}
