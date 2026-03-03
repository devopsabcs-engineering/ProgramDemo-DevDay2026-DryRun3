import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="ontario-page">
      <Header />
      <main id="main-content" className="ontario-main-content">
        <div className="ontario-row">
          <div className="ontario-columns ontario-large-8 ontario-medium-10 ontario-small-12">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
