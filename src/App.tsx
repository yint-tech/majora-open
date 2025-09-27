import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';

import Layout from './components/Layout';
import DocPage from './pages/DocPage';
import DocsIndex from './pages/DocsIndex';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import PricingPage from './pages/PricingPage';

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, navigationType]);

  return null;
};

const App = () => (
  <>
    <ScrollRestoration />
    <Routes>
      <Route path="/" element={<Navigate to="/zh-CN" replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="docs" element={<DocsIndex />} />
        <Route path="docs/*" element={<DocPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/zh-CN" replace />} />
    </Routes>
  </>
);

export default App;
