import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const basePath = `/${lang === 'en' ? 'en' : 'zh-CN'}`;

  return (
    <div className="container not-found">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link className="button ghost" to={basePath}>
        {t('notFound.back')}
      </Link>
    </div>
  );
};

export default NotFound;
