package com.ecommerce.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@Document(indexName = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Column(unique = true)
    private String phoneNumber;

    private boolean enabled;
}
