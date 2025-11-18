'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { ImageWithFallback } from './fallback/ImageWithFallback'
import { getAllProducts, Product } from '../app/lib/products'

interface SearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Texto sugerido cuando no hay búsqueda activa
const searchSuggestions = [
    'alfajor de chocolate',
    'box cumpleañero',
    'postres familiares',
    'alfajor de lúcuma',
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [filteredResults, setFilteredResults] = useState<Product[]>([])

    const allProducts = getAllProducts()

    // Filtrar productos al escribir en el buscador
    useEffect(() => {
        if (query.trim()) {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description?.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredResults(filtered)
        } else {
            setFilteredResults([])
        }
    }, [query, allProducts])

    // Agrega texto sugerido al input
    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion)
    }

    // Al hacer clic en un producto -> redirigir a su página
    const handleProductClick = (product: Product) => {
        router.push(`/${product.category}/${product.slug}`)
        onOpenChange(false)
    }

    // Determina la categoría con más coincidencias para mostrar "Ver todos"
    const getMainCategory = () => {
        if (filteredResults.length === 0) return 'alfajores'

        const categoryCounts: { [key: string]: number } = {}
        filteredResults.forEach(product => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
        })

        // Ordenar por mayor cantidad
        const mainCategory = Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)[0][0]

        return mainCategory
    }

    // Botón "Ver todos los resultados"
    const handleViewAllResults = () => {
        const category = getMainCategory()
        router.push(`/${category}`)
        onOpenChange(false)
    }

    // Enter -> abrir el primer resultado
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredResults.length > 0) {
            handleProductClick(filteredResults[0])
        }
    }

    // Resalta el texto buscado dentro del nombre del producto
    const highlightText = (text: string, query: string) => {
        if (!query) return text

        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <mark key={i} className="bg-yellow-200">{part}</mark>
                : part
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
                <DialogTitle className="sr-only">
                    Búsqueda de productos
                </DialogTitle>

                <div className="p-8 pb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--gray-400)' }} />
                        <Input
                            autoFocus
                            placeholder="Buscar alfajores, postres, regalos..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-12 pr-12 h-14 text-base border-2 border-(--gray-200) focus:border-(--brand-primary)"
                        />
                        {/* Botón para limpiar búsqueda */}
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-(--gray-100) rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" style={{ color: 'var(--gray-500)' }} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Resultados o sugerencias */}
                <div className="max-h-[500px] overflow-y-auto">
                    {/* Mostrar sugerencias si no se escribió nada */}
                    {!query ? (
                        <div className="px-8 pb-6">
                            <h3 className="text-xs uppercase mb-3" style={{ fontWeight: 600, color: 'var(--gray-500)' }}>
                                Sugerencias
                            </h3>
                            <div className="space-y-1">
                                {searchSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-(--cream-100) transition-colors text-left cursor-pointer"
                                    >
                                        <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--gray-400)' }} />
                                        <span className="text-sm" style={{ color: 'var(--gray-700)' }}>
                                            {suggestion}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="px-6 pb-6">
                            {/* Mostrar productos encontrados */}
                            {filteredResults.length > 0 ? (
                                <>
                                    <h3 className="text-xs uppercase mb-3" style={{ fontWeight: 600, color: 'var(--gray-500)' }}>
                                        Productos ({filteredResults.length})
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        {/* Top 4 resultados */}
                                        {filteredResults.slice(0, 4).map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductClick(product)}
                                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-(--cream-100) transition-colors text-left cursor-pointer"
                                            >
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-(--cream-100) shrink-0">
                                                    <ImageWithFallback
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm line-clamp-1" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                                        {highlightText(product.name, query)}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm" style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                                                            S/ {product.price.toFixed(2)}
                                                        </p>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-(--cream-100)" style={{ color: 'var(--gray-600)' }}>
                                                            {product.category === 'alfajores' ? 'Alfajores' :
                                                                product.category === 'postres' ? 'Postres' :
                                                                    product.category === 'regalos' ? 'Regalos' :
                                                                        product.category === 'helados' ? 'Helados' :
                                                                            product.category === 'kits-diy' ? 'Kits DIY' :
                                                                                'Tienda'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Ver todos */}
                                    <button
                                        onClick={handleViewAllResults}
                                        className="w-full text-sm py-3 px-4 rounded-lg border-2 border-(--brand-primary) hover:bg-(--brand-primary) transition-colors cursor-pointer"
                                        style={{ color: 'var(--brand-primary)', fontWeight: 600 }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'white'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--brand-primary)'
                                        }}
                                    >
                                        Ver todos los resultados ({filteredResults.length}) →
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-(--cream-100) flex items-center justify-center">
                                        <Search className="w-8 h-8" style={{ color: 'var(--gray-400)' }} />
                                    </div>
                                    <h3 className="mb-2" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
                                        No encontramos resultados
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                                        No encontramos resultados para &quot;{query}&quot;
                                    </p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>
                                        Intenta con otra búsqueda
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}