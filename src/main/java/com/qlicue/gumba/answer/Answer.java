package com.qlicue.gumba.answer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.skip.Skip;
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

    @NotNull
    @Column(nullable = false)
    private boolean selected;


    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "answer",
            cascade = CascadeType.ALL)
    @OrderBy("id ASC")
    private List<Skip> skip;

    //relationship
    //@JsonBackReference
    @ManyToOne( optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Question question;

    public Answer(String title, boolean selected, LocalDate createdAt, LocalDate updatedAt, List<Skip> skip, Question question) {
        this.title = title;
        this.selected = selected;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.skip = skip;
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
