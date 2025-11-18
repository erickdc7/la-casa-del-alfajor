import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Star, Phone, Check, X, ShoppingBag, Heart, Gift, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import Link from 'next/link';
import Image from 'next/image';

interface LoginPageProps {
    onSwitchToRegister?: () => void;
    onSwitchToForgotPassword?: () => void;
    onLogin?: (email: string, password: string) => void;
}

export function LoginPage({ onSwitchToRegister, onSwitchToForgotPassword, onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onLogin) {
            onLogin(email, password)
        } else {
            alert('Inicio de sesión exitoso')
        }
    }

    return (
        <main className="py-6 sm:py-12 bg-linear-to-br from-[#F0FDF4] via-white to-[#F0FDF4]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-6 lg:gap-8">
                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#008349] to-[#006838] rounded-2xl lg:rounded-3xl shadow-2xl">
                        <div className="absolute inset-0 opacity-20">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1619820358955-31de861d2a87?w=800"
                                alt="Alfajores Artesanales"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between p-8 lg:p-12 text-white w-full">
                            {/* Logo & Brand */}
                            <div>
                                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden shrink-0 rounded-full">
                                        <Image
                                            src="/images/logo.webp"
                                            alt="Logo La Casa del Alfajor"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="hidden md:block">
                                        <div
                                            className="transition-colors leading-tight text-[clamp(0.9rem,1.5vw,1.4rem)] whitespace-nowrap"
                                            style={{
                                                fontFamily: 'var(--font-playwrite)',
                                                color: 'var(--mint-100)',
                                            }}
                                        >
                                            La Casa del Alfajor
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Center Content */}
                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-3 lg:mb-4 font-bold">
                                        Bienvenido de vuelta
                                    </h2>
                                    <p className="text-base lg:text-lg xl:text-xl text-white/90 max-w-md">
                                        Accede a tu cuenta para disfrutar de nuestros alfajores artesanales y ofertas exclusivas
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Historial de pedidos y recompras rápidas</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <Heart className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Guarda tus alfajores favoritos</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <Gift className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Descuentos y promociones exclusivas</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Quote */}
                            <div className="border-l-4 border-white/40 pl-3 sm:pl-4">
                                <p className="text-sm lg:text-base text-white/90 italic mb-2">
                                    Los mejores alfajores que he probado en Lima. ¡Totalmente artesanales!
                                </p>
                                <p className="text-xs sm:text-sm text-white/70">- María G., Cliente Frecuente</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-6 py-6 sm:py-12">
                        <div className="w-full max-w-md">
                            {/* Mobile Logo */}
                            <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
                                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden shrink-0 rounded-full">
                                        <Image
                                            src="/images/logo.webp"
                                            alt="Logo La Casa del Alfajor"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="hidden md:block">
                                        <div
                                            className="transition-colors leading-tight text-[clamp(0.9rem,1.5vw,1.4rem)] whitespace-nowrap"
                                            style={{
                                                fontFamily: 'var(--font-playwrite)',
                                                color: 'var(--brand-primary)',
                                            }}
                                        >
                                            La Casa del Alfajor
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Form Header */}
                            <div className="text-center mb-8 sm:mb-10">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 font-bold" style={{ color: '#1a1a1a' }}>
                                    Iniciar Sesión
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Ingresa a tu cuenta y continúa disfrutando
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <Label htmlFor="email" className="text-gray-700 mb-2 block text-sm sm:text-base">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="password" className="text-gray-700 mb-2 block text-sm sm:text-base">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={rememberMe}
                                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="remember" className="text-xs sm:text-sm cursor-pointer text-gray-700">
                                            Recuérdame
                                        </Label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onSwitchToForgotPassword}
                                        className="text-xs sm:text-sm hover:underline transition-all cursor-pointer"
                                        style={{ color: '#008349' }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 sm:h-12 text-sm sm:text-base bg-[#008349] hover:bg-[#006838] text-white rounded-xl transition-all duration-200 shadow-lg shadow-[#008349]/20 hover:shadow-xl hover:shadow-[#008349]/30 cursor-pointer"
                                >
                                    Iniciar Sesión
                                </Button>

                                <div className="relative my-6 sm:my-8">
                                    <Separator />
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 bg-white text-xs sm:text-sm text-gray-500 text-center">
                                        O continúa con
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <Button
                                        type="button"
                                        className="h-10 sm:h-12 text-sm sm:text-base border-2 border-gray-200 bg-white hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-dark"
                                    >
                                        <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="hidden sm:inline">Google</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        className="h-10 sm:h-12 text-sm sm:text-base border-2 border-gray-200 bg-white hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-dark"
                                    >
                                        <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="hidden sm:inline">Facebook</span>
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6 sm:mt-8 text-center">
                                <p className="text-sm sm:text-base text-gray-600">
                                    ¿No tienes una cuenta?{' '}
                                    <button
                                        onClick={onSwitchToRegister}
                                        className="hover:underline transition-all cursor-pointer"
                                        style={{ color: '#008349' }}
                                    >
                                        Crear Cuenta
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface RegisterPageProps {
    onSwitchToLogin?: () => void;
    onRegister?: (data: RegisterFormData) => void;
}

interface ForgotPasswordPageProps {
    onSwitchToLogin?: () => void;
}

export function RegisterPage({ onSwitchToLogin, onRegister }: RegisterPageProps) {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptNewsletter, setAcceptNewsletter] = useState(false);

    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        const labels = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
        const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#10b981'];

        return {
            strength: (strength / 4) * 100,
            label: labels[strength - 1] || '',
            color: colors[strength - 1] || ''
        };
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        if (onRegister) {
            onRegister(formData);
        } else {
            alert('Registro exitoso');
        }
    };

    return (
        <main className="py-6 sm:py-12 bg-linear-to-br from-[#F0FDF4] via-white to-[#F0FDF4]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-6 lg:gap-8">
                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#008349] to-[#006838] rounded-2xl lg:rounded-3xl shadow-2xl">
                        <div className="absolute inset-0 opacity-20">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1739918533428-040764352a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBhc3RyaWVzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjE1MjU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Dulces Premium"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between p-8 lg:p-12 text-white w-full">
                            {/* Logo & Brand */}
                            <div>
                                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden shrink-0 rounded-full">
                                        <Image
                                            src="/images/logo.webp"
                                            alt="Logo La Casa del Alfajor"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="hidden md:block">
                                        <div
                                            className="transition-colors leading-tight text-[clamp(0.9rem,1.5vw,1.4rem)] whitespace-nowrap"
                                            style={{
                                                fontFamily: 'var(--font-playwrite)',
                                                color: 'var(--mint-100)',
                                            }}
                                        >
                                            La Casa del Alfajor
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Center Content */}
                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-3 lg:mb-4 font-bold">
                                        Únete a nuestra familia
                                    </h2>
                                    <p className="text-base lg:text-lg xl:text-xl text-white/90 max-w-md">
                                        Crea tu cuenta y descubre el auténtico sabor de nuestros alfajores artesanales
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Ofertas exclusivas para nuevos clientes</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <Gift className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Acumula puntos en cada compra</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <Heart className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </div>
                                        <p className="text-sm lg:text-base text-white/90">Recibe recetas y tips exclusivos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Stats */}
                            <div className="grid grid-cols-3 gap-4 lg:gap-6">
                                <div className="text-center">
                                    <div className="text-2xl lg:text-3xl mb-1 font-bold">15K+</div>
                                    <div className="text-xs lg:text-sm text-white/70">Clientes Felices</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl lg:text-3xl mb-1 font-bold">50+</div>
                                    <div className="text-xs lg:text-sm text-white/70">Variedades</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl lg:text-3xl mb-1 font-bold">
                                        4.9
                                        <Star className="w-5 h-5 text-white fill-white" />
                                    </div>
                                    <div className="text-xs lg:text-sm text-white/70">Calificación</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-6 py-6 sm:py-12">
                        <div className="w-full max-w-md">
                            {/* Mobile Logo */}
                            <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
                                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden shrink-0 rounded-full">
                                        <Image
                                            src="/images/logo.webp"
                                            alt="Logo La Casa del Alfajor"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="hidden md:block">
                                        <div
                                            className="transition-colors leading-tight text-[clamp(0.9rem,1.5vw,1.4rem)] whitespace-nowrap"
                                            style={{
                                                fontFamily: 'var(--font-playwrite)',
                                                color: 'var(--brand-primary)',
                                            }}
                                        >
                                            La Casa del Alfajor
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Form Header */}
                            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 font-bold" style={{ color: '#1a1a1a' }}>
                                    Crear Cuenta
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Completa tus datos y comienza tu experiencia
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                <div>
                                    <Label htmlFor="name" className="text-gray-700 mb-2 block text-sm sm:text-base">Nombre Completo</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Juan Pérez"
                                            className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="reg-email" className="text-gray-700 mb-2 block text-sm sm:text-base">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone" className="text-gray-700 mb-2 block text-sm sm:text-base">Teléfono</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+51 999 999 999"
                                            className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="reg-password" className="text-gray-700 mb-2 block text-sm sm:text-base">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="reg-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                                        </button>
                                    </div>
                                    {formData.password && (
                                        <div className="mt-2 sm:mt-3">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-gray-600">Fortaleza de contraseña:</span>
                                                <span style={{ color: passwordStrength.color }}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full transition-all duration-300 rounded-full"
                                                    style={{
                                                        width: `${passwordStrength.strength}%`,
                                                        backgroundColor: passwordStrength.color
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="confirm-password" className="text-gray-700 mb-2 block text-sm sm:text-base">Confirmar Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <Input
                                            id="confirm-password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                                        </button>
                                    </div>
                                    {formData.confirmPassword && (
                                        <div className="mt-2 flex items-center gap-2 text-xs">
                                            {passwordsMatch ? (
                                                <>
                                                    <Check className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" />
                                                    <span className="text-green-600">Las contraseñas coinciden</span>
                                                </>
                                            ) : (
                                                <>
                                                    <X className="w-3 sm:w-4 h-3 sm:h-4 text-red-600" />
                                                    <span className="text-red-600">Las contraseñas no coinciden</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 sm:space-y-4 pt-2">
                                    <div className="flex items-start gap-2 w-full">
                                        <Checkbox
                                            id="terms"
                                            checked={acceptTerms}
                                            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                            className="mt-0.5 cursor-pointer shrink-0"
                                        />
                                        <Label
                                            htmlFor="terms"
                                            className="text-xs sm:text-sm cursor-pointer leading-relaxed text-gray-700 inline-flex flex-wrap gap-x-1"
                                        >
                                            <span>Acepto los</span>
                                            <a href="#" className="hover:underline text-[#008349]">
                                                Términos y Condiciones
                                            </a>
                                            <span>y la</span>
                                            <a href="#" className="hover:underline text-[#008349]">
                                                Política de Privacidad
                                            </a>
                                        </Label>
                                    </div>



                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="newsletter"
                                            checked={acceptNewsletter}
                                            onCheckedChange={(checked) => setAcceptNewsletter(checked as boolean)}
                                            className="mt-1 cursor-pointer"
                                        />
                                        <Label htmlFor="newsletter" className="text-xs sm:text-sm cursor-pointer leading-relaxed text-gray-700">
                                            Quiero recibir ofertas exclusivas y novedades por email
                                        </Label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 sm:h-12 text-sm sm:text-base bg-[#008349] hover:bg-[#006838] text-white rounded-xl transition-all duration-200 shadow-lg shadow-[#008349]/20 hover:shadow-xl hover:shadow-[#008349]/30 mt-4 sm:mt-6 cursor-pointer"
                                >
                                    Crear Cuenta
                                </Button>
                            </form>

                            <div className="mt-6 sm:mt-8 text-center">
                                <p className="text-sm sm:text-base text-gray-600">
                                    ¿Ya tienes una cuenta?{' '}
                                    <button
                                        onClick={onSwitchToLogin}
                                        className="hover:underline transition-all cursor-pointer"
                                        style={{ color: '#008349' }}
                                    >
                                        Iniciar Sesión
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

interface ForgotPasswordPageProps {
    onSwitchToLogin?: () => void;
}

export function ForgotPasswordPage({ onSwitchToLogin }: ForgotPasswordPageProps) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleResend = () => {
        alert('Email reenviado');
    };

    if (submitted) {
        return (
            <main className="flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-linear-to-br from-[#F0FDF4] via-white to-[#F0FDF4]">
                <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
                    <div className="text-center">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Check className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-bold" style={{ color: '#1a1a1a' }}>
                            ¡Revisa tu Email!
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-2">
                            Hemos enviado un link de recuperación a
                        </p>
                        <p className="text-sm sm:text-base mb-6 sm:mb-8 break-all" style={{ color: '#008349' }}>
                            {email}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 leading-relaxed">
                            El link es válido por 24 horas. Si no recibes el email en unos minutos,
                            revisa tu carpeta de spam.
                        </p>
                        <div className="space-y-3">
                            <Button
                                onClick={handleResend}

                                className="w-full h-11 sm:h-12 text-sm sm:text-base bg-[#008349] hover:bg-[#006838] text-white rounded-xl transition-all duration-200 shadow-lg shadow-[#008349]/20 hover:shadow-xl hover:shadow-[#008349]/30 cursor-pointer"
                            >
                                Reenviar Email
                            </Button>
                            <button
                                onClick={onSwitchToLogin}
                                className="w-full text-xs sm:text-sm hover:underline transition-all cursor-pointer"
                                style={{ color: '#008349' }}
                            >
                                Volver al inicio de sesión
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-linear-to-br from-[#F0FDF4] via-white to-[#F0FDF4]">
            <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#008349]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-[#008349]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 font-bold" style={{ color: '#1a1a1a' }}>
                        Recuperar Contraseña
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Ingresa tu email y te enviaremos un link para restablecer tu contraseña
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                        <Label htmlFor="forgot-email" className="text-gray-700 mb-2 block text-sm sm:text-base">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                            <Input
                                id="forgot-email"
                                type="email"
                                placeholder="tu@email.com"
                                className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-[#008349] focus:ring-[#008349] rounded-xl transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 sm:h-12 text-sm sm:text-base bg-[#008349] hover:bg-[#006838] text-white rounded-xl transition-all duration-200 shadow-lg shadow-[#008349]/20 hover:shadow-xl hover:shadow-[#008349]/30 cursor-pointer"
                    >
                        Enviar Link de Recuperación
                    </Button>
                </form>

                <div className="mt-6 sm:mt-8 text-center">
                    <button
                        onClick={onSwitchToLogin}
                        className="text-xs sm:text-sm hover:underline transition-all cursor-pointer"
                        style={{ color: '#008349' }}
                    >
                        Volver al inicio de sesión
                    </button>
                </div>
            </div>
        </main>
    );
}


export function AuthPage() {
    const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'forgot'>('login');

    switch (currentPage) {
        case 'login':
            return (
                <LoginPage
                    onSwitchToRegister={() => setCurrentPage('register')}
                    onSwitchToForgotPassword={() => setCurrentPage('forgot')}
                    onLogin={(email, password) => {
                        console.log('Login:', email, password);
                        alert('Inicio de sesión exitoso');
                    }}
                />
            );

        case 'register':
            return (
                <RegisterPage
                    onSwitchToLogin={() => setCurrentPage('login')}
                    onRegister={(data) => {
                        console.log('Register:', data);
                        alert('Registro exitoso');
                        setCurrentPage('login');
                    }}
                />
            );

        case 'forgot':
            return (
                <ForgotPasswordPage
                    onSwitchToLogin={() => setCurrentPage('login')}
                />
            );

        default:
            return null;
    }
}