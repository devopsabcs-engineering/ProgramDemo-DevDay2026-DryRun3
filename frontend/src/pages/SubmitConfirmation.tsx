import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ConfirmationState {
  programId: number;
  programName: string;
  submitterEmail: string;
}

export const SubmitConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as ConfirmationState | null;

  // If no state, redirect back to home
  if (!state) {
    return (
      <article>
        <div className="ontario-alert ontario-alert--error" role="alert">
          <p>{t('common.error')}</p>
        </div>
        <Link to="/" className="ontario-button ontario-button--primary">
          {t('common.home')}
        </Link>
      </article>
    );
  }

  return (
    <article>
      <div className="ontario-alert ontario-alert--success" role="status" aria-live="polite">
        <h1 className="ontario-h1">{t('confirmation.title')}</h1>
        <p>{t('confirmation.message')}</p>
      </div>

      <section aria-labelledby="reference-heading">
        <h2 id="reference-heading" className="ontario-h4">
          {t('confirmation.referenceNumber')}
        </h2>
        <p className="ontario-lead-statement">
          <strong>CIVIC-{String(state.programId).padStart(6, '0')}</strong>
        </p>
        <p>
          {t('confirmation.emailConfirmation')} <strong>{state.submitterEmail}</strong>
        </p>
      </section>

      <section aria-labelledby="next-steps-heading">
        <h2 id="next-steps-heading" className="ontario-h3">
          {t('confirmation.whatHappensNext')}
        </h2>
        <ol className="ontario-list">
          <li>{t('confirmation.step1')}</li>
          <li>{t('confirmation.step2')}</li>
          <li>{t('confirmation.step3')}</li>
        </ol>
      </section>

      <div className="ontario-margin-top-32">
        <Link to="/" className="ontario-button ontario-button--secondary">
          {t('confirmation.submitAnother')}
        </Link>
      </div>
    </article>
  );
};
