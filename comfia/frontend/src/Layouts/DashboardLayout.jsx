import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6' }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header con botón de menú */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Contenido dinámico */}
        <main style={{ padding: '24px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;