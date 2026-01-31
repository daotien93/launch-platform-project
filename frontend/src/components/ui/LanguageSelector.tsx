'use client';

import { useLocale } from '../../context/LocaleContext';
import { Button } from './Button';

export function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-400">{t('home.language')}:</span>
      <Button
        variant={locale === 'vi' ? 'primary' : 'outline'}
        onClick={() => setLocale('vi')}
        className="text-xs"
      >
        🇻🇳 VI
      </Button>
      <Button
        variant={locale === 'en' ? 'primary' : 'outline'}
        onClick={() => setLocale('en')}
        className="text-xs"
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={locale === 'ko' ? 'primary' : 'outline'}
        onClick={() => setLocale('ko')}
        className="text-xs"
      >
        🇰🇷 KO
      </Button>
    </div>
  );
}