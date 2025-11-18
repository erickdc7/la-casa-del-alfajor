'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { toast } from 'sonner'
import { getAllProducts } from '../../lib/products'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

export default function DisenadosPage() {
    const { addItem } = useCart()

    const handleAddToCart = (productId: string) => {
        const product = getAllProducts().find(p => p.id === productId)

        if (!product) {
            toast.error('Producto no encontrado')
            return
        }

        addItem({
            id: product.id,
            name: product.name,
            variant: product.variants?.[0]?.label,
            price: product.price,
            quantity: 1,
            image: product.image
        })

        toast.success('Producto añadido al carrito', {
            description: product.name,
            duration: 2000
        })
    }

    return (
        <ProductsLayout>
            <SpecialCategoryPage
                specialType="disenado"
                title="Alfajores Diseñados"
                description="Alfajores con diseños únicos y personalizados para cada ocasión"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}