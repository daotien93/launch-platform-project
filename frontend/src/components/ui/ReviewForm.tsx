'use client';

import { useState } from 'react';
import { Button } from './Button';
import { RatingStars } from './RatingStars';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  isSubmitting?: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting = false }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
      // Optionally reset form
      setRating(0);
      setComment('');
    } else {
      alert('Vui lòng cho điểm và viết bình luận của bạn.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Viết đánh giá của bạn</h3>
      <div>
        <span className="text-sm text-neutral-300">Bạn chấm mấy sao?</span>
        <div className="flex items-center gap-1 cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} onClick={() => handleStarClick(star)}>
              <RatingStars rating={rating} starIndex={star} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-neutral-300 mb-1">
          Bình luận của bạn
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md bg-rgba-black-60 px-3 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          placeholder="Chia sẻ cảm nhận của bạn về quán..."
          required
        />
      </div>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
      </Button>
    </form>
  );
}
