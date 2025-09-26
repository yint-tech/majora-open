import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';

import { getDoc, getFallbackDoc, type DocRecord } from '../content/docs';

const DocPage = () => {
  const { lang, slug } = useParams<{ lang?: string; slug?: string }>();
  const { t } = useTranslation();

  const locale: DocRecord['locale'] = lang === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${locale}`;

  const doc = useMemo(() => {
    if (!slug) {
      return undefined;
    }
    return getDoc(slug, locale) ?? getFallbackDoc(slug);
  }, [slug, locale]);

  const isFallback = doc ? doc.locale !== locale : false;

  const html = useMemo(() => (doc ? marked.parse(doc.content) : ''), [doc]);

  if (!doc) {
    return (
      <div className="container not-found">
        <h1>{t('docsPage.notFound')}</h1>
        <Link className="button ghost" to={`${basePath}/docs`}>
          {t('docsPage.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container doc-page">
      <Link className="button ghost doc-back" to={`${basePath}/docs`}>
        {t('docsPage.back')}
      </Link>
      <h1>{doc.title}</h1>
      {doc.updated ? <time dateTime={doc.updated}>{doc.updated}</time> : null}
      {isFallback ? (
        <p>
          <em>{t('docsPage.fallbackNote')}</em>
        </p>
      ) : null}
      <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default DocPage;
