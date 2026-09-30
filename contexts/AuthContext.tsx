'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiFetch } from '../app/lib/api'

interface Usuario {
    id: number
    nombre: string
    email: string
    telefono: string
    rol: string
}

interface RegistroData {
    nombre: string
    email: string
    telefono: string
    password: string
    confirmPassword: string
    aceptaTerminos: boolean
    aceptaNewsletter: boolean
}

interface AuthContextType {
    usuario: Usuario | null
    cargando: boolean
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>
    registrar: (datos: RegistroData) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }

        apiFetch<Usuario>('/api/auth/me')
            .then(setUsuario)
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setCargando(false))
    }, [])

    const login = async (email: string, password: string, rememberMe: boolean) => {
        const respuesta = await apiFetch<{ token: string }>('/api/auth/login', {
            method: 'POST',
            body: { email, password, rememberMe },
        })
        localStorage.setItem('token', respuesta.token)
        const perfil = await apiFetch<Usuario>('/api/auth/me')
        setUsuario(perfil)
    }

    const registrar = async (datos: RegistroData) => {
        await apiFetch('/api/auth/registro', { method: 'POST', body: datos })
        await login(datos.email, datos.password, false)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUsuario(null)
    }

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, registrar, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context
}