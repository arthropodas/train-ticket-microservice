package com.example.train_service.controller;

import com.example.train_service.entity.Train;
import com.example.train_service.repository.TrainRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trains")
public class TrainController {

    private final TrainRepository trainRepository;

    public TrainController(TrainRepository trainRepository) {
        this.trainRepository = trainRepository;
    }

    @GetMapping
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    @PostMapping
    public Train addTrain(@RequestBody Train train) {
        return trainRepository.save(train);
    }
}