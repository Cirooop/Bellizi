import  { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { LayoutProps } from '../../types';

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar isExpanded={isSidebarExpanded} onHover={setIsSidebarExpanded} />
        <main className="flex-1 p-6 ml-16 md:ml-16 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;