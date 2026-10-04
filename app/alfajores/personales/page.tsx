'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function PersonalesPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="personal"
                title="Alfajores Personales"
                description="Alfajores individuales perfectos para disfrutar en cualquier momento"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}