"use client";

import { useMemo, useState } from "react";
import { MOCK_PRODUCTS } from "../lib/mock/products";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { RatingStars } from "../components/ui/RatingStars";
import { LanguageSelector } from "../components/ui/LanguageSelector";
import Link from "next/link";
import { useLocale } from '../context/LocaleContext';

export default function HomePage() {
  const { t, getLocalizedText } = useLocale();
  const allProducts = MOCK_PRODUCTS;

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | undefined>();

  const filteredProducts = useMemo(
    () =>
      allProducts.filter((p) => {
        const matchCategory = category ? p.category === category : true;
        const q = search.trim().toLowerCase();
        const matchSearch = q
          ? p.name?.toLowerCase().includes(q) ||
            p.restaurantName?.toLowerCase().includes(q) ||
            p.restaurantAddress?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
          : true;
        return matchCategory && matchSearch;
      }),
    [allProducts, category, search],
  );

  const handleRandom = () => {
    if (!filteredProducts.length) return;
    const random =
      filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    setHighlightedId(random.id);
  };

  return (
    <div className="flex w-full flex-col">
      {/* Hero */}
      <section className="mb-6 w-full rounded-3xl bg-gradient-to-r from-rgba-emerald-20 via-rgba-purple-10 to-rgba-sky-20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl" dangerouslySetInnerHTML={{ __html: t('home.title') }} />
            <p className="mt-2 max-w-xl text-sm text-neutral-300">
              {t('home.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button onClick={handleRandom} className="text-base">
              🎲 {t('home.randomButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="mb-4 flex w-full flex-col gap-3 rounded-2xl bg-[rgba(0,0,0,0.4)] p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full bg-rgba-black-60 px-3 py-1 outline-none ring-1 ring-rgba-white-10"
          >
            <option value="">Tất cả loại hình</option>
            <option value="Món chính">Món chính</option>
            <option value="Món tráng miệng">Món tráng miệng</option>
            <option value="Đồ uống">Đồ uống</option>
          </select>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('home.searchPlaceholder')}
          className="w-full rounded-full bg-rgba-black-60 px-4 py-1.5 text-sm outline-none ring-1 ring-rgba-white-10 md:max-w-xs"
        />
      </section>

      {/* List */}
      {filteredProducts.length === 0 ? (
        <div className="mt-4 text-sm text-neutral-400">
          Không tìm thấy quán phù hợp. Thử đổi bộ lọc hoặc từ khoá khác nhé.
        </div>
      ) : (
        <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => {
            const isHighlighted = p.id === highlightedId;
            return (
              <Link
                key={p.id}
                href={`/places/${p.id}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-rgba-white-10 bg-rgba-black-60 transition 
                  hover:-translate-y-1 hover:border-[rgba(52,211,153,0.6)] hover:shadow-lg hover:shadow-[rgba(16,185,129,0.2)]
                  ${isHighlighted ? "ring-2 ring-emerald-400" : ""}`}
              >
                <div className="relative h-32 w-full overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.restaurantName || p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-rgba-emerald-20 via-rgba-purple-10 to-rgba-sky-20" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="line-clamp-2 text-sm font-semibold group-hover:text-emerald-300">
                      {getLocalizedText(p, 'restaurantName') || getLocalizedText(p, 'name')}
                    </h2>
                    <Badge variant={p.isAvailable ? "success" : "default"}>
                      {p.isAvailable ? "Mở" : "Đóng"}
                    </Badge>
                  </div>
                  <RatingStars rating={p.rating ?? undefined} />
                  {p.reviewCount > 0 && (
                    <p className="text-[11px] text-neutral-400">
                      {p.reviewCount} {t('home.reviews')}
                    </p>
                  )}
                  <p className="line-clamp-2 text-xs text-neutral-400">
                    {getLocalizedText(p, 'restaurantAddress') || "Địa chỉ đang cập nhật"}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1">
                    {p.category && <Badge>{getLocalizedText(p, 'category')}</Badge>}
                    {p.cuisineType && <Badge>{getLocalizedText(p, 'cuisineType')}</Badge>}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}

