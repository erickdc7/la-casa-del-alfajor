'use client'

import { AuthPage } from '@/components/AuthPages'
import { ProductsLayout } from '@/app/products-layout'

export default function Auth() {
  return (
    <ProductsLayout>
      <AuthPage />
    </ProductsLayout>
  )
}