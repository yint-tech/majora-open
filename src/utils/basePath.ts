const SUPPORTED_LOCALES = new Set(['zh-CN', 'en']);


const detectBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const segments = window.location.pathname.split('/').filter(Boolean);
  const localeIndex = segments.findIndex((segment) => SUPPORTED_LOCALES.has(segment));

  if (localeIndex > 0) {
    return `/${segments.slice(0, localeIndex).join('/')}`;
  }

  if (localeIndex === 0) {
    return '';
  }
  if (window.location.hostname.endsWith('github.io') && segments.length > 0) {
    return `/${segments[0]}`;
  }

  return '';
};

export const appBasePath = detectBasePath();

export const withBasePath = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${appBasePath}${normalized}`.replace(/\/+/g, '/');
};
export const appBasePath = detectAppBasePath();

export const toAbsoluteUrl = (targetPath: string): string => {
  const [pathPart, hashPart] = targetPath.split('#');
  const normalizedPath = pathPart
    ? `${appBasePath}${pathPart.startsWith('/') ? pathPart : `/${pathPart}`}`.replace(/\/+$/, '') || '/'
    : appBasePath || '/';

  return hashPart ? `${normalizedPath}#${hashPart}` : normalizedPath;
};
