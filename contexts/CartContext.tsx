'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Estructura de un producto en el carrito
interface CartItem {
    id: string
    productId: number
    varianteId: number
    name: string
    variant?: string
    price: number
    quantity: number
    image: string
}

// Lo que el resto de la app manda al agregar — sin id, CartContext lo arma solo
type NuevoCartItem = Omit<CartItem, 'id'>

// Métodos y estado expuestos por el contexto
interface CartContextType {
    items: CartItem[]
    addItem: (item: NuevoCartItem) => void
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    itemCount: number
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart)
                setItems(parsed)
            } catch (error) {
                console.error('Error loading cart:', error)
            }
        }
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isHydrated])

    // Compara por producto Y variante juntos — dos variantes del mismo
    // producto ya no se confunden entre sí
    const addItem = (newItem: NuevoCartItem) => {
        const id = `${newItem.productId}-${newItem.varianteId}`

        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id)

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }

            return [...prevItems, { ...newItem, id }]
        })
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const clearCart = () => {
        setItems([])
        localStorage.removeItem('cart')
    }

    const itemCount = items.length
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                itemCount,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}