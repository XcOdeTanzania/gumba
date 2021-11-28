package com.qlicue.gumba.site;

import com.qlicue.gumba.resource.ResponseHandler;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/sites")
public class SiteController {
    private final SiteService siteService;


    @GetMapping
    public ResponseEntity<Object> getAllSites() {

        try {
            List<Site> result = siteService.getAllSites();
            return ResponseHandler.generateResponse("Successfully retrieved sites!", HttpStatus.OK, result, result.size());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null, 0);
        }

    }

    @GetMapping(path="{siteId}")
    public  Site getSite(@PathVariable("siteId")   Long siteId) {

        return siteService.getSite(siteId);
    }


    @PostMapping
    public  void addSite( @Valid @RequestBody Site site){
        siteService.addSite(site);
    }


    @DeleteMapping(path="{siteId}")
    public  void deleteSite(@PathVariable("siteId")   Long siteId){
        siteService.deleteSite(siteId);
    }

    @PutMapping(path = "{siteId}")
    public void updateSite(@PathVariable("siteId")   Long siteId,
                           @RequestBody Site site )
    {
        siteService.updateSite(siteId, site);
    }
}
