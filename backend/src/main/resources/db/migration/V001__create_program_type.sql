-- ============================================================================
-- Migration: V001__create_program_type.sql
-- Description: Create program_type lookup table for program categorization
-- Azure DevOps: AB#1928
-- ============================================================================

-- Program type lookup table (no audit columns for static reference data)
CREATE TABLE program_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    type_name_fr NVARCHAR(100) NOT NULL,
    CONSTRAINT UQ_program_type_type_name UNIQUE (type_name)
);
