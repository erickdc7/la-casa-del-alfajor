'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function TematicosPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="tematico"
                title="Alfajores Temáticos"
                description="Alfajores con diseños temáticos para celebraciones especiales"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}