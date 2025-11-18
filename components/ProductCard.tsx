import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import Link from 'next/link'

export interface ProductCardProps {
    id: string;
    name: string;
    slug?: string;
    category?: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    badge?: string;
    badgeType?: 'new' | 'sale' | 'soldout' | 'pickup';
    inStock?: boolean;
    variants?: Array<{
        id: string;
        label: string;
        units?: number;
        price: number;
    }>;
    onAddToCart?: (id: string) => void;
}

export function ProductCard({
    id,
    name,
    slug,
    category,
    price,
    originalPrice,
    image,
    rating = 5,
    badge,
    badgeType,
    inStock = true,
    variants,
    onAddToCart
}: ProductCardProps) {
    // Maneja la acción de "Agregar al carrito"
    const handleAddToCart = () => {
        if (onAddToCart && inStock) {
            onAddToCart(id);
        }
    };

    // Determina el estilo visual del Badge
    const getBadgeVariant = () => {
        switch (badgeType) {
            case 'new':
                return 'default';
            case 'sale':
                return 'destructive';
            case 'soldout':
                return 'secondary';
            case 'pickup':
                return 'outline';
            default:
                return 'default';
        }
    };

    // Genera el slug si no viene uno explícito
    const productSlug = slug || name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/,/g, '')
        .replace(/--+/g, '-')
        .trim();

    // Determina la URL en base a reglas de categorías
    const getProductUrl = () => {
        // Si viene category directo, usa esa ruta
        if (category) {
            return `/${category}/${productSlug}`;
        }

        // Reglas para productos de tienda
        if (productSlug.includes('croissant') || productSlug.includes('empanada') ||
            productSlug.includes('wrap') || productSlug.includes('sandwich') ||
            productSlug.includes('cafe') || productSlug.includes('cappuccino') ||
            productSlug.includes('chocolate-caliente') || productSlug.includes('jugo') ||
            productSlug.includes('limonada') || productSlug.includes('chicha') ||
            productSlug.includes('milkshake') || productSlug.includes('gaseosas') ||
            productSlug.includes('helado') ||
            productSlug.includes('kit') || productSlug.includes('alfa-pack') ||
            productSlug.includes('dulce-pack') || productSlug.includes('combo') ||
            productSlug.includes('manjar')) {
            return `/tienda/${productSlug}`;
        }

        // Reglas para postres
        if (productSlug.includes('brownie') || productSlug.includes('budin') ||
            productSlug.includes('milhojas') ||
            productSlug.includes('pionono') || productSlug.includes('pye') ||
            productSlug.includes('queque') || productSlug.includes('trufas') ||
            productSlug.includes('relampago') || productSlug.includes('chocogalletas') ||
            productSlug.includes('chifon') || productSlug.includes('cheesecake')) {
            return `/postres/${productSlug}`;
        }

        // Reglas para regalos
        if (productSlug.includes('box-') || productSlug.includes('caja-') ||
            productSlug.includes('torta-') || productSlug.includes('hora-') ||
            productSlug.includes('edicion-') || productSlug.includes('causas-') ||
            productSlug.includes('eventos-') ||
            productSlug.includes('bodas')) {
            return `/regalos/${productSlug}`;
        }

        return `/alfajores/${productSlug}`;
    };

    const productUrl = getProductUrl();

    return (
        <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-hover">
            {/* Imagen + badge + overlay */}
            <Link href={productUrl}>
                <div className="relative aspect-square overflow-hidden bg-(--cream-100)">
                    <ImageWithFallback
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {badge && (
                        <Badge
                            variant={getBadgeVariant()}
                            className="absolute top-3 right-3 z-10"
                        >
                            {badge}
                        </Badge>
                    )}

                    {!inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Badge variant="secondary" className="text-sm">
                                Agotado
                            </Badge>
                        </div>
                    )}
                </div>
            </Link>

            {/* Detalles del producto */}
            <div className="p-4 space-y-2">
                {/* Nombre + variante */}
                <div>
                    <Link href={productUrl}>
                        <h3 className="text-sm line-clamp-2 min-h-10 mb-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                            {name}
                        </h3>
                    </Link>

                    <p className="text-xs text-gray-500">
                        {variants?.[0]?.label || 'Caja x12'}
                    </p>
                </div>

                {/* Estrellas de rating */}
                {rating > 0 && (
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                                    ? 'fill-(--accent-gold) text-(--accent-gold)'
                                    : 'fill-(--gray-200) text-(--gray-200)'
                                    }`}
                            />
                        ))}
                        <span className="text-xs ml-1 text-gray-600">
                            {rating.toFixed(1)}
                        </span>
                    </div>
                )}

                {/* Precios */}
                <div className="flex items-baseline gap-2">
                    <span className="text-lg" style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                        S/ {price.toFixed(2)}
                    </span>
                    {originalPrice && originalPrice > price && (
                        <span className="text-sm line-through" style={{ color: 'var(--gray-400)' }}>
                            S/ {originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Botón para añadir al carrito */}
                <Button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white transition-colors"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {inStock ? 'Añadir al Carrito' : 'Agotado'}
                </Button>
            </div>
        </div>
    );
}