import { useTranslation } from 'react-i18next';

type PricingPlan = {
  name: string;
  tagline?: string;
  price: string;
  billing?: string;
  features?: string[];
  cta?: string;
  link?: string;
};

type PricingContact = {
  label?: string;
  wechat?: string;
};

const PricingPage = () => {
  const { t } = useTranslation();

  const intro = t('pricing.intro');
  const plans = t('pricing.plans', { returnObjects: true }) as PricingPlan[];
  const note = t('pricing.note');
  const contact = t('pricing.contact', { returnObjects: true }) as PricingContact | string;

  const contactData = typeof contact === 'string' ? { label: contact } : contact;

  return (
    <div className="container pricing-page">
      <header className="pricing-hero">
        <h1>{t('pricing.title')}</h1>
        <p>{intro}</p>
      </header>

      <section className="pricing-grid">
        {plans.map((plan, index) => (
          <article key={plan.name} className={`pricing-card${index === 1 ? ' is-featured' : ''}`}>
            <header className="pricing-card-header">
              <h3>{plan.name}</h3>
              {plan.tagline ? <p className="pricing-card-tagline">{plan.tagline}</p> : null}
            </header>
            <div className="pricing-card-price">
              <span>{plan.price}</span>
            </div>
            {plan.billing ? <p className="pricing-card-billing">{plan.billing}</p> : null}
            {plan.features?.length ? (
              <ul className="pricing-card-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}
            {plan.cta ? (
              plan.link ? (
                <a className="pricing-card-cta" href={plan.link} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              ) : (
                <div className="pricing-card-cta">
                  <span>{plan.cta}</span>
                </div>
              )
            ) : null}
          </article>
        ))}
      </section>

      <section className="pricing-note">
        <p>{note}</p>
        {contactData?.label || contactData?.wechat ? (
          <div className="pricing-contact">
            {contactData.label ? <span>{contactData.label}</span> : null}
            {contactData.wechat ? <strong>{contactData.wechat}</strong> : null}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default PricingPage;
