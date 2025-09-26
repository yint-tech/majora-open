import { useEffect } from 'react';
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

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const basePath = i18n.language === 'en' ? '/en' : '/zh-CN';

  const cards = t('cards', { returnObjects: true }) as FeatureItem[];
  const features = t('features.items', { returnObjects: true }) as FeatureItem[];
  const clients = t('clients.items', { returnObjects: true }) as ClientItem[];
  const concepts = t('concepts.items', { returnObjects: true }) as ConceptItem[];
  const stepSummary = t('steps.summary', { returnObjects: true }) as string[];
  const stepCode = t('steps.code') as string;
  const stepLinkLabel = t('steps.linkLabel', { defaultValue: '' }) as string;

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

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="lead">{t('hero.description')}</p>
            <div className="hero-actions">
              <a className="button primary" href="http://majora3.iinti.cn/" target="_blank" rel="noopener noreferrer">
                {t('hero.primaryCta')}
              </a>
              <a
                className="button ghost"
                href="https://majora3.iinti.cn/majora-doc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.secondaryCta')}
              </a>
              <Link className="button ghost small" to={`${basePath}/docs/introduction`}>
                {t('hero.introCta')}
              </Link>
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
                    <a
                      className="button primary"
                      href={client.primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {client.primaryAction}
                    </a>
                  ) : null}
                  {client.secondaryAction && client.secondaryLink ? (
                    <a
                      className="button ghost"
                      href={client.secondaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {client.secondaryAction}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
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
              <a className="button ghost" href="http://majora3.iinti.cn/" target="_blank" rel="noopener noreferrer">
                {stepLinkLabel}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-card">
            <div>
              <h2 id="cta-title">{t('cta.title')}</h2>
              <p>{t('cta.description')}</p>
            </div>
            <a className="button primary" href="http://majora3.iinti.cn/" target="_blank" rel="noopener noreferrer">
              {t('cta.action')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
