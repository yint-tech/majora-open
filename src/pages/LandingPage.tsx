import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const heroCardsClassNames = ['card primary-card', 'card secondary-card', 'card tertiary-card'];

type FeatureItem = {
  title: string;
  description: string;
};

type ClientItem = {
  title: string;
  description: string;
  primaryAction?: string;
  primaryLink?: string;
  secondaryAction?: string;
  secondaryLink?: string;
  code?: string;
};

type ConceptItem = {
  title: string;
  description: string;
};

type TagItem = {
  id: string;
  label: string;
};

type ProductLinkItem = {
  title: string;
  description: string;
  link: string;
  label: string;
};

const renderWithLineBreaks = (text: string): ReactNode => {
  if (!text.includes('\n')) {
    return text;
  }
  const parts = text.split('\n');
  return parts.map((part, index) => (
    <span key={`line-${index}`} className="line-break">
      {part}
      {index < parts.length - 1 ? <br /> : null}
    </span>
  ));
};

const isExternalLink = (url: string): boolean => /^https?:\/\//.test(url);
const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLocale = i18n.language === 'en' ? 'en' : 'zh-CN';
  const basePath = `/${currentLocale}`;

  const heroEyebrow = t('hero.eyebrow');
  const cards = t('cards', { returnObjects: true }) as FeatureItem[];
  const features = t('features.items', { returnObjects: true }) as FeatureItem[];
  const clients = t('clients.items', { returnObjects: true }) as ClientItem[];
  const concepts = t('concepts.items', { returnObjects: true }) as ConceptItem[];
  const otherProducts = t('otherProducts.items', { returnObjects: true }) as ProductLinkItem[];
  const stepSummary = t('steps.summary', { returnObjects: true }) as string[];
  const stepCode = t('steps.code') as string;
  const stepLinkLabel = t('steps.linkLabel', { defaultValue: '' }) as string;
  const heroTags = t('hero.tags', { returnObjects: true, defaultValue: [] }) as TagItem[];

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | undefined;
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }, [location.state]);

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            {heroEyebrow ? <p className="eyebrow">{heroEyebrow}</p> : null}
            <h1>{renderWithLineBreaks(t('hero.title'))}</h1>
            <p className="lead">{renderWithLineBreaks(t('hero.description'))}</p>
            {heroTags.length > 0 ? (
              <div className="hero-tags" aria-label={t('nav.features')}>
                {heroTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className="hero-tag"
                    onClick={() => scrollToSection(tag.id)}
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="hero-actions">
              <button type="button" className="button primary" onClick={() => scrollToSection('steps')}>
                {t('hero.primaryCta')}
              </button>
              <a
                className="button ghost small"
                href="https://github.com/yint-tech/majora-open"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.repoCta')}
              </a>
            </div>
            <p className="note">
              {t('hero.note', {
                credentials: 'majora / majora',
              })}
            </p>
          </div>
          <div className="hero-visual">
            <div className="card-stack">
              {cards.map((card, index) => (
                <div key={card.title} className={heroCardsClassNames[index] ?? 'card'}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section features">
        <div className="container">
          <h2>{t('features.title')}</h2>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="concepts" className="section concepts">
        <div className="container">
          <h2>{t('concepts.title')}</h2>
          <p className="section-intro">{t('concepts.intro')}</p>
          <div className="concept-grid">
            {concepts.map((concept) => (
              <article key={concept.title} className="concept-card">
                <h3>{concept.title}</h3>
                <p>{concept.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="section steps">
        <div className="container">
          <h2>{t('steps.title')}</h2>
          <div className="step-card step-card--full">
            <ol className="step-list">
              {stepSummary.map((item, index) => (
                <li key={item}>
                  <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
            <pre>
              <code>{stepCode}</code>
            </pre>
            {stepLinkLabel ? (
              <button type="button" className="button ghost" onClick={() => scrollToSection('clients')}>
                {stepLinkLabel}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section id="clients" className="section clients">
        <div className="container">
          <h2>{t('clients.title')}</h2>
          <div className="client-grid">
            {clients.map((client) => (
              <article key={client.title} className="client-card">
                <h3>{client.title}</h3>
                <p>{client.description}</p>
                {client.code ? (
                  <pre>
                    <code>{client.code}</code>
                  </pre>
                ) : null}
                <div className="actions">
                  {client.primaryAction && client.primaryLink ? (
                    isExternalLink(client.primaryLink) ? (
                      <a
                        className="button primary"
                        href={client.primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {client.primaryAction}
                      </a>
                    ) : (
                      <Link className="button primary" to={`${basePath}${client.primaryLink}`}>
                        {client.primaryAction}
                      </Link>
                    )
                  ) : null}
                  {client.secondaryAction && client.secondaryLink ? (
                    isExternalLink(client.secondaryLink) ? (
                      <a
                        className="button ghost"
                        href={client.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {client.secondaryAction}
                      </a>
                    ) : (
                      <Link className="button ghost" to={`${basePath}${client.secondaryLink}`}>
                        {client.secondaryAction}
                      </Link>
                    )
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {otherProducts.length > 0 ? (
        <section className="section other-products">
          <div className="container">
            <h2>{t('otherProducts.title')}</h2>
            <p className="section-intro">{t('otherProducts.intro')}</p>
            <div className="product-grid">
              {otherProducts.map((product) => (
                <article key={product.title} className="product-card">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <a
                    className="button ghost"
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default LandingPage;
