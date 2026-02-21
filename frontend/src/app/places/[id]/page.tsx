'use client';

import { notFound, useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '../../../lib/mock/products';
import { PlaceDetailsPage } from '../../../components/ui/PlaceDetailsPage';

export default function PlacePage() {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return <PlaceDetailsPage product={product} />;
}

