'use client'

import { toast } from 'sonner'
import { useCart } from '@/contexts/CartContext'
import { getAllProducts } from './products'
import { apiFetch } from './api'

interface ProductoApi {
    id: number
    nombre: string
    imagenPrincipal: string
    enStock: boolean
    variantes: { id: number; etiqueta: string; precio: number }[]
}

export function useAgregarAlCarrito() {
    const { addItem } = useCart()

    return async (productId: string) => {
        const local = getAllProducts().find(p => p.id === productId)

        if (!local) {
            toast.error('Producto no encontrado')
            return
        }

        try {
            const producto = await apiFetch<ProductoApi>(`/api/productos/${local.slug}`)
            const variante = producto.variantes[0]

            if (!producto.enStock || !variante) {
                toast.error('Producto no disponible')
                return
            }

            addItem({
                productId: producto.id,
                varianteId: variante.id,
                name: producto.nombre,
                variant: variante.etiqueta,
                price: variante.precio,
                quantity: 1,
                image: producto.imagenPrincipal,
            })

            toast.success('Producto añadido al carrito', {
                description: `${producto.nombre} - ${variante.etiqueta}`,
                duration: 2000,
            })
        } catch {
            toast.error('No se pudo añadir el producto')
        }
    }
}