'use client'

import { ProductDetailPage } from '@/components/ProductPages'
import { toast } from 'sonner'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

interface ProductVariant {
  id: number;
  label: string;
  units?: number;
  price: number;
}

export default function ProductPage() {
  const { addItem } = useCart()

  const handleAddToCart = (productId: number, selectedVariant?: ProductVariant, quantity: number = 1) => {
    if (!selectedVariant) {
      toast.error('Selecciona una variante');
      return;
    }

    addItem({
      productId: productId,
      varianteId: selectedVariant.id,
      name: selectedVariant.label,
      variant: selectedVariant.label,
      price: selectedVariant.price,
      quantity: quantity,
      image: ''
    })

    toast.success('Producto añadido al carrito', {
      description: `${selectedVariant.label} (x${quantity})`,
      duration: 2000
    })
  }

  return (
    <ProductsLayout>
      <ProductDetailPage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}