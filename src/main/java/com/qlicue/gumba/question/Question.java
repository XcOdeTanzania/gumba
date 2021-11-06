package com.qlicue.gumba.question;



import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Question {
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

    public Question(String title,
                    boolean isRequired,
                    LocalDate createdAt,
                    LocalDate updatedAt,
                    QuestionType type) {
        this.title = title;
        this.isRequired = isRequired;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.type = type;
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
