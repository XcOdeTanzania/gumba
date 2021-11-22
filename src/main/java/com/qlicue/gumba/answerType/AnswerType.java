package com.qlicue.gumba.answerType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

public class AnswerType implements Serializable {
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
    //@JsonBackReference
    @ManyToOne( optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Question question;

    public AnswerType(String title,
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
        AnswerType answer = (AnswerType) o;
        return Objects.equals(id, answer.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
