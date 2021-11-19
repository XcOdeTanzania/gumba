package com.qlicue.gumba.survey;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.vote.Vote;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import java.util.Objects;
import java.util.Set;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Survey {
    @Id
    @SequenceGenerator(
            name = "survey_sequence",
            sequenceName = "survey_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "survey_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    @Lob
    private String title;
    @Lob
    private String metaTitle;
    @Lob
    private String slug;
    @Lob
    private String summary;
    @NotNull
    @Column(nullable = false)
    private boolean publish;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(nullable = false)
    private LocalDate updatedAt;

    private LocalDate publishedAt;
    private LocalDate startsAt;
    private LocalDate endsAt;
    @NotBlank
    @Column(nullable = false)
    @Lob
    private String description;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Accessibility accessibility;

    //relationships
    @JsonManagedReference
    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)

    private Set<Question> questions;

    @JsonManagedReference
    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)

    private Set<Vote> votes;

    public Survey(String title,
                  String metaTitle,
                  String slug,
                  String summary,
                  boolean publish,
                  LocalDate createdAt,
                  LocalDate updatedAt,
                  LocalDate publishedAt,
                  LocalDate startsAt,
                  LocalDate endsAt,
                  String description,
                  Accessibility accessibility) {
        this.title = title;
        this.metaTitle = metaTitle;
        this.slug = slug;
        this.summary = summary;
        this.publish = publish;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publishedAt = publishedAt;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.description = description;
        this.accessibility = accessibility;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Survey survey = (Survey) o;
        return Objects.equals(id, survey.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
