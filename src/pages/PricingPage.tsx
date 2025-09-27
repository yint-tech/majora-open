import { useTranslation } from 'react-i18next';

type PricingRow = {
  term: string;
  price: string;
  limit: string;
  deploy: string;
  ip: string;
  support: string;
};

type PricingContact = {
  label?: string;
  wechat?: string;
};

const PricingPage = () => {
  const { t } = useTranslation();

  const intro = t('pricing.intro');
  const headers = t('pricing.table.headers', { returnObjects: true }) as string[];
  const rows = t('pricing.table.rows', { returnObjects: true }) as PricingRow[];
  const note = t('pricing.note');
  const contact = t('pricing.contact', { returnObjects: true }) as PricingContact | string;

  const contactData = typeof contact === 'string' ? { label: contact } : contact;

  return (
    <div className="container pricing-page">
      <header className="pricing-hero">
        <h1>{t('pricing.title')}</h1>
        <p>{intro}</p>
      </header>

      <section className="pricing-table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.term}>
                <td>{row.term}</td>
                <td>{row.price}</td>
                <td>{row.limit}</td>
                <td>{row.deploy}</td>
                <td>{row.ip}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
