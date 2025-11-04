package com.example.train_service.service;


import com.example.train_service.entity.Station;
import com.example.train_service.form.StationForm;

import java.util.List;

public interface StationService {
    Station createStation(StationForm form);

        List<Station> getAllStations();

}
