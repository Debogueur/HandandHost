import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AddModal from './components/common/AddModal';
import Sidebar from './components/common/Sidebar';
import AuthIndex from "./screens/AuthIndex";
import MainIndex from './screens/MainIndex';

const App = () => {
  const location = useLocation();
  
  const activeKey = useMemo(() => {
    const pathname = location.pathname;
      const baseUrl = process.env.PUBLIC_URL;
      const baseUrlParts = baseUrl.split("/");

      const pathParts = pathname.split("/");

      const result = pathParts.length > 0 ? pathParts[baseUrlParts.length] : "/";

    return result ? "/" + result : "/";
  }, [location.pathname]);

  const isAuthPage = useMemo(() => {
    const authRoutes = ['/sign-in', '/sign-up', '/reset-password', '/verification', '/page-404'];
    return authRoutes.includes(activeKey);
  }, [activeKey]);

  if (isAuthPage) {
    return (
      <div id="ebazar-layout" className='theme-blue'>
        <AuthIndex />
      </div>
    );
  }

  return (
    <div id="ebazar-layout" className='theme-blue'>
      <Sidebar activekey={activeKey} />
      <AddModal />
      <MainIndex activekey={activeKey} />
    </div>
  );
};

export default App;