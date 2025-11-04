/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.train_service.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;


public class UnauthorizedException extends ResponseStatusException {

    public UnauthorizedException() {
        super(UNAUTHORIZED);
    }

    public UnauthorizedException(String reason) {
        super(UNAUTHORIZED, reason);
    }

    public UnauthorizedException(String reason, Throwable cause) {
        super(UNAUTHORIZED, reason, cause);
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
