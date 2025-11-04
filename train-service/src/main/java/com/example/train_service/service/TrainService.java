package com.example.train_service.service;

import com.example.train_service.entity.Train;
import com.example.train_service.form.TrainForm;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface TrainService {
    Train createTrain(TrainForm trainForm) throws BadRequestException;
    List<Train> listTrain();
}
