'use client'

import { Suspense } from 'react'
import { CategoryPage } from '@/components/ProductPages'
import { ProductsLayout } from '@/app/products-layout'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

function AlfajoresContent() {
  const { addItem } = useCart()

  const handleAddToCart = (productId: string) => {
    addItem({
      id: productId,
      name: 'Producto',
      price: 10,
      quantity: 1,
      image: '/placeholder.jpg'
    })
    toast.success('Producto añadido al carrito')
  }

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