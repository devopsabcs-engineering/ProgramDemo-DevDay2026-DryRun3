package com.ontario.program.controller;

import com.ontario.program.dto.ProgramCreateRequest;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ReviewRequest;
import com.ontario.program.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for program endpoints.
 */
@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * POST /api/programs - Submit a new program.
     */
    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @Valid @RequestBody ProgramCreateRequest request) {
        ProgramResponse response = programService.createProgram(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/programs - List programs with optional filtering and pagination.
     */
    @GetMapping
    public ResponseEntity<Page<ProgramResponse>> listPrograms(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer programTypeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<ProgramResponse> programs = programService.listPrograms(status, programTypeId, pageable);
        return ResponseEntity.ok(programs);
    }

    /**
     * GET /api/programs/{id} - Get a single program by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgram(@PathVariable Long id) {
        ProgramResponse response = programService.getProgram(id);
        return ResponseEntity.ok(response);
    }

    /**
     * PUT /api/programs/{id}/review - Approve or reject a program.
     */
    @PutMapping("/{id}/review")
    public ResponseEntity<ProgramResponse> reviewProgram(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request) {
        ProgramResponse response = programService.reviewProgram(id, request);
        return ResponseEntity.ok(response);
    }
}
