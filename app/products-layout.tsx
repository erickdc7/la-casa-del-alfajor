'use client'

import { useState, ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { useCart } from '@/contexts/CartContext'

interface ProductsLayoutProps {
    children: ReactNode
}

export function ProductsLayout({ children }: ProductsLayoutProps) {
    const [cartOpen, setCartOpen] = useState(false)
    const { items, updateQuantity, removeItem, itemCount } = useCart()

    return (
        <>
            <Header
                cartItemCount={itemCount}
                onCartClick={() => setCartOpen(true)}
            />

            {children}

            <Footer />

            <CartDrawer
                open={cartOpen}
                onOpenChange={setCartOpen}
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
            />

            <ScrollToTop />
        </>
    )
}