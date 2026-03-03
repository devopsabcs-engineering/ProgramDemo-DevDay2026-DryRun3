import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgramType } from '../api/apiClient';

export interface ProgramFormData {
  programName: string;
  programDescription: string;
  programTypeId: string;
  submitterEmail: string;
}

interface ProgramFormProps {
  programTypes: ProgramType[];
  onSubmit: (data: ProgramFormData) => void;
  isSubmitting: boolean;
}

interface FormErrors {
  programName?: string;
  programDescription?: string;
  programTypeId?: string;
  submitterEmail?: string;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({
  programTypes,
  onSubmit,
  isSubmitting
}) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<ProgramFormData>({
    programName: '',
    programDescription: '',
    programTypeId: '',
    submitterEmail: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'programName':
        if (!value.trim()) {
          return t('submitProgram.validation.programNameRequired');
        }
        if (value.length > 200) {
          return t('submitProgram.validation.programNameMaxLength');
        }
        break;
      case 'programDescription':
        if (!value.trim()) {
          return t('submitProgram.validation.programDescriptionRequired');
        }
        break;
      case 'programTypeId':
        if (!value) {
          return t('submitProgram.validation.programTypeRequired');
        }
        break;
      case 'submitterEmail':
        if (!value.trim()) {
          return t('submitProgram.validation.emailRequired');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return t('submitProgram.validation.emailInvalid');
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof ProgramFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      programName: true,
      programDescription: true,
      programTypeId: true,
      submitterEmail: true
    });

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getProgramTypeName = (type: ProgramType): string => {
    return i18n.language === 'fr' ? type.typeNameFr : type.typeName;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Program Name */}
      <div className="ontario-form-group">
        <label className="ontario-label" htmlFor="programName">
          {t('submitProgram.programName')} <span className="ontario-label__flag">({t('common.required')})</span>
        </label>
        <p className="ontario-hint" id="programName-hint">
          {t('submitProgram.programNameHint')}
        </p>
        {errors.programName && touched.programName && (
          <p className="ontario-error-message" id="programName-error" role="alert">
            {errors.programName}
          </p>
        )}
        <input
          type="text"
          id="programName"
          name="programName"
          className={`ontario-input ${errors.programName && touched.programName ? 'ontario-input--error' : ''}`}
          value={formData.programName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-describedby="programName-hint programName-error"
          aria-invalid={!!errors.programName && touched.programName}
          maxLength={200}
        />
      </div>

      {/* Program Description */}
      <div className="ontario-form-group">
        <label className="ontario-label" htmlFor="programDescription">
          {t('submitProgram.programDescription')} <span className="ontario-label__flag">({t('common.required')})</span>
        </label>
        <p className="ontario-hint" id="programDescription-hint">
          {t('submitProgram.programDescriptionHint')}
        </p>
        {errors.programDescription && touched.programDescription && (
          <p className="ontario-error-message" id="programDescription-error" role="alert">
            {errors.programDescription}
          </p>
        )}
        <textarea
          id="programDescription"
          name="programDescription"
          className={`ontario-textarea ${errors.programDescription && touched.programDescription ? 'ontario-textarea--error' : ''}`}
          value={formData.programDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={6}
          aria-required="true"
          aria-describedby="programDescription-hint programDescription-error"
          aria-invalid={!!errors.programDescription && touched.programDescription}
        />
      </div>

      {/* Program Type */}
      <div className="ontario-form-group">
        <label className="ontario-label" htmlFor="programTypeId">
          {t('submitProgram.programType')} <span className="ontario-label__flag">({t('common.required')})</span>
        </label>
        <p className="ontario-hint" id="programTypeId-hint">
          {t('submitProgram.programTypeHint')}
        </p>
        {errors.programTypeId && touched.programTypeId && (
          <p className="ontario-error-message" id="programTypeId-error" role="alert">
            {errors.programTypeId}
          </p>
        )}
        <select
          id="programTypeId"
          name="programTypeId"
          className={`ontario-select ${errors.programTypeId && touched.programTypeId ? 'ontario-select--error' : ''}`}
          value={formData.programTypeId}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-describedby="programTypeId-hint programTypeId-error"
          aria-invalid={!!errors.programTypeId && touched.programTypeId}
        >
          <option value="">{t('submitProgram.selectProgramType')}</option>
          {programTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {getProgramTypeName(type)}
            </option>
          ))}
        </select>
      </div>

      {/* Submitter Email */}
      <div className="ontario-form-group">
        <label className="ontario-label" htmlFor="submitterEmail">
          {t('submitProgram.submitterEmail')} <span className="ontario-label__flag">({t('common.required')})</span>
        </label>
        <p className="ontario-hint" id="submitterEmail-hint">
          {t('submitProgram.submitterEmailHint')}
        </p>
        {errors.submitterEmail && touched.submitterEmail && (
          <p className="ontario-error-message" id="submitterEmail-error" role="alert">
            {errors.submitterEmail}
          </p>
        )}
        <input
          type="email"
          id="submitterEmail"
          name="submitterEmail"
          className={`ontario-input ${errors.submitterEmail && touched.submitterEmail ? 'ontario-input--error' : ''}`}
          value={formData.submitterEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-describedby="submitterEmail-hint submitterEmail-error"
          aria-invalid={!!errors.submitterEmail && touched.submitterEmail}
        />
      </div>

      {/* Submit Button */}
      <div className="ontario-form-group ontario-margin-top-32">
        <button
          type="submit"
          className="ontario-button ontario-button--primary"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? t('submitProgram.submitting') : t('submitProgram.submitButton')}
        </button>
      </div>
    </form>
  );
};
