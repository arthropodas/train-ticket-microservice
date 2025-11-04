package com.example.train_service.controller;

import com.example.train_service.entity.Station;
import com.example.train_service.entity.Train;
import com.example.train_service.form.TrainForm;
import com.example.train_service.repository.TrainRepository;
import com.example.train_service.service.TrainService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/train")
public class TrainController {

    private final TrainService trainService;


    public TrainController(TrainRepository trainRepository, TrainService trainService) {
        this.trainService = trainService;
    }

    @GetMapping
    public ResponseEntity<List<Train>> getAllTrains() {
        return ResponseEntity.ok(trainService.listTrain());
    }

    @PostMapping
    public ResponseEntity<Train> addTrain(@RequestBody TrainForm trainForm) throws BadRequestException {
        System.out.println("create tran");
        return  ResponseEntity.ok(trainService.createTrain(trainForm));

    }
}