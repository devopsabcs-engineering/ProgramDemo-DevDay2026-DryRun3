package com.ontario.program.service;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.repository.ProgramTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class for program type business logic.
 */
@Service
public class ProgramTypeService {

    private final ProgramTypeRepository programTypeRepository;

    public ProgramTypeService(ProgramTypeRepository programTypeRepository) {
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * Get all program types for dropdown values.
     */
    @Transactional(readOnly = true)
    public List<ProgramTypeResponse> getAllProgramTypes() {
        return programTypeRepository.findAll().stream()
                .map(type -> new ProgramTypeResponse(
                        type.getId(),
                        type.getTypeName(),
                        type.getTypeNameFr()))
                .toList();
    }
}
