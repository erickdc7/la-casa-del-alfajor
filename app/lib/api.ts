const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ApiOptions {
    method?: string
    body?: unknown
}

function obtenerToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body } = options

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    const token = obtenerToken()
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })

    const texto = await response.text()
    const datos = texto ? JSON.parse(texto) : null

    if (!response.ok) {
        throw new Error(datos?.message || 'Error en la petición')
    }

    return datos as T
}