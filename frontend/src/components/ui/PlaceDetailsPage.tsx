import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock/products'; // Giả sử mock data
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/types/product';

interface PageProps {
  params: Promise<{ id: string }>; // params là Promise
}

export default async function PlaceDetailsPage({ params }: PageProps) {
    const { id } = await params;
    console.log('PlaceDetailsPage params id:', id);
    const product = MOCK_PRODUCTS.find((p: Product) => p.id === id);

  if (!product) return notFound();

  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(product.address)}`;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">{product.address}</p>
      <Button asChild>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </Button>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b pb-4">
                <p className="font-medium">Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </div>
  );
}