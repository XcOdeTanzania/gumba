package com.qlicue.gumba.survey;

import com.qlicue.gumba.user.Gender;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "surveys")
public class Survey {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator =   "user_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String title;
    private String metaTitle;
    private String slug;
    private String summary;
    @NotNull
    @Column(nullable = false)
    private boolean published;
    @NotNull
    @Column(nullable = false)
    private LocalDate createdAt;
    @NotNull
    @Column(nullable = false)
    private LocalDate updatedAt;
    private LocalDate publishedAt;
    private LocalDate startsAt;
    private LocalDate endsAt;
    @NotBlank
    @Column(nullable = false)
    private String description;

    public Survey(String title,
                  String metaTitle,
                  String slug,
                  String summary,
                  boolean published,
                  LocalDate createdAt,
                  LocalDate updatedAt,
                  LocalDate publishedAt,
                  LocalDate startsAt,
                  LocalDate endsAt,
                  String description) {
        this.title = title;
        this.metaTitle = metaTitle;
        this.slug = slug;
        this.summary = summary;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publishedAt = publishedAt;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.description = description;
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
