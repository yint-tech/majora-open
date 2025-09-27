declare global {
  interface Window {
    __APP_BASE_PATH__?: string;
  }
}

const SUPPORTED_LOCALES = new Set(['zh-CN', 'en']);


const detectAppBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  if (typeof window.__APP_BASE_PATH__ === 'string') {
    return window.__APP_BASE_PATH__;
  }

  const deriveFromScript = () => {
    const script = document.querySelector('script[src]') as HTMLScriptElement | null;
    if (!script?.src) {
      return undefined;
    }

    try {
      const url = new URL(script.src, window.location.href);
      const pathSegments = url.pathname.split('/').filter(Boolean);

      if (pathSegments.length === 0) {
        return '';
      }

      const withoutFile = pathSegments[pathSegments.length - 1]?.includes('.')
        ? pathSegments.slice(0, -1)
        : pathSegments;

      if (withoutFile.length === 0) {
        return '';
      }

      while (withoutFile.length > 0 && SUPPORTED_LOCALES.has(withoutFile[withoutFile.length - 1] ?? '')) {
        withoutFile.pop();
      }

      const derived = withoutFile.length > 0 ? `/${withoutFile.join('/')}` : '';
      window.__APP_BASE_PATH__ = derived;
      return derived;
    } catch {
      return undefined;
    }
  };

  const segments = window.location.pathname.split('/').filter(Boolean);
  const localeIndex = segments.findIndex((segment) => SUPPORTED_LOCALES.has(segment));

  if (localeIndex > 0) {
    const basePath = `/${segments.slice(0, localeIndex).join('/')}`;
    window.__APP_BASE_PATH__ = basePath;
    return basePath;
  }

  if (localeIndex === 0) {
    window.__APP_BASE_PATH__ = '';
    return '';
  }

  const scriptBase = deriveFromScript();
  if (typeof scriptBase === 'string') {
    window.__APP_BASE_PATH__ = scriptBase;
    return scriptBase;
  }

  if (window.location.hostname.endsWith('github.io') && segments.length > 0) {
    const basePath = `/${segments[0]}`;
    window.__APP_BASE_PATH__ = basePath;
    return basePath;
  }

  if (segments.length > 0) {
    const cleanSegments = segments[segments.length - 1]?.includes('.') ? segments.slice(0, -1) : segments;

    if (cleanSegments.length > 0) {
      const basePath = `/${cleanSegments.join('/')}`;
      window.__APP_BASE_PATH__ = basePath;
      return basePath;
    }
  }

  window.__APP_BASE_PATH__ = '';
  return '';
};

export const appBasePath = detectAppBasePath();

export const withBasePath = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${appBasePath}${normalized}`.replace(/\/+/g, '/');
};

export const toAbsoluteUrl = (targetPath: string): string => {
  const [pathPart, hashPart] = targetPath.split('#');
  const normalizedPath = pathPart
    ? `${appBasePath}${pathPart.startsWith('/') ? pathPart : `/${pathPart}`}`.replace(/\/+$/, '') || '/'
    : appBasePath || '/';

  return hashPart ? `${normalizedPath}#${hashPart}` : normalizedPath;
};
