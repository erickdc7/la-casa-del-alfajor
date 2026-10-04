'use client'

import { KitsDIYCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function KitsDIYPage() {
  const handleAddToCart = useAgregarAlCarrito()

  return (
    <ProductsLayout>
      <KitsDIYCategoryPage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}