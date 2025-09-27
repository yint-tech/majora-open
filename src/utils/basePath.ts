const SUPPORTED_LOCALES = new Set(['zh-CN', 'en']);


const detectAppBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
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

      return withoutFile.length > 0 ? `/${withoutFile.join('/')}` : '';
    } catch {
      return undefined;
    }
  };

  const segments = window.location.pathname.split('/').filter(Boolean);
  const localeIndex = segments.findIndex((segment) => SUPPORTED_LOCALES.has(segment));

  if (localeIndex > 0) {
    return `/${segments.slice(0, localeIndex).join('/')}`;
  }

  if (localeIndex === 0) {
    return '';
  }

  const scriptBase = deriveFromScript();
  if (typeof scriptBase === 'string') {
    return scriptBase;
  }

  if (window.location.hostname.endsWith('github.io') && segments.length > 0) {
    return `/${segments[0]}`;
  }

  if (segments.length > 0) {
    const cleanSegments = segments[segments.length - 1]?.includes('.') ? segments.slice(0, -1) : segments;

    if (cleanSegments.length > 0) {
      return `/${cleanSegments.join('/')}`;
    }
  }

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
