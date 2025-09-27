import { MouseEvent } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';
import { withBasePath } from '../utils/basePath';

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

  const anchorHref = (section: string) => withBasePath(`${basePath}#${section}`);

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
          <a href={anchorHref('features')} onClick={handleScroll('features')}>
            {t('nav.features')}
          </a>
          <a href={anchorHref('steps')} onClick={handleScroll('steps')}>
            {t('nav.steps')}
          </a>
          <a href={anchorHref('clients')} onClick={handleScroll('clients')}>
            {t('nav.clients')}
          </a>
          <a href="https://majora3.iinti.cn/majora-doc/" target="_blank" rel="noopener noreferrer">
            {t('nav.docs')}
          </a>
          <a href="https://github.com/yint-tech/majora-open" target="_blank" rel="noopener noreferrer">
            {t('nav.github')}
          </a>
          <a href={anchorHref('contact')} onClick={handleScroll('contact')}>
            {t('nav.contact')}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
