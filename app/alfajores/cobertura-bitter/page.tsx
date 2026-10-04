'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function CoberturaBitterPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="cobertura-bitter"
                title="Alfajores con Cobertura Bitter"
                description="Alfajores bañados en chocolate bitter de alta calidad"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}