import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LANG_OPTIONS = [
  { value: 'zh-CN' as const, labelKey: 'language.zh' },
  { value: 'en' as const, labelKey: 'language.en' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  const currentLang = lang === 'en' ? 'en' : 'zh-CN';

  const handleSwitch = (nextLang: 'zh-CN' | 'en') => {
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
    <div className="language-switcher" role="tablist" aria-label={t('language.label')}>
      {LANG_OPTIONS.map(({ value, labelKey }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={currentLang === value}
          className={`language-tab${currentLang === value ? ' is-active' : ''}`}
          onClick={() => handleSwitch(value)}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
