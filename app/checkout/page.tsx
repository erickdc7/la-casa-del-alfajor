'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckoutPage } from '@/components/CheckoutPage'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

export default function Checkout() {
    const router = useRouter()
    const { items, clearCart } = useCart()
    const [pedidoCreado, setPedidoCreado] = useState(false)

    useEffect(() => {
        if (items.length === 0 && !pedidoCreado) {
            router.push('/')
        }
    }, [items, pedidoCreado, router])

    const handleBack = () => {
        router.back()
    }

    const handleOrderCreated = () => {
        setPedidoCreado(true)
        clearCart()
    }

    if (items.length === 0 && !pedidoCreado) {
        return null
    }

    return (
        <ProductsLayout>
            <CheckoutPage
                cartItems={items}
                onBack={handleBack}
                onOrderCreated={handleOrderCreated}
            />
        </ProductsLayout>
    )
}