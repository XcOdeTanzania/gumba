package com.qlicue.gumba.form;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/forms")
public class FormController {
    private final FormService formService;


    @GetMapping
    public List<Form> getAllForms() {

        return formService.getAllForms();

    }

    @GetMapping(path = "{surveyId}")
    public List<Form> getSurveyForms(@PathVariable("surveyId") Long surveyId ) {

        return formService.getSurveyForms(surveyId);

    }

    @PostMapping(path= "{surveyId}")
    public  void addForm( @PathVariable("surveyId" ) Long surveyId, @Valid @RequestBody Form  forms){

        formService.addForm(forms,   surveyId);
    }

    @PutMapping(path = "{formId}")
    public void updateForm(@PathVariable("formId") Long formId,
                               @RequestParam(required = false) String title
                               ){
        formService.updateForm(formId, title );
    }

    @DeleteMapping(path="{formId}")
    public  void deleteForm(@PathVariable("formId")   Long formId){
        formService.deleteForm(formId);
    }


}
