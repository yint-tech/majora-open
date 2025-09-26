import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLang = event.target.value as 'zh-CN' | 'en';
    const currentLang = lang === 'en' ? 'en' : 'zh-CN';

    if (nextLang === currentLang) {
      return;
    }

    const segments = location.pathname.split('/').filter(Boolean);
    segments[0] = nextLang;
    const newPath = `/${segments.join('/')}`;

    navigate({ pathname: newPath, search: location.search }, { replace: true, state: location.state });
    void i18n.changeLanguage(nextLang);
  };

  return (
    <label className="language-switcher">
      <span>{t('language.label')}:</span>
      <select value={i18n.language} onChange={handleChange}>
        <option value="zh-CN">{t('language.zh')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
