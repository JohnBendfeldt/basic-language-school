import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 768px)';

/** True on phone-sized viewports. Defaults to false where matchMedia is unavailable (e.g. jsdom). */
export const useIsMobile = (): boolean => {
  const get = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(MOBILE_QUERY).matches;
  const [isMobile, setIsMobile] = useState<boolean>(get);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isMobile;
};
