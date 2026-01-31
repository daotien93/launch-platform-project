import vi from '../messages/vi.json';
import en from '../messages/en.json';
import ko from '../messages/ko.json';

export const locales = ['en', 'ko', 'vi'] as const;
export type Locale = (typeof locales)[number];

const messages = { vi, en, ko };

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as any) ? locale : 'vi';

  return {
    locale: validLocale,
    messages: messages[validLocale as keyof typeof messages]
  };
});