import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProgramForm, ProgramFormData } from '../components/ProgramForm';
import { submitProgram, fetchProgramTypes, ProgramType } from '../api/apiClient';

export const SubmitProgram: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [programTypes, setProgramTypes] = useState<ProgramType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgramTypes = async () => {
      try {
        const types = await fetchProgramTypes();
        setProgramTypes(types);
      } catch (err) {
        setError(t('common.error'));
        console.error('Failed to load program types:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgramTypes();
  }, [t]);

  const handleSubmit = async (data: ProgramFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitProgram({
        programName: data.programName,
        programDescription: data.programDescription,
        programTypeId: Number(data.programTypeId),
        submitterEmail: data.submitterEmail
      });

      navigate('/confirmation', {
        state: {
          programId: response.id,
          programName: response.programName,
          submitterEmail: data.submitterEmail
        }
      });
    } catch (err) {
      setError(t('common.error'));
      console.error('Failed to submit program:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <article>
      <h1 className="ontario-h1">{t('submitProgram.title')}</h1>
      <p className="ontario-lead-statement">{t('submitProgram.description')}</p>

      {error && (
        <div className="ontario-alert ontario-alert--error" role="alert">
          <p>{error}</p>
        </div>
      )}

      <ProgramForm
        programTypes={programTypes}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </article>
  );
};
