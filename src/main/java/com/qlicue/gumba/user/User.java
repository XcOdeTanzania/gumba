package com.qlicue.gumba.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qlicue.gumba.response.Response;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;
import java.util.Set;


@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@NamedEntityGraph(name ="user_entity_graph", attributeNodes = @NamedAttributeNode("responses"))
public class User {
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
    private String name;

    @Column
    private String nickname;

    @Column
    private String phone;

    @Column(nullable = false)
    private String address;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    @NotNull
    @Column(nullable = false)
    private LocalDate dob;
    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    @Transient
    private Integer age;

    @Column
    private String avatar;

//    //relationship
   // @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user",
            cascade = CascadeType.ALL)
     @JsonIgnore
    @OrderBy("id ASC")
    private Set<Response> responses;


    public User(String name,
                String nickname,
                String phone,
                String address,
                String email,
                Gender gender,
                LocalDate dob,
                LocalDate createdAt,
                LocalDate updatedAt,
                String avatar) {
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        this.avatar=avatar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }


    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
