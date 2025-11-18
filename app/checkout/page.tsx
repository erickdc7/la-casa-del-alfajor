'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CheckoutPage } from '@/components/CheckoutPage'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

export default function Checkout() {
    const router = useRouter()
    const { items } = useCart()

    useEffect(() => {
        if (items.length === 0) {
            router.push('/')
        }
    }, [items, router])

    const handleBack = () => {
        router.back()
    }

    if (items.length === 0) {
        return null
    }

    return (
        <ProductsLayout>
            <CheckoutPage
                cartItems={items}
                onBack={handleBack}
            />
        </ProductsLayout>
    )
}