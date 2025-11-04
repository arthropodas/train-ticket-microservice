package com.example.train_service.service.impl;

import com.example.train_service.entity.Station;
import com.example.train_service.entity.Train;
import com.example.train_service.exception.NotFoundException;
import com.example.train_service.form.TrainForm;
import com.example.train_service.repository.StationRepository;
import com.example.train_service.repository.TrainRepository;
import com.example.train_service.service.TrainService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class TrainServiceImpl implements TrainService {

    final TrainRepository trainRepository;
    final StationRepository stationRepository;

    public TrainServiceImpl(StationRepository stationRepository, TrainRepository trainRepository, StationRepository stationRepository1) {
        this.trainRepository = trainRepository;

        this.stationRepository = stationRepository1;
    }

    public Train createTrain(TrainForm trainForm) throws BadRequestException {

        Station startingStation = stationRepository.findById(trainForm.getStartingStationId())
                .orElseThrow(() -> new RuntimeException("Starting station not found"));

        // Fetch destination station entity
        Station destinationStation = stationRepository.findById(trainForm.getDestinationStationId())
                .orElseThrow(() -> new RuntimeException("Destination station not found"));


        if(trainRepository.findByTrainNumber(trainForm.getTrainNumber()).isPresent()){
            throw new BadRequestException("already exist train with the train number");
        }

        Train train = Train.builder()
                .name(trainForm.getName())
                .trainNumber(trainForm.getTrainNumber())
                .type(trainForm.getType().value)
                .startingStation(startingStation)
                .destinationStation(destinationStation)
                .createdAt(LocalDateTime.now())
                .build();


        return trainRepository.save(train);
    }

    @Override
    public List<Train> listTrain() {
        return trainRepository.findAll();
    }
}
