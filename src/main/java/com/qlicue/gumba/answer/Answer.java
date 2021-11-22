package com.qlicue.gumba.answer;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qlicue.gumba.converter.HashMapConverter;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.user.User;
import lombok.*;
import org.hibernate.FetchMode;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Map;
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
            generator = "answer_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @NotNull
    @Column(nullable = false)
    @Lob
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> formAttributes;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    //relationship
//    @JsonBackReference
    @ManyToOne( optional = false)
    @JoinColumn(name = "survey_id", nullable = true)
    @ToString.Exclude
    @JsonIgnore
    private Survey survey;


    //@JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = true)
    @ToString.Exclude

    private User user;


    public Answer(Map<String, Object> formAttributes,
                  LocalDate createdAt,
                  LocalDate updatedAt
                  ,
                  Survey survey,
                  User user
    ) {
        this.formAttributes = formAttributes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.survey = survey;
        this.user = user;

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
