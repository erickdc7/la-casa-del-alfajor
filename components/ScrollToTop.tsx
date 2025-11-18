import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verifica el scroll para activar el botón
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Función que lleva al usuario arriba suavemente
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={`
                fixed right-8 bottom-20 z-50
                transition-all duration-300 ease-out
                
                ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }
            `}
        >
            <button
                onClick={scrollToTop}
                aria-label="Volver arriba"
                className="
                    flex items-center justify-center
                    rounded-full p-0
                    bg-(--brand-primary)
                    hover:bg-(--brand-primary-dark)
                    text-white shadow-lg
                    transition-all duration-300 hover:shadow-xl
                    cursor-pointer
                    w-9 h-9
                    sm:w-11 sm:h-11
                    md:w-12 md:h-12
                "
            >
                <ChevronUp
                    className="
                        w-4 h-4
                        sm:w-5 sm:h-5
                        md:w-5 md:h-5
                    "
                />
            </button>
        </div>
    );
}
