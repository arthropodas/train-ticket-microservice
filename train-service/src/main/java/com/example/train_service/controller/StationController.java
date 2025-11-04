package com.example.train_service.controller;

import com.example.train_service.entity.Station;
import com.example.train_service.form.StationForm;
import com.example.train_service.form.TrainForm;
import com.example.train_service.repository.StationRepository;
import com.example.train_service.service.StationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/station")
@RequiredArgsConstructor
public class StationController {

    private final StationService stationService;

    private final StationRepository stationRepository;

    @PostMapping
    public ResponseEntity<Station> createStation(@RequestBody StationForm stationForm){
        System.out.println("trainForm...." + stationForm);
        Station station = stationService.createStation(stationForm);
        return ResponseEntity.ok(station);
    }


    @GetMapping
    public ResponseEntity<List<Station>> getAllStations() {
        List<Station> stations = stationService.getAllStations();
        return ResponseEntity.ok(stations);
    }






}
