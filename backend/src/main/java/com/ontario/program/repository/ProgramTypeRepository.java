package com.ontario.program.repository;

import com.ontario.program.entity.ProgramType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for ProgramType entity.
 */
@Repository
public interface ProgramTypeRepository extends JpaRepository<ProgramType, Integer> {
}
