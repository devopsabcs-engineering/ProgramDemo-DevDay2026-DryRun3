import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="ontario-footer" role="contentinfo">
      <div className="ontario-footer__container">
        <div className="ontario-footer__links">
          <ul className="ontario-footer__list">
            <li className="ontario-footer__list-item">
              <a href="https://www.ontario.ca/page/accessibility" className="ontario-footer__link">
                {t('footer.accessibility')}
              </a>
            </li>
            <li className="ontario-footer__list-item">
              <a href="https://www.ontario.ca/page/privacy-statement" className="ontario-footer__link">
                {t('footer.privacy')}
              </a>
            </li>
            <li className="ontario-footer__list-item">
              <a href="https://www.ontario.ca/feedback/contact-us" className="ontario-footer__link">
                {t('footer.contactUs')}
              </a>
            </li>
          </ul>
        </div>
        <div className="ontario-footer__copyright">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
