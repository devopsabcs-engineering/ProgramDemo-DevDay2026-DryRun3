import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="ontario-header" role="banner">
      <a href="#main-content" className="ontario-skip-link">
        {t('header.skipToMain')}
      </a>
      <div className="ontario-header__container">
        <div className="ontario-header__logo-container">
          <Link to="/" className="ontario-header__logo" aria-label={t('common.ontarioLogo')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 360 120"
              role="img"
              aria-label={t('common.ontarioLogo')}
              width="180"
              height="60"
            >
              <title>{t('common.ontarioLogo')}</title>
              <path
                fill="#000"
                d="M0 0h360v120H0z"
              />
              <text
                x="20"
                y="75"
                fill="#fff"
                fontFamily="Arial, sans-serif"
                fontSize="48"
                fontWeight="bold"
              >
                Ontario
              </text>
            </svg>
          </Link>
        </div>
        <div className="ontario-header__nav-container">
          <nav className="ontario-header__nav" aria-label="Main navigation">
            <h1 className="ontario-header__title">
              {t('header.title')}
            </h1>
            <p className="ontario-header__subtitle">
              {t('header.subtitle')}
            </p>
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};
