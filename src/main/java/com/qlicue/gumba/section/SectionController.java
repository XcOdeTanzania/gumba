package com.qlicue.gumba.section;

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

    @PostMapping
    public  void addSection(@Valid @RequestBody Section section){

        sectionService.addSection(section);
    }

    @PutMapping(path = "{sectionId}")
    public void updateSection(@PathVariable("sectionId") Long sectionId,
                              @RequestBody Section section
                               ){
        sectionService.updateSection(sectionId, section );
    }

    @DeleteMapping(path="{sectionId}")
    public  void deleteSection(@PathVariable("sectionId")   Long sectionId){
        sectionService.deleteSection(sectionId);
    }


}
