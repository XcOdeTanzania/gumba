package com.qlicue.gumba.site;

import com.github.javafaker.Faker;
import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@AllArgsConstructor
@Service
public class SiteService {
    private  final SiteRepository siteRepository;

    public List<Site> getAllSites(){
        
       return siteRepository.findAll();
    }

    public void addSite(Site site) {


        Faker f = new Faker();
        site.setImage("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ site.getName().substring(0,1).toUpperCase(Locale.ROOT));
        site.setCreatedAt(LocalDate.now());
        site.setUpdatedAt(LocalDate.now());
        
        siteRepository.save(site);
    }

    public Site getSite(Long siteId) {
        //find the site by id
        Site site = siteRepository.findById(siteId).orElseThrow(() ->
                new NotFoundException("Site\twith\tid\t" + siteId + "\tdoes\tnot\texists"));


        return site;

    }

    public void deleteSite(Long siteId) {
         if(!siteRepository.existsById(siteId)){
             throw new NotFoundException("Site\twith\tid\t" + siteId+ "\tdoes\tnot\texists");
         }
        siteRepository.deleteById(siteId);
    }

    @Transactional
    public void updateSite(Long siteId, Site siteParams) {
        //find the question by id
        Site site = siteRepository.findById(siteId).orElseThrow(() ->
                new NotFoundException("Site\twith\tid\t" + siteId + "\tdoes\tnot\texists"));

        //update name
        if(siteParams.getName() !=null && siteParams.getName().length() >0 && !Objects.equals(site.getName(),siteParams.getName())) {
            site.setName(siteParams.getName());
            Faker f = new Faker();
            site.setImage("http://dummyimage.com/100x100"+ f.color().hex().replaceFirst("#","/")+"/757575.png&text="+ site.getName().substring(0,1).toUpperCase(Locale.ROOT));

        }

        //update description
        if(siteParams.getDescription() !=null && siteParams.getDescription().length() >0 && !Objects.equals(site.getDescription(),siteParams.getDescription())) site.setDescription(siteParams.getDescription());

        //update privacy
        if(siteParams.getPrivacy() !=null  && !Objects.equals(site.getPrivacy(),siteParams.getPrivacy())) site.setPrivacy(siteParams.getPrivacy());

        //update address
        if(siteParams.getAddress() !=null && siteParams.getAddress().length() >0 && !Objects.equals(site.getAddress(),siteParams.getAddress())) site.setAddress(siteParams.getAddress());


        //update location
        if(siteParams.getLocation() !=null && siteParams.getLocation().length() >0 && !Objects.equals(site.getLocation(),siteParams.getLocation()))  site.setLocation(siteParams.getLocation());



    }
}
