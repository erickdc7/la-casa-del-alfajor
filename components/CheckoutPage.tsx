import { useState } from 'react';
import { Check, Home, Store, Gift, CreditCard, Smartphone, Building2, Truck, Lock, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './fallback/ImageWithFallback';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'card' | 'yape' | 'plin' | 'transfer' | 'cash';

interface CheckoutPageProps {
    cartItems?: Array<{
        id: string;
        name: string;
        variant?: string;
        price: number;
        quantity: number;
        image: string;
    }>;
    onBack?: () => void;
}

export function CheckoutPage({ cartItems = [], onBack }: CheckoutPageProps) {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isGift, setIsGift] = useState(false);

    // Datos del formulario de envío / recojo
    const [shippingData, setShippingData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        district: '',
        reference: '',
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        giftMessage: '',
        giftWrap: false
    });

    // Datos del formulario de pago
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCVV: ''
    });

    // Cálculos del resumen
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const giftWrapCost = isGift && shippingData.giftWrap ? 5 : 0;
    const shipping = deliveryMethod === 'delivery' ? (subtotal >= 50 ? 0 : 10) : 0;
    const total = subtotal + shipping + giftWrapCost;

    // Validación antes de pasar a pago
    const handleContinueToPayment = () => {
        if (deliveryMethod === 'delivery') {
            if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.district) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }
        } else {
            if (!shippingData.pickupLocation || !shippingData.pickupDate || !shippingData.pickupTime) {
                alert('Por favor selecciona local, fecha y horario de recojo');
                return;
            }
        }
        setCurrentStep(2);
    };

    // Confirmación final del pedido
    const handleConfirmOrder = () => {
        setCurrentStep(3);
    };

    // Vista final de pedido confirmado
    if (currentStep === 3) {
        return <OrderConfirmation orderNumber="LCA-2024-00123" />;
    }

    return (
        <div className="min-h-screen bg-(--cream-50) py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 mb-3 sm:mb-4 hover:text-(--brand-primary) transition-colors cursor-pointer text-sm sm:text-base"
                        style={{ color: 'var(--gray-600)' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al carrito
                    </button>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Finalizar Compra
                    </h1>
                </div>

                {/* Progress Steps  */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-2xl mx-auto">
                        {[
                            { num: 1, label: 'Envío' },
                            { num: 2, label: 'Pago' },
                            { num: 3, label: 'Confirmación' }
                        ].map((step, index) => (
                            <div key={step.num} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.num
                                            ? 'bg-(--brand-primary) text-white'
                                            : 'bg-white text-(--gray-400) border-2 border-(--gray-300)'
                                            }`}
                                    >
                                        {currentStep > step.num ? (
                                            <Check className="w-4 sm:w-5 h-4 sm:h-5" />
                                        ) : (
                                            <span
                                                className="text-sm sm:text-base"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {step.num}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className="text-xs sm:text-sm mt-2 text-center"
                                        style={{ fontWeight: currentStep === step.num ? 600 : 400 }}
                                    >
                                        {step.label}
                                    </span>
                                </div>

                                {/* Línea entre pasos */}
                                <div
                                    className={`h-0.5 flex-1 mx-1 sm:mx-2 transition-colors ${index === 2
                                        ? 'bg-transparent'
                                        : currentStep > step.num
                                            ? 'bg-(--brand-primary)'
                                            : 'bg-(--gray-300)'
                                        }`}
                                />
                            </div>
                        ))}

                    </div>
                </div>


                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {currentStep === 1 && (
                            <>
                                {/* Delivery Method */}
                                <Card className="border-0 shadow-card">
                                    <CardContent className="p-6">
                                        <h2 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                            Método de Entrega
                                        </h2>

                                        <RadioGroup
                                            value={deliveryMethod}
                                            onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}
                                        >
                                            <div className="space-y-3">
                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryMethod === 'delivery'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Truck className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Envío a Domicilio</span>
                                                        </div>
                                                        <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                                                            Entrega en 24-48 horas • {shipping === 0 ? 'Envío gratis' : `S/ ${shipping.toFixed(2)}`}
                                                        </p>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryMethod === 'pickup'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Store className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Recojo en Tienda</span>
                                                        </div>
                                                        <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                                                            Disponible desde mañana • Sin costo
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </RadioGroup>

                                        {deliveryMethod === 'delivery' ? (
                                            <div className="mt-6 space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="fullName">Nombre Completo</Label>
                                                        <Input
                                                            id="fullName"
                                                            value={shippingData.fullName}
                                                            onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="phone">Teléfono</Label>
                                                        <Input
                                                            id="phone"
                                                            type="tel"
                                                            value={shippingData.phone}
                                                            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={shippingData.email}
                                                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="address">Dirección</Label>
                                                    <Input
                                                        id="address"
                                                        placeholder="Calle, número, piso, departamento"
                                                        value={shippingData.address}
                                                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="district">Distrito</Label>
                                                        <Select value={shippingData.district} onValueChange={(value) => setShippingData({ ...shippingData, district: value })}>
                                                            <SelectTrigger id="district">
                                                                <SelectValue placeholder="Selecciona distrito" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="miraflores">Miraflores</SelectItem>
                                                                <SelectItem value="san-isidro">San Isidro</SelectItem>
                                                                <SelectItem value="barranco">Barranco</SelectItem>
                                                                <SelectItem value="surco">Santiago de Surco</SelectItem>
                                                                <SelectItem value="la-molina">La Molina</SelectItem>
                                                                <SelectItem value="san-borja">San Borja</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="reference">Referencia</Label>
                                                        <Input
                                                            id="reference"
                                                            placeholder="Ej: Casa verde, 2do piso"
                                                            value={shippingData.reference}
                                                            onChange={(e) => setShippingData({ ...shippingData, reference: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-6 space-y-4">
                                                <div>
                                                    <Label htmlFor="pickupLocation">Local de Recojo *</Label>
                                                    <Select value={shippingData.pickupLocation} onValueChange={(value) => setShippingData({ ...shippingData, pickupLocation: value })}>
                                                        <SelectTrigger id="pickupLocation">
                                                            <SelectValue placeholder="Selecciona un local" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="miraflores">Miraflores - Av. Larco 1234</SelectItem>
                                                            <SelectItem value="san-isidro">San Isidro - Av. Conquistadores 567</SelectItem>
                                                            <SelectItem value="barranco">Barranco - Jr. Cajamarca 890</SelectItem>
                                                            <SelectItem value="surco">Surco - Av. Primavera 432</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="pickupDate">Fecha de Recojo</Label>
                                                        <Input
                                                            id="pickupDate"
                                                            type="date"
                                                            value={shippingData.pickupDate}
                                                            onChange={(e) => setShippingData({ ...shippingData, pickupDate: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="pickupTime">Horario</Label>
                                                        <Select value={shippingData.pickupTime} onValueChange={(value) => setShippingData({ ...shippingData, pickupTime: value })}>
                                                            <SelectTrigger id="pickupTime">
                                                                <SelectValue placeholder="Selecciona horario" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                                                                <SelectItem value="11-1">11:00 AM - 1:00 PM</SelectItem>
                                                                <SelectItem value="1-3">1:00 PM - 3:00 PM</SelectItem>
                                                                <SelectItem value="3-5">3:00 PM - 5:00 PM</SelectItem>
                                                                <SelectItem value="5-7">5:00 PM - 7:00 PM</SelectItem>
                                                                <SelectItem value="7-9">7:00 PM - 9:00 PM</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Gift Options */}
                                <Card className="border-0 shadow-card">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Checkbox
                                                id="is-gift"
                                                checked={isGift}
                                                onCheckedChange={(checked) => setIsGift(checked as boolean)}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="is-gift" className="cursor-pointer flex items-center gap-2">
                                                    <Gift className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                    <span>Es un regalo</span>
                                                </Label>
                                                <p className="text-sm mt-1" style={{ color: 'var(--gray-600)' }}>
                                                    No incluiremos la factura en el paquete
                                                </p>
                                            </div>
                                        </div>

                                        {isGift && (
                                            <div className="space-y-4 pl-8">
                                                <div>
                                                    <Label htmlFor="giftMessage">Mensaje Personalizado</Label>
                                                    <Textarea
                                                        id="giftMessage"
                                                        placeholder="Escribe un mensaje especial (máx. 200 caracteres)"
                                                        maxLength={200}
                                                        rows={3}
                                                        value={shippingData.giftMessage}
                                                        onChange={(e) => setShippingData({ ...shippingData, giftMessage: e.target.value })}
                                                    />
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        id="gift-wrap"
                                                        checked={shippingData.giftWrap}
                                                        onCheckedChange={(checked) => setShippingData({ ...shippingData, giftWrap: checked as boolean })}
                                                    />
                                                    <Label htmlFor="gift-wrap" className="cursor-pointer">
                                                        Empaque Premium (+S/ 5.00)
                                                    </Label>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Button
                                    onClick={handleContinueToPayment}
                                    className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white"
                                    size="lg"
                                >
                                    Continuar al Pago
                                </Button>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                {/* Payment Method */}
                                <Card className="border-0 shadow-card">
                                    <CardContent className="p-6">
                                        <h2 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                            Método de Pago
                                        </h2>

                                        <RadioGroup
                                            value={paymentMethod}
                                            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                                        >
                                            <div className="space-y-3 mb-6">
                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="card" id="card" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <CreditCard className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Tarjeta de Crédito / Débito</span>
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            <div className="h-6 px-2 bg-white rounded border flex items-center text-xs" style={{ fontWeight: 600 }}>
                                                                VISA
                                                            </div>
                                                            <div className="h-6 px-2 bg-white rounded border flex items-center text-xs" style={{ fontWeight: 600 }}>
                                                                Mastercard
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'yape'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="yape" id="yape" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Smartphone className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Yape</span>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'plin'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="plin" id="plin" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Smartphone className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Plin</span>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'transfer'
                                                        ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                        : 'border-(--gray-300) hover:border-(--gray-400)'
                                                        }`}
                                                >
                                                    <RadioGroupItem value="transfer" id="transfer" className="mt-1" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Building2 className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                            <span style={{ fontWeight: 600 }}>Transferencia Bancaria</span>
                                                        </div>
                                                    </div>
                                                </label>

                                                {deliveryMethod === 'delivery' && (
                                                    <label
                                                        className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash'
                                                            ? 'border-(--brand-primary) bg-(--brand-primary)/5'
                                                            : 'border-(--gray-300) hover:border-(--gray-400)'
                                                            }`}
                                                    >
                                                        <RadioGroupItem value="cash" id="cash" className="mt-1" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Home className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                                                <span style={{ fontWeight: 600 }}>Pago Contra Entrega</span>
                                                            </div>
                                                            <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                                                                Solo disponible para envíos a domicilio
                                                            </p>
                                                        </div>
                                                    </label>
                                                )}
                                            </div>
                                        </RadioGroup>

                                        {paymentMethod === 'card' && (
                                            <div className="space-y-4 p-4 bg-(--cream-50) rounded-lg">
                                                <div>
                                                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                        value={paymentData.cardNumber}
                                                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                                                    <Input
                                                        id="cardName"
                                                        placeholder="NOMBRE APELLIDO"
                                                        value={paymentData.cardName}
                                                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="cardExpiry">Vencimiento</Label>
                                                        <Input
                                                            id="cardExpiry"
                                                            placeholder="MM/AA"
                                                            maxLength={5}
                                                            value={paymentData.cardExpiry}
                                                            onChange={(e) => setPaymentData({ ...paymentData, cardExpiry: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="cardCVV">CVV</Label>
                                                        <Input
                                                            id="cardCVV"
                                                            placeholder="123"
                                                            maxLength={4}
                                                            type="password"
                                                            value={paymentData.cardCVV}
                                                            onChange={(e) => setPaymentData({ ...paymentData, cardCVV: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                                                    <Lock className="w-4 h-4" />
                                                    <span>Tus datos están protegidos con encriptación SSL</span>
                                                </div>
                                            </div>
                                        )}

                                        {(paymentMethod === 'yape' || paymentMethod === 'plin') && (
                                            <div className="p-6 bg-(--cream-50) rounded-lg text-center">
                                                <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center border-2 border-dashed" style={{ borderColor: 'var(--gray-300)' }}>
                                                    <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                                                        Código QR
                                                    </span>
                                                </div>
                                                <p className="mb-2" style={{ fontWeight: 600 }}>
                                                    Escanea el código QR
                                                </p>
                                                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                                                    Monto a pagar: <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>S/ {total.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        )}

                                        {paymentMethod === 'transfer' && (
                                            <div className="p-6 bg-(--cream-50) rounded-lg">
                                                <h4 className="mb-3" style={{ fontWeight: 600 }}>Datos Bancarios</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span style={{ color: 'var(--gray-600)' }}>Banco:</span>
                                                        <span style={{ fontWeight: 600 }}>BCP</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span style={{ color: 'var(--gray-600)' }}>Cuenta Corriente:</span>
                                                        <span style={{ fontWeight: 600 }}>123-456789-0-12</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span style={{ color: 'var(--gray-600)' }}>CCI:</span>
                                                        <span style={{ fontWeight: 600 }}>002-123-456789-0-12</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span style={{ color: 'var(--gray-600)' }}>Titular:</span>
                                                        <span style={{ fontWeight: 600 }}>La Casa del Alfajor SAC</span>
                                                    </div>
                                                    <Separator className="my-3" />
                                                    <div className="flex justify-between">
                                                        <span style={{ color: 'var(--gray-600)' }}>Monto a transferir:</span>
                                                        <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>S/ {total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs mt-4" style={{ color: 'var(--gray-600)' }}>
                                                    Envía el comprobante de pago a hola@lacasadelalfajor.pe
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => setCurrentStep(1)}
                                        variant="outline"
                                        className="flex-1"
                                        size="lg"
                                    >
                                        Volver
                                    </Button>
                                    <Button
                                        onClick={handleConfirmOrder}
                                        className="flex-1 bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white"
                                        size="lg"
                                    >
                                        Confirmar Pedido
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Order Summary - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="border-0 shadow-card">
                                <CardContent className="p-6">
                                    <h3 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Resumen del Pedido
                                    </h3>

                                    <div className="space-y-4 mb-6">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-3">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-(--cream-100) shrink-0">
                                                    <ImageWithFallback
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm line-clamp-2 mb-1" style={{ fontWeight: 500 }}>
                                                        {item.name}
                                                    </p>
                                                    {item.variant && (
                                                        <p className="text-xs mb-1" style={{ color: 'var(--gray-500)' }}>
                                                            {item.variant}
                                                        </p>
                                                    )}
                                                    <div className="flex justify-between text-sm">
                                                        <span style={{ color: 'var(--gray-600)' }}>x{item.quantity}</span>
                                                        <span style={{ fontWeight: 600 }}>S/ {(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--gray-600)' }}>Subtotal</span>
                                            <span>S/ {subtotal.toFixed(2)}</span>
                                        </div>
                                        {giftWrapCost > 0 && (
                                            <div className="flex justify-between">
                                                <span style={{ color: 'var(--gray-600)' }}>Empaque Premium</span>
                                                <span>S/ {giftWrapCost.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--gray-600)' }}>Envío</span>
                                            <span className={shipping === 0 ? 'text-(--success)' : ''}>
                                                {shipping === 0 ? 'GRATIS' : `S/ ${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex justify-between mb-6 text-lg">
                                        <span style={{ fontWeight: 600 }}>Total</span>
                                        <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
                                            S/ {total.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-xs" style={{ color: 'var(--gray-600)' }}>
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-3.5 h-3.5" />
                                            <span>Pago 100% seguro</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5" />
                                            <span>Devoluciones fáciles</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-(--cream-50) to-(--beige-100) flex items-center justify-center px-4 py-8 sm:py-12">
            <Card className="max-w-2xl w-full border-0 shadow-modal">
                <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-(--success)/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Check className="w-8 sm:w-10 h-8 sm:h-10 text-(--success)" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        ¡Pedido Confirmado!
                    </h1>

                    <p className="text-base sm:text-lg mb-2" style={{ color: 'var(--gray-700)' }}>
                        Gracias por tu compra
                    </p>

                    <div className="inline-block px-3 sm:px-4 py-2 bg-(--cream-100) rounded-lg mb-4 sm:mb-6">
                        <span className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>Número de orden:</span>
                        <p className="text-sm sm:text-base" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--brand-primary)' }}>
                            {orderNumber}
                        </p>
                    </div>

                    <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: 'var(--gray-600)' }}>
                        Te hemos enviado la confirmación a tu email con todos los detalles de tu pedido.
                    </p>

                    <Card className="border-2 mb-8 text-left" style={{ borderColor: 'var(--beige-300)' }}>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-(--brand-primary)/10 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 600 }}>Estado del Pedido</h3>
                                    <Badge className="bg-(--accent-amber) text-white">
                                        En Preparación
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--gray-600)' }}>Método de envío:</span>
                                    <span style={{ fontWeight: 500 }}>Envío a domicilio</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--gray-600)' }}>Dirección:</span>
                                    <span style={{ fontWeight: 500 }}>Av. Larco 1234, Miraflores</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--gray-600)' }}>Fecha estimada:</span>
                                    <span style={{ fontWeight: 500 }}>22-23 Oct 2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--gray-600)' }}>Total pagado:</span>
                                    <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>S/ 68.00</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mb-8">
                        <h3 className="mb-4" style={{ fontWeight: 600 }}>Próximos Pasos</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-left">
                            {[
                                { icon: '📧', title: 'Confirmación', desc: 'Revisa tu email' },
                                { icon: '👨‍🍳', title: 'Preparación', desc: 'Preparamos tu pedido' },
                                { icon: '🚚', title: 'Entrega', desc: '24-48 horas' }
                            ].map((step, index) => (
                                <div key={index} className="p-4 bg-(--cream-50) rounded-lg">
                                    <div className="text-3xl mb-2">{step.icon}</div>
                                    <h4 className="text-sm mb-1" style={{ fontWeight: 600 }}>{step.title}</h4>
                                    <p className="text-xs" style={{ color: 'var(--gray-600)' }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white">
                            Ver Mi Pedido
                        </Button>
                        <Button variant="outline">
                            Seguir Comprando
                        </Button>
                    </div>

                    <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-(--cream-100) rounded-lg">
                        <p className="text-xs sm:text-sm mb-2" style={{ color: 'var(--gray-700)' }}>
                            ¿Necesitas ayuda?
                        </p>
                        <Button variant="outline" className="w-full sm:w-auto text-sm cursor-pointer">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contactar por WhatsApp
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
