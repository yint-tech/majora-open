import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
              <a href="https://majora3.iinti.cn/majora-doc/" target="_blank" rel="noopener noreferrer">
                {t('footer.officialDoc')}
              </a>
            </li>
            <li>
              <a
                href="https://majora3.iinti.cn/majora-doc/01_deploy/01_overview.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.deployOverview')}
              </a>
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
