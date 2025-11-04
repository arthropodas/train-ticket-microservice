package com.example.train_service.form;
import com.example.train_service.enums.TRAINTYPE;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TrainForm {

    @NotBlank
    private String name;

    @NotBlank
    private String trainNumber;

    @NotNull
    private TRAINTYPE type;

    @NotNull
    private Long startingStationId;

    @NotNull
    private Long destinationStationId;

    private Double totalDistance;
}

