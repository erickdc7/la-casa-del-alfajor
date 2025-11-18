import { Plus, Minus, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
    id: string;
    name: string;
    variant?: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onCheckout?: () => void;
}

export function CartDrawer({
    open,
    onOpenChange,
    items,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout
}: CartDrawerProps) {
    const router = useRouter();
    const [couponCode, setCouponCode] = useState('');
    const [showCoupon, setShowCoupon] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    // Cálculos del carrito
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedCoupon ? subtotal * 0.1 : 0;
    const shipping = subtotal >= 50 ? 0 : 10;
    const total = subtotal - discount + shipping;

    // Aplica cupón si hay texto válido
    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            setAppliedCoupon(couponCode);
            setCouponCode('');
        }
    };

    // Ir al checkout: cierra el drawer y navega a /checkout
    const handleGoToCheckout = () => {
        if (onCheckout) {
            onCheckout();
        }
        onOpenChange(false);
        router.push('/checkout');
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
                {/* Header */}
                <SheetHeader className="px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="flex items-center gap-2 text-lg">
                            <ShoppingBag className="w-5 h-5" />
                            Carrito ({items.length})
                        </SheetTitle>
                    </div>
                </SheetHeader>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <ShoppingBag className="w-12 sm:w-16 h-12 sm:h-16 mb-4" style={{ color: 'var(--gray-300)' }} />
                            <h3 className="text-base sm:text-lg mb-2" style={{ color: 'var(--gray-600)' }}>
                                Tu carrito está vacío
                            </h3>
                            <p className="text-xs sm:text-sm mb-4" style={{ color: 'var(--gray-400)' }}>
                                Añade algunos deliciosos alfajores
                            </p>
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 cursor-pointer"
                            >
                                Ir a la Tienda
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 sm:gap-4 pb-4 border-b border-border last:border-0">
                                    {/* Image */}
                                    <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden bg-(--cream-100) shrink-0">
                                        <ImageWithFallback
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs sm:text-sm mb-1 line-clamp-2" style={{ fontWeight: 500 }}>
                                            {item.name}
                                        </h4>
                                        {item.variant && (
                                            <p className="text-xs mb-2" style={{ color: 'var(--gray-500)' }}>
                                                {item.variant}
                                            </p>
                                        )}

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="text-xs sm:text-sm w-6 sm:w-8 text-center" style={{ fontWeight: 500 }}>
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Price & Remove */}
                                    <div className="flex flex-col items-end justify-between">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 sm:h-7 sm:w-7 text-(--gray-400) hover:text-white cursor-pointer"
                                            onClick={() => onRemoveItem(item.id)}
                                        >
                                            <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                                        </Button>
                                        <span className="text-xs sm:text-sm" style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                                            S/ {(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-border px-4 sm:px-6 py-4 space-y-3 sm:space-y-4 bg-white">
                        {/* Coupon */}
                        <div>
                            {!showCoupon ? (
                                <button
                                    onClick={() => setShowCoupon(true)}
                                    className="flex items-center gap-2 text-xs sm:text-sm hover:text-(--brand-primary) transition-colors cursor-pointer"
                                    style={{ color: 'var(--gray-600)' }}
                                >
                                    <Tag className="w-3 sm:w-4 h-3 sm:h-4" />
                                    ¿Tienes un cupón?
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Código de cupón"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
                                    />
                                    <Button
                                        onClick={handleApplyCoupon}
                                        variant="outline"
                                        disabled={!couponCode.trim()}
                                        className="text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 cursor-pointer"
                                    >
                                        Aplicar
                                    </Button>
                                </div>
                            )}
                            {appliedCoupon && (
                                <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-(--success)">
                                    <span>Cupón {appliedCoupon} aplicado</span>
                                    <button onClick={() => setAppliedCoupon(null)} className="hover:underline cursor-pointer">
                                        Quitar
                                    </button>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Totals */}
                        <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--gray-600)' }}>Subtotal</span>
                                <span>S/ {subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-(--success)">
                                    <span>Descuento</span>
                                    <span>-S/ {discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--gray-600)' }}>Envío</span>
                                <span className={shipping === 0 ? 'text-(--success)' : ''}>
                                    {shipping === 0 ? 'GRATIS' : `S/ ${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-base sm:text-lg" style={{ fontWeight: 600 }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--brand-primary)' }}>S/ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <Button
                                onClick={handleGoToCheckout}
                                className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white text-sm sm:text-base h-10 sm:h-12 cursor-pointer"
                            >
                                Ir al Checkout
                            </Button>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="w-full text-xs sm:text-sm text-center hover:text-(--brand-primary) transition-colors cursor-pointer"
                                style={{ color: 'var(--gray-600)' }}
                            >
                                Seguir Comprando
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2 text-xs" style={{ color: 'var(--gray-500)' }}>
                            <span className="flex items-center gap-1">
                                🔒 Pago Seguro
                            </span>
                            <span className="flex items-center gap-1">
                                ↩️ Devoluciones
                            </span>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
