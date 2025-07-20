import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

export default Layout;
