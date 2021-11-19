package com.qlicue.gumba.vote;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.qlicue.gumba.converter.HashMapConverter;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.user.User;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

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

public class Vote implements Serializable {
    @Id
    @SequenceGenerator(
            name = "vote_sequence",
            sequenceName = "vote_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "vote_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;



    @NotBlank
    @Column(nullable = false)
    @Lob
    private String formAttributeJSON;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    @Transient
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> customerAttributes;


    public Vote( LocalDate createdAt, LocalDate updatedAt, Map<String, Object> customerAttributes, User user, Survey survey) {
         this.user = user;
        this.survey = survey;
        this.customerAttributes = customerAttributes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    //relationship
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "survey_id", nullable = false)
    @ToString.Exclude
    private Survey survey;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Vote vote = (Vote) o;
        return Objects.equals(id, vote.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }



}
