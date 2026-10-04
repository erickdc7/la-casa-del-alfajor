'use client'

import { NovedadesPage } from '@/components/NovedadesPage'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function Novedades() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <NovedadesPage onAddToCart={handleAddToCart} />
        </ProductsLayout>
    )
}