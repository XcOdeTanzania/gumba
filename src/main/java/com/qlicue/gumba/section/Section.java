package com.qlicue.gumba.section;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.survey.Survey;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table

public class Section implements Serializable {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    @Lob
    private String title;

    @Transient
    private Long surveyId;

    @NotBlank
    @Column(nullable = false)
    @Lob
    private String subtitle;

    @NotBlank
    @Column(nullable = false)
    @Lob
    private String goTo;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    //relationship
    //@JsonBackReference
    @ManyToOne( optional = false)
    @JoinColumn(name = "survey_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Survey survey;


    //relationships
    //@JsonManagedReference
    //@JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "section",cascade = CascadeType.REMOVE, orphanRemoval = true )
    @OrderBy("id ASC")

    private List<Question> questions;


    public Section(String title,
                   String subtitle,

                   Long surveyId,
                   String goTo
                 ) {
        this.title = title;
        this.subtitle = subtitle;
        this.surveyId =surveyId;
        this.goTo =goTo;

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Section answer = (Section) o;
        return Objects.equals(id, answer.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
