import { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import Link from 'next/link'
import { SearchModal } from './SearchModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

interface HeaderProps {
    cartItemCount?: number;
    onCartClick?: () => void;
}

export function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const router = useRouter();

    const megaMenus = {
        alfajores: {
            title: 'Alfajores',
            image: 'https://images.unsplash.com/photo-1582170090097-b251ddbbf7f3?w=600',
            columns: [
                {
                    title: 'Clásicos',
                    items: [
                        'Tradicional',
                        'Maicena',
                        'Maicena de colores',
                        'Clásica Especial',
                        'Harina de arroz',
                        'Chocolate',
                        'Chocolúcuma',
                    ]
                },
                // COLUMNA 2: Cajas por Sabor 
                {
                    title: 'Frutales',
                    items: [
                        'Lúcuma',
                        'Limón',
                        'Miel',
                        'Manzana',
                        'Maracuyá',
                        'Multicereal',
                    ]
                },
                // COLUMNA 3: Sabores Adicionales 
                {
                    title: 'Especiales',
                    items: [
                        'Castaña',
                        'Pecanas',
                        'Pistacho',
                        'Chocochips',
                        'Cheesecake',
                        'Crema pastelera',
                    ]
                },
                // COLUMNA 4: Cajas Mixtas
                {
                    title: 'Cajas Mixtas',
                    items: [
                        '2 Sabores',
                        '3 Sabores',
                        '4 Sabores',
                        'Ver Combinaciones'
                    ]
                },
                // COLUMNA 5: Personales y Especiales
                {
                    title: 'Personales y Especiales',
                    items: ['Personales', 'Con Cobertura Bitter', 'Alfajoreables', 'Diseñados', 'Temáticos']
                }
            ]
        },
        postres: {
            title: 'Postres',
            image: 'https://images.unsplash.com/photo-1731964791422-99c9e06cc204?w=600',
            columns: [
                {
                    title: 'Personales',
                    items: [
                        'Brownie', 'Budín', 'Milhojas', 'Pionono',
                        'Pye de Limón', 'Pye de Manzana', 'Queque', 'Trufas',
                        { name: 'Relámpago con Fudge', badge: 'Nuevo' },
                        'Chocogalletas'
                    ]
                },
                {
                    title: 'Familiares',
                    items: [
                        'Cheesecake (8 porciones)',
                        'Milhojas (10 porciones)',
                        'Pionono de Chocolate Grande',
                        'Pionono de Vainilla Grande',
                        'Pye de Limón Grande',
                        'Pye de Manzana Grande',
                        'Queque Familiar',
                        { name: 'Chifón de Naranja', badge: 'Nuevo' }
                    ]
                },
                {
                    title: 'Bocaditos para Eventos',
                    items: ['Alfajores Cóctel (x25)', 'Piononitos', 'Pyes Cóctel', 'Combinados']
                }
            ]
        },
        regalos: {
            title: 'Regalos',
            image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600',
            columns: [
                {
                    title: 'Para Celebrar',
                    items: [
                        'Box Cumpleañero (5 personas)',
                        'Box Cumpleañero (10 personas)',
                        'Box Cumpleañero (20 personas)',
                        'Caja de Regalo x15',
                        'Tortas de Alfajor',
                        'Hora de la Amistad'
                    ]
                },
                {
                    title: 'Cajas Especiales',
                    items: [
                        'Caja del Mes',
                        'Edición Halloween',
                        'Edición Navidad',
                        'Causas Especiales'
                    ]
                },
                {
                    title: 'Personalización',
                    items: [
                        'Eventos Corporativos',
                        'Bodas',
                    ]
                }
            ]
        },
        tienda: {
            title: 'Tienda',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
            columns: [
                {
                    title: 'Salados',
                    items: [
                        'Croissants',
                        'Empanadas',
                        'Wraps',
                        'Sándwiches'
                    ]
                },
                {
                    title: 'Bebidas',
                    items: [
                        'Café',
                        'Chocolate Caliente',
                        'Jugos Naturales',
                        'Limonada Frozen',
                        { name: 'Chicha Morada', badge: 'Tradicional' },
                        { name: 'Milkshake', badge: 'Cremoso' },
                        'Gaseosas'
                    ]
                },
                {
                    title: 'Otros',
                    items: [
                        'Helados Artesanales',
                        'Kits para Casa (DIY)',
                        'Combos Desayuno',
                        'Manjar Blanco'
                    ]
                }
            ]
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-(--gray-200)">
            {/* Main Navigation */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild className="xl:hidden">
                                <Button variant="ghost" size="icon" className="hover:bg-(--brand-primary) hover:text-white transition-colors cursor-pointer">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 p-0 [&>button]:hidden">
                                <MobileMenu onClose={() => setMobileMenuOpen(false)} />
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12  overflow-hidden shrink-0  transition-all">
                                <Image
                                    src="/images/logo.webp"
                                    alt="logo"
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

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {Object.entries(megaMenus).map(([key, menu]) => (
                            <div
                                key={key}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(key)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button
                                    className="px-5 py-6 transition-colors flex items-center gap-2 relative group cursor-pointer"
                                    style={{
                                        fontWeight: 600,
                                        color: activeMenu === key ? 'var(--brand-primary)' : 'var(--gray-700)'
                                    }}
                                >
                                    {menu.title}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                                    {activeMenu === key && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--brand-primary)" />
                                    )}
                                </button>
                            </div>
                        ))}

                        <Link
                            href="/novedades"
                            className="px-5 py-6 transition-colors"
                            style={{ fontWeight: 600, color: 'var(--gray-700)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-700)'}
                        >
                            Novedades
                        </Link>
                        <Link
                            href="/nosotros"
                            className="px-5 py-6 transition-colors"
                            style={{ fontWeight: 600, color: 'var(--gray-700)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-700)'}
                        >
                            Nosotros
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hidden sm:flex cursor-pointer p-2 hover:bg-(--mint-100)  rounded-full transition-colors hover:text-dark" onClick={() => setSearchOpen(true)}>
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className='cursor-pointer p-2 hover:bg-(--mint-100)  rounded-full transition-colors hover:text-dark' onClick={() => router.push('/auth')}>
                            <User className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative cursor-pointer p-2 hover:bg-(--mint-100)  rounded-full transition-colors hover:text-dark" onClick={onCartClick}>
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemCount > 0 && (
                                <Badge
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-(--brand-primary)"
                                >
                                    {cartItemCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mega Menus */}
            {activeMenu && (
                <div
                    className="absolute left-0 right-0 bg-white border-b border-(--gray-200) shadow-lg"
                    style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <div className="grid grid-cols-5 gap-8" style={{ gridTemplateColumns: `repeat(${megaMenus[activeMenu as keyof typeof megaMenus].columns.length}, 1fr) 300px` }}>
                            {megaMenus[activeMenu as keyof typeof megaMenus].columns.map((column, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xs uppercase mb-4 " style={{ fontWeight: 700, color: 'var(--gray-900)', letterSpacing: '0.05em' }}>
                                        {column.title}
                                    </h3>
                                    <div className="space-y-2">
                                        {column.items.map((item, itemIdx) => {
                                            const isObject = typeof item === 'object';
                                            const itemName = isObject ? item.name : item;
                                            const badge = isObject ? item.badge : null;

                                            let href = '#';

                                            // Si estamos en la columna "Cajas Mixtas"
                                            if (column.title === 'Cajas Mixtas') {
                                                const mixMap: { [key: string]: string } = {
                                                    '2 Sabores': '/alfajores?mix=2',
                                                    '3 Sabores': '/alfajores?mix=3',
                                                    '4 Sabores': '/alfajores?mix=4',
                                                    'Ver Combinaciones': '/alfajores?mix=all'
                                                };
                                                href = mixMap[itemName] || '/alfajores';
                                            }
                                            // Si estamos en "Personales y Especiales"
                                            else if (column.title === 'Personales y Especiales') {
                                                const specialMap: { [key: string]: string } = {
                                                    'Personales': '/alfajores/personales',
                                                    'Con Cobertura Bitter': '/alfajores/cobertura-bitter',
                                                    'Alfajoreables': '/alfajores/alfajoreables',
                                                    'Diseñados': '/alfajores/disenados',
                                                    'Temáticos': '/alfajores/tematicos'
                                                };
                                                href = specialMap[itemName] || '/alfajores';
                                            }
                                            // SI ESTAMOS EN POSTRES
                                            else if (activeMenu === 'postres') {
                                                const postresSlugs: { [key: string]: string } = {
                                                    // Personales
                                                    'Brownie': 'brownie',
                                                    'Budín': 'budin',
                                                    'Milhojas': 'milhojas-personal',
                                                    'Pionono': 'pionono-personal',
                                                    'Pye de Limón': 'pye-limon-personal',
                                                    'Pye de Manzana': 'pye-manzana-personal',
                                                    'Queque': 'queque-personal',
                                                    'Trufas': 'trufas',
                                                    'Relámpago con Fudge': 'relampago-fudge',
                                                    'Chocogalletas': 'chocogalletas',

                                                    // Familiares 
                                                    'Cheesecake (8 porciones)': 'cheesecake-familiar',
                                                    'Milhojas (10 porciones)': 'milhojas-familiar',
                                                    'Pionono de Chocolate Grande': 'pionono-chocolate-grande',
                                                    'Pionono de Vainilla Grande': 'pionono-vainilla-grande',
                                                    'Pye de Limón Grande': 'pye-limon-grande',
                                                    'Pye de Manzana Grande': 'pye-manzana-grande',
                                                    'Queque Familiar': 'queque-familiar',
                                                    'Chifón de Naranja': 'chifon-naranja',

                                                    // Bocaditos
                                                    'Alfajores Cóctel (x25)': 'alfajores-coctel',
                                                    'Piononitos': 'piononitos',
                                                    'Pyes Cóctel': 'pyes-coctel',
                                                    'Combinados': 'bocaditos-combinados'
                                                };

                                                const slug = postresSlugs[itemName] || itemName.toLowerCase()
                                                    .replace(/\s+/g, '-')
                                                    .replace(/\(/g, '')
                                                    .replace(/\)/g, '');

                                                href = `/postres/${slug}`;
                                            }
                                            // SI ESTAMOS EN REGALOS
                                            else if (activeMenu === 'regalos') {
                                                const regalosSlugs: { [key: string]: string } = {
                                                    // Para Celebrar
                                                    'Box Cumpleañero (5 personas)': 'box-cumpleanos-5-personas',
                                                    'Box Cumpleañero (10 personas)': 'box-cumpleanos-10-personas',
                                                    'Box Cumpleañero (20 personas)': 'box-cumpleanos-20-personas',
                                                    'Caja de Regalo x15': 'caja-regalo-x15',
                                                    'Tortas de Alfajor': 'torta-de-alfajor',
                                                    'Hora de la Amistad': 'hora-amistad',
                                                    // Cajas Especiales
                                                    'Caja del Mes': 'caja-del-mes',
                                                    'Edición Halloween': 'edicion-halloween',
                                                    'Edición Navidad': 'edicion-navidad',
                                                    'Causas Especiales': 'causas-especiales',
                                                    // Personalización
                                                    'Eventos Corporativos': 'eventos-corporativos',
                                                    'Bodas': 'bodas',
                                                };

                                                const slug = regalosSlugs[itemName] || itemName.toLowerCase()
                                                    .replace(/\s+/g, '-')
                                                    .replace(/\(/g, '')
                                                    .replace(/\)/g, '');

                                                href = `/regalos/${slug}`;
                                            }
                                            // SI ESTAMOS EN TIENDA
                                            else if (activeMenu === 'tienda') {
                                                const tiendaSlugs: { [key: string]: string } = {
                                                    // Salados
                                                    'Croissants': 'croissants',
                                                    'Empanadas': 'empanadas',
                                                    'Wraps': 'wrap',
                                                    'Sándwiches': 'sandwiches',
                                                    // Bebidas
                                                    'Café': 'cafe',
                                                    'Chocolate Caliente': 'chocolate-caliente',
                                                    'Jugos Naturales': 'jugos-naturales',
                                                    'Limonada Frozen': 'limonada-frozen',
                                                    'Chicha Morada': 'chicha-morada',
                                                    'Milkshake': 'milkshake',
                                                    'Gaseosas': 'gaseosas',
                                                    // Otros
                                                    'Helados Artesanales': 'helados',
                                                    'Kits para Casa (DIY)': 'kits-diy',
                                                    'Combos Desayuno': 'combo-desayuno',
                                                    'Manjar Blanco': 'manjar-blanco'
                                                };

                                                const slug = tiendaSlugs[itemName] || itemName.toLowerCase()
                                                    .replace(/\s+/g, '-')
                                                    .replace(/\(/g, '')
                                                    .replace(/\)/g, '');

                                                href = `/tienda/${slug}`;
                                            }
                                            // Si estamos en otras columnas de Alfajores (por sabor)
                                            else if (activeMenu === 'alfajores') {
                                                const slugMap: { [key: string]: string } = {
                                                    // Columna 1: Cajas por Sabor
                                                    'Tradicional': 'tradicional',
                                                    'Maicena': 'maicena',
                                                    'Maicena de Colores': 'maicena-de-colores',
                                                    'Clásica Especial': 'clasica-especial',
                                                    'Harina de Arroz': 'harina-de-arroz',
                                                    'Chocolate': 'chocolate',
                                                    'Chocolúcuma': 'chocolucuma',

                                                    // Columna 2: Más Sabores
                                                    'Lúcuma': 'lucuma',
                                                    'Limón': 'limon',
                                                    'Miel': 'miel',
                                                    'Manzana': 'manzana',
                                                    'Maracuyá': 'maracuya',
                                                    'Multicereal': 'multicereal',

                                                    // Columna 3: Sabores Especiales (NUEVOS)
                                                    'Castaña': 'castana',
                                                    'Pecanas': 'pecanas',
                                                    'Pistacho': 'pistacho',
                                                    'Chocochips': 'chocochips',
                                                    'Cheesecake': 'cheesecake',
                                                    'Crema Pastelera': 'crema-pastelera',
                                                };
                                                const slug = slugMap[itemName] || itemName.toLowerCase().replace(/\s+/g, '-');
                                                href = `/alfajores/${slug}`;
                                            }
                                            // Para otras categorías
                                            else {
                                                const slug = itemName.toLowerCase()
                                                    .replace(/\s+/g, '-')
                                                    .replace(/\(/g, '')
                                                    .replace(/\)/g, '')
                                                    .replace(/\//g, '-');
                                                href = `/${activeMenu}/${slug}`;
                                            }

                                            return (
                                                <Link
                                                    key={itemIdx}
                                                    href={href}
                                                    className="flex items-center gap-2 py-2 px-3 rounded-lg transition-colors hover:bg-(--mint-100) group "
                                                    onClick={() => setActiveMenu(null)}
                                                >
                                                    <span
                                                        className="text-sm text-(--gray-700) transition-all duration-200 group-hover:translate-x-1 group-hover:text-(--brand-primary)"

                                                        style={{
                                                            color: 'var(--gray-700)',
                                                            fontWeight: 500
                                                        }}

                                                    >
                                                        {itemName}
                                                    </span>
                                                    {badge && (
                                                        <Badge className="text-xs px-2 py-0.5 bg-(--brand-primary) text-white">
                                                            {badge}
                                                        </Badge>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* Featured Image */}
                            <div className="rounded-xl overflow-hidden shadow-card">
                                <ImageWithFallback
                                    src={megaMenus[activeMenu as keyof typeof megaMenus].image}
                                    alt={megaMenus[activeMenu as keyof typeof megaMenus].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Modal */}
            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
        </header>
    );
}

// MOBILE MENU CON HOVER DE COLOR
function MobileMenu({ onClose }: { onClose: () => void }) {
    const [openSection, setOpenSection] = useState<string | null>(null)
    const router = useRouter()

    const sections = [
        {
            id: 'alfajores',
            title: 'Alfajores',
            items: [
                { name: 'Tradicional', href: '/alfajores/tradicional' },
                { name: 'Maicena', href: '/alfajores/maicena' },
                { name: 'Chocolate', href: '/alfajores/chocolate' },
                { name: 'Lúcuma', href: '/alfajores/lucuma' },
                { name: 'Cajas Mixtas', href: '/alfajores?mix=all' },
                { name: 'Ver Todos', href: '/alfajores' }
            ]
        },
        {
            id: 'postres',
            title: 'Postres',
            items: [
                { name: 'Brownie', href: '/postres/brownie' },
                { name: 'Cheesecake', href: '/postres/cheesecake-familiar' },
                { name: 'Milhojas', href: '/postres/milhojas-personal' },
                { name: 'Pye de limón', href: '/postres/pye-limon-personal' },
                { name: 'Ver Todos', href: '/postres' }
            ]
        },
        {
            id: 'regalos',
            title: 'Regalos',
            items: [
                { name: 'Box Cumpleañero', href: '/regalos/box-cumpleanos-10-personas' },
                { name: 'Cajas Especiales', href: '/regalos/caja-regalo-x15' },
                { name: 'Personalizados', href: '/regalos/alfajores-disenados' },
                { name: 'Ver Todos', href: '/regalos' }
            ]
        },
        {
            id: 'tienda',
            title: 'Tienda',
            items: [
                { name: 'Croissants', href: '/tienda/croissants' },
                { name: 'Cafe', href: '/tienda/cafe' },
                { name: 'Helados', href: '/tienda/helados' },
                { name: 'Kits DIY', href: '/tienda/kits-diy' },
                { name: 'Ver Todos', href: '/tienda' }
            ]
        }
    ]

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-(--gray-200)">
                <h2 style={{ fontWeight: 700, fontSize: '1.125rem' }}>Menú</h2>
                {/* Header */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="cursor-pointer hover:bg-(--brand-primary) hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    {sections.map((section) => (
                        <div key={section.id} className="border-b border-(--gray-200) pb-2">
                            <button
                                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                                className="w-full flex items-center justify-between py-3 px-2 rounded-lg  transition-colors group cursor-pointer"
                                style={{ fontWeight: 600, color: 'var(--gray-900)' }}
                            >
                                <span className="group-hover:text-(--brand-primary) transition-colors">
                                    {section.title}
                                </span>
                                <ChevronDown className={`w-5 h-5 transition-transform group-hover:text-(--brand-primary) ${openSection === section.id ? 'rotate-180' : ''}`} />
                            </button>

                            {openSection === section.id && (
                                <div className="pl-4 space-y-1 mt-2">
                                    {section.items.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                router.push(item.href)
                                                onClose()
                                            }}
                                            className="w-full text-left block py-2 px-3 rounded-lg text-sm hover:bg-(--mint-100) transition-colors group cursor-pointer"
                                            style={{ color: 'var(--gray-700)' }}
                                        >
                                            <span className="group-hover:text-(--brand-primary) transition-colors">
                                                {item.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            router.push('/novedades')
                            onClose()
                        }}
                        className="w-full text-left block py-3 px-2   rounded-lg transition-colors group cursor-pointer"
                        style={{ fontWeight: 600, color: 'var(--gray-900)' }}
                    >
                        <span className="group-hover:text-(--brand-primary) transition-colors">
                            Novedades
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            router.push('/nosotros')
                            onClose()
                        }}
                        className="w-full text-left block py-3 px-2   rounded-lg transition-colors group cursor-pointer"
                        style={{ fontWeight: 600, color: 'var(--gray-900)' }}
                    >
                        <span className="group-hover:text-(--brand-primary) transition-colors">
                            Nosotros
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}