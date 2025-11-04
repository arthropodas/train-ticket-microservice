package com.example.train_service.exception;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.example.train_service.view.ErrorView;

import com.example.train_service.exception.NotFoundException;
import org.springframework.web.HttpMediaTypeNotSupportedException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Locale;



@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private final MessageSource messageSource;

    private static final String EXCEPTION ="Exception: {}";

    public GlobalExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();

        List<ErrorView> errorList = result.getFieldErrors().stream().map(fieldError -> {
            String resolvedMessage = fieldError.getDefaultMessage(); // already "2001-Email is required"
            LOGGER.error(EXCEPTION, resolvedMessage);
            String[] parts = resolvedMessage.split("-", 2); // Split into code and message

            ErrorView error = new ErrorView(parts[0], parts[1]);

            return error;
        }).toList();

        return new ResponseEntity<>(errorList.getFirst(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(com.example.train_service.exception.BadRequestException.class)
    public ResponseEntity<Object> badRequestException(final BadRequestException ex) {
        LOGGER.error(EXCEPTION, ex.getMessage());
        String[] list = messageSource.getMessage(ex.getReason(), null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new ErrorView(list[0], list[1]), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> notFoundException(final NotFoundException ex) {
        LOGGER.error(EXCEPTION, ex.getMessage());
        String[] list = messageSource.getMessage(ex.getReason(), null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new ErrorView(list[0], list[1]), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex) {
        LOGGER.error(EXCEPTION, ex.getMessage());
        String[] list = messageSource.getMessage(ex.getReason(), null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new ErrorView(list[0], list[1]), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> notFountException(final HttpRequestMethodNotSupportedException ex) {
        String[] list = messageSource.getMessage("method.not.support", null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new ErrorView(list[0], ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(final HttpMessageNotReadableException ex) {
        String[] list = messageSource.getMessage("json.parse.error", null, Locale.ENGLISH).split("-");
        ErrorView errorView = new ErrorView(list[0], list[1]);
        return new ResponseEntity<>(errorView, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex) {
        LOGGER.error(EXCEPTION, ex.getMessage());
        String[] list = messageSource.getMessage("media.type.not.supported", null, Locale.ENGLISH).split("-");
        return new ResponseEntity<>(new ErrorView(list[0], list[1]), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

}
