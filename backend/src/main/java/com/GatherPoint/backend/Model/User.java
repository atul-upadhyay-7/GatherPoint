package com.GatherPoint.backend.Model;

import com.GatherPoint.backend.Constants.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean active;
}
