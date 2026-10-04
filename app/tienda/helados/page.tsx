'use client'

import { HeladosCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function HeladosPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <HeladosCategoryPage onAddToCart={handleAddToCart} />
        </ProductsLayout>
    )
}