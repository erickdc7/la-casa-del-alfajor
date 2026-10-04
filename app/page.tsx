'use client'

import { HomePage } from '@/components/HomePage'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function Home() {
  // Busca el producto real en el backend y agrega su primera variante al carrito
  const handleAddToCart = useAgregarAlCarrito()

  return (
    // ProductsLayout provee el layout compartido (navbar, footer, etc.)
    <ProductsLayout>
      <HomePage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}