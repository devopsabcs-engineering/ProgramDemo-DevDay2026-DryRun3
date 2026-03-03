-- ============================================================================
-- Migration: V003__create_notification.sql
-- Description: Create notification table for email notification records
-- Azure DevOps: AB#1930
-- ============================================================================

-- Notification transactional table for email records
CREATE TABLE notification (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    program_id BIGINT NOT NULL,
    notification_type NVARCHAR(50) NOT NULL,
    recipient_email NVARCHAR(200) NOT NULL,
    subject NVARCHAR(500) NOT NULL,
    body NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    status NVARCHAR(20) DEFAULT 'PENDING',
    CONSTRAINT FK_notification_program FOREIGN KEY (program_id) 
        REFERENCES program(id),
    CONSTRAINT CK_notification_status CHECK (status IN ('PENDING', 'SENT', 'FAILED')),
    CONSTRAINT CK_notification_type CHECK (notification_type IN ('SUBMISSION', 'APPROVAL', 'REJECTION'))
);

-- Indexes for common query patterns
CREATE INDEX IX_notification_program_id ON notification(program_id);
CREATE INDEX IX_notification_status ON notification(status);
