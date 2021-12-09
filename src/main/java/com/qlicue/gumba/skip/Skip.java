package com.qlicue.gumba.skip;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.qlicue.gumba.answer.Answer;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table


public class Skip implements Serializable {
    @Id
    @SequenceGenerator(
            name = "skip_sequence",
            sequenceName = "skip_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator =   "skip_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkipType skippedType;
    @NotNull
    @Column(nullable = false)
    private Long skippedId;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;



    //@JsonBackReference
    @ManyToOne( fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "answer_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Answer answer;

    public Skip(SkipType skippedType, Long skippedId, LocalDate createdAt, LocalDate updatedAt, Answer answer) {
        this.skippedType = skippedType;
        this.skippedId = skippedId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.answer = answer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Skip skip = (Skip) o;
        return Objects.equals(id, skip.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
