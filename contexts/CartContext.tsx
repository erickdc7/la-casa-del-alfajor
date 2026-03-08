'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Estructura de un producto en el carrito
interface CartItem {
    id: string
    name: string
    variant?: string // Variante opcional
    price: number
    quantity: number
    image: string
}

// Métodos y estado expuestos por el contexto
interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    itemCount: number // Número de productos distintos (no suma cantidades)
    total: number     // Precio total del carrito
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
        setIsHydrated(true) // Evita sobreescribir localStorage antes de leer los datos guardados
    }, [])

    // Persistir carrito en localStorage cada vez que cambian los items
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isHydrated])

    // Si el producto ya existe, acumula la cantidad; si no, lo agrega
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

    // Si la cantidad llega a 0 o menos, elimina el producto directamente
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

    // Eliminar producto por id
    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    // Vaciar carrito y limpiar localStorage
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

// Hook para consumir el contexto; lanza error si se usa fuera del CartProvider
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
