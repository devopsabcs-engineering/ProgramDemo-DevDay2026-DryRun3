package com.ontario.program.controller;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.service.ProgramTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for program type endpoints.
 */
@RestController
@RequestMapping("/api/program-types")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProgramTypeController {

    private final ProgramTypeService programTypeService;

    public ProgramTypeController(ProgramTypeService programTypeService) {
        this.programTypeService = programTypeService;
    }

    /**
     * GET /api/program-types - Get all program types for dropdown values.
     */
    @GetMapping
    public ResponseEntity<List<ProgramTypeResponse>> getAllProgramTypes() {
        List<ProgramTypeResponse> types = programTypeService.getAllProgramTypes();
        return ResponseEntity.ok(types);
    }
}
