import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header sidebarCollapsed={collapsed} onToggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1" style={{ position: 'relative' }}>
        <Sidebar collapsed={collapsed} />
        <main className="flex-grow-1 p-3 p-md-4" style={{ minWidth: 0, overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
