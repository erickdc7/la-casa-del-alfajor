'use client'

import { SpecialCategoryPage } from '@/components/ProductPages'
import { toast } from 'sonner'
import { getAllProducts } from '../../lib/products'
import { useCart } from '@/contexts/CartContext'
import { ProductsLayout } from '@/app/products-layout'

export default function CoberturaBitterPage() {
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
                specialType="cobertura-bitter"
                title="Alfajores con Cobertura Bitter"
                description="Alfajores bañados en chocolate bitter de alta calidad"
                onAddToCart={handleAddToCart}
            />
        </ProductsLayout>
    )
}