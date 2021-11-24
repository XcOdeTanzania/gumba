package com.qlicue.gumba.section;

import com.qlicue.gumba.survey.Survey;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section
        , Long> {

    List<Section> findBySurvey(Survey survey, Sort sort);
}
