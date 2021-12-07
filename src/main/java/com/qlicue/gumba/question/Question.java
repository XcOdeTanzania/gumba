package com.qlicue.gumba.question;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.section.Section;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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


public class Question implements Serializable {
    @Id
    @SequenceGenerator(
            name = "question_sequence",
            sequenceName = "question_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator =   "question_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    @Lob
    private String title;

    @NotNull
    @Column(nullable = false)
    private boolean isRequired;


    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Transient
    private Long sectionId;
    //relationships
    //@JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "question",
            cascade = CascadeType.PERSIST, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<Answer> answers;

    //@JsonBackReference
    @ManyToOne( fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "section_id", nullable = false)
    @JsonIgnore
    private Section section;

    public Question(String title, boolean isRequired, QuestionType type, Long sectionId  ) {
        this.title = title;
        this.isRequired = isRequired;
        this.type= type;
        this.sectionId = sectionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Question question = (Question) o;
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
