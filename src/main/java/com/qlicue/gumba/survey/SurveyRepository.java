package com.qlicue.gumba.survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

    @Query("select s from Survey s LEFT join fetch s.answers")
    List<Survey> findAll();
}
