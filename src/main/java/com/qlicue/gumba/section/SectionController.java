package com.qlicue.gumba.section;

import com.qlicue.gumba.section.Section;
import com.qlicue.gumba.section.SectionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/sections")
public class SectionController {
    private final SectionService sectionService;


    @GetMapping
    public List<Section> getAllSections() {

        return sectionService.getAllSections();

    }

    @GetMapping(path = "{surveyId}")
    public List<Section> getSurveySections(@PathVariable("surveyId") Long surveyId ) {

        return sectionService.getSurveySections(surveyId);

    }

    @PostMapping(path="{surveyId}")
    public  void addSection(@PathVariable("surveyId") Long surveyId, @Valid @RequestBody Section section){

        sectionService.addSection(section,surveyId);
    }

    @PutMapping(path = "{sectionId}")
    public void updateSection(@PathVariable("sectionId") Long sectionId,
                               @RequestParam(required = false) String title
                               ){
        sectionService.updateSection(sectionId, title );
    }

    @DeleteMapping(path="{sectionId}")
    public  void deleteSection(@PathVariable("sectionId")   Long sectionId){
        sectionService.deleteSection(sectionId);
    }


}
