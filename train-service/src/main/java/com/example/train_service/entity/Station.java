package com.example.train_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "station")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stationId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String code;

    @Column(name = "distance_from_origin", nullable = false)
    private Integer distanceFromOrigin;

    private String city;
    private String state;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
