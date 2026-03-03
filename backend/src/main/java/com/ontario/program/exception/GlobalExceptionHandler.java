package com.ontario.program.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.Map;

/**
 * Global exception handler using RFC 7807 ProblemDetail format.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle ResourceNotFoundException.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex, WebRequest request) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problem.setTitle("Not Found");
        problem.setDetail(ex.getMessage());
        return problem;
    }

    /**
     * Handle validation errors from @Valid annotation.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex, WebRequest request) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Bad Request");
        problem.setDetail("Validation failed");

        List<Map<String, String>> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> Map.of(
                        "field", e.getField(),
                        "message", e.getDefaultMessage() != null ? e.getDefaultMessage() : "Invalid value"))
                .toList();

        problem.setProperty("errors", errors);
        return problem;
    }

    /**
     * Handle generic exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneric(Exception ex, WebRequest request) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problem.setTitle("Internal Server Error");
        problem.setDetail("An unexpected error occurred");
        return problem;
    }
}
