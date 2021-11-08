package com.qlicue.gumba.answer;
import com.fasterxml.jackson.annotation.JsonBackReference;

import com.qlicue.gumba.question.Question;
import lombok.*;
import org.hibernate.Hibernate;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table

public class Answer implements Serializable {
    @Id
    @SequenceGenerator(
            name = "answer_sequence",
            sequenceName = "answer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator =   "answer_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    @Lob
    private String title;

    
    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    //relationship
    @JsonBackReference
    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)

    private Question question;

    public Answer(String title, 
                  LocalDate createdAt,
                  LocalDate updatedAt ,
                  Question question
                 ) {
        this.title = title; 
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.question = question;
         
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Answer answer = (Answer) o;
        return Objects.equals(id, answer.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
