package com.example.train_service.service.impl;


import com.example.train_service.entity.Station;
import com.example.train_service.form.StationForm;
import com.example.train_service.repository.StationRepository;
import com.example.train_service.service.StationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StationServiceImpl implements StationService {

    private final StationRepository stationRepository;

    @Override
    public Station createStation(StationForm form) {
        if (stationRepository.existsByCode(form.getCode())) {
            throw new IllegalArgumentException("Station code already exists: " + form.getCode());
        }

        Station station = Station.builder()
                .name(form.getName())
                .code(form.getCode())
                .distanceFromOrigin(form.getDistanceFromOrigin())
                .city(form.getCity())
                .state(form.getState())
                .createdAt(LocalDateTime.now())
                .build();

        return stationRepository.save(station);
    }

    @Override
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }
}