import { useState, useEffect } from 'react';
import { Star, Heart, Share2, Check, ShoppingCart, Truck, Shield, RotateCcw, FileText, Leaf, Activity, MessageSquare, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { ProductCard } from './ProductCard';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '../app/lib/products'
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '../app/lib/products'
import { useRouter } from 'next/navigation';

interface CategoryPageProps {
    category: string;
    onAddToCart?: (id: string) => void;
}

interface ProductVariant {
    id: string;
    label: string;
    units?: number;
    price: number;
}

export function CategoryPage({ category = 'Alfajores', onAddToCart }: CategoryPageProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mixParam = searchParams.get('mix');

    const [sortBy, setSortBy] = useState('');
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [selectedMix, setSelectedMix] = useState<string | null>(mixParam);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        setSelectedMix(mixParam);
    }, [mixParam]);

    let filteredProducts = getAllProducts().filter(p => p.category === 'alfajores');

    if (selectedMix) {
        if (selectedMix === 'all') {
            filteredProducts = filteredProducts.filter(p => p.mixType !== undefined);
        } else {
            filteredProducts = filteredProducts.filter(p => p.mixType === selectedMix);
        }
    }

    if (selectedFlavors.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            selectedFlavors.some(flavor =>
                product.name.toLowerCase().includes(flavor.toLowerCase())
            )
        );
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMix, selectedFlavors, priceRange, sortBy]);

    const flavors = ['Tradicional', 'Chocolate', 'Lúcuma', 'Maicena', 'Pecanas', 'Limón'];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {mixParam ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push('/alfajores');
                                    }}
                                    className="cursor-pointer hover:text-foreground transition-all"
                                >
                                    {category}
                                </button>
                            ) : (
                                <BreadcrumbPage className="text-(--brand-primary-dark) transition-all">
                                    {category}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {mixParam && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                        {mixParam === 'all'
                                            ? 'Todas las Cajas Mixtas'
                                            : `Cajas ${mixParam} Sabores`
                                        }
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        {mixParam
                            ? mixParam === 'all'
                                ? 'Todas las Cajas Mixtas'
                                : `Cajas de ${mixParam} Sabores`
                            : category
                        }
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        {mixParam
                            ? mixParam === 'all'
                                ? 'Descubre todas nuestras combinaciones de sabores'
                                : `Descubre nuestras cajas con ${mixParam} sabores diferentes`
                            : 'Descubre nuestros deliciosos alfajores artesanales hechos con ingredientes naturales'
                        }
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* FILTRO DE TIPO DE MIX */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Tipo de Caja
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="mix-2"
                                                checked={selectedMix === '2'}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedMix('2');
                                                        window.history.pushState({}, '', '/alfajores?mix=2');
                                                    } else {
                                                        setSelectedMix(null);
                                                        window.history.pushState({}, '', '/alfajores');
                                                    }
                                                }}
                                            />
                                            <label htmlFor="mix-2" className="text-xs sm:text-sm cursor-pointer">
                                                2 Sabores
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="mix-3"
                                                checked={selectedMix === '3'}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedMix('3');
                                                        window.history.pushState({}, '', '/alfajores?mix=3');
                                                    } else {
                                                        setSelectedMix(null);
                                                        window.history.pushState({}, '', '/alfajores');
                                                    }
                                                }}
                                            />
                                            <label htmlFor="mix-3" className="text-xs sm:text-sm cursor-pointer">
                                                3 Sabores
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="mix-4"
                                                checked={selectedMix === '4'}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedMix('4');
                                                        window.history.pushState({}, '', '/alfajores?mix=4');
                                                    } else {
                                                        setSelectedMix(null);
                                                        window.history.pushState({}, '', '/alfajores');
                                                    }
                                                }}
                                            />
                                            <label htmlFor="mix-4" className="text-xs sm:text-sm cursor-pointer">
                                                4 Sabores
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="mix-all"
                                                checked={selectedMix === 'all'}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedMix('all');
                                                        window.history.pushState({}, '', '/alfajores?mix=all');
                                                    } else {
                                                        setSelectedMix(null);
                                                        window.history.pushState({}, '', '/alfajores');
                                                    }
                                                }}
                                            />
                                            <label htmlFor="mix-all" className="text-xs sm:text-sm cursor-pointer">
                                                Todas las combinaciones
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* SABORES */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Sabores
                                    </h4>
                                    <div className="space-y-2">
                                        {flavors.map((flavor) => (
                                            <div key={flavor} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={flavor}
                                                    checked={selectedFlavors.includes(flavor)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedFlavors([...selectedFlavors, flavor]);
                                                        } else {
                                                            setSelectedFlavors(selectedFlavors.filter(f => f !== flavor));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={flavor} className="text-xs sm:text-sm cursor-pointer">
                                                    {flavor}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedFlavors([]);
                                        setPriceRange([0, 100]);
                                        setSelectedMix(null);
                                        window.history.pushState({}, '', '/alfajores');
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCT */}
                    <div className="lg:col-span-3">
                        {/* SORT & RESULTS COUNT */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* PRODUCTS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron productos
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedFlavors([]);
                                            setPriceRange([0, 100]);
                                            setSelectedMix(null);
                                            window.history.pushState({}, '', '/alfajores');
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ProductDetailPageProps {
    onAddToCart?: (productId: string, selectedVariant?: ProductVariant, quantity?: number) => void;
}


export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState('caja-12');
    const [isWishlisted, setIsWishlisted] = useState(false);

    const productData = getProductBySlug(slug);

    useEffect(() => {
        if (productData?.variants?.[0]?.id) {
            setSelectedVariant(productData.variants[0].id);
        }
    }, [productData?.variants]);

    if (!productData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-(--cream-50)">
                <div className="text-center max-w-md px-4">
                    <div className="text-6xl mb-4">🧁</div>
                    <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                        Producto no encontrado
                    </h2>
                    <p className="mb-6 text-lg" style={{ color: 'var(--gray-600)' }}>
                        Lo sentimos, el producto que buscas no existe o ya no está disponible.
                    </p>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white"
                        size="lg"
                    >
                        Volver al inicio
                    </Button>
                </div>
            </div>
        );
    }

    const product = productData;

    const variants = product.variants || [
        { id: 'caja-6', label: 'Caja x6', units: 6, price: product.price * 0.6 },
        { id: 'caja-12', label: 'Caja x12', units: 12, price: product.price },
        { id: 'caja-24', label: 'Caja x24', units: 24, price: product.price * 1.8 }
    ];

    const variantLabel = product.variantLabel || 'Tamaño';
    const selectedVariantData = variants.find(v => v.id === selectedVariant);
    const currentPrice = selectedVariantData?.price || product.price;

    const reviews = [
        {
            name: 'María Fernanda',
            rating: 5,
            date: '15 Oct 2025',
            comment: '¡Deliciosos! El manjar de leche está en su punto perfecto.',
            verified: true
        },
        {
            name: 'Carlos Ruiz',
            rating: 5,
            date: '12 Oct 2025',
            comment: 'Excelente calidad y presentación.',
            verified: true
        },
        {
            name: 'Andrea Torres',
            rating: 4,
            date: '10 Oct 2025',
            comment: 'Muy buenos, el sabor es increíble.',
            verified: true
        }
    ];

    const allProducts = getAllProducts();

    const relatedProducts = allProducts
        .filter(p =>
            p.category === product.category &&
            p.id !== product.id
        )
        .slice(0, 4);

    if (relatedProducts.length < 4) {
        const additionalProducts = allProducts
            .filter(p => p.id !== product.id && !relatedProducts.includes(p))
            .slice(0, 4 - relatedProducts.length);
        relatedProducts.push(...additionalProducts);
    }

    return (
        <div className="min-h-screen bg-(--cream-50)">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/${product.category}`);
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                {product.category === 'alfajores'
                                    ? 'Alfajores'
                                    : product.category === 'postres'
                                        ? 'Postres'
                                        : product.category === 'regalos'
                                            ? 'Regalos'
                                            : 'Tienda'
                                }
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                {product.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* PRODUCT INFO */}
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* GALLERY */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-card">
                            <ImageWithFallback
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.badge && (
                                <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-(--error) text-white text-xs sm:text-sm">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-2 sm:gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                        ? 'border-(--brand-primary) ring-2 ring-(--brand-primary)/20'
                                        : 'border-transparent hover:border-(--gray-300)'
                                        }`}
                                >
                                    <ImageWithFallback
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                {product.name}
                            </h1>

                            {/* RATING */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < product.rating
                                                ? 'fill-(--accent-gold) text-(--accent-gold)'
                                                : 'fill-(--gray-200) text-(--gray-200)'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    {product.rating.toFixed(1)} ({product.reviewsCount} reseñas)
                                </span>
                            </div>

                            {/* PRECIO */}
                            <div className="flex items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <span className="text-2xl sm:text-3xl" style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                                    S/ {currentPrice.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg sm:text-xl line-through" style={{ color: 'var(--gray-400)' }}>
                                        S/ {product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                {product.description}
                            </p>
                        </div>

                        <Separator />

                        {/* VARIANT SELECTOR */}
                        <div>
                            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base">{variantLabel}</Label>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant.id)}
                                        className={`p-2 sm:p-3 border-2 rounded-lg transition-all  cursor-pointer ${selectedVariant === variant.id
                                            ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                            : 'border-(--gray-300) hover:border-(--gray-400)'
                                            }`}
                                    >
                                        <div className="text-xs sm:text-sm" style={{ fontWeight: 600 }}>{variant.label}</div>
                                        <div className="text-xs" style={{ color: 'var(--gray-600)' }}>
                                            S/ {variant.price.toFixed(2)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* QUANTITY */}
                        <div>
                            <Label className="mb-2 sm:mb-3 block text-sm sm:text-base">Cantidad</Label>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex items-center border-2 rounded-lg" style={{ borderColor: 'var(--gray-300)' }}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-9 w-9 sm:h-10 sm:w-10 cursor-pointer"
                                    >
                                        <span className="text-base sm:text-lg">-</span>
                                    </Button>
                                    <span className="w-10 sm:w-12 text-center text-sm sm:text-base" style={{ fontWeight: 600 }}>
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-9 w-9 sm:h-10 sm:w-10 cursor-pointer "
                                    >
                                        <span className="text-base sm:text-lg">+</span>
                                    </Button>
                                </div>
                                <span className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    {product.inStock ? (
                                        <span className="flex items-center gap-1 text-(--success)">
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                            En stock
                                        </span>
                                    ) : (
                                        'Sin stock'
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-2 sm:gap-3">
                            <Button
                                onClick={() => {
                                    if (onAddToCart) {
                                        onAddToCart(product.id, selectedVariantData, quantity);
                                    }
                                }}
                                className="flex-1 bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white h-10 sm:h-11 md:h-12 text-sm sm:text-base cursor-pointer"
                                size="lg"
                            >
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Añadir al Carrito
                            </Button>
                            <Button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                variant="outline"
                                size="lg"
                                className={`h-10 sm:h-11 md:h-12 w-10 sm:w-11 md:w-12 p-0 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                            >
                                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-10 sm:h-11 md:h-12 w-10 sm:w-11 md:w-12 p-0"
                            >
                                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </div>

                        {/* FEATURES */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4">
                            <div className="text-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-(--brand-primary)/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                                    <Truck className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <p className="text-[10px] sm:text-xs leading-tight" style={{ color: 'var(--gray-600)' }}>
                                    Envío en<br />24-48h
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-(--brand-primary)/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <p className="text-[10px] sm:text-xs leading-tight" style={{ color: 'var(--gray-600)' }}>
                                    Pago<br />Seguro
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-(--brand-primary)/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                                    <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <p className="text-[10px] sm:text-xs leading-tight" style={{ color: 'var(--gray-600)' }}>
                                    Devoluciones<br />fáciles
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <Tabs defaultValue="description" className="mb-8 sm:mb-12">
                    <div className="bg-linear-to-b from-(--gray-50) to-transparent p-1 rounded-2xl">
                        <TabsList className="w-full h-auto p-2 bg-white rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-2">
                            <TabsTrigger
                                value="description"
                                className="
                                relative flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-lg
                                transition-all cursor-pointer
                                data-[state=inactive]:bg-transparent 
                                data-[state=inactive]:text-(--gray-600)
                                data-[state=inactive]:hover:bg-(--gray-100)
                                data-[state=active]:bg-linear-to-br data-[state=active]:from-(--brand-primary) data-[state=active]:to-[#10b981]
                                data-[state=active]:text-white
                                data-[state=active]:shadow-lg data-[state=active]:shadow-(--brand-primary)/25
                                data-[state=active]:scale-[1.02]
                                 "
                            >
                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base" style={{ fontWeight: 600 }}>
                                    Descripción
                                </span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="ingredients"
                                className="
                                    relative flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-lg
                                    transition-all cursor-pointer
                                    data-[state=inactive]:bg-transparent 
                                    data-[state=inactive]:text-(--gray-600)
                                    data-[state=inactive]:hover:bg-(--gray-100)
                                    data-[state=active]:bg-linear-to-br data-[state=active]:from-(--brand-primary) data-[state=active]:to-[#10b981]
                                  data-[state=active]:text-white
                                    data-[state=active]:shadow-lg data-[state=active]:shadow-(--brand-primary)/25
                                    data-[state=active]:scale-[1.02]
                                "
                            >
                                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base" style={{ fontWeight: 600 }}>
                                    Ingredientes
                                </span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="nutrition"
                                className="
                                    relative flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-lg
                                    transition-all cursor-pointer
                                    data-[state=inactive]:bg-transparent 
                                    data-[state=inactive]:text-(--gray-600)
                                    data-[state=inactive]:hover:bg-(--gray-100)
                                    data-[state=active]:bg-linear-to-br data-[state=active]:from-(--brand-primary) data-[state=active]:to-[#10b981]
                                  data-[state=active]:text-white
                                    data-[state=active]:shadow-lg data-[state=active]:shadow-(--brand-primary)/25
                                    data-[state=active]:scale-[1.02]
                                "
                            >
                                <Activity className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base whitespace-nowrap" style={{ fontWeight: 600 }}>
                                    <span className="hidden sm:inline">Info Nutricional</span>
                                    <span className="sm:hidden">Nutrición</span>
                                </span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="reviews"
                                className="
                                    relative flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-lg
                                    transition-all cursor-pointer
                                    data-[state=inactive]:bg-transparent 
                                    data-[state=inactive]:text-(--gray-600)
                                    data-[state=inactive]:hover:bg-(--gray-100)
                                    data-[state=active]:bg-linear-to-br data-[state=active]:from-(--brand-primary) data-[state=active]:to-[#10b981]
                                    data-[state=active]:text-white
                                    data-[state=active]:shadow-lg data-[state=active]:shadow-(--brand-primary)/25
                                    data-[state=active]:scale-[1.02]
                                "
                            >
                                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base" style={{ fontWeight: 600 }}>
                                    Reseñas
                                    <span className="ml-1 opacity-75">({product.reviewsCount})</span>
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="description" className="mt-4 sm:mt-6">
                        <Card className="border-0 shadow-card">
                            <CardContent className="p-4 sm:p-6">
                                <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                    {product.description}
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        'Elaborados artesanalmente',
                                        'Sin conservantes artificiales',
                                        'Ingredientes 100% naturales',
                                        'Receta tradicional peruana',
                                        'Empaque hermético para mayor frescura'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" style={{ color: 'var(--brand-primary)' }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="ingredients" className="mt-4 sm:mt-6">
                        <Card className="border-0 shadow-card">
                            <CardContent className="p-4 sm:p-6">
                                <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ fontWeight: 600 }}>Ingredientes:</p>
                                <p className="text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                    {product.ingredients}
                                </p>
                                <p className="mt-3 sm:mt-4 text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    <strong>Alérgenos:</strong> Contiene lácteos y huevos. Puede contener trazas de frutos secos.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="nutrition" className="mt-4 sm:mt-6">
                        <Card className="border-0 shadow-card">
                            <CardContent className="p-4 sm:p-6">
                                <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ fontWeight: 600 }}>Información Nutricional por unidad (50g aprox.):</p>
                                {product.nutritionalInfo ? (
                                    <pre className="whitespace-pre-wrap text-xs sm:text-sm" style={{ color: 'var(--gray-700)' }}>
                                        {product.nutritionalInfo}
                                    </pre>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="flex justify-between p-2 sm:p-3 bg-(--cream-50) rounded text-xs sm:text-sm">
                                            <span>Energía</span>
                                            <span style={{ fontWeight: 600 }}>210 kcal</span>
                                        </div>
                                        <div className="flex justify-between p-2 sm:p-3 bg-(--cream-50) rounded text-xs sm:text-sm">
                                            <span>Grasas</span>
                                            <span style={{ fontWeight: 600 }}>9g</span>
                                        </div>
                                        <div className="flex justify-between p-2 sm:p-3 bg-(--cream-50) rounded text-xs sm:text-sm">
                                            <span>Carbohidratos</span>
                                            <span style={{ fontWeight: 600 }}>28g</span>
                                        </div>
                                        <div className="flex justify-between p-2 sm:p-3 bg-(--cream-50) rounded text-xs sm:text-sm">
                                            <span>Proteínas</span>
                                            <span style={{ fontWeight: 600 }}>3g</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-4 sm:mt-6">
                        <Card className="border-0 shadow-card">
                            <CardContent className="p-4 sm:p-6">
                                <div className="mb-4 sm:mb-6">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                                            {product.rating.toFixed(1)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-(--accent-gold) text-(--accent-gold)" />
                                                ))}
                                            </div>
                                            <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                                Basado en {product.reviewsCount} reseñas
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-4 sm:my-6" />

                                <div className="space-y-4 sm:space-y-6">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="pb-4 sm:pb-6 border-b border-border last:border-0">
                                            <div className="flex items-start justify-between mb-2 gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-sm sm:text-base" style={{ fontWeight: 600 }}>{review.name}</span>
                                                        {review.verified && (
                                                            <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                                                <Check className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                                                                Compra Verificada
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating
                                                                    ? 'fill-(--accent-gold) text-(--accent-gold)'
                                                                    : 'fill-(--gray-200) text-(--gray-200)'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs sm:text-sm shrink-0" style={{ color: 'var(--gray-500)' }}>
                                                    {review.date}
                                                </span>
                                            </div>
                                            <p className="text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="outline" className="w-full mt-4 sm:mt-6 text-xs sm:text-sm h-9 sm:h-10">
                                    Ver Todas las Reseñas
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* RELATED PRODUCTS */}
                <div>
                    <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        También Te Puede Gustar
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                        {relatedProducts.map((relatedProduct) => (
                            <Card
                                key={relatedProduct.id}
                                className="group bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-xl flex flex-col h-full cursor-pointer"
                                onClick={() => router.push(`/${relatedProduct.category}/${relatedProduct.slug}`)}
                            >
                                <div className="relative overflow-hidden">
                                    {relatedProduct.badge && (
                                        <Badge
                                            className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full shadow-lg text-xs ${relatedProduct.badgeType === 'sale'
                                                ? 'bg-red-500 text-white'
                                                : relatedProduct.badgeType === 'new'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-[#008349] text-white'
                                                }`}
                                            style={{ fontWeight: 600 }}
                                        >
                                            {relatedProduct.badge}
                                        </Badge>
                                    )}
                                    <div className="aspect-square overflow-hidden bg-gray-50">
                                        <ImageWithFallback
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 flex flex-col grow">
                                    <div className="grow space-y-2">
                                        <div>
                                            <h3
                                                className="text-sm sm:text-base mb-1 line-clamp-2 min-h-10"
                                                style={{ fontWeight: 600, color: '#1a1a1a' }}
                                            >
                                                {relatedProduct.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {relatedProduct.variants?.[0]?.label || 'Caja x12'}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < Math.floor(relatedProduct.rating)
                                                        ? 'fill-yellow-500 text-yellow-500'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs ml-1 text-gray-600">
                                                {relatedProduct.rating}
                                            </span>
                                        </div>

                                        <div className="pt-1">
                                            {relatedProduct.originalPrice && (
                                                <div className="text-xs line-through text-gray-400">
                                                    S/ {relatedProduct.originalPrice.toFixed(2)}
                                                </div>
                                            )}
                                            <div className="text-xl sm:text-2xl" style={{ fontWeight: 800, color: '#008349' }}>
                                                S/ {relatedProduct.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onAddToCart) {
                                                onAddToCart(relatedProduct.id);
                                            }
                                        }}
                                        className="w-full bg-[#008349] hover:bg-[#006838] text-white rounded-lg mt-3 h-9 sm:h-10 shadow-lg hover:shadow-xl transition-all cursor-pointer text-xs sm:text-sm"
                                        style={{ fontWeight: 600 }}
                                    >
                                        <ShoppingBag className="w-3 h-3" />
                                        Añadir al Carrito
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

function Label({ children, className = '', ...props }: LabelProps) {
    return (
        <label
            className={`text-sm ${className}`}
            style={{ fontWeight: 500 }}
            {...props}
        >
            {children}
        </label>
    );
}

interface SpecialCategoryPageProps {
    specialType: 'personal' | 'cobertura-bitter' | 'alfajoreable' | 'disenado' | 'tematico';
    title: string;
    description: string;
    onAddToCart?: (id: string) => void;
}

export function SpecialCategoryPage({ specialType, title, description, onAddToCart }: SpecialCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allProducts = getAllProducts().filter(p => p.specialType === specialType);

    let filteredProducts = allProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [priceRange, sortBy]);

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/alfajores');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Alfajores
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                {title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        {title}
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        {description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => setPriceRange([0, 100])}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron productos
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => setPriceRange([0, 100])}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface PostresCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

export function PostresCategoryPage({ onAddToCart }: PostresCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allProducts = getAllProducts().filter(p => p.category === 'postres');

    let filteredProducts = allProducts;

    if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const name = product.name.toLowerCase();
            return selectedTypes.some(type => {
                if (type === 'Personales') {
                    return name.includes('personal') ||
                        (!name.includes('familiar') && !name.includes('grande') && !name.includes('cóctel') && !name.includes('x'));
                } else if (type === 'Familiares') {
                    return name.includes('familiar') || name.includes('grande') || name.includes('porciones');
                } else if (type === 'Bocaditos') {
                    return name.includes('cóctel') || name.includes('x25') || name.includes('x10') || name.includes('x12') || name.includes('x30');
                }
                return false;
            });
        });
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypes, priceRange, sortBy]);

    const types = ['Personales', 'Familiares', 'Bocaditos'];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                Postres
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Postres
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        Deliciosos postres artesanales preparados con ingredientes de primera calidad
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* TIPO DE POSTRE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Tipo
                                    </h4>
                                    <div className="space-y-2">
                                        {types.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={selectedTypes.includes(type)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTypes([...selectedTypes, type]);
                                                        } else {
                                                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={type} className="text-xs sm:text-sm cursor-pointer">
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setPriceRange([0, 100]);
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🍰</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron postres
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedTypes([]);
                                            setPriceRange([0, 100]);
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface RegalosCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

export function RegalosCategoryPage({ onAddToCart }: RegalosCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 500]);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allProducts = getAllProducts().filter(p => p.category === 'regalos');

    let filteredProducts = allProducts;

    if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const slug = product.slug.toLowerCase();

            return selectedTypes.some(type => {
                if (type === 'Para Celebrar') {
                    return slug.includes('box-cumpleanos') ||
                        slug.includes('caja-regalo') ||
                        slug.includes('torta');
                } else if (type === 'Cajas Especiales') {
                    return slug.includes('caja-del-mes') ||
                        slug.includes('edicion') ||
                        slug.includes('causas');
                } else if (type === 'Personalización') {
                    return slug.includes('disenados') ||
                        slug.includes('corporativos') ||
                        slug.includes('bodas') ||
                        slug.includes('mensajes');
                }
                return false;
            });
        });
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypes, priceRange, sortBy]);

    const types = ['Para Celebrar', 'Cajas Especiales', 'Personalización'];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                Regalos
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Regalos
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        Encuentra el regalo perfecto para cada ocasión especial. Cajas personalizadas, suscripciones y más
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* TIPO DE REGALO */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Tipo
                                    </h4>
                                    <div className="space-y-2">
                                        {types.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={selectedTypes.includes(type)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTypes([...selectedTypes, type]);
                                                        } else {
                                                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={type} className="text-xs sm:text-sm cursor-pointer">
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={500}
                                        step={10}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setPriceRange([0, 500]);
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* PRODUCTS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎁</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron regalos
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedTypes([]);
                                            setPriceRange([0, 500]);
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TiendaCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

export function TiendaCategoryPage({ onAddToCart }: TiendaCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 50]);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allProducts = getAllProducts().filter(p => p.category === 'tienda');

    let filteredProducts = allProducts;

    if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const slug = product.slug.toLowerCase();

            return selectedTypes.some(type => {
                if (type === 'Salados') {
                    return slug.includes('croissant') ||
                        slug.includes('empanada') ||
                        slug.includes('wrap') ||
                        slug.includes('sandwich');
                } else if (type === 'Bebidas') {
                    return slug.includes('cafe') ||
                        slug.includes('cappuccino') ||
                        slug.includes('chocolate') ||
                        slug.includes('jugo') ||
                        slug.includes('limonada');
                } else if (type === 'Otros') {
                    return slug.includes('helado') ||
                        slug.includes('kit') ||
                        slug.includes('combo') ||
                        slug.includes('manjar');
                }
                return false;
            });
        });
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTypes, priceRange, sortBy]);

    const types = ['Salados', 'Bebidas', 'Otros'];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                Tienda
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Tienda
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        Descubre nuestra variedad de productos: opciones saladas, bebidas artesanales y mucho más
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* TIPO DE PRODUCTO */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Categoría
                                    </h4>
                                    <div className="space-y-2">
                                        {types.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={selectedTypes.includes(type)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTypes([...selectedTypes, type]);
                                                        } else {
                                                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={type} className="text-xs sm:text-sm cursor-pointer">
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={50}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setPriceRange([0, 50]);
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🏪</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron productos
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedTypes([]);
                                            setPriceRange([0, 50]);
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface HeladosCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

export function HeladosCategoryPage({ onAddToCart }: HeladosCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 20]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allHelados = getAllProducts().filter(p => p.subcategory === 'helados');

    let filteredProducts = allHelados;

    if (selectedType !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.heladoType === selectedType);
    }

    if (selectedFlavors.length > 0) {
        filteredProducts = filteredProducts.filter(p =>
            selectedFlavors.some(flavor => p.heladoFlavor === flavor)
        );
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType, selectedFlavors, priceRange, sortBy]);

    const flavors = [
        { id: 'chocolate', label: 'Chocolate' },
        { id: 'lucuma', label: 'Lúcuma' },
        { id: 'fresa', label: 'Fresa' },
        { id: 'vainilla', label: 'Vainilla' },
        { id: 'mango', label: 'Mango' }
    ];

    const types = [
        { id: 'all', label: 'Todos' },
        { id: 'paleta', label: 'Paletas' },
        { id: 'galleton', label: 'Galletones' },
        { id: 'artesanal', label: 'Artesanales' }
    ];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/tienda');
                                }}
                                className="cursor-pointer hover:text-foreground"
                            >
                                Tienda
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                Helados Artesanales
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Helados Artesanales
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        Helados artesanales hechos con ingredientes naturales. Disponibles en paletas y galletones
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* FILTRO DE PRESENTACIÓN */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Presentación
                                    </h4>
                                    <div className="space-y-2">
                                        {types.map((type) => (
                                            <div key={type.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type.id}
                                                    checked={selectedType === type.id}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedType(type.id);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={type.id} className="text-xs sm:text-sm cursor-pointer">
                                                    {type.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* FILTRO DE SABORES */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Sabores
                                    </h4>
                                    <div className="space-y-2">
                                        {flavors.map((flavor) => (
                                            <div key={flavor.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={flavor.id}
                                                    checked={selectedFlavors.includes(flavor.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedFlavors([...selectedFlavors, flavor.id]);
                                                        } else {
                                                            setSelectedFlavors(selectedFlavors.filter(f => f !== flavor.id));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={flavor.id} className="text-xs sm:text-sm cursor-pointer">
                                                    {flavor.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={20}
                                        step={1}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedType('all');
                                        setSelectedFlavors([]);
                                        setPriceRange([0, 20]);
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* PRODUCTS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🍦</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron helados
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedType('all');
                                            setSelectedFlavors([]);
                                            setPriceRange([0, 20]);
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface KitsDIYCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

interface KitsDIYCategoryPageProps {
    onAddToCart?: (id: string) => void;
}

export function KitsDIYCategoryPage({ onAddToCart }: KitsDIYCategoryPageProps) {
    const [sortBy, setSortBy] = useState('');
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<string>('all');
    const [priceRange, setPriceRange] = useState([0, 80]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allKits = getAllProducts().filter(p => p.subcategory === 'kits');

    let filteredProducts = allKits;

    if (selectedType !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.kitType === selectedType);
    }

    filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
        });
    } else if (sortBy === 'popular' || sortBy === '') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType, priceRange, sortBy]);

    const types = [
        { id: 'all', label: 'Todos los Kits' },
        { id: 'alfa-pack', label: 'Alfa Pack' },
        { id: 'dulce-pack', label: 'Dulce Pack' }
    ];

    return (
        <div className="min-h-screen bg-(--cream-50) py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* BREADCRUMBS */}
                <Breadcrumb className="mb-4 sm:mb-6">
                    <BreadcrumbList className="text-xs sm:text-sm flex-wrap">
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                                className="cursor-pointer hover:text-foreground transition-all"
                            >
                                Inicio
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/tienda');
                                }}
                                className="cursor-pointer hover:text-foreground"
                            >
                                Tienda
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 text-(--brand-primary-dark) transition-all">
                                Kits para Casa (DIY)
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* HEADER */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Kits para Casa (DIY)
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                        Kits completos para hacer tus postres favoritos en casa. Incluyen ingredientes pre-medidos, utensilios y recetas paso a paso
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* FILTERS SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <Card className="border-0 shadow-card lg:sticky lg:top-24">
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontWeight: 600 }}>
                                    Filtros
                                </h3>

                                {/* FILTRO PARA ARMAR EN CASA */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Para Armar en Casa
                                    </h4>
                                    <div className="space-y-2">
                                        {types.map((type) => (
                                            <div key={type.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type.id}
                                                    checked={selectedType === type.id}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedType(type.id);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={type.id} className="text-xs sm:text-sm cursor-pointer">
                                                    {type.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-3 sm:my-4" />

                                {/* PRICE RANGE */}
                                <div className="mb-4 sm:mb-6">
                                    <h4 className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontWeight: 600 }}>
                                        Rango de Precio
                                    </h4>
                                    <Slider
                                        min={0}
                                        max={80}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2 sm:mb-3"
                                    />
                                    <div className="flex items-center justify-between text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                        <span>S/ {priceRange[0]}</span>
                                        <span>S/ {priceRange[1]}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                                    onClick={() => {
                                        setSelectedType('all');
                                        setPriceRange([0, 80]);
                                    }}
                                >
                                    Limpiar Filtros
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* PRODUCTS */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--gray-600)' }}>
                                Mostrando <span style={{ fontWeight: 600 }}>{filteredProducts.length}</span> productos
                            </p>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-xs sm:text-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular" className="text-xs sm:text-sm">Más Popular</SelectItem>
                                    <SelectItem value="newest" className="text-xs sm:text-sm">Más Nuevo</SelectItem>
                                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Precio: Menor a Mayor</SelectItem>
                                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Precio: Mayor a Menor</SelectItem>
                                    <SelectItem value="rating" className="text-xs sm:text-sm">Mejor Valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        category={product.category}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        badge={product.badge}
                                        badgeType={product.badgeType}
                                        inStock={product.inStock}
                                        variants={product.variants}
                                        onAddToCart={onAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                                    <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎨</div>
                                    <p className="text-base sm:text-lg md:text-xl mb-2" style={{ color: 'var(--gray-600)', fontWeight: 600 }}>
                                        No se encontraron kits
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-4" style={{ color: 'var(--gray-500)' }}>
                                        Intenta ajustar los filtros para ver más resultados
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                                        onClick={() => {
                                            setSelectedType('all');
                                            setPriceRange([0, 80]);
                                        }}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* PAGINACIÓN */}
                        {filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Info de página */}
                                <p className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>
                                    Página {currentPage} de {totalPages}
                                </p>

                                {/* Botones de paginación */}
                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Anterior
                                    </Button>

                                    {/* Números de página */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`h-8 sm:h-10 w-8 sm:w-10 p-0 text-xs sm:text-sm ${currentPage === page
                                                        ? 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-dark)'
                                                        : ''
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === currentPage - 3 ||
                                            page === currentPage + 3
                                        ) {
                                            return <span key={page} className="px-1 text-xs sm:text-sm">...</span>;
                                        }
                                        return null;
                                    })}

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}