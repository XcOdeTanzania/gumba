package com.qlicue.gumba.site;
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
public class Site {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @NotBlank
    @Lob
    @Column(nullable = false)
    private String name;


    @Lob
    @Column

    private String description;
    
    @Column
    @NotBlank
    private String address;

    @Column
    private String image;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Privacy privacy;
    
    @Column
    private String location;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private LocalDate updatedAt;

    public Site(String name,
                String description,
                String address,
                Privacy privacy,
                String location,
                String image,
                LocalDate createdAt, 
                LocalDate updatedAt) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.privacy = privacy;
        this.location = location;
        this.image=image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Site site = (Site) o;
        return Objects.equals(id, site.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }

}
