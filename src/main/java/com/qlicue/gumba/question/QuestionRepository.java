package com.qlicue.gumba.question;

import com.qlicue.gumba.section.Section;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("select q from Question q LEFT join fetch q.section")
    List<Question> findBySection(Section section, Sort sort);
}
