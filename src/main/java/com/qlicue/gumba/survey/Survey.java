package com.qlicue.gumba.survey;




import com.qlicue.gumba.form.Form;
import com.qlicue.gumba.section.Section;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import javax.persistence.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import java.util.List;
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
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @NotBlank
    @Column(nullable = false)
    @Lob
    private String title;
    @Lob
    @Column
    private String metaTitle;
    @Lob
    @Column
    private String slug;
    @Lob
    @Column
    private String link;
    @Lob
    @Column
    private String summary;
    @Column
    private String image;

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

    @Column(nullable = false )
    private Long totalResponses;


    //relationships
    //@JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "survey",
            cascade = CascadeType.REMOVE, orphanRemoval = true)

    @Fetch(value = FetchMode.SUBSELECT)
    @OrderBy("id ASC")
    private List<Section> sections;


    //@JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "survey",
            cascade = CascadeType.REMOVE, orphanRemoval = true)

    @Fetch(value = FetchMode.SUBSELECT)
    @OrderBy("id ASC")
    private Set<Form> forms;

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
                  Accessibility accessibility,
                  String image,
                  Long totalResponses) {
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
        this.image = image;
        this.totalResponses = totalResponses;
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
