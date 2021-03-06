package com.qlicue.gumba.section;


import com.qlicue.gumba.event.EntityCreatedEvent;
import com.qlicue.gumba.exception.NotFoundException;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.survey.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private  final SurveyRepository surveyRepository;
    private ApplicationEventPublisher applicationEventPublisher;


    public List<Section> getAllSections() {

        return sectionRepository.findAll();
    }

    public void addSection(Section section) {

        //find the survey by id
        Survey survey = surveyRepository.findById( section.getSurveyId()).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + section.getSurveyId() + "\tdoes\tnot\texists"));

        //add dates
        section.setCreatedAt(LocalDate.now());
        section.setUpdatedAt(LocalDate.now());

        //add survey to section
        section.setSurvey(survey);

        //save the section type
        sectionRepository.save(section);

        //publish section created event
         publishSectionCreatedEvent(section);
    }

    public void deleteSection(Long sectionId) {
        if (!sectionRepository.existsById(sectionId)) {
            throw new NotFoundException("Section\twith\tid\t" + sectionId + "\tdoes\tnot\texists");
        }
        sectionRepository.deleteById(sectionId);
    }

    @Transactional
    public void updateSection(Long sectionId, Section sectionParams ) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() ->
                new NotFoundException("Section\twith\tid\t" + sectionId + "\tdoes\tnot\texists"));


        if (sectionParams.getTitle() != null && sectionParams.getTitle().length() > 0 && !Objects.equals(section.getTitle(), sectionParams.getTitle())) {
            section.setTitle(sectionParams.getTitle());
        }

        if (sectionParams.getSubtitle() != null && sectionParams.getSubtitle().length() > 0 && !Objects.equals(section.getSubtitle(), sectionParams.getSubtitle())) {
            section.setSubtitle(sectionParams.getSubtitle());
        }

        if (sectionParams.getGoTo() != null && sectionParams.getGoTo().length() > 0 && !Objects.equals(section.getGoTo(), sectionParams.getGoTo())) {
            section.setGoTo(sectionParams.getGoTo());
        }

    }

    public List<Section> getSurveySections(Long surveyId) {
        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        return   sectionRepository.findBySurvey(survey, Sort.by("id"));
    }

    //events

    void publishSectionCreatedEvent(final Section section) {
        EntityCreatedEvent entityCreatedEvent = new EntityCreatedEvent(this, section);
        applicationEventPublisher.publishEvent(entityCreatedEvent);
    }
}
