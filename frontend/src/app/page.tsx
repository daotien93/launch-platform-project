"use client";

import { useMemo, useState } from "react";
import type { Product } from "../lib/types/product";
import { MOCK_PRODUCTS } from "../lib/mock/products";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { RatingStars } from "../components/ui/RatingStars";
import { useLocale } from '../context/LocaleContext';
import { Modal } from "../components/ui/Modal";
import { PlaceDetailsPage } from "../components/ui/PlaceDetailsPage";

const CITIES = ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh'];

export default function HomePage() {
  const { t, getLocalizedText } = useLocale();
  const allProducts = MOCK_PRODUCTS;

  const [category, setCategory] = useState("Món chính");
  const [city, setCity] = useState(CITIES[0]);
  const [sortByPrice, setSortByPrice] = useState('default');
  const [search, setSearch] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let products = allProducts
      .filter((p) => {
        const matchCategory = category ? p.category === category : true;
        const matchCity = p.restaurantAddress?.includes(city) ?? false;
        const q = search.trim().toLowerCase();
        const matchSearch = q
          ? p.name?.toLowerCase().includes(q) ||
            p.restaurantName?.toLowerCase().includes(q) ||
            p.restaurantAddress?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
          : true;
        return matchCategory && matchCity && matchSearch;
      })
    
    if (sortByPrice === 'asc') {
      products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortByPrice === 'desc') {
      products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return products;
  }, [allProducts, category, city, search, sortByPrice]);

  const handleRandom = () => {
    if (!filteredProducts.length) return;
    const random =
      filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    setHighlightedId(random.id);
  };

  return (
    <div className="flex w-full flex-col">
      {/* Hero */}
      <section className="mb-6 w-full rounded-3xl bg-gradient-to-r from-rgba-accent-20 via-rgba-secondary-20 to-rgba-accent-20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl" dangerouslySetInnerHTML={{ __html: t('home.title') }} />
            <p className="mt-2 max-w-xl text-sm text-neutral-300">
              {t('home.subtitle')}
            </p>
          </div>
          <div className="flex items-center">
            <Button onClick={handleRandom} className="text-base px-6 py-3">
              🎲 {t('home.randomButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="mb-4 flex w-full flex-col gap-4 rounded-2xl bg-rgba-black-40 p-4">
        <div className="text-center">
          <p className="text-sm text-neutral-300 mb-2">💡 Chọn bộ lọc bên dưới để tìm đúng món ăn bạn muốn!</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={category === "Món chính" ? "primary" : "outline"}
            onClick={() => setCategory("Món chính")}
            className="text-xs"
          >
            🍽️ Món chính
          </Button>
          <Button
            variant={category === "Món tráng miệng" ? "primary" : "outline"}
            onClick={() => setCategory("Món tráng miệng")}
            className="text-xs"
          >
            🍰 Tráng miệng
          </Button>
          <Button
            variant={category === "Đồ uống" ? "primary" : "outline"}
            onClick={() => setCategory("Đồ uống")}
            className="text-xs"
          >
            🥤 Đồ uống
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {/* City Dropdown */}
          <select 
            value={city} 
            onChange={e => setCity(e.target.value)}
            className="flex-1 min-w-[150px] rounded-full bg-rgba-black-60 px-4 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          >
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Sort by Price Dropdown */}
          <select 
            value={sortByPrice} 
            onChange={e => setSortByPrice(e.target.value)}
            className="flex-1 min-w-[150px] rounded-full bg-rgba-black-60 px-4 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          >
            <option value="default">Sắp xếp theo</option>
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
          </select>
        </div>

        <div className="flex gap-3 justify-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('home.searchPlaceholder')}
            className="flex-1 max-w-md rounded-full bg-rgba-black-60 px-4 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          />
          <Button onClick={handleRandom} variant="primary" className="px-4 py-2">
            🎲 Quay Ngẫu Nhiên
          </Button>
        </div>
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
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-rgba-white-10 bg-rgba-black-60 transition 
                  hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20
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
                    <div className="h-full w-full bg-gradient-to-br from-rgba-accent-20 via-rgba-secondary-20 to-rgba-accent-20" />
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
              </div>
            );
          })}
        </section>
      )}

      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && <PlaceDetailsPage product={selectedProduct} />}
      </Modal>
    </div>
  );
}

