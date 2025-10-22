package com.example.train_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "train")
@Data                   // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "train_id")
    private Long trainId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "train_number", nullable = false, length = 10, unique = true)
    private String trainNumber;

    @Column(name = "type", nullable = false)
    private Byte type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starting_station_id", nullable = false)
    private Station startingStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_station_id", nullable = false)
    private Station destinationStation;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
