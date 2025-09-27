import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();

  const currentLang = lang === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${currentLang}`;

  return (
    <header className="site-header">
      <div className="container nav">
        <div className="branding">
          <Link to={basePath} className="logo" aria-label="Majora">
            Majora3
          </Link>
          <span className="tagline">IP Proxy Platform</span>
        </div>
        <nav className="navigation" aria-label="Primary">
          <Link to={`${basePath}/pricing`}>{t('nav.pricing')}</Link>
          <a href="https://majora3.iinti.cn/majora-doc/" target="_blank" rel="noopener noreferrer">
            {t('nav.docs')}
          </a>
          <a href="https://github.com/yint-tech/majora-open" target="_blank" rel="noopener noreferrer">
            {t('nav.github')}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
