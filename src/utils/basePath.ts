const SUPPORTED_LOCALES = new Set(['zh-CN', 'en']);

const detectAppBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const segments = window.location.pathname.split('/').filter(Boolean);
  const localeIndex = segments.findIndex((segment) => SUPPORTED_LOCALES.has(segment));

  if (localeIndex <= 0) {
    return '';
  }

  return `/${segments.slice(0, localeIndex).join('/')}`;
};

export const appBasePath = detectAppBasePath();

export const toAbsoluteUrl = (targetPath: string): string => {
  const [pathPart, hashPart] = targetPath.split('#');
  const normalizedPath = pathPart
    ? `${appBasePath}${pathPart.startsWith('/') ? pathPart : `/${pathPart}`}`.replace(/\/+$/, '') || '/'
    : appBasePath || '/';

  return hashPart ? `${normalizedPath}#${hashPart}` : normalizedPath;
};
