'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function AlfajoreablesPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="alfajoreable"
                title="Alfajores Alfajoreables"
                description="Alfajores con diseños personalizables y temáticas especiales"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}