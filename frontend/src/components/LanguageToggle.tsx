import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Update document lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <button
      type="button"
      className="ontario-language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${i18n.language === 'en' ? 'French' : 'English'}`}
    >
      {t('header.language')}
    </button>
  );
};
