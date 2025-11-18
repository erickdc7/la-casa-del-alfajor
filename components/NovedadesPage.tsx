'use client'

import { useRouter } from 'next/navigation'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Calendar, ArrowRight, Star, Sparkles, Gem } from 'lucide-react'
import { ImageWithFallback } from '../components/fallback/ImageWithFallback'
import { getAllProducts } from '../app/lib/products'

interface NovedadesPageProps {
    onAddToCart: (productId: string) => void
}

export function NovedadesPage({ onAddToCart }: NovedadesPageProps) {
    const router = useRouter()
    const allProducts = getAllProducts()

    // Obtener productos marcados como nuevos (badge)
    const newProducts = allProducts
        .filter(p => p.badge === 'NUEVO' || p.badgeType === 'new')
        .slice(0, 3)
        .map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image,
            badge: p.badge || 'NUEVO',
            date: 'Lanzado en Enero 2025',
            category: p.category
        }))

    // Fallback: si hay menos de 3 nuevos, tomar los últimos productos agregados
    const displayProducts = newProducts.length >= 3
        ? newProducts
        : allProducts
            .sort((a, b) => parseInt(b.id) - parseInt(a.id))
            .slice(0, 3)
            .map(p => ({
                id: p.id,
                slug: p.slug,
                name: p.name,
                description: p.description,
                price: p.price,
                image: p.image,
                badge: 'NUEVO',
                date: 'Disponible ahora',
                category: p.category
            }))

    const promotions = [
        {
            id: 'promo-1',
            productId: allProducts.find(p => p.name.toLowerCase().includes('regalo'))?.id || '100',
            productSlug: allProducts.find(p => p.name.toLowerCase().includes('regalo'))?.slug || 'caja-regalo-x15',
            title: 'Caja de Regalo x15',
            description: 'Caja especial con 15 alfajores surtidos, perfecta para regalar en cualquier ocasión',
            discount: '15% OFF',
            validUntil: '31 de Enero',
            image: '../images/regalos/caja-regalo-x15.jpg',
            color: 'from-red-500 to-orange-500',
            category: 'regalos'
        },
        {
            id: 'promo-2',
            productId: allProducts.find(p => p.specialType === 'alfajoreable')?.id || '1',
            productSlug: 'alfajoreables',
            title: 'Alfajoreables',
            description: 'Nuestros alfajores más populares en una caja familiar. Perfectos para compartir',
            discount: '20% OFF',
            validUntil: '31 de Enero',
            image: '../images/alfajores/alfajoreable-turron.jpg',
            color: 'from-green-500 to-emerald-500',
            category: 'alfajores'
        },
        {
            id: 'promo-3',
            productId: allProducts.find(p => p.specialType === 'tematico')?.id || '2',
            productSlug: 'tematicos',
            title: 'Cajas Temáticas',
            description: 'Cajas personalizadas para cumpleaños, aniversarios y celebraciones especiales',
            discount: '10% OFF',
            validUntil: '28 de Febrero',
            image: '../images/alfajores/alfajor-tematico-mandala.jpg',
            color: 'from-pink-500 to-rose-500',
            category: 'alfajores'
        }
    ]

    const seasonalProducts = [
        {
            id: 'season-1',
            slug: 'edicion-halloween',
            name: 'Edición Halloween',
            season: 'Octubre',
            description: 'Alfajores temáticos con decoraciones de Halloween. Disponible todo octubre',
            image: 'https://images.unsplash.com/photo-1603320284194-db4276c54f0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'regalos'
        },
        {
            id: 'season-2',
            slug: 'edicion-navidad',
            name: 'Edición Navidad',
            season: 'Diciembre',
            description: 'Panetones artesanales y alfajores navideños para compartir en familia',
            image: 'https://images.unsplash.com/photo-1640998011471-5d79071a2ae3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'regalos'
        },
        {
            id: 'season-3',
            slug: 'bodas',
            name: 'Edición Bodas',
            season: 'Todo el año',
            description: 'Cajas personalizadas para tu boda con diseños elegantes y sabores únicos',
            image: 'https://images.unsplash.com/photo-1557803056-4acbacad87d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'regalos'
        }
    ]

    return (
        <main className="min-h-screen bg-white">
            {/* HERO */}
            <section className="relative bg-linear-to-br from-[#F0FDF4] via-white to-[#FEF3C7] py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-[#008349]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-yellow-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-linear-to-br from-[#008349]/3 to-yellow-500/3 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
                        <div className="inline-flex items-center gap-2 sm:gap-3 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl border border-[#008349]/10">
                            <Sparkles className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-yellow-500" />
                            <span className="text-xs sm:text-sm" style={{ color: '#008349', fontWeight: 600 }}>
                                ¡Nuevos Sabores y Ofertas Especiales!
                            </span>
                            <Sparkles className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-yellow-500" />
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl   leading-tight"
                            style={{
                                fontWeight: 800,
                                color: '#1a1a1a'
                            }}
                        >
                            Descubre Nuestras{' '}
                            <br className="hidden sm:block" />
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-linear-to-r from-[#008349] to-[#10b981] bg-clip-text text-transparent">
                                    Novedades
                                </span>
                                <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 lg:h-4 bg-yellow-500/20 z-0" />
                            </span>
                            {' '}y{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-linear-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                                    Promociones
                                </span>
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl  text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                            Explora nuestros{' '}
                            <span style={{ color: '#008349', fontWeight: 600 }}>últimos lanzamientos</span>,{' '}
                            ediciones limitadas y las{' '}
                            <span style={{ color: '#008349', fontWeight: 600 }}>mejores ofertas</span>{' '}
                            del mes
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8">
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-linear-to-br from-[#008349] to-[#10b981] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                    <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                </div>
                                <h3 className="mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    Nuevos Sabores
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Innovaciones que te sorprenderán
                                </p>
                            </div>

                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                    <Gem className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                </div>
                                <h3 className="mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    Ediciones Limitadas
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Productos exclusivos por tiempo limitado
                                </p>
                            </div>

                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-linear-to-br from-red-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                    <Star className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                </div>
                                <h3 className="mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    Ofertas Especiales
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Descuentos que no puedes perderte
                                </p>
                            </div>
                        </div>

                        <div className="pt-2 sm:pt-4">
                            <Button
                                onClick={() => router.push('/alfajores')}
                                className="bg-[#008349] hover:bg-[#006838] text-white px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                                style={{ fontWeight: 600 }}
                            >
                                Ver Todos los Productos
                                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* NUEVOS PRODUCTOS */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: 'var(--gray-900)'
                            }}
                        >
                            <span style={{ color: 'var(--brand-primary)' }}>Nuevos</span> Productos
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Los últimos lanzamientos que no puedes perderte
                        </p>
                    </div>

                    <div className="space-y-8 sm:space-y-12">
                        {displayProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-hover group">
                                        <ImageWithFallback
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-64 sm:h-80 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <Badge className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-(--brand-primary) text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                </div>

                                <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                                        {product.date}
                                    </div>

                                    <h3
                                        className="text-2xl sm:text-3xl lg:text-4xl"
                                        style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            color: 'var(--gray-900)'
                                        }}
                                    >
                                        {product.name}
                                    </h3>

                                    <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-700)', lineHeight: 1.7 }}>
                                        {product.description}
                                    </p>

                                    <div className="flex items-end gap-4">
                                        <div>
                                            <div className="text-xs sm:text-sm mb-1" style={{ color: 'var(--gray-600)' }}>Desde</div>
                                            <div className="text-2xl sm:text-3xl lg:text-4xl" style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
                                                S/ {product.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                                        <Button
                                            onClick={() => {
                                                onAddToCart(product.id)
                                            }}
                                            size="lg"
                                            className="bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg rounded-xl cursor-pointer border-2 border-(--brand-primary) w-full sm:w-auto"
                                        >
                                            Añadir al Carrito
                                        </Button>

                                        <Button
                                            onClick={() => router.push(`/${product.category}/${product.slug}`)}
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-(--brand-primary) text-(--brand-primary) hover:bg-(--brand-primary) hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg rounded-xl cursor-pointer w-full sm:w-auto"
                                        >
                                            Ver Detalles
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROMOCIONES */}
            <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-white to-(--mint-50)">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: 'var(--gray-900)'
                            }}
                        >
                            <span style={{ color: 'var(--brand-primary)' }}>Promociones</span> Activas
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Aprovecha nuestras ofertas especiales
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {promotions.map((promo) => (
                            <Card key={promo.id} className="bg-white border-0 shadow-card hover:shadow-hover transition-all overflow-hidden group">
                                <div className="relative h-40 sm:h-48 overflow-hidden">
                                    <ImageWithFallback
                                        src={promo.image}
                                        alt={promo.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-linear-to-r ${promo.color} text-white text-xs sm:text-sm`} style={{ fontWeight: 700 }}>
                                        {promo.discount}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                    <h3 className="text-lg sm:text-xl" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                                        {promo.title}
                                    </h3>

                                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-700)', lineHeight: 1.6 }}>
                                        {promo.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                                        Válido hasta {promo.validUntil}
                                    </div>

                                    <Button
                                        onClick={() => {
                                            if (promo.productSlug === 'alfajoreables' || promo.productSlug === 'tematicos') {
                                                router.push(`/alfajores/${promo.productSlug}`)
                                            } else {
                                                router.push(`/${promo.category}/${promo.productSlug}`)
                                            }
                                        }}
                                        className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white rounded-lg cursor-pointer text-sm sm:text-base py-2.5 sm:py-3"
                                    >
                                        Aprovechar Oferta
                                        <ArrowRight className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTOS DE TEMPORADA */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: 'var(--gray-900)'
                            }}
                        >
                            Productos de <span style={{ color: 'var(--brand-primary)' }}>Temporada</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Sabores especiales para cada ocasión
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {seasonalProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="bg-white border-0 shadow-card hover:shadow-hover transition-all overflow-hidden group cursor-pointer"
                                onClick={() => router.push(`/${product.category}/${product.slug}`)}
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <ImageWithFallback
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                        <Badge className="bg-white/20 text-white backdrop-blur-sm mb-2 sm:mb-3 text-xs sm:text-sm">
                                            {product.season}
                                        </Badge>
                                        <h3 className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                                            {product.name}
                                        </h3>
                                        <p className="text-white/90 text-xs sm:text-sm">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}