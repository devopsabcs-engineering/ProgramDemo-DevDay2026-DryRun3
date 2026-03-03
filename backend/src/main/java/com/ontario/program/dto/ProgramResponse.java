package com.ontario.program.dto;

import java.time.LocalDateTime;

/**
 * Response DTO for program data.
 */
public record ProgramResponse(
    Long id,
    String programName,
    String programDescription,
    ProgramTypeResponse programType,
    String status,
    String reviewerComments,
    LocalDateTime submittedAt,
    LocalDateTime reviewedAt,
    LocalDateTime createdAt
) {}
