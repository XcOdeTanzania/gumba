 package com.qlicue.gumba.user;

 import com.fasterxml.jackson.annotation.JsonIgnore;
 import com.qlicue.gumba.glee.Glee;
 import lombok.AllArgsConstructor;
 import lombok.Data;
 import lombok.NoArgsConstructor;
 import lombok.ToString;

 import javax.persistence.*;
 import javax.validation.constraints.Email;
 import javax.validation.constraints.NotEmpty;
 import javax.validation.constraints.NotNull;
 import java.util.Collection;

 @Data
 @Entity
 @AllArgsConstructor
 @NoArgsConstructor
 @Table(uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
 public class User {

     public enum Role {USER, ADMIN, USER_MANAGER}

     @Id
     @GeneratedValue(strategy = GenerationType.AUTO)
     private Long id;
     @NotEmpty
     @Email
     private String email;
     @JsonIgnore
     @ToString.Exclude
     private String password;
     @NotNull
     @Enumerated(EnumType.STRING)
     private Role role;
     private Double minGleePerDay;
     @JsonIgnore
     @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
     @ToString.Exclude
     private Collection<Glee> glee;
 }



//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.qlicue.gumba.response.Response;
//import lombok.*;
//import org.hibernate.Hibernate;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotNull;
//import java.time.LocalDate;
//import java.time.Period;
//import java.util.Objects;
//import java.util.Set;
//
//
//@ToString
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "users")
//@NamedEntityGraph(name ="user_entity_graph", attributeNodes = @NamedAttributeNode("responses"))
//public class User {
//    @Id
//    @GeneratedValue(
//            strategy = GenerationType.IDENTITY
//    )
//    private Long id;
//    @NotBlank
//    @Column(nullable = false)
//    private String name;
//
//    @Column
//    private String nickname;
//
//    @Column
//    private String phone;
//
//    @Column(nullable = false)
//    private String address;
//    @Email
//    @Column(nullable = false, unique = true)
//    private String email;
//    @NotNull
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Gender gender;
//    @NotNull
//    @Column(nullable = false)
//    private LocalDate dob;
//    @Column(nullable = false)
//    private LocalDate createdAt;
//    @Column(nullable = false)
//    private LocalDate updatedAt;
//
//    @Transient
//    private Integer age;
//
//    @Column
//    private String avatar;
//
////    //relationship
//   // @JsonManagedReference
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user",
//            cascade = CascadeType.REMOVE, orphanRemoval = true)
//     @JsonIgnore
//    @OrderBy("id ASC")
//    private Set<Response> responses;
//
//
//    public User(String name,
//                String nickname,
//                String phone,
//                String address,
//                String email,
//                Gender gender,
//                LocalDate dob,
//                LocalDate createdAt,
//                LocalDate updatedAt,
//                String avatar) {
//        this.name = name;
//        this.nickname = nickname;
//        this.phone = phone;
//        this.address = address;
//        this.email = email;
//        this.gender = gender;
//        this.dob = dob;
//        this.createdAt = createdAt;
//        this.updatedAt = updatedAt;
//
//        this.avatar=avatar;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
//        User user = (User) o;
//        return Objects.equals(id, user.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return 0;
//    }
//
//
//    public Integer getAge() {
//        return Period.between(this.dob, LocalDate.now()).getYears();
//    }
//}
