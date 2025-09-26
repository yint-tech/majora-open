import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { docsByLocale, type DocRecord } from '../content/docs';

const DocsIndex = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();

  const locale: DocRecord['locale'] = lang === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${locale}`;

  const docs = useMemo(() => {
    const items = docsByLocale[locale] ?? [];

    return [...items].sort((a, b) => {
      if (!a.updated || !b.updated) {
        return (b.updated ? 1 : 0) - (a.updated ? 1 : 0);
      }
      return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    });
  }, [locale]);

  return (
    <div className="container">
      <div className="docs-hero">
        <h1>{t('docsPage.title')}</h1>
        <p>{t('docsPage.intro')}</p>
      </div>
      <section>
        <h2>{t('docsPage.updated')}</h2>
        {docs.length === 0 ? (
          <p>{t('docsPage.empty')}</p>
        ) : (
          <div className="docs-grid">
            {docs.map((doc) => (
              <article key={doc.locale + doc.slug} className="docs-card">
                <h3>{doc.title}</h3>
                {doc.description ? <p>{doc.description}</p> : null}
                {doc.updated ? <time dateTime={doc.updated}>{doc.updated}</time> : null}
                <Link className="button ghost" to={`${basePath}/docs/${doc.slug}`}>
                  {t('docsPage.read')}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DocsIndex;
