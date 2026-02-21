'use client';

import { useState, useEffect } from 'react';
import type { Product, Review } from '@/lib/types/product';
import { Badge } from './Badge';
import { RatingStars } from './RatingStars';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';
import { Modal } from './Modal';
import { LoginModalContent } from './LoginModal';
import { ReviewForm } from './ReviewForm';


interface PlaceDetailsPageProps {
  product: Product;
}

const openInMapsUrl = (address?: string | null) =>
  address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`
    : '#';

export function PlaceDetailsPage({ product: initialProduct }: PlaceDetailsPageProps) {
  const { t, getLocalizedText } = useLocale();
  const { user } = useAuth();
  const [product, setProduct] = useState(initialProduct);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // If user logs in while the modal is prompting them, close it.
    if (user && isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }
  }, [user, isLoginModalOpen]);

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!user) {
      alert("Bạn phải đăng nhập để gửi đánh giá.");
      return;
    }
    const newReview: Review = {
      id: `r-${Date.now()}`,
      userId: user.id,
      userName: user.name || 'Anonymous',
      userAvatar: `https://i.pravatar.cc/150?u=${user.id}`,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    // In a real app, you'd send this to an API.
    // For now, we just update the local state to see the change immediately.
    setProduct(prevProduct => ({
        ...prevProduct,
        reviews: [newReview, ...(prevProduct.reviews || [])],
        reviewCount: (prevProduct.reviewCount || 0) + 1
    }));
    console.log("New review submitted:", newReview);
  };


  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative h-48 flex-1 overflow-hidden rounded-2xl">
            {product.image ? (
              <img
                src={product.image}
                alt={getLocalizedText(product, 'restaurantName') || getLocalizedText(product, 'name')}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-rgba-emerald-20 via-rgba-purple-10 to-rgba-sky-20" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">
              {getLocalizedText(product, 'restaurantName') || getLocalizedText(product, 'name')}
            </h1>
            <RatingStars rating={product.rating ?? undefined} />
            <div className="flex flex-wrap gap-2">
              {product.category && <Badge>{getLocalizedText(product, 'category')}</Badge>}
              {product.cuisineType && <Badge>{getLocalizedText(product, 'cuisineType')}</Badge>}
            </div>
            <p className="text-sm text-neutral-300">
              {getLocalizedText(product, 'restaurantAddress') || 'Địa chỉ đang cập nhật'}
            </p>
            {product.preparationTime && (
              <p className="text-xs text-neutral-400">
                Thời gian chuẩn bị: {product.preparationTime} phút
              </p>
            )}
            <a
              href={openInMapsUrl(getLocalizedText(product, 'restaurantAddress'))}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm text-emerald-400 hover:text-emerald-300"
            >
              {t('details.viewOnMaps')}
            </a>
          </div>
        </div>

        {product.description && (
          <section className="rounded-2xl bg-rgba-black-40 p-4 text-sm text-neutral-200">
            {getLocalizedText(product, 'description')}
          </section>
        )}

        {/* --- NEW REVIEW SECTION --- */}
        <section className="flex flex-col gap-4 rounded-2xl bg-rgba-black-40 p-4">
          {user ? (
            <ReviewForm onSubmit={handleReviewSubmit} />
          ) : (
            <div className="text-center">
              <h3 className="font-semibold">Bạn đã đến quán này chưa?</h3>
              <p className="text-sm text-neutral-400 mb-3">
                Đăng nhập để chia sẻ trải nghiệm của bạn với mọi người.
              </p>
              <Button variant="primary" onClick={() => setIsLoginModalOpen(true)}>
                Đăng nhập để đánh giá
              </Button>
            </div>
          )}
        </section>

        {product.tags && product.tags.length > 0 && (
          <section className="rounded-2xl bg-rgba-black-40 p-4 text-sm text-neutral-200">
            <div className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
              {t('keywords')}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="flex flex-col gap-4 rounded-2xl bg-rgba-black-40 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{t('details.reviews')}</h2>
            <div className="text-sm text-neutral-400">
              {product.reviewCount} đánh giá
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-2 rounded-xl border border-rgba-white-5 bg-rgba-white-5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-700">
                      {review.userAvatar ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-rgba-emerald-20 text-xs font-bold text-emerald-400">
                          {review.userName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {review.userName}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <RatingStars rating={review.rating} />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-200">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="mt-1 flex gap-2 overflow-x-auto pb-2">
                      {review.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-rgba-white-10"
                        >
                          <img
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-neutral-400">
              {t('details.noReviews')}
            </div>
          )}
        </section>
      </div>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginModalContent onClose={() => setIsLoginModalOpen(false)} />
      </Modal>
    </>
  );
}
