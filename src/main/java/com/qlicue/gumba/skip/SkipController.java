package com.qlicue.gumba.skip;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/skips")
public class SkipController {
    private final SkipService skipService;


    @GetMapping
    public List<Skip> getAllSkips() {

        return skipService.getAllSkips();

    }

    @GetMapping(path = "{answerId}")
    public List<Skip> getAnswerSkips(@PathVariable("answerId") Long answerId ) {

        return skipService.getAnswerSkips(answerId);

    }

    @PostMapping(path="{answerId}")
    public  void addSkip(@PathVariable("answerId") Long answerId, @Valid @RequestBody Skip skip){

        skipService.addSkip(skip,answerId);
    }

    @PutMapping(path = "{skipId}")
    public void updateSkip(@PathVariable("skipId") Long skipId,
                               @RequestParam(required = false) String title,
                               @RequestParam(required= false) SkipType type,
                               @RequestParam(required = false) boolean isRequired
                               ){
        //skipService.updateSkip(skipId, title,type,isRequired);
    }

    @DeleteMapping(path="{skipId}")
    public  void deleteSkip(@PathVariable("skipId")   Long skipId){
        skipService.deleteSkip(skipId);
    }


}
