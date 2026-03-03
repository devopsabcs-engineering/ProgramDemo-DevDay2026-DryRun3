-- ============================================================================
-- Migration: V004__seed_program_types.sql
-- Description: Seed initial program type reference data with bilingual names
-- Azure DevOps: AB#1931
-- ============================================================================

-- Insert program types using WHERE NOT EXISTS for idempotent seeding
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Community Services', 'Services communautaires'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Community Services'
);

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Health & Wellness', 'Santé et bien-être'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Health & Wellness'
);

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Education & Training', 'Éducation et formation'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Education & Training'
);

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Environment & Conservation', 'Environnement et conservation'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Environment & Conservation'
);

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Economic Development', 'Développement économique'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Economic Development'
);
