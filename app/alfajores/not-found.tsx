import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--cream-50)">
      <div className="text-center">
        <h2 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Producto no encontrado
        </h2>
        <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
          Lo sentimos, el producto que buscas no existe.
        </p>
        <Link href="/alfajores">
          <Button className="bg-(--brand-primary) hover:bg-(--brand-primary-dark)">
            Ver todos los alfajores
          </Button>
        </Link>
      </div>
    </div>
  )
}