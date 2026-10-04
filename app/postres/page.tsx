'use client'

import { PostresCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function PostresPage() {
  const handleAddToCart = useAgregarAlCarrito()

  return (
    <ProductsLayout>
      <PostresCategoryPage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}