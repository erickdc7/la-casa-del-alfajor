import { useState } from 'react';
import { ChevronRight, Star, Send, Package, Tag, Clock, Award, Heart, ShoppingBag, ArrowRight, Instagram, Check, TrendingUp, Users, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { useRouter } from 'next/navigation';
import { Marquee } from './ui/marquee';
import Image from 'next/image';
import { getAllProducts } from './../app/lib/products';

interface HomePageProps {
    onAddToCart: (productId: string) => void;
}

const categories = [
    { id: '1', name: 'Alfajores', image: 'https://images.unsplash.com/photo-1582170090097-b251ddbbf7f3?w=800', count: '25+ sabores', route: '/alfajores' },
    { id: '2', name: 'Postres', image: 'https://images.unsplash.com/photo-1731964791422-99c9e06cc204?w=800', count: '15+ opciones', route: '/postres' },
    { id: '3', name: 'Regalos', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800', count: 'Personalizables', route: '/regalos' },
    { id: '4', name: 'Salados', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800', count: 'Recién horneados', route: '/tienda' },
];

const testimonials = [
    {
        id: '1',
        name: 'María López',
        location: 'Miraflores',
        rating: 5,
        comment: 'Los mejores alfajores que he probado. Llegaron perfectos y el sabor es increíble. Los recomiendo 100%.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    {
        id: '2',
        name: 'Carlos Ruiz',
        location: 'San Isidro',
        rating: 5,
        comment: 'Excelente calidad y atención. Pedí el box cumpleañero y todos quedaron encantados.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    {
        id: '3',
        name: 'Ana Torres',
        location: 'Surco',
        rating: 5,
        comment: 'El cheesecake de alfajor es espectacular. Definitivamente volveré a pedir.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
    },
    {
        id: '4',
        name: 'Luis Mendoza',
        location: 'La Molina',
        rating: 5,
        comment: 'Perfectos para regalar. La presentación es hermosa y el sabor inigualable.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
    },
    {
        id: '5',
        name: 'Patricia Silva',
        location: 'San Borja',
        rating: 5,
        comment: 'Pedí para mi cumpleaños y fue un éxito total. Todos me preguntaron dónde los compré.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
    },
    {
        id: '6',
        name: 'Roberto Castro',
        location: 'Barranco',
        rating: 5,
        comment: 'La atención al cliente es excepcional. Llegaron antes de lo esperado.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'
    },
];

const benefits = [
    {
        icon: Package,
        title: 'Ingredientes Naturales',
        description: 'Sin conservantes artificiales, 100% artesanal'
    },
    {
        icon: Clock,
        title: 'Entrega Rápida',
        description: 'En 24-48hrs o recojo en tienda'
    },
    {
        icon: Award,
        title: '+10 Años',
        description: 'Miles de clientes satisfechos'
    },
    {
        icon: Heart,
        title: 'Perfecto para Regalar',
        description: 'Empaque premium y personalización'
    },
    {
        icon: ShoppingBag,
        title: 'Pago Seguro',
        description: 'Múltiples métodos de pago'
    },
    {
        icon: Star,
        title: 'Calidad Premium',
        description: 'Los mejores ingredientes seleccionados'
    },
];

const clientImages = [
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200", // chica
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200", // chico
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", // mujer
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200", // hombre
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200", // hombre
];

const instagramImages = [
    "https://images.unsplash.com/photo-1552552492-9c335658343d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1604953781841-004f1848ed3d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1603320284434-d60c3edbb856?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1641281943234-220d40e6dbd6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1665959183141-91bc0df4941d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1656963911697-ba4a8dc0fb30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1574767787687-bf270ed618c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1750277113086-0bb2cefa9667?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600"
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

export function HomePage({ onAddToCart }: HomePageProps) {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const allProducts = getAllProducts();

    // Filtra los productos destacados: más vendidos o con rating alto
    const featuredProducts = allProducts
        .filter(p => p.badge === 'MÁS VENDIDO' || p.rating >= 4.8)
        .slice(0, 4);

    // Si hay suficientes destacados, los usa, si no, muestra alfajores por defecto
    const products = featuredProducts.length >= 4
        ? featuredProducts
        : allProducts.filter(p => p.category === 'alfajores').slice(0, 4);

    // Maneja el envío del formulario del newsletter
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter:', email);
        setEmail('');
    };

    return (
        <main className="min-h-screen">
            {/* HERO */}
            <section className="relative bg-linear-to-br from-[#F0FDF4] via-white to-[#ECFDF5] py-12 sm:py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#008349]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#10b981]/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-linear-to-br from-[#008349]/3 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8 lg:pr-8">
                            <div className="flex justify-center lg:justify-start">
                                <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 shadow-lg border border-[#008349]/10">
                                    <div className="w-2 h-2 bg-[#008349] rounded-full animate-pulse" />
                                    <span className="text-xs sm:text-sm" style={{ color: '#008349', fontWeight: 600 }}>
                                        Envío gratis desde S/50 en Lima
                                    </span>
                                </div>
                            </div>

                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  leading-tight lg:text-left text-center"
                                style={{
                                    fontWeight: 800,
                                    color: '#1a1a1a'
                                }}
                            >
                                Los{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10" style={{ color: '#008349' }}>
                                        Mejores
                                    </span>
                                    <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-[#008349]/20 z-0" />
                                </span>
                                {' '}Alfajores{' '}
                                <br className="hidden sm:block" />
                                Artesanales de Lima
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl  text-gray-600 leading-relaxed lg:text-left text-center">
                                Elaborados con ingredientes 100% naturales y recetas tradicionales.
                                <span style={{ color: '#008349', fontWeight: 600 }}> Sabor auténtico</span> que conquista desde 1987.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4 py-2">
                                <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 shadow-sm border border-gray-100">
                                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs sm:text-sm" style={{ fontWeight: 600, color: '#1a1a1a' }}>4.9/5</span>
                                    <span className="text-xs sm:text-sm text-gray-500">(500+)</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 shadow-sm border border-gray-100">
                                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#008349]" />
                                    <span className="text-xs sm:text-sm" style={{ fontWeight: 600, color: '#1a1a1a' }}>15K+</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Clientes</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start ">
                                <Button
                                    onClick={() => router.push('/alfajores')}
                                    size="lg"
                                    className="bg-[#008349] hover:bg-[#006838] text-white px-6 sm:px-12 py-5 sm:py-7 text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl shadow-[#008349]/30 hover:shadow-[#008349]/40 transition-all duration-200 cursor-pointer border-2 border-[#008349] w-full sm:w-auto"
                                    style={{ fontWeight: 600 }}
                                >
                                    <ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6" />
                                    Ver Productos
                                </Button>
                                <Button
                                    onClick={() => router.push('/alfajores?mix=all')}
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-[#008349] text-[#008349] hover:bg-[#008349] hover:text-white px-6 sm:px-12 py-5 sm:py-7 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer w-full sm:w-auto"
                                    style={{ fontWeight: 600 }}
                                >
                                    <Gift className="w-5 sm:w-6 h-5 sm:h-6" />
                                    Arma tu Caja
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
                                <div className="flex -space-x-2 sm:-space-x-3">
                                    {clientImages.map((src, i) => (
                                        <div
                                            key={i}
                                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                                        >
                                            <ImageWithFallback
                                                src={src}
                                                alt={`Cliente ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-0.5 sm:gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>+500 reseñas</span> verificadas
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-linear-to-br from-[#008349]/20 to-[#10b981]/20 rounded-3xl blur-2xl" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <ImageWithFallback
                                        src="https://images.unsplash.com/photo-1665959183141-91bc0df4941d?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Alfajores Artesanales Premium"
                                        className="w-full h-[550px] object-cover"
                                    />
                                </div>

                                <div className="absolute top-8 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-linear-to-br from-[#008349] to-[#10b981] rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#1a1a1a' }}>100% Natural</div>
                                            <div className="text-sm text-gray-600">Sin conservantes</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 -right-6 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-linear-to-br from-[#008349] to-[#10b981] rounded-xl flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#1a1a1a' }}>24-48 horas</div>
                                            <div className="text-sm text-gray-600">Entrega rápida</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-4 right-8 bg-[#008349] text-white rounded-full px-6 py-3 shadow-xl flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span style={{ fontWeight: 600 }}>Tendencia #1</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <ImageWithFallback
                                        src="https://images.unsplash.com/photo-1658283292004-7f0bfd7fe537?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Variedad de alfajores"
                                        className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <ImageWithFallback
                                        src="https://images.unsplash.com/photo-1717198100629-b1a59284ced9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Caja de regalo premium"
                                        className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2" style={{ fontWeight: 800, color: '#008349' }}>
                                30+
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-600">Años de Experiencia</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2" style={{ fontWeight: 800, color: '#008349' }}>
                                25+
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-600">Sabores Únicos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2" style={{ fontWeight: 800, color: '#008349' }}>
                                50K+
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-600">Clientes Felices</div>
                        </div>
                        <div className="text-center">
                            <div
                                className="flex items-center justify-center gap-1 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2 font-extrabold"
                                style={{ color: '#008349' }}
                            >
                                4.9
                                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-[#008349] fill-[#008349]" />
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-600">Rating Promedio</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIAS */}
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
                            Descubre Nuestros <span style={{ color: 'var(--brand-primary)' }}>Sabores</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Endulza cada momento con algo especial
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => router.push(category.route)}
                                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer text-left"
                                style={{ aspectRatio: '1/1' }}
                            >
                                <ImageWithFallback
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6">
                                    <h3
                                        className="text-lg sm:text-xl lg:text-2xl text-white mb-0.5 sm:mb-1"
                                        style={{ fontWeight: 700 }}
                                    >
                                        {category.name}
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">{category.count}</p>
                                    <div className="flex items-center gap-1 sm:gap-2 text-white">
                                        <span className="text-xs sm:text-sm" style={{ fontWeight: 600 }}>Ver más</span>
                                        <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTOS */}
            <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-white to-[#F0FDF4]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2"
                                style={{
                                    fontWeight: 700,
                                    color: '#1a1a1a'
                                }}
                            >
                                Nuestros <span style={{ color: 'var(--brand-primary)' }}>Favoritos</span> de Siempre
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                                Sabores que encantan a todos
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/alfajores')}
                            className="hidden md:flex items-center gap-2 border-2 border-[#008349] text-[#008349] hover:bg-[#008349] hover:text-white rounded-xl cursor-pointer"
                        >
                            Ver todos
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="group bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-xl sm:rounded-2xl flex flex-col h-full">
                                <div
                                    className="relative overflow-hidden cursor-pointer"
                                    onClick={() => router.push(`/${product.category}/${product.slug}`)}
                                >
                                    {product.badge && (
                                        <Badge
                                            className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg text-xs sm:text-xs ${product.badgeType === 'sale'
                                                ? 'bg-red-500 text-white'
                                                : product.badgeType === 'new'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-[#008349] text-white'
                                                }`}
                                            style={{ fontWeight: 600 }}
                                        >
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <div className="aspect-square overflow-hidden bg-gray-50">
                                        <ImageWithFallback
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 flex flex-col grow">
                                    <div className="grow space-y-2 sm:space-y-3">
                                        <div>
                                            <h3
                                                className="text-base sm:text-lg mb-1 line-clamp-2 min-h-10 sm:min-h-14 cursor-pointer hover:text-[#008349] transition-colors"
                                                style={{ fontWeight: 600, color: '#1a1a1a' }}
                                                onClick={() => router.push(`/${product.category}/${product.slug}`)}
                                            >
                                                {product.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {product.variants?.[0]?.label || 'Caja x12'}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 sm:w-4 h-3 sm:h-4 ${i < Math.floor(product.rating)
                                                        ? 'fill-yellow-500 text-yellow-500'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs sm:text-sm ml-1 text-gray-600">
                                                {product.rating} ({product.reviewsCount || 0})
                                            </span>
                                        </div>

                                        <div className="pt-2">
                                            <div className="flex items-baseline gap-2">
                                                {product.originalPrice && (
                                                    <div className="text-xs sm:text-sm line-through text-gray-400">
                                                        S/ {product.originalPrice.toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-2xl sm:text-3xl" style={{ fontWeight: 800, color: '#008349' }}>
                                                S/ {product.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(product.id);
                                        }}
                                        className="w-full bg-[#008349] hover:bg-[#006838] text-white rounded-xl mt-3 sm:mt-4 h-10 sm:h-12 shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm sm:text-base"
                                        style={{ fontWeight: 600 }}
                                    >
                                        <ShoppingBag className="w-3 sm:w-4 h-3 sm:h-4" />
                                        Añadir al Carrito
                                    </Button>
                                </div>
                            </Card>

                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#008349] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#10b981] rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#F0FDF4] rounded-full px-3 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6">
                            <Check className="w-4 sm:w-5 h-4 sm:h-5 text-[#008349]" />
                            <span className="text-xs sm:text-sm" style={{ color: '#008349', fontWeight: 600 }}>
                                Ventajas exclusivas
                            </span>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontWeight: 700,
                                color: '#1a1a1a'
                            }}
                        >
                            ¿Por Qué Somos Tu{' '}
                            <span style={{ color: '#008349' }}>Mejor Elección</span>?
                        </h2>
                        <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto">
                            Nos diferenciamos por nuestro compromiso con la calidad y el servicio excepcional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="group bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-[#008349] hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-[#008349]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <div className="mb-4 sm:mb-6">
                                        <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-[#008349] to-[#10b981] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                                            <benefit.icon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                                        </div>
                                    </div>

                                    <h3
                                        className="text-base sm:text-lg lg:text-xl mb-2 sm:mb-3"
                                        style={{ fontWeight: 700, color: '#1a1a1a' }}
                                    >
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>

                                    <div className="mt-3 sm:mt-4 w-8 sm:w-12 h-1 bg-linear-to-r from-[#008349] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8 sm:mt-12">
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                            ¿Listo para probar la diferencia?
                        </p>
                        <Button
                            onClick={() => router.push('/alfajores')}
                            className="bg-[#008349] hover:bg-[#006838] text-white px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                            style={{ fontWeight: 600 }}
                        >
                            Comprar Ahora
                            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#F0FDF4] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6">
                            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-[#008349]" />
                            <span className="text-xs sm:text-sm" style={{ color: '#008349', fontWeight: 600 }}>
                                +500 reseñas verificadas
                            </span>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontWeight: 700,
                                color: '#1a1a1a'
                            }}
                        >
                            Lo Que Dicen Nuestros{' '}
                            <span style={{ color: '#008349' }}>Clientes</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-xl text-gray-600">
                            Miles de clientes satisfechos nos respaldan
                        </p>
                    </div>

                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                        <Marquee pauseOnHover className="[--duration:40s] mb-4">
                            {firstRow.map((testimonial) => (
                                <TestimonialCard key={testimonial.id} {...testimonial} />
                            ))}
                        </Marquee>

                        <Marquee reverse pauseOnHover className="[--duration:40s]">
                            {secondRow.map((testimonial) => (
                                <TestimonialCard key={testimonial.id} {...testimonial} />
                            ))}
                        </Marquee>

                        <div
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 z-20"
                            style={{
                                background: "linear-gradient(to right, rgba(240,253,244,1) 0%, rgba(240,253,244,0.7) 10%, rgba(240,253,244,0) 100%)",
                            }}
                        />
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 z-20"
                            style={{
                                background: "linear-gradient(to left, rgba(240,253,244,1) 0%, rgba(240,253,244,0.7) 10%, rgba(240,253,244,0) 100%)",
                            }}
                        />
                    </div>

                    <div className="text-center mt-8 sm:mt-12">
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                            ¿Quieres ser el siguiente cliente satisfecho?
                        </p>
                        <Button
                            onClick={() => router.push('/alfajores')}
                            className="bg-[#008349] hover:bg-[#006838] text-white px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                            style={{ fontWeight: 600 }}
                        >
                            Comprar Ahora
                            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#008349] via-[#006838] to-[#004d2a]" />

                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#10b981]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />
                </div>

                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-white/30">
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                <span className="text-xs sm:text-sm text-white" style={{ fontWeight: 600 }}>
                                    Oferta Exclusiva
                                </span>
                            </div>

                            <div>
                                <h2
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-3 sm:mb-4 leading-tight"
                                    style={{ fontWeight: 800 }}
                                >
                                    ¿Quieres un{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10">Descuento</span>
                                        <div className="absolute bottom-0.5 sm:bottom-1 left-0 w-full h-2 sm:h-3 bg-yellow-400/50 z-0" />
                                    </span>
                                    {' '}Especial?
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                                    Suscríbete y recibe{' '}
                                    <span className="inline-flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 border border-white/30 whitespace-nowrap">
                                        <span style={{ fontWeight: 700 }}>10% OFF</span>
                                    </span>
                                    {' '}en tu primera compra
                                </p>
                            </div>

                            <div className="hidden sm:grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base text-white" style={{ fontWeight: 600 }}>
                                            Ofertas Exclusivas
                                        </div>
                                        <div className="text-xs sm:text-sm text-white/70">
                                            Solo para suscriptores
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base text-white" style={{ fontWeight: 600 }}>
                                            Nuevos Sabores
                                        </div>
                                        <div className="text-xs sm:text-sm text-white/70">
                                            Sé el primero en probar
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base text-white" style={{ fontWeight: 600 }}>
                                            Promociones Semanales
                                        </div>
                                        <div className="text-xs sm:text-sm text-white/70">
                                            Descuentos especiales
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm sm:text-base text-white" style={{ fontWeight: 600 }}>
                                            Recetas Gratis
                                        </div>
                                        <div className="text-xs sm:text-sm text-white/70">
                                            Tips y trucos dulces
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="hidden md:block absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl transform rotate-3 scale-105" />
                            <div className="hidden md:block absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl transform -rotate-2 scale-102" />

                            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
                                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-[#008349] to-[#10b981] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                                        <Send className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                    </div>

                                    <div>
                                        <h3
                                            className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 text-center lg:text-left"
                                            style={{ fontWeight: 700, color: '#1a1a1a' }}
                                        >
                                            Únete Ahora
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 text-center lg:text-left">
                                            Y empieza a disfrutar de beneficios exclusivos
                                        </p>
                                    </div>

                                    <form onSubmit={handleNewsletterSubmit} className="space-y-3 sm:space-y-4">
                                        <div className="space-y-2.5 sm:space-y-3">
                                            <Input
                                                type="email"
                                                placeholder="tu.email@ejemplo.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 sm:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-[#008349] focus:ring-[#008349] rounded-xl"
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full h-12 sm:h-14 bg-linear-to-r from-[#008349] to-[#10b981] hover:from-[#006838] hover:to-[#008349] text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
                                                style={{ fontWeight: 600 }}
                                            >
                                                <span className="hidden sm:inline">Suscribirme y Obtener 10% OFF</span>
                                                <span className="sm:hidden">Suscribirme (10% OFF)</span>
                                                <ArrowRight className="ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                            </Button>
                                        </div>

                                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                                            Al suscribirte aceptas recibir nuestras novedades.{' '}
                                            <a href="#" className="text-[#008349] hover:underline">
                                                Ver política
                                            </a>
                                        </p>
                                    </form>

                                    <div className="pt-3 sm:pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                                                </div>
                                                <span>100% Gratis</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                                                </div>
                                                <span>Sin spam</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                                                </div>
                                                <span className="hidden xs:inline">Cancela cuando quieras</span>
                                                <span className="xs:hidden">Cancela siempre</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center lg:text-left pt-1 sm:pt-2">
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            <span style={{ fontWeight: 600, color: '#008349' }}>+5,000</span> personas ya se suscribieron
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INSTAGRAM SECTION */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: 'var(--gray-900)'
                            }}
                        >
                            @lacasadelalfajoroficial
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Síguenos en Instagram
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                        {instagramImages.map((src, i) => (
                            <a
                                key={i}
                                href="https://www.instagram.com/lacasadelalfajoroficial/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl"
                            >
                                <Image
                                    src={src}
                                    alt={`Instagram ${i + 1}`}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                    <Instagram className="w-6 sm:w-8 h-6 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="text-center mt-6 sm:mt-8">
                        <a
                            href="https://www.instagram.com/lacasadelalfajoroficial/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-(--brand-primary) text-(--brand-primary) hover:bg-(--brand-primary) hover:text-white rounded-xl cursor-pointer text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6"
                            >
                                <Instagram className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                                Seguir en Instagram
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

// TESTIMONIAL CARD
function TestimonialCard({
    id,
    name,
    location,
    rating,
    comment,
    image
}: {
    id: string
    name: string
    location: string
    rating: number
    comment: string
    image: string
}) {
    return (
        <figure data-id={id} className="relative h-full w-72 sm:w-80 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                </div>

                <blockquote className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed flex-1">
                    &quot;{comment}&quot;
                </blockquote>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 border-t border-gray-100 pt-3 sm:pt-4 mt-auto">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <ImageWithFallback
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">{name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{location}</div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-linear-to-br from-[#008349]/5 to-transparent rounded-bl-full" />
        </figure>
    )
}