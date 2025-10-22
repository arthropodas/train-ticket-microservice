package com.example.train_service.controller;

import com.example.train_service.form.TrainForm;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/station")
public class StationController {


    @GetMapping("/")
    public void createTrain(@RequestBody TrainForm trainForm){
        System.out.println("trainForm...."+trainForm);
    }

}
