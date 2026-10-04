'use client'

import { RegalosCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function RegalosPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <RegalosCategoryPage onAddToCart={handleAddToCart} />
        </ProductsLayout>
    )
}