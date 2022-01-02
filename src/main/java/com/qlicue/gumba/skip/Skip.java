package com.qlicue.gumba.skip;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.qlicue.gumba.answer.Answer;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
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


public class Skip implements Serializable {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;


    @NotNull
    @Column(nullable = false)
    private Long questionId;

    @NotNull
    @Column(nullable = false)
    private boolean skipAll;

    @NotNull
    @Column(nullable = false)
    @ElementCollection
    private List<Integer> logic;


    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    @Transient
    private Long answerId;


    //@JsonBackReference
    @ManyToOne( fetch = FetchType.EAGER )
    @JoinColumn(name = "answer_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Answer answer;

    public Skip(List<Integer>  logic, Long questionId, LocalDate createdAt, LocalDate updatedAt, Answer answer, boolean skipAll) {
        this.logic = logic;
        this.questionId = questionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.answer = answer;
        this.skipAll = skipAll;
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
