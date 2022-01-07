package com.qlicue.gumba.glee;

import com.qlicue.gumba.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Glee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime time;
    @NotEmpty
    private String text;
    @NotNull
    private Double value;
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    private User user;
}