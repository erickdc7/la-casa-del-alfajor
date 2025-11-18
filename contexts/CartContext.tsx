'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
    id: string
    name: string
    variant?: string
    price: number
    quantity: number
    image: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
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

    // Cargar carrito desde localStorage al montar el componente
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
        setIsHydrated(true) // Permite evitar escribir en localStorage durante la carga inicial
    }, [])

    // Guardar carrito en localStorage cuando cambian los items
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isHydrated])

    // Añadir producto al carrito (acumula cantidad si ya existe)
    const addItem = (newItem: CartItem) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id)

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }

            return [...prevItems, newItem]
        })
    }

    // Actualizar cantidad de un ítem
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id) // Si llega a 0, se elimina
            return
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    // Eliminar producto por id
    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    // Vaciar carrito
    const clearCart = () => {
        setItems([])
        localStorage.removeItem('cart')
    }

    // Cantidad total de productos (no suma cantidades)
    const itemCount = items.length

    // Total del carrito
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

// Hook para consumir el contexto
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}