package com.qlicue.gumba.form;

import com.qlicue.gumba.survey.Survey;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {

    @Query("select r from Form r LEFT join fetch r.survey ")
    List<Form> findBySurvey(Survey survey, Sort sort);

}
