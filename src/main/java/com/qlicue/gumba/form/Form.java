package com.qlicue.gumba.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qlicue.gumba.converter.HashMapConverter;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.user.User;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
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

public class Form implements Serializable {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
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

    public Form( Map<String, Object> formAttributes ) {
     this.formAttributes = formAttributes;




    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Form form = (Form) o;
        return Objects.equals(id, form.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
