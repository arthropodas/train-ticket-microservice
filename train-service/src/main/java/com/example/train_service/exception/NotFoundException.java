/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.train_service.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 *
 * @author nirmal
 */
public class NotFoundException extends ResponseStatusException {

    public NotFoundException() {
        super(NOT_FOUND);
    }

    public NotFoundException(String reason) {
        super(NOT_FOUND, reason);
    }

}
