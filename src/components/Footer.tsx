import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${currentLocale}`;

  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">Majora</div>
          <p>{t('footer.products')}</p>
        </div>
        <div>
          <h4>{t('footer.business')}</h4>
          <p>{t('footer.businessDescription', { wechat: 'iinti_cn' })}</p>
        </div>
        <div>
          <h4>{t('footer.docs')}</h4>
          <ul>
            <li>
              <Link to={`${basePath}/docs`}>{t('footer.officialDoc')}</Link>
            </li>
            <li>
              <Link to={`${basePath}/docs/quick-start`}>{t('footer.deployOverview')}</Link>
            </li>
            <li>
              <a href="mailto:contact@iinti.cn">{t('footer.contactEmail')}</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;
