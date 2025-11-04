package com.example.train_service.form;



import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StationForm {
    private String name;
    private String code;
    private Integer distanceFromOrigin;
    private String city;
    private String state;
}

