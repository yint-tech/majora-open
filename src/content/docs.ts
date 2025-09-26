import matter from 'gray-matter';

export type DocRecord = {
  slug: string;
  locale: 'zh-CN' | 'en';
  title: string;
  description?: string;
  updated?: string;
  content: string;
};

type DocsByLocale = Record<DocRecord['locale'], DocRecord[]>;

const docsContext = require.context('../docs', true, /\.(?:zh-CN|en)\.md$/);

const docs: DocRecord[] = docsContext
  .keys()
  .sort()
  .map((key) => {
    const raw = docsContext(key) as string;
    const { data, content } = matter(raw);

    const match = key.match(/\.\/(.+)\.(zh-CN|en)\.md$/);
    if (!match) {
      throw new Error(`Invalid docs filename: ${key}`);
    }

    const [, slug, locale] = match;

    return {
      slug,
      locale: locale as DocRecord['locale'],
      title: (data.title as string | undefined) ?? slug,
      description: data.description as string | undefined,
      updated: data.updated as string | undefined,
      content,
    };
  });

export const docsByLocale: DocsByLocale = docs.reduce<DocsByLocale>(
  (acc, doc) => {
    acc[doc.locale] = acc[doc.locale] ? [...acc[doc.locale], doc] : [doc];
    return acc;
  },
  {
    'zh-CN': [],
    en: [],
  },
);

export const getDoc = (slug: string, locale: DocRecord['locale']): DocRecord | undefined =>
  docsByLocale[locale]?.find((doc) => doc.slug === slug);

export const getFallbackDoc = (slug: string): DocRecord | undefined =>
  docs.find((doc) => doc.slug === slug);
