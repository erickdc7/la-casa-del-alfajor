'use client'

import { TiendaCategoryPage } from '@/components/ProductPages'
import { useAgregarAlCarrito } from '@/app/lib/useAgregarAlCarrito'
import { ProductsLayout } from '@/app/products-layout'

export default function TiendaPage() {
    const handleAddToCart = useAgregarAlCarrito()

    return (
        <ProductsLayout>
            <TiendaCategoryPage onAddToCart={handleAddToCart} />
        </ProductsLayout>
    )
}