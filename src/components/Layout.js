import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidenav from './Sidenav';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidenav />
      <div className="layout-content">
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout; 