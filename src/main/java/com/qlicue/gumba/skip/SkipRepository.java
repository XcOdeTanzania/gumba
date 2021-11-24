package com.qlicue.gumba.skip;

import com.qlicue.gumba.answer.Answer;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkipRepository extends JpaRepository<Skip, Long> {

    @Query("select s from Skip s LEFT join fetch s.answer")
    List<Skip> findByAnswer(Answer answer, Sort sort);
}
