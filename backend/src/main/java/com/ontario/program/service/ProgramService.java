package com.ontario.program.service;

import com.ontario.program.dto.ProgramCreateRequest;
import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.dto.ReviewRequest;
import com.ontario.program.entity.Program;
import com.ontario.program.entity.ProgramType;
import com.ontario.program.exception.ResourceNotFoundException;
import com.ontario.program.repository.ProgramRepository;
import com.ontario.program.repository.ProgramTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service class for program business logic.
 */
@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    public ProgramService(ProgramRepository programRepository,
                          ProgramTypeRepository programTypeRepository) {
        this.programRepository = programRepository;
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * Create a new program submission.
     */
    @Transactional
    public ProgramResponse createProgram(ProgramCreateRequest request) {
        ProgramType programType = programTypeRepository.findById(request.programTypeId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program type with id " + request.programTypeId() + " not found"));

        Program program = new Program();
        program.setProgramName(request.programName());
        program.setProgramDescription(request.programDescription());
        program.setProgramType(programType);
        program.setStatus("SUBMITTED");
        program.setSubmittedAt(LocalDateTime.now());
        program.setCreatedBy(request.contactEmail());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    /**
     * Get a program by ID.
     */
    @Transactional(readOnly = true)
    public ProgramResponse getProgram(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program with id " + id + " not found"));
        return toResponse(program);
    }

    /**
     * List programs with optional filtering and pagination.
     */
    @Transactional(readOnly = true)
    public Page<ProgramResponse> listPrograms(String status, Integer programTypeId, Pageable pageable) {
        Page<Program> programs;

        if (status != null && programTypeId != null) {
            programs = programRepository.findByStatusAndProgramTypeId(status, programTypeId, pageable);
        } else if (status != null) {
            programs = programRepository.findByStatus(status, pageable);
        } else if (programTypeId != null) {
            programs = programRepository.findByProgramTypeId(programTypeId, pageable);
        } else {
            programs = programRepository.findAll(pageable);
        }

        return programs.map(this::toResponse);
    }

    /**
     * Review a program (approve or reject).
     */
    @Transactional
    public ProgramResponse reviewProgram(Long id, ReviewRequest request) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program with id " + id + " not found"));

        program.setStatus(request.status());
        program.setReviewerComments(request.reviewerComments());
        program.setReviewedAt(LocalDateTime.now());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    /**
     * Convert Program entity to ProgramResponse DTO.
     */
    private ProgramResponse toResponse(Program program) {
        ProgramType type = program.getProgramType();
        ProgramTypeResponse typeResponse = new ProgramTypeResponse(
                type.getId(),
                type.getTypeName(),
                type.getTypeNameFr()
        );

        return new ProgramResponse(
                program.getId(),
                program.getProgramName(),
                program.getProgramDescription(),
                typeResponse,
                program.getStatus(),
                program.getReviewerComments(),
                program.getSubmittedAt(),
                program.getReviewedAt(),
                program.getCreatedAt()
        );
    }
}
