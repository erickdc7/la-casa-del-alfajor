import { Facebook, Instagram, MapPin, Phone, Mail, Clock, Send, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const router = useRouter();

    // Maneja envío del formulario del newsletter
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter signup:', newsletterEmail);
        setNewsletterEmail('');
    };

    // Rutas principales del footer
    const links = [
        { name: 'Alfajores', path: '/alfajores' },
        { name: 'Postres', path: '/postres' },
        { name: 'Regalos', path: '/regalos' },
        { name: 'Tienda', path: '/tienda' },
        { name: 'Novedades', path: '/novedades' },
        { name: 'Nosotros', path: '/nosotros' },
    ];

    return (
        <footer className="bg-linear-to-br from-[#1a1a1a] via-[#0d2818] to-[#1a1a1a] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#008349] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10b981] rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Newsletter Section at Top */}
                <div className="py-12 lg:py-16 border-b border-white/10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-[#008349]/20 rounded-full px-4 py-2 mb-4">
                                <Heart className="w-4 h-4 text-[#008349]" />
                                <span className="text-sm text-[#10b981]" style={{ fontWeight: 600 }}>
                                    Únete a nuestra comunidad
                                </span>
                            </div>
                            <h3
                                className="text-3xl lg:text-4xl xl:text-5xl mb-3"
                                style={{ fontWeight: 700, lineHeight: 1.2 }}
                            >
                                Recibe Ofertas{' '}
                                <span className="text-[#008349]">Exclusivas</span>
                            </h3>
                            <p className="text-lg text-gray-400">
                                Suscríbete y obtén <span className="text-[#008349]" style={{ fontWeight: 600 }}>10% OFF</span> en tu primera compra
                            </p>
                        </div>

                        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-14 rounded-xl focus:border-[#008349] focus:ring-[#008349] py-4"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="bg-[#008349] hover:bg-[#006838] text-white h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Suscribirse
                                    <Send className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Al suscribirte aceptas recibir nuestras novedades y promociones
                            </p>
                        </form>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-6">
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

                                {/* TEXTO RESPONSIVE */}
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

                            <p className="text-gray-400 leading-relaxed">
                                Los mejores alfajores artesanales de Lima, elaborados con ingredientes premium y el amor de siempre.
                            </p>

                            {/* Social Media */}
                            <div>
                                <h5 className="text-sm mb-3" style={{ fontWeight: 600 }}>Síguenos</h5>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#008349] border border-white/10 hover:border-[#008349] flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#008349] border border-white/10 hover:border-[#008349] flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                    <a
                                        href="https://tiktok.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#008349] border border-white/10 hover:border-[#008349] flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://wa.me/51999999999"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#008349] border border-white/10 hover:border-[#008349] flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Productos Column */}
                        <div className="lg:col-span-2">
                            <h4 className="text-lg mb-4 font-semibold">Conócenos</h4>
                            <ul className="space-y-3">
                                {links.map((item) => (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => router.push(item.path)}
                                            className="text-gray-400 hover:text-[#008349] transition-colors inline-flex items-center group cursor-pointer"
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ayuda Column */}
                        <div className="lg:col-span-2">
                            <h4 className="text-lg mb-4" style={{ fontWeight: 600 }}>
                                Atención al cliente
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    'Preguntas Frecuentes',
                                    'Envíos',
                                    'Devoluciones',
                                    'Términos y Condiciones',
                                    'Política de Privacidad',
                                    'Libro de Reclamaciones'
                                ].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-[#008349] transition-colors inline-flex items-center group">
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contacto Column */}
                        <div className="lg:col-span-4">
                            <h4 className="text-lg mb-4" style={{ fontWeight: 600 }}>
                                Contáctanos
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#008349] group-hover:bg-[#008349]/10 flex items-center justify-center shrink-0 transition-all">
                                        <MapPin className="w-5 h-5 text-[#008349]" />
                                    </div>
                                    <div className="text-gray-400">
                                        <div style={{ fontWeight: 600 }} className="text-white mb-1">Tienda Principal</div>
                                        <div>Av. Larco 1234, Miraflores</div>
                                        <div>Lima, Perú</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#008349] group-hover:bg-[#008349]/10 flex items-center justify-center shrink-0 transition-all">
                                        <Phone className="w-5 h-5 text-[#008349]" />
                                    </div>
                                    <div className="text-gray-400">
                                        <div style={{ fontWeight: 600 }} className="text-white mb-1">WhatsApp / Llamadas</div>
                                        <a href="tel:+51999999999" className="hover:text-[#008349] transition-colors">
                                            +51 999 999 999
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#008349] group-hover:bg-[#008349]/10 flex items-center justify-center shrink-0 transition-all">
                                        <Mail className="w-5 h-5 text-[#008349]" />
                                    </div>
                                    <div className="text-gray-400">
                                        <div style={{ fontWeight: 600 }} className="text-white mb-1">Email</div>
                                        <a href="mailto:hola@lacasadelalfajor.pe" className="hover:text-[#008349] transition-colors">
                                            hola@lacasadelalfajor.pe
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#008349] group-hover:bg-[#008349]/10 flex items-center justify-center shrink-0 transition-all">
                                        <Clock className="w-5 h-5 text-[#008349]" />
                                    </div>
                                    <div className="text-gray-400">
                                        <div style={{ fontWeight: 600 }} className="text-white mb-1">Horario</div>
                                        <div>Lunes - Domingo</div>
                                        <div>9:00 AM - 9:00 PM</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Payment & Delivery Partners */}
                <div className="border-t border-white/10 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Payment Methods */}
                        <div>
                            <h5 className="text-sm mb-4" style={{ fontWeight: 600 }}>
                                Métodos de Pago Seguros
                            </h5>
                            <div className="flex flex-wrap items-center gap-3">
                                {['VISA', 'Mastercard', 'YAPE', 'PLIN', 'BCP', 'Interbank'].map((method) => (
                                    <div
                                        key={method}
                                        className="h-10 px-4 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                                            {method}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Partners */}
                        <div>
                            <h5 className="text-sm mb-4" style={{ fontWeight: 600 }}>
                                Delivery Partners
                            </h5>
                            <div className="flex flex-wrap items-center gap-3">
                                {['Rappi', 'Uber Eats', 'PedidosYa', 'DiDi Food'].map((partner) => (
                                    <div
                                        key={partner}
                                        className="h-10 px-4 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                                            {partner}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} La Casa del Alfajor. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="hover:text-[#008349] transition-colors">Privacidad</a>
                            <a href="#" className="hover:text-[#008349] transition-colors">Términos</a>
                            <a href="#" className="hover:text-[#008349] transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
