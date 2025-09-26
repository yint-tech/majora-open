import { MouseEvent } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';
import { toAbsoluteUrl } from '../utils/basePath';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  const currentLang = lang === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${currentLang}`;

  const handleScroll = (targetId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== basePath) {
      navigate(basePath, { state: { scrollTo: targetId } });
      return;
    }

    scrollToElement();
  };

  return (
    <header className="site-header">
      <div className="container nav">
        <div className="branding">
          <Link to={basePath} className="logo" aria-label="Majora">
            Majora
          </Link>
          <span className="tagline">Proxy Platform</span>
        </div>
        <nav className="navigation" aria-label="Primary">
          <a href={toAbsoluteUrl(`${basePath}#features`)} onClick={handleScroll('features')}>
            {t('nav.features')}
          </a>
          <a href={toAbsoluteUrl(`${basePath}#steps`)} onClick={handleScroll('steps')}>
            {t('nav.steps')}
          </a>
          <a href={toAbsoluteUrl(`${basePath}#clients`)} onClick={handleScroll('clients')}>
            {t('nav.clients')}
          </a>
          <Link to={`${basePath}/docs`}>{t('nav.docs')}</Link>
          <a href={toAbsoluteUrl(`${basePath}#contact`)} onClick={handleScroll('contact')}>
            {t('nav.contact')}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
