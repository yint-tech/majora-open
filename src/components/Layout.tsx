import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const normalized = lang === 'en' ? 'en' : lang === 'zh-CN' ? 'zh-CN' : undefined;

    if (!normalized) {
      navigate('/zh-CN', { replace: true });
      return;
    }

    if (i18n.language !== normalized) {
      void i18n.changeLanguage(normalized);
    }

    document.title = normalized === 'en' ? 'Majora3-IP Proxy Cluster' : 'Majora3-代理IP池集群';
  }, [lang, i18n, navigate]);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
