import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Heart, Award, Users, Send, ArrowRight, Check, ChevronLeft, ChevronRight, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image';

const values = [
    {
        icon: Award,
        title: 'Calidad Premium',
        description: 'Ingredientes premium seleccionados cuidadosamente para garantizar el mejor sabor en cada bocado.'
    },
    {
        icon: Heart,
        title: 'Hecho con Pasión',
        description: 'Elaboramos cada alfajor con amor y dedicación, siguiendo recetas tradicionales perfeccionadas.'
    },
    {
        icon: Users,
        title: 'Tradición Familiar',
        description: 'Mantenemos vivas las técnicas artesanales mientras innovamos con nuevos sabores únicos.'
    }
];

const locations = [
    {
        id: '1',
        name: "Simón Salguero",
        address: "Simón Salguero 566, Santiago de Surco, Perú",
        phone: "+51 936 507 349",
        hours: "Lun-Dom: 09:00 – 20:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwjudE6WmyV5P-7YBjVwfFUZAQvzqlZkkUvul0TsWXXgqqHx68apM4VETv0MpfWxerFWI2KRvPSgvT-XVjoaBR7iWrxcEfxRXlwL8b4NOvg4W7G5VeCKKV7aO56mMbYGo4tesHt=w426-h240-k-no',
        coordinates: { lat: -12.130716, lng: -77.0097198 },
        googleMapsUrl: 'https://maps.app.goo.gl/PCzWJCyMWGDgs7jP6'
    },
    {
        id: '2',
        "name": "28 de Julio",
        "address": "Av. 28 de Julio 970, Miraflores, Perú",
        "phone": "+51 936 531 060",
        "hours": "Lunes a Domingo 09:00 ― 20:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx9skEvtDm0YSwIAbrgpH8KEC1SNZWBRFJil_aaB8etTAJXNO9UIOdp7mTlj66Y5nmTF0a2zWCAQawZTUu6iyqUUm0aRp6RoJ3yLxrygWGTgRK4HGtIFloy7mafoUuCb3LA4TfcrQ=w408-h544-k-no',
        coordinates: { lat: -12.1296296, lng: -77.0256775 },
        googleMapsUrl: 'https://maps.app.goo.gl/rHPAChpqWAnv5C3AA'
    },
    {
        id: '3',
        "name": "Conquistadores",
        "address": "Av. Los Conquistadores 695, San Isidro, Perú",
        "phone": "+51 936 483 583",
        "hours": "Lunes a Domingo 09:00 ― 20:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipPicwSLNKRvLJdM53wso3ITHyiOtPVHvY-_7vKg=w408-h306-k-no',
        coordinates: { lat: -12.1029757, lng: -77.0391601 },
        googleMapsUrl: 'https://maps.app.goo.gl/We42YDU4ufqs6j7S8'
    },
    {
        id: '4',
        "name": "Centro Comercial Bajada Balta",
        "address": "Malecón Balta 626, Miraflores, Perú",
        "phone": "+51 936 491 596",
        "hours": "Lunes a Domingo 09:30 ― 21:30",
        image: 'https://lh3.googleusercontent.com/p/AF1QipMQb0RjJ2t2pxEliXXZXbwypkAicW-cQTiNUgOG=w408-h313-k-no',
        coordinates: { lat: -12.0764, lng: -76.9428 },
        googleMapsUrl: 'https://maps.app.goo.gl/H6LwurosPyB1Kgqk9'
    },
    {
        id: '5',
        "name": "Plaza Lima Sur",
        "address": "La Casa Del Alfajor, Chorrillos, Perú",
        "phone": "+51 936 477 092",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipPWQDHeyE7sAUOTuZkpc2hWoeo5mjgZyx0YA3Xb=w408-h310-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/eB4Y8QowbPkvit5f8'
    },
    {
        id: '6',
        "name": "Chacarilla",
        "address": "Calle Monte Rosa 153, Lima, Perú",
        "phone": "+51 936 482 132",
        "hours": "Lunes a Domingo 08:30 ― 20:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipP1Yrm9898aqDRqcdcKAbrFCyE1BdYXhhhcHybt=w408-h327-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/dmp893hdYeEAjepWA'
    },
    {
        id: '7',
        "name": "San Borja",
        "address": "Av. San Borja Sur 802, San Borja, Perú",
        "phone": "+51 936 474 187",
        "hours": "Lunes a Domingo 09:00 ― 20:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwASzHOwCh1hmTt4qMstp4hOQXWk9v7OFdDVGekTml1pvsdJMDvE5oALf9P-FjI37OOxOc3jk971F4Rj0PIWFzMMuNwCNfq6OFurxGhqhouzWjPOswy1ufeGIphufbJD55ssEwCUA=w408-h306-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/F8t8r1YwgCDbmC946'
    },
    {
        id: '8',
        "name": "Mall del Sur",
        "address": "Av. Los Lirios, San Juan de Miraflores, Perú",
        "phone": "+51 936 520 446",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzOQ4vsP7y8CRJXyjoSJa_7c2cdyyahEMCtf98eDC0YMuvaLjxt9RhjH5mWM0KLcQrfFLPmkLUUlZ9LjVhO6J3ZxR6BIfrEA6aj4DlYhr4XrMhOKOnLztHcEAvAnLCa5cDXh4bIjA=w408-h544-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/eo2Ku5k9kKZERPDi6'
    },
    {
        id: '9',
        "name": "Open Plaza",
        "address": "Av. Tomas Marsano 1803, Surquillo, Perú",
        "phone": "(01) 6161000",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSza5MgDFU5XQQcajM4742kI1ZAMklTlYdka-0eokBA_BDaExTXAm2vJyvRvwHzg3119Vmlwy9rz2DWX7g0zQQohWDvUCoEEohNjvfKJduc5pt_g9QH_PNc_c4okcPrPZy1ZUGFn=w408-h544-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/awNGQYai6AFYcQmUA'
    },
    {
        id: '10',
        "name": "Encalada",
        "address": "Av. La Encalada 775, Lima, Perú",
        "phone": "+51 936 530 531",
        "hours": "Lunes a Domingo 09:00 ― 20:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSysP3FxKgdYabxU1cX4Hqd9i7n6c199hCDq80OQ7LnYfOE5EYXM8g4c2ADGP7Bck8buwcWwmy2uVIKoPlG6uJqG6-b6bfhWPne8iFl3pxnCq2SgHVx-G8ryyAF6Wbwv2DnsBbo=w408-h306-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/yecXVfr64pFy5TsN8'
    },
    {
        id: '11',
        "name": "Planta - Chorrillos",
        "address": "Tres Marias 226, Chorrillos, Perú",
        "phone": "+51 989 310 247",
        "hours": "Lunes a Viernes 09:00 ― 18:00",
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxSHjy16MlAaBF5A4REtOSoNeuvDQLu9oVtH69oc55_KjIFhfu-JER99UCGDzezVIYxjaqxWmH8CZUChqHtnEDnURryNM0osFhGToJbH31EMvMh8d2nT-gZ-KY8cUQcrq-EPke9YA=w408-h306-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/qL22r2bELYWNNq6u8'
    },
    {
        id: '12',
        "name": "La Molina",
        "address": "Av. Raúl Ferrero 1557, Lima, Perú",
        "phone": "+51 936 522 796",
        "hours": "Lunes a Domingo 09:00 ― 20:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipN0LlNbCbmoHkZ-ij119SLuWbBj36RkTmQEmwdg=w408-h283-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/E7PBVyLtvJFqU8Gu5'
    },
    {
        id: '13',
        "name": "Centro Comercial Real Plaza Salaverry",
        "address": "Av. Gral. Felipe Salaverry 2370, Jesús María, Perú",
        "phone": "+51 936 522 796",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipMntw_RLscWVxQwATcR1XK2dQLZAiSlCA_EBtKp=w408-h408-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/cm6qJg99nAiuZA9D6'
    },
    {
        id: '14',
        "name": "Centro comercial La Rambla - San Borja",
        "address": "Av. Javier Prado Este 2050, Lima, Perú",
        "phone": "+51 936 476 072",
        "hours": "Lunes a Domingo 10:00 ― 21:30",
        image: 'https://lh3.googleusercontent.com/p/AF1QipN5UaM9UDiYyAt9dX1CT09L94e8NkNMENiNA_it=w408-h248-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/4m6cqNF9aanZXq8WA'
    },
    {
        id: '15',
        "name": "Breña",
        "address": "Av. Brasil 778, Breña, Perú",
        "phone": "+51 936 473 069",
        "hours": "Lunes a Sábado 09:30 ― 21:30 | Domingo 09:30 ― 21:45",
        image: 'https://lh3.googleusercontent.com/p/AF1QipPhfEMpbl1nGnDvNEulnvO5FjL_OVTBplLBac_d=w408-h306-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/YwuQtCYMpiN8G41RA'
    },
    {
        id: '16',
        "name": "Jockey Plaza",
        "address": "Av. Javier Prado Este 4200, Santiago de Surco, Perú",
        "phone": "+51 936 506 932",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipMTQr1CqSjTyQmOuxL84fR69BwvGAcJJFyxhP9u=w408-h340-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/7hsfdgH2qLrrfCTa6'
    },
    {
        id: '17',
        "name": "C.C. Plaza Norte",
        "address": "Av. Tomás Valle, Independencia, Perú",
        "phone": "+51 936 512 230",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipPp07aAzC9EcFN1nV8MB-wcb3y2yMv47nJB_tHV=w408-h446-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/y3L2kSnX7zcyBPmaA'
    },
    {
        id: '18',
        "name": "Bellavista",
        "address": "Av. Óscar R. Benavides 3866, Bellavista, Perú",
        "phone": "+51 936 499 957",
        "hours": "Lunes a Domingo 09:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipP6Wzp4l9THWWDlF9v3vWCkBavxHfRq_xR6WaJT=w426-h240-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/jJwbw5LDgzXTe4ik7'
    },
    {
        id: '19',
        "name": "Centro Comercial Plaza",
        "address": "Av. Universitaria, San Miguel, Perú",
        "phone": "+51 936 473 069",
        "hours": "Lunes a Domingo 10:00 ― 22:00",
        image: 'https://lh3.googleusercontent.com/p/AF1QipPhfEMpbl1nGnDvNEulnvO5FjL_OVTBplLBac_d=w408-h306-k-no',
        coordinates: { lat: -12.1467, lng: -77.0208 },
        googleMapsUrl: 'https://maps.app.goo.gl/tnypuWCQXKavDMSf6'
    },
];


const faqs = [
    {
        question: '¿Hacen envíos a toda Lima?',
        answer: 'Sí, realizamos envíos a todos los distritos de Lima Metropolitana. El tiempo de entrega es de 24 a 48 horas. Envío gratuito por compras mayores a S/50.'
    },
    {
        question: '¿Cuánto tiempo duran los alfajores?',
        answer: 'Nuestros alfajores se mantienen frescos hasta por 15 días desde su elaboración, siempre que se conserven en un lugar fresco y seco.'
    },
    {
        question: '¿Puedo personalizar los alfajores?',
        answer: 'Sí, elaboramos alfajores personalizados para eventos y celebraciones. Escríbenos con al menos 7 días de anticipación y haremos algo especial para ti.'
    },
    {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito y débito, Yape, Plin, transferencias bancarias y pago contra entrega.'
    },
    {
        question: '¿Tienen productos sin gluten o veganos?',
        answer: 'Actualmente estamos desarrollando opciones sin gluten y veganas. Si tienes alguna alergia o requerimiento especial, contáctanos y te ayudaremos.'
    },
    {
        question: '¿Puedo cambiar o cancelar mi pedido?',
        answer: 'Puedes modificar o cancelar tu pedido hasta 24 horas antes de la entrega. Escríbenos por WhatsApp o correo electrónico para coordinarlo.'
    }
];


export function AboutPage() {
    const router = useRouter();

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [jobForm, setJobForm] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: ''
    });

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1
    })

    // Funciones para navegar el carrusel
    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    // Manejo del formulario de contacto
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form:', contactForm);
    };

    // Manejo del formulario de postulaciones
    const handleJobSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Job form:', jobForm);
    };

    return (
        <main className="min-h-screen bg-white">
            {/* HERO */}
            <section className="relative bg-linear-to-br from-[#F0FDF4] via-white to-[#ECFDF5] py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 sm:top-20 right-10 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-[#008349]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 sm:bottom-20 left-10 w-36 sm:w-48 lg:w-72 h-36 sm:h-48 lg:h-72 bg-[#10b981]/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-lg border border-[#008349]/10">
                                <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-[#008349]" />
                                <span className="text-xs sm:text-sm" style={{ color: '#008349', fontWeight: 600 }}>
                                    Hecho con amor desde 2015
                                </span>
                            </div>

                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  leading-tight"
                                style={{
                                    fontWeight: 800,
                                    color: '#1a1a1a'
                                }}
                            >
                                Tradición{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10" style={{ color: '#008349' }}>
                                        Artesanal
                                    </span>
                                    <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-[#008349]/20 z-0" />
                                </span>
                                {' '}en Cada Bocado
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl   text-gray-600 leading-relaxed">
                                Somos más que una dulcería. Somos una familia peruana dedicada a crear
                                <span style={{ color: '#008349', fontWeight: 600 }}> momentos inolvidables</span> con
                                alfajores artesanales de calidad premium.
                            </p>

                            <div className="flex pt-2 sm:pt-4 justify-center lg:justify-start">
                                <Button
                                    onClick={() => router.push('/alfajores')}
                                    className="bg-[#008349] hover:bg-[#006838] text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg cursor-pointer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Nuestros Productos
                                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Right - Image Grid */}
                        <div className="relative hidden lg:block">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                        <ImageWithFallback
                                            src="https://images.unsplash.com/photo-1604953782017-769558d1a0cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Nuestro equipo"
                                            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                        <ImageWithFallback
                                            src="https://images.unsplash.com/photo-1603320284434-d60c3edbb856?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Proceso artesanal"
                                            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                        <ImageWithFallback
                                            src="https://images.unsplash.com/photo-1590429994958-8a544a468306?q=80&w=1107&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Celebraciones"
                                            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                        <ImageWithFallback
                                            src="https://plus.unsplash.com/premium_photo-1675806021841-83fa01b81670?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Productos premium"
                                            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-8 py-4 border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Award className="w-8 h-8 text-[#008349]" />
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#1a1a1a' }}>100% Artesanal</div>
                                        <div className="text-sm text-gray-600">Ingredientes Premium</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-hover order-2 lg:order-1">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200"
                                alt="Nuestra historia"
                                className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                            />
                        </div>

                        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    color: 'var(--gray-900)'
                                }}
                            >
                                Nuestra <span style={{ color: 'var(--brand-primary)' }}>Historia</span>
                            </h2>

                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-700)', lineHeight: 1.7 }}>
                                <p>
                                    Todo comenzó en 1987, en la cocina de una casa en Santiago de Surco, con la receta tradicional de la abuela y mucha pasión familiar.
                                </p>
                                <p>
                                    Con el tiempo, nuestro amor por la repostería artesanal nos llevó a abrir nuevas casitas, crear más productos y compartir nuestros alfajores con miles de peruanos.
                                </p>
                                <p>
                                    Hoy, con más de 30 años de historia y más de 20 locales en todo el país, seguimos fieles a nuestro propósito: endulzar los momentos más especiales de cada familia.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4 justify-center lg:justify-start">
                                <div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-1" style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
                                        30+
                                    </div>
                                    <div className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>Años de experiencia</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-1" style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
                                        20+
                                    </div>
                                    <div className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>Locales en Lima</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-1" style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
                                        50K+
                                    </div>
                                    <div className="text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>Clientes felices</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES */}
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
                            Nuestros <span style={{ color: 'var(--brand-primary)' }}>Valores</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Lo que nos define como marca
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {values.map((value, idx) => (
                            <Card key={idx} className="bg-white border-0 shadow-card p-6 sm:p-8 text-center hover:shadow-hover transition-all">
                                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-(--brand-primary) to-(--brand-primary-dark) flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <value.icon className="w-6 sm:w-7 lg:w-8 h-6 lg:h-8 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base" style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
                                    {value.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* LOCATIONS */}
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
                            Nuestras <span style={{ color: 'var(--brand-primary)' }}>Ubicaciones</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-xl" style={{ color: 'var(--gray-600)' }}>
                            Encuéntranos en las mejores zonas de Lima
                        </p>
                    </div>

                    {/* Google Maps */}
                    <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d249683.46136256828!2d-76.9908147!3d-12.091323!3m2!1i1024!2i768!4f13.1!2m1!1sla%20casa%20del%20alfajor%20ubicaciones!5e0!3m2!1ses!2spe!4v1761776422895!5m2!1ses!2spe"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full sm:h-[500px]"
                        />
                    </div>

                    {/* Carousel */}
                    <div className="relative px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -ml-2 sm:-ml-3">
                                {locations.map((location) => (
                                    <div
                                        key={location.id}
                                        className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-2 pr-2 sm:pl-3 sm:pr-3 pb-4"
                                    >
                                        <div className="h-full border border-gray-200 rounded-xl sm:rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 bg-white overflow-hidden flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
                                                <Image
                                                    src={location.image}
                                                    alt={location.name}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                    width={600}
                                                    height={400}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 sm:p-6 flex flex-col grow">
                                                <h3
                                                    className="text-base sm:text-lg lg:text-xl mb-2"
                                                    style={{
                                                        fontFamily: 'var(--font-heading)',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {location.name}
                                                </h3>

                                                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-3 sm:mb-4 grow" style={{ color: 'var(--gray-600)' }}>
                                                    <div className="flex items-start gap-2">
                                                        <MapPin className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }} />
                                                        <span>{location.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" style={{ color: 'var(--brand-primary)' }} />
                                                        <span>{location.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" style={{ color: 'var(--brand-primary)' }} />
                                                        <span>{location.hours}</span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => window.open(location.googleMapsUrl, '_blank')}
                                                    className="w-full mt-auto bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white cursor-pointer text-sm sm:text-base py-2 sm:py-2.5"
                                                >
                                                    <Navigation className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                                                    Cómo llegar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <Button
                            onClick={scrollPrev}
                            variant="outline"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl   cursor-pointer hover:bg-(--brand-primary) transition-all hover:text-white hidden sm:flex"
                        >
                            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            variant="outline"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl  cursor-pointer hover:bg-(--brand-primary) transition-all hover:text-white hidden sm:flex"
                        >
                            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                        </Button>
                    </div>

                    {/* Counter */}
                    <div className="text-center mt-6 sm:mt-8">
                        <p className="text-sm sm:text-base text-gray-600">
                            <span className="font-semibold text-(--brand-primary)">{locations.length}</span> ubicaciones en Lima
                        </p>
                    </div>
                </div>
            </section>

            {/* JOBS */}
            <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-white to-(--mint-50)">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    color: 'var(--gray-900)'
                                }}
                            >
                                <span style={{ color: 'var(--brand-primary)' }}>Únete</span> a Nuestro Equipo
                            </h2>

                            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6" style={{ color: 'var(--gray-700)', lineHeight: 1.7 }}>
                                ¿Te encanta la repostería y trabajar en equipo? Estamos en busca de nuevos talentos para las áreas de Producción y Ventas.
                                ¡Ven y comparte con nosotros la pasión por el sabor artesanal!
                            </p>

                            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                {[
                                    { title: 'Ambiente familiar', desc: 'Trabajamos como una gran familia' },
                                    { title: 'Oportunidades de crecimiento', desc: 'Capacitación constante' },
                                    { title: 'Beneficios competitivos', desc: 'Planilla completa y más' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                        <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-(--brand-primary) flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm sm:text-base" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{item.title}</div>
                                            <div className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-xs sm:text-sm p-3 sm:p-4 rounded-xl bg-(--mint-100)" style={{ color: 'var(--gray-700)' }}>
                                📧 También puedes enviar tu CV a: <strong>rrhh@lacasadelalfajor.com</strong>
                            </div>
                        </div>

                        {/* Form */}
                        <Card className="bg-white border-0 shadow-card p-4 sm:p-6 lg:p-8">
                            <h3 className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                                Postula Ahora
                            </h3>
                            <form onSubmit={handleJobSubmit} className="space-y-3 sm:space-y-4">
                                <div>
                                    <Label htmlFor="job-name" className="mb-2 text-sm">Nombre Completo</Label>
                                    <Input
                                        id="job-name"
                                        value={jobForm.name}
                                        onChange={(e) => setJobForm({ ...jobForm, name: e.target.value })}
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="job-email" className="mb-2 text-sm">Email</Label>
                                    <Input
                                        id="job-email"
                                        type="email"
                                        value={jobForm.email}
                                        onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="job-phone" className="mb-2 text-sm">Teléfono</Label>
                                    <Input
                                        id="job-phone"
                                        value={jobForm.phone}
                                        onChange={(e) => setJobForm({ ...jobForm, phone: e.target.value })}
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="job-position" className="mb-2 text-sm">Posición de Interés</Label>
                                    <Select value={jobForm.position} onValueChange={(value) => setJobForm({ ...jobForm, position: value })}>
                                        <SelectTrigger className="text-sm sm:text-base">
                                            <SelectValue placeholder="Selecciona una posición" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="produccion">Área de Producción</SelectItem>
                                            <SelectItem value="ventas">Personal de Ventas</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="job-message" className="mb-2 text-sm">Por qué quieres trabajar con nosotros</Label>
                                    <Textarea
                                        id="job-message"
                                        rows={4}
                                        value={jobForm.message}
                                        onChange={(e) => setJobForm({ ...jobForm, message: e.target.value })}
                                        placeholder="Cuéntanos tu motivación..."
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white cursor-pointer text-sm sm:text-base py-2.5 sm:py-3"
                                >
                                    Enviar Postulación
                                    <Send className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white" id='contacto'>
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
                            Envíanos tu <span style={{ color: 'var(--brand-primary)' }}>Mensaje</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Estamos aquí para ayudarte
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-(--mint-100) flex items-center justify-center shrink-0">
                                    <Mail className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <div>
                                    <div className="mb-1 text-sm sm:text-base" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Email</div>
                                    <a href="mailto:info@lacasadelalfajor.com" className="text-sm sm:text-base" style={{ color: 'var(--brand-primary)' }}>
                                        info@lacasadelalfajor.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-(--mint-100) flex items-center justify-center shrink-0">
                                    <Phone className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <div>
                                    <div className="mb-1 text-sm sm:text-base" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>WhatsApp</div>
                                    <a href="tel:+51999999999" className="text-sm sm:text-base" style={{ color: 'var(--brand-primary)' }}>
                                        +51 999 999 999
                                    </a>
                                    <div className="mt-2">
                                        <Button
                                            size="sm"
                                            className="bg-[#25D366] hover:bg-[#128C7E] text-white cursor-pointer text-xs sm:text-sm"
                                        >
                                            Chatear Ahora
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-(--mint-100) flex items-center justify-center shrink-0">
                                    <Clock className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'var(--brand-primary)' }} />
                                </div>
                                <div>
                                    <div className="mb-1 text-sm sm:text-base" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Horario de Atención</div>
                                    <div className="text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                        Lun - Vie: 9:00 AM - 10:00 PM<br />
                                        Sáb: 10:00 AM - 2:00 PM
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="bg-white border-0 shadow-card p-4 sm:p-6 lg:p-8">
                            <h3 className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                                Envíanos un Mensaje
                            </h3>
                            <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4">
                                <div>
                                    <Label htmlFor="contact-name" className="mb-2 text-sm">Nombre Completo</Label>
                                    <Input
                                        id="contact-name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contact-email" className="mb-2 text-sm">Email</Label>
                                    <Input
                                        id="contact-email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contact-phone" className="mb-2 text-sm">Teléfono</Label>
                                    <Input
                                        id="contact-phone"
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contact-subject" className="mb-2 text-sm">Asunto</Label>
                                    <Select value={contactForm.subject} onValueChange={(value) => setContactForm({ ...contactForm, subject: value })}>
                                        <SelectTrigger className="text-sm sm:text-base">
                                            <SelectValue placeholder="Selecciona un asunto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">Consulta General</SelectItem>
                                            <SelectItem value="corporativo">Pedido Corporativo</SelectItem>
                                            <SelectItem value="disenados">Alfajores Diseñados</SelectItem>
                                            <SelectItem value="sugerencias">Sugerencias</SelectItem>
                                            <SelectItem value="reclamos">Reclamos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="contact-message" className="mb-2 text-sm">Mensaje</Label>
                                    <Textarea
                                        id="contact-message"
                                        rows={5}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        placeholder="Escribe tu mensaje aquí..."
                                        required
                                        className="text-sm sm:text-base"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-(--brand-primary) hover:bg-(--brand-primary-dark) text-white cursor-pointer text-sm sm:text-base py-2.5 sm:py-3"
                                >
                                    Enviar Mensaje
                                    <Send className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-white to-(--mint-50)">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: 'var(--gray-900)'
                            }}
                        >
                            Preguntas y <span style={{ color: 'var(--brand-primary)' }}>Respuestas</span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--gray-600)' }}>
                            Resolvemos tus dudas más comunes de forma rápida y clara
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`item-${idx}`}
                                className="bg-white border-0 shadow-card rounded-xl px-4 sm:px-6 data-[state=open]:shadow-hover"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-6 cursor-pointer">
                                    <span className="text-sm sm:text-base" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                                        {faq.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 sm:pb-6 text-sm sm:text-base" style={{ color: 'var(--gray-700)' }}>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="text-center mt-8 sm:mt-12">
                        <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>
                            ¿No encontraste tu respuesta?
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="border-2 border-(--brand-primary) text-(--brand-primary) hover:bg-(--brand-primary) hover:text-white rounded-xl cursor-pointer text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
                        >
                            Contáctanos
                            <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
