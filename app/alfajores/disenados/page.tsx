'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function DisenadosPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="disenado"
                title="Alfajores Diseñados"
                description="Alfajores con diseños únicos y personalizados para cada ocasión"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}