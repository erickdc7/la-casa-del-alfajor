'use client'

import { useParams, notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts } from '../../lib/products'
import { ProductDetailPage } from '@/components/ProductPages'
import { toast } from 'sonner'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

interface ProductVariant {
  id: string;
  label: string;
  units?: number;
  price: number;
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const product = getProductBySlug(slug)

  if (!product || product.category !== 'alfajores') {
    notFound()
  }

  const { addItem } = useCart()

  const handleAddToCart = (productId: string, selectedVariant?: ProductVariant, quantity: number = 1) => {
    const allProducts = getAllProducts();
    const targetProduct = allProducts.find(p => p.id === productId);

    if (!targetProduct) {
      toast.error('Producto no encontrado');
      return;
    }

    const priceToUse = selectedVariant?.price || targetProduct.price;
    const variantLabel = selectedVariant?.label || targetProduct.variants?.[0]?.label;

    addItem({
      id: `${targetProduct.id}-${selectedVariant?.id || 'default'}`,
      name: targetProduct.name,
      variant: variantLabel,
      price: priceToUse,
      quantity: quantity,
      image: targetProduct.image
    })

    toast.success('Producto añadido al carrito', {
      description: `${targetProduct.name} - ${variantLabel} (x${quantity})`,
      duration: 2000
    })
  }

  return (
    <ProductsLayout>
      <ProductDetailPage onAddToCart={handleAddToCart} />
    </ProductsLayout>
  )
}