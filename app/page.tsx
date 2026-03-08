'use client'

import { HomePage } from '@/components/HomePage'
import { toast } from 'sonner'
import { getAllProducts } from './lib/products'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

export default function Home() {
  const { addItem } = useCart()

  // Busca el producto por id y lo agrega al carrito con cantidad 1
  const handleAddToCart = (productId: string) => {
    const product = getAllProducts().find(p => p.id === productId)

    if (!product) {
      toast.error('Producto no encontrado')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      variant: product.variants?.[0]?.label, // Toma la primera variante disponible si existe
      price: product.price,
      quantity: 1,
      image: product.image
    })

    toast.success('Producto añadido al carrito', {
      description: product.name,
      duration: 2000
    })
  }

  return (
    // ProductsLayout provee el layout compartido (navbar, footer, etc.)
    <ProductsLayout>
      <HomePage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}