package com.ontario.program.repository;

import com.ontario.program.entity.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for Program entity.
 */
@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    /**
     * Find programs by status with pagination.
     */
    Page<Program> findByStatus(String status, Pageable pageable);

    /**
     * Find programs by program type ID with pagination.
     */
    @Query("SELECT p FROM Program p WHERE p.programType.id = :typeId")
    Page<Program> findByProgramTypeId(@Param("typeId") Integer typeId, Pageable pageable);

    /**
     * Find programs by status and program type ID with pagination.
     */
    @Query("SELECT p FROM Program p WHERE p.status = :status AND p.programType.id = :typeId")
    Page<Program> findByStatusAndProgramTypeId(
            @Param("status") String status,
            @Param("typeId") Integer typeId,
            Pageable pageable);
}
