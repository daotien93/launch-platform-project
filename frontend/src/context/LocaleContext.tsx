'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'vi' | 'en' | 'ko';

const translations = {
  vi: {
    home: {
      title: 'Hôm nay <span>ăn gì</span> đây?',
      subtitle: 'Không biết ăn gì? Để vũ trụ quyết định! Quay một cái và đến ngay quán ăn gần nhất.',
      searchPlaceholder: 'Tìm quán ăn...',
      randomButton: 'Quay ngẫu nhiên',
      language: 'Ngôn ngữ'
    },
    details: {
      reviews: 'Đánh giá & Nhận xét',
      noReviews: 'Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!',
      viewOnMaps: 'Xem trên Google Maps →'
    }
  },
  en: {
    home: {
      title: 'What to <span>eat</span> today?',
      subtitle: 'Don\'t know what to eat? Let the universe decide! Spin and go to the nearest restaurant.',
      searchPlaceholder: 'Search for restaurants...',
      randomButton: 'Random spin',
      language: 'Language'
    },
    details: {
      reviews: 'Reviews & Comments',
      noReviews: 'No reviews yet. Be the first to review!',
      viewOnMaps: 'View on Google Maps →'
    }
  },
  ko: {
    home: {
      title: '오늘 <span>뭐 먹을까</span>?',
      subtitle: '뭐 먹을지 모르겠어? 우주가 결정하게 해! 돌려서 가장 가까운 식당으로 가자.',
      searchPlaceholder: '식당 검색...',
      randomButton: '랜덤 돌리기',
      language: '언어'
    },
    details: {
      reviews: '리뷰 & 코멘트',
      noReviews: '아직 리뷰가 없어요. 첫 번째 리뷰를 남겨주세요!',
      viewOnMaps: 'Google Maps에서 보기 →'
    }
  }
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocalizedText: (product: any, field: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && ['vi', 'en', 'ko'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getLocalizedText = (product: any, field: string) => {
    const localizedField = `${field}_${locale}`;
    return product[localizedField] || product[field] || '';
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, getLocalizedText }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}