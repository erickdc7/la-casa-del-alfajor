'use client'

import { Suspense } from 'react'
import { CategoryPage } from '@/components/ProductPages'
import { ProductsLayout } from '@/app/products-layout'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'

function AlfajoresContent() {
  const handleAddToCart = useAgregarAlCarrito()

  return <CategoryPage category="Alfajores" onAddToCart={handleAddToCart} />
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-(--cream-50) py-8 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--brand-primary) mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Cargando alfajores...</p>
      </div>
    </div>
  )
}

export default function AlfajoresPage() {
  return (
    <ProductsLayout>
      <Suspense fallback={<LoadingFallback />}>
        <AlfajoresContent />
      </Suspense>
    </ProductsLayout>
  )
}