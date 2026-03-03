-- ============================================================================
-- Migration: V002__create_program.sql
-- Description: Create program table for citizen program submissions
-- Azure DevOps: AB#1929
-- ============================================================================

-- Program transactional table with audit columns
CREATE TABLE program (
    id INT IDENTITY(1,1) PRIMARY KEY,
    program_name NVARCHAR(200) NOT NULL,
    program_description NVARCHAR(MAX) NOT NULL,
    program_type_id INT NOT NULL,
    status NVARCHAR(20) DEFAULT 'DRAFT',
    reviewer_comments NVARCHAR(MAX) NULL,
    submitted_at DATETIME2 NULL,
    reviewed_at DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by NVARCHAR(100) NULL,
    CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) 
        REFERENCES program_type(id),
    CONSTRAINT CK_program_status CHECK (status IN ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'))
);

-- Indexes for common query patterns
CREATE INDEX IX_program_status ON program(status);
CREATE INDEX IX_program_program_type_id ON program(program_type_id);
