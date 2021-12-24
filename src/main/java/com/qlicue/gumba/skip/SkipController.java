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

    @PostMapping
    public  void addSkip(  @Valid @RequestBody Skip skip){

        skipService.addSkip(skip );
    }

    @PutMapping(path = "{skipId}")
    public void updateSkip(@PathVariable("skipId") Long skipId,
                           @RequestBody Skip skip
                               ){
        skipService.updateSkip(skipId, skip);
    }

    @DeleteMapping(path="{skipId}")
    public  void deleteSkip(@PathVariable("skipId")   Long skipId){
        skipService.deleteSkip(skipId);
    }


}
